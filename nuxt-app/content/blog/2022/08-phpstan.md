---
title: PHPStan
tags: [php, qa, phpstan, symfony, ci]
createdAt: 2022-08-13
---

[PHPStan](https://phpstan.org/) est un outil d'analyse syntaxique. Son principe est de parser le code source du projet, afin de détecter des anomalies, qui peuvent être source de bugs. C'est une analyse en dehors de tout contexte d'exécution, contrairement par exemple à New Relic ou Sentry qui vont relever les erreurs intervenues pendant la génération d'une page ou l'exécution d'un script.

![Logo PHPStan](/img/phpstan-logo.png)

Un ensemble de règles pré-établies permettent de détecter des cas assez divers, les plus courants étant:
- variable non initialisée
- type de paramètre incorrect
- appel à une fonction ou méthode inexistante
- appel d'une méthode avec un nombre incorrect de paramètres 


Cette analyse vient en complétement des tests unitaires ou fonctionnels, puisqu'elle permet notamment de détecter des problèmes dans des endroits de l'application qui sont rarement exécutés ou qui ne sont pas couverts par des tests.

C'est un outil qui peut être lancé à la fois par les développeurs sur leur environnement (par exemple via un hook de pre-commit), et également durant le processus d'intégration continue. C'est une analyse très rapide à mettre en oeuvre et à exécuter. Intervenant tôt dans le processus de développement, elle permet facilement d'éviter des bugs, et donc de gagner du temps tout en évitant l'insatisfaction du client.

### Installation


La librairie est disponible sur [Packagist](https://packagist.org/packages/phpstan/phpstan) et s'installe simplement via [Composer](https://getcomposer.org/):

```shell
composer require --dev phpstan/phpstan
```

### Analyse


L'analyse se lance ensuite via un binaire:
```shell
vendor/bin/phpstan analyse src/ tests/ --level=5
```

Qui affiche en réponse les anomalies détectées:
![Erreurs](/img/phpstan1.png)


Il est possible de configurer le niveau des règles utilisées, 0 étant le plus permissif, et 9 le plus contraignant. Par exemple, les typehints manquants sont considérés comme des erreurs à partir du niveau 6.


### Configuration

Il est possible de créer un fichier de configuration, nommé phpstan.neon par défaut, afin de paramétrer l'analyse: niveau des règles, répertoires à analyser, à exclure, extensions à activer, ....

Exemple de phpstan.neon pour une application Symfony:
```yaml
parameters:
  level: 7
  paths:
    - src
    - tests
```

La liste complètes des paramètres est disponibles ici:
<https://phpstan.org/config-reference>


### Intégration à un projet existant

L'outil propose une option intéressante pour un développeur arrivant sur un projet existant (legacy) et qui contient déjà un nombre important d'erreurs: il est possible de générer un fichier baseline, qui va contenir toutes les erreurs existantes. Celles-ci seront ensuite ignorées lors les futurs analyses, et permet donc de mettre en place PHPStan pour les développements à venir sans avoir à corriger toute la base de code existante. Charge ensuite au développeur de corriger l'existant (ou pas).


Générer le fichier baseline (phpstan-baseline.neon):
```shell
vendor/bin/phpstan analyse src/ tests/ --generate-baseline
```

Puis modifier le fichier de configuration afin de le prendre en compte:
```yaml
includes:
	- phpstan-baseline.neon
```


Voir <https://phpstan.org/user-guide/baseline> pour plus d'informations


### Extensions Symfony & Doctrine

Des extensions sont disponibles afin d'assurer une bonne intégration avec Symfony et Doctrine:
- l'extension Doctrine <https://github.com/phpstan/phpstan-doctrine>
- l'extension pour Symfony <https://github.com/phpstan/phpstan-symfony>

Pour cette dernière, il est nécessaire de configurer le chemin vers le container de service:
```yaml
parameters:
  symfony:
    containerXmlPath: var/cache/dev/srcDevDebugProjectContainer.xml
```
  
### Plus loin

Il existe des extensions qui vont au delà des règles de bases, afin s'assure que le code source répond bien aux bonnes pratiques de PHP. Notamment:
- éviter les méthodes `isset()`, `empty()` ou `eval()`
- utiliser `declare(strict_types=1)` dans chaque fichier
- éviter l'utilisation de la structure `switch`

<https://github.com/ergebnis/phpstan-rules>
<https://github.com/phpstan/phpstan-strict-rules>


### Configuration finale

```yaml
parameters:
  level: 7
  paths:
    - src
    - tests
  symfony:
    containerXmlPath: var/cache/dev/srcDevDebugProjectContainer.xml

includes:
	- phpstan-baseline.neon
	- vendor/phpstan/phpstan-doctrine/extension.neon
	- vendor/phpstan/phpstan-symfony/extension.neon
	- vendor/phpstan/phpstan-strict-rules/rules.neon
```


### Les alternatives

#### Psalm

<https://psalm.dev/>


#### Phan

<https://github.com/phan/phan/wiki>
