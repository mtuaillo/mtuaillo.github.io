---
title: Les extensions PHPStan recommandées
tags: [php, phpstan, ci]
createdAt: 2024-02-09
---

Quel développeur Symfony n'a jamais laissé traîner un `dump()` dans son code ? Avec les extensions de PHPStan, il est possible d'automatiser la détection de ce genre d'oubli dans la CI.

Le système d'extensions permet d'aller bien au delà de l'analyse statique proposée par défaut par l'outil. On peut notamment ajouter des règles, visant à améliorer la qualité du code, en évitant par exemple l'utilisation de certaines méthodes ou opérateurs ([empty](https://localheinz.com/articles/2023/05/10/avoiding-empty-in-php/), [isset](https://dev.to/aleksikauppila/using-isset-and-empty-hurts-your-code-aaa), ...), en limitant l'héritage de classes, en vérifiant le nommage des classes ou encore en interdisant la désactivation des erreurs. En bref, les possibilités sont nombreuses.

Les extensions listées ci-dessous introduisent certaines règles qui peuvent être discutables, mais elles sont toutes paramètrables, ce qui laisse la possibilité d'éventuellement désactiver celles qui ne vous intéressent pas.

## Recommandées

### phpstan/phpstan-deprecation-rules
<https://github.com/phpstan/phpstan-deprecation-rules>

Comme son nom l'indique, cette extension permet de remonter des erreurs lors des éléments dépréciés sont utilisés dans le code. Cela s'applique pour les classes, méthodes, propriétés, constantes et traits.

### phpstan/phpstan-strict-rules
<https://github.com/phpstan/phpstan-strict-rules>

Principales règles:
- requiert d'utiliser des booléens dans les opérations `if`, `elseif`, `&&` et `||`, dans les opérateurs ternaires, et après `!`
- le mode strict doit être activé lors des appels aux fonctions `in_array`, `array_search`, `array_keys` et `base64_decode`
- les variables déclarées à l'intérieur de boucles `while` et `for` ne peuvent pas être utilisées après les boucles
- utiliser une variable pour accéder à une variable ou une méthode (`$$foo`  `$this->$method()`) est prohibé 

### ergebnis/phpstan-rules
<https://github.com/ergebnis/phpstan-rules>

Principales règles:
- toutes les classes doivent être déclarées comme `final`, et l'héritage est proscrit
- interdiction d'utiliser les méthodes `isset`, `eval`, `compact`
- interdiction d'utiliser la structure `switch` 
- la suppression d'erreurs avec l'opérateur `@` est interdite
- les méthodes et les fonctions ne peuvent avoir de paramètres avec une valeur nulle par défaut, ni retourner le type null

### ekino/phpstan-banned-code
<https://github.com/ekino/phpstan-banned-code>

Principales règles:
- interdiction d'utiliser les méthodes `echo`, `die`, `exit`, `eval`, `dd`, `dump`, `exec`, `passthru`, `phpinfo`, `print`
- prohibe l'utilisation des backticks `

### symplify/phpstan-rules
<https://github.com/symplify/phpstan-rules>

Principales règles:
- les expressions de regex doivent être déclarées en constant de classes, avec un lien vers regex101.com
- les méthodes de classes renvoyant un booléens doivent être préfixées par `is` or `has`
- les classes enfants doivent respecter le suffixe de leur parent (par exemple, `Command` pour les commandes Symfony)
- pas de méthodes abstraites, ni de classes abstraites
- deux classes ne peuvent pas avoir le même nom
- les fichiers déclarés dans des chemins avec `__DIR__` doivent exister
- les propriétés de classes ne peuvent pas être nullable
- interdiction de retourner un tableau de valeurs dans une fonction
- les énumérations ne peuvent pas contenir deux fois la même valeur

### staabm/phpstan-todo-by
<https://github.com/staabm/phpstan-todo-by>

Cette extension permet de déclencher des alertes, en ajoutant un système de conditions aux TODO situés dans les commentaires:

```php
// TODO: 2023-12-14 Déclenche une erreur PHPStan à partir du 14 décembre 2023
```

Plusieurs possibilités sont disponibles, comme spécifier la version de l'app, de PHP, ou d'une librairie. 
```php
// TODO: phpunit/phpunit:5.3 Déclenche une erreur lorsque la version de phpunit mentionnée est installée
```

## Liste complète

Une liste plus complète des extensions existantes est disponible sur le site officiel de PHPStan: <https://phpstan.org/user-guide/extension-library>