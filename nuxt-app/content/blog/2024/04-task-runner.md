---
title: "Task runners: les alternatives à Make"
tags: [ci, dev]
createdAt: 2024-04-19
---

[Make](https://fr.wikipedia.org/wiki/Make) a longtemps été le task runner privilégié pour le développement logiciel. En effet, c'est un outil éprouvé et qui a fait ses preuves. Il est ainsi fréquent d'avoir un Makefile dans les projets Symfony pour gérer l'installation initiale, les conteneurs Docker, la base de données, les assets front, les tests, etc...

## Make et PHP

Pourtant, sa principale force n'est pas très utile pour un langage ne nécessitant pas de phase de compilation, comme PHP. Ajoutez à cela une syntaxe stricte et compliquée à prendre en main, et certains [comportements](https://github.com/casey/just?tab=readme-ov-file#what-are-the-idiosyncrasies-of-make-that-just-avoids) qui ne sont pas forcément évidents pour le néophyte, la question de savoir si d'autres outils ne seraient pas mieux adaptés peut se poser.

## Les alternatives

Des alternatives plus modernes existent, parmi lesquelles Task et Just. Ces deux outils ont notamment comme avantages:
- plus faciles à prendre en main et à configurer, avec des fichiers de configuration lisibles et une syntaxe intuitive
- facilité de passer des arguments lors de l'appel des commandes
- inclusion native des fichiers .env contenant les variables d'environnement
- disponibles sur d'autres plate-formes que Unix/Linux, comme Windows ou macOS

## Task

Créé en 2017, Task se définit comme une alternative simple et facile à utiliser à Make, et est développé en Go.


La configuration des tâches se fait en YAML via un fichier `Taskfile.yml`:
```yaml
version: '3'

tasks:  
    start:
        desc: Start Docker containers
        cmds:
            - docker-compose up -d

    composer:
        desc: Install Composer
        cmds:
            - composer install
        sources:
            - composer.lock
        generates:
            - vendor/**/*
```

La commande `task --list-all` permet de lister les tâches disponible:
![Task list all](/images/content/task-list-all.png)

La syntaxe pour lancer les tâches est la suivante:
```sh
task install
```

Repository Github: <https://github.com/go-task/task>

## Just

Just se veut une manière pratique de lancer des commandes, à la syntaxe proche de Makefile tout en apportant son lot d'améliorations.

![Task list all](/images/content/just.png)

Repository Github: <https://github.com/casey/just>

## Castor, basé sur Symfony

Un dernier task runner méritant d'être mentionné: il s'agit de Castor, qui est développé depuis 2023 par JoliCode, en PHP et basé sur des composants Symfony. Pratique si vous êtes développeur PHP. La réfléxion ayant menée à la création de cet outil est expliquée ici <https://jolicode.com/blog/castor-a-journey-across-the-sea-of-task-runners>.

Repository Github: <https://github.com/jolicode/castor>

## En conclusion

Expérimentant Task depuis quelques mois, je trouve que c'est un outil qui permet assez vite d'arriver à ses fins et en suis assez satisfait. Si vous êtes allergiques au YAML ou amoureux de la syntaxe des Makefile, Just est également envisageable pour vous simplifier la vie.
