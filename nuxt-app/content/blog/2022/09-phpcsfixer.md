---
title: PHP Coding Standards Fixer
tags: [php, symfony, ci]
createdAt: 2022-09-16
---

[PHP CS Fixer](https://github.com/PHP-CS-Fixer/PHP-CS-Fixer) est un outil permettant de contrôler et de corriger le code afin que celui ci suive certains standards, un ensemble de règles et de bonnes pratiques.

![](/img/phpcsfixer-logo.png)

### Pourquoi suivre des standards ?

En tant que développeur, on passe au moins autant de temps à lire du code qu'à en écrire. Et on sait tous à quel point c'est pénible de lire un fichier source trop dense, mal indenté ou code de manière inconsistente. Ou comme on est vite distrait lors d'une review par un saut de ligne manquant ou une parenthèse mal placée.

![](/img/standards.png)

Les standards vont définir un certain nombre de règles à suivre, comme par exemple:
- sauter une ligne avant chaque appel à `return`
- respecter `camelCase` pour le nommage des méthodes
- toujours utiliser des accolades après un `if`
- faire un retour à la ligne avant le bloc de chaque méthode 
- ne pas dépasser un certain nombre de caractères par ligne
- ne pas utiliser de sauts de lignes ou d'espaces superflus


Cela a plusieurs intérêts: d'une part cela permet d'uniformiser le code produit par différentes personnes, et d'autre part le rendre plus simple à lire. Écrire un code fonctionnel n'est qu'une partie de notre travail de développeur: il faut aussi qu'il soit compréhensible et facilement maintenable. N'oubliez pas que vous ne codez pas uniquement pour vous, mais aussi pour toutes les personnes qui peuvent être amenées à travailler sur votre projet dans le futur. Le code ainsi mis en forme sera plus facile à appréhender pour le prochain développeur, ou vous-même lorsque vous y reviendrez dans plusieurs mois / années.

La lecture du code est ainsi plus rapide et entraine une charge cognitive moindre, que ce soit lors de la découverte de nouveau code dans un projet mais aussi lors de code reviews.

Lors des reviews, cela permet également de ne pas avoir à se préoccuper du formattage, et donc de moins polluer les échanges pour s'intéresser directement à ce qui est plus important.

Il existe plusieurs standards rien que pour PHP, les plus connus en PHP étant [PSR-12](https://www.php-fig.org/psr/psr-12/), et son prédécesseur [PSR-2](https://www.php-fig.org/psr/psr-2/). La librairie embarque également un standard pour Symfony (qui correspond à PSR-12 avec quelques règles supplémentaires) qu'il est nécessaire de suivre si vous voulez contribuer, et peut également être utilisé dans n'importe quel de vos projets, open-source ou pas. 


### Installation


La librairie est disponible sur [Packagist](https://packagist.org/packages/phpstan/phpstan) et s'installe simplement via [Composer](https://getcomposer.org/):

```shell
mkdir --parents tools/php-cs-fixer
composer require --working-dir=tools/php-cs-fixer friendsofphp/php-cs-fixer
```

### Utilisation

On peut utiliser la librairie de 2 façons:
- soit en mode normal, afin de corriger automatiquement les fichiers PHP:


```shell
tools/php-cs-fixer/vendor/bin/php-cs-fixer fix src
```

- soit en mode dry-run, afin de lister les points à corriger. Cela peut être utile côté CI si l'on veut faire échouer un processus lorsque le format du code ne respecte pas les règles, ou alors dans une optique d'apprentissage, afin de faire soi-même les modifications.

```shell
tools/php-cs-fixer/vendor/bin/php-cs-fixer fix src --dry-run
```


### Les alternatives

#### PHP Code Sniffer

<https://github.com/squizlabs/PHP_CodeSniffer>

PHP Code Sniffer permet facilement d'utiliser plus de standards que ceux fourni par PHP CS Fixer. C'est l'outil utilisé fréquemment par les communautés Wordpress ou Drupal?.


Sources:
- <https://stitcher.io/blog/a-programmers-cognitive-load>
