---
title: "Services stateless"
tags: [architecture, symfony, php]
createdAt: 206-11-12
---

Il n'est pas rare pour un développeur de s'être retrouvé face à un bug compliqué à reproduire : une valeur qui n'a rien à faire là, un résultat qui dépend de ce qui s'est exécuté juste avant. Très souvent, la cause est la même : un service qui garde de l'état entre deux appels. Le problème, c'est que ce genre de service fonctionne bien... tant qu'il n'est appelé qu'une fois. C'est précisément ce que cherche à éviter le [service statelessness principle](https://en.wikipedia.org/wiki/Service_statelessness_principle).

## Service stateless : c'est quoi ?

Un service stateless ne retient rien entre deux appels. Pas de donnée de requête, pas d'utilisateur courant, pas de résultat intermédiaire stocké dans une propriété. Tout ce dont il a besoin arrive en paramètre, tout ce qu'il produit repart en retour.

Ses dépendances (repository, logger, ...) ne sont injectées qu'une seule fois et ne changent pas. Ce qu'on évite, c'est l'état mutable lié à un contexte.

### Exemple d'un service conservant des états

```php
final class EventImporter
{
    private array $errors = [];
    private ?Organizer $organizer = null;

    public function setOrganizer(Organizer $organizer): void
    {
        $this->organizer = $organizer;
    }

    public function import(array $rows): void
    {
        foreach ($rows as $row) {
            // ... utilise $this->organizer, remplit $this->errors
        }
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
```

Dans le conteneur, ce service est partagé : une seule instance pour toute l'application. Appelé deux fois dans la même exécution, `$errors` et `$organizer` du premier appel vont polluer le second. Et dès que du code long tourne (workers Messenger, ...), l'état survit entre les traitements. Bugs aléatoires garantis.

### La version corrigée

```php
final readonly class EventImporter
{
    public function __construct(
    	private EventRepository $events
    ) {}

    public function import(Organizer $organizer, array $rows): array
    {
        $errors = [];

        foreach ($rows as $row) {
            // ... utilise $organizer, remplit $errors
        }

        return $errors;
    }
}
```

Plus aucune propriété n'est mutable, et c'est imposé par le `readonly` sur la classe.

Pour remplacer l'état, on peut passer par des DTO en entrée pour les paramètres, ou en sortie pour les résultats, particulièrement si le nombre de variables est important.

## DTO / POPO : des objets simples pour stocker les états

Un POPO (Plain Old PHP Object) est un objet PHP tout simple, sans héritage ni dépendance au framework. Un DTO ([Data Transfer Object](https://fr.wikipedia.org/wiki/Objet_de_transfert_de_donn%C3%A9es)) est un POPO dont le seul boulot est de transporter des données d'un point à un autre. Pas de logique métier, pas de services dedans.

Côté entrée, il regroupe les paramètres passés à la méthode. Reprenons l'import : l'ensemble des entrées devient un DTO.

```php
use Symfony\Component\Validator\Constraints as Assert;

final readonly class ImportEventsDto
{
    /**
     * @param list<array{name: string, startsAt: string}> $rows
     */
    public function __construct(
        public Organizer $organizer,

        public array $rows,
    ) {}
}
```

Les contraintes sont portées par le DTO lui-même : elles décrivent ce qu'est une donnée valide, au même endroit que la donnée. Quant au phpdoc, il précise le contenu de `$rows` pour l'IDE et les analyseurs statiques tel que PHPStan.

Le service d'import prend désormais ce DTO en un seul paramètre, et reste stateless :

```php
final readonly class EventImporter
{
    public function __construct(private EventRepository $events) {}

    /** @return list<string> les erreurs rencontrées */
    public function import(ImportEventsDto $dto): array
    {
        $errors = [];

        foreach ($dto->rows as $row) {
            // ... utilise $dto->organizer, remplit $errors
        }

        return $errors;
    }
}
```

## En résumé

Un service stateless, c'est un service dont le comportement ne dépend que de ce qu'on lui passe, jamais de ce qui s'est exécuté avant lui. Il suffit de ne rien stocker d'un appel à l'autre, et readonly aide à s'y tenir. Le gain se voit surtout le jour où le même service est appelé plusieurs fois dans la même exécution, ou dans un processus qui dure : plus de surprise, et des tests qui se résument à appeler une méthode et regarder ce qu'elle renvoie.
