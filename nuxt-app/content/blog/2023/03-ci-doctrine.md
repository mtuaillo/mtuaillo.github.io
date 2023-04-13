---
title: Doctrine
tags: [php, symfony, ci, doctrine]
createdAt: 2023-03-29
---

Doctrine étant très utilisé dans les projets Symfony pour gérer la base de données, il peut être pratique de s'assurer côté intégration continue que tout est bien paramétré de ce côté.

![Doctrine](/img/doctrine.svg)

Le [bundle Symfony](https://github.com/doctrine/DoctrineBundle/) fournit justement une commande qu'on peut utiliser pour s'assurer que la configuration est valide et cohérente:

```shell
bin/console doctrine:schema:validate
```

Cette commande qui va vérifier deux choses:
- que le mapping des entités est correct
- que le schéma de la base de données correspond aux entités Doctrine

Là encore, cela permet à l'équipe de développement de détecter tôt (dès l'exécution de la CI) d'éventuels problèmes dans le code, et pouvoir les corriger.

### Valider le mapping des entités

La première vérification permet de s'assurer que le mapping des entités est valide: cela va permettre de détecter des erreurs de configuration. En effet, il peut arriver qu'un développeur configure mal une relation, notamment dans les bidirectionnelles, et de ne pas s'en rendre compte directement. Dans ce cas, la commande remontera une erreur:

![Doctrine - erreur de mapping](/img/doctrine-3.png)

Dans le cas contraire, si la configuration Doctrine est correcte, la commande se termine avec succès:

![Doctrine - mapping valide](/img/doctrine-2.png)

A noter qu'on peut également lancer uniquement cette vérification en spécifiant l'option `--skip-sync`:

```shell
bin/console doctrine:schema:validate --skip-sync
```

### Valider le schéma de la base de données

La seconde vérification permet de s'assurer que le schéma de la base de données est à jour par rapport à la configuration Doctrine (et donc aux entités): cela permet notamment de détecter si un développeur a oublié de créer une migration. Cela implique donc d'avoir une base de données démarrée côté CI.

Si le schéma ne correspond pas, par exemple s'il manque une table ou une colonne dans la base de données, la commande remonte une erreur:

![Doctrine - erreur de synchronisation avec le schéma de la base de données](/img/doctrine-1.png)

Dans le cas contraire, la commande se termine avec succès:

![Doctrine - schéma de la base de données synchronisé](/img/doctrine-4.png)

A noter qu'on peut également lancer uniquement cette vérification en spécifiant l'option `--skip-mapping`:

```shell
bin/console doctrine:schema:validate --skip-mapping
```
