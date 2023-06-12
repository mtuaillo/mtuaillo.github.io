---
title: Quelle librairie PHP utiliser pour créer des fichiers Excel ?
tags: [php, excel]
createdAt: 2023-06-12
---


L'exportation de données vers des fichiers Excel est encore une tâche très courante dans le développement. En effet, il n'est pas rare que les utilisateurs veuillent utiliser ce format afin de pouvoir extraire des données pour les manipuler dans un tableur, les transmettre, ou encore les utiliser pour générer des graphiques.

Il existe plusieurs librairies PHP permettant de créer des fichiers XLSX à la volée, chacune offrant différentes fonctionnalités et ayant ses forces et ses faiblesses. Coup d'oeil sur les 2 plus utilisées actuellement, à savoir PhpSpreadsheet et openspout.

## PHPOffice/PhpSpreadsheet (anciennement PHPOffice/PHPExcel) :

PHPExcel était une librairie PHP populaire pour la manipulation de fichiers Excel. Cependant, son développement a été abandonné et la librairie a été remplacée par PhpSpreadsheet, qui est une version améliorée et maintenue activement.

Forces :
- gestion des fonctionnalités avancées (formules, graphiques)
- bonne documentation
- compatibilité avec les anciennes versions de PHP (7.4, 8.0 et suivantes pour la dernière version)

Faiblesses :
- très lent et grosse consommation mémoire lors de la manipulation de fichiers Excel volumineux
- beaucoup de dépendances à d'autres librairies PHP, ce qui peut compliquer l'installation (conflits de version)

Github: [https://github.com/PHPOffice/PhpSpreadsheet]()

Packagist: [https://packagist.org/packages/phpoffice/phpspreadsheet]()

## openspout/openspout (anciemment box/spout)

box/spout a été initialement créée en 2013. La librairie a gagné en popularité grâce à sa simplicité d'utilisation et à ses performances élevées. Son développement a été arrêté, et une petite équipe de développeurs a repris le flambeau afin de forker le projet et de le maintenir.

Forces :
- performances: consommation mémoire légère et temps d'exécution assez court. openspout est donc capable de traiter de gros volumes de données
- peu de dépendances
- syntaxe simple et claire

Faiblesses :
- pas de gestion des fonctionnalités avancées (formules, graphiques)
- support des versions de PHP limité (8.1 et suivantes pour la version actuelle)

Github: [https://github.com/openspout/openspout]()

Packagist: [https://packagist.org/packages/openspout/openspout]()

## Conclusion

Le choix entre ces deux librairies va donc principalement dépendre de vos cas d'utilisation: 
- si vous avez un besoin spécifique (génération de graphiques ou utilisation de formules dans les fichiers Excel par exemple), PhpSpreadsheet vous permettra de répondre à ces problématiques
- si ce n'est pas le cas, openspout est une alternative plus performante et qui supportera mieux la montée en charge et de gros volumes de données
