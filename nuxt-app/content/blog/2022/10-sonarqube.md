---
title: SonarQube
tags: [php, symfony, ci, security]
createdAt: 2022-10-10
---

[SonarQube](https://www.sonarqube.org/) est un outil d'analyse de code. Contrairement aux autres solutions présentées ici, il s'agit plate-forme à part entière (et non d'une librairie PHP), qui se compose d'un client utilisé pour analyser le code source, et d'une interface web pour restituer les résultats.
Elle peut d'ailleurs être utilisée avec de nombreux langages de programmation, comme Java, Python, ...

![SonarQube](/images/content/sonarqube.svg)

L'analyse recouvre un spectre assez large:
- la sécurité: elle détecte les vulnérabilités et les failles de sécurité des librairies third-party utilisées dans le projet
- la maintenabilité: apparaissent ici les méthodes avec une complexité cyclomatique élevée, ou les "[codes smell](https://refactoring.guru/fr/refactoring/smells)"
- l'analyse statique: sont remontées les variables non définies, etc
- la couverture de code par les tests

On peut ainsi le voir comme un condensé de PHPStan, de [fabpot/local-php-security-checker](https://github.com/fabpot/local-php-security-checker), le tout servi par une interface qui permet d'attribuer des tags et une criticité aux problèmes, de les assigner à un développpeur, de les commenter ou de les ignorer.

![Gestion des problèmes](/images/content/sonarqube2.png)

En outre, SonarQube propose plusieurs métriques intéressantes, comme une estimation du temps nécessaire pour réduire la dette technique, l'évolution ou la résolution des problèmes au fil des commits, des notes pour chaque catégorie. Bref, on est quasiment sur un outil de gestion de projet.

### Installation & analyse locale avec Docker

On utilisera pour cela docker et la Community Edition de Sonarqube, qui est la version gratuite du produit.

Première étape, il s'agit de lancer le conteneur sonarqube:
```shell
docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 --network=host sonarqube:latest
```

Rendez-vous ensuite sur l'interface <http://localhost:9000>, qui vous proposera de créer un projet, puis de générer un jeton d'authentification. Ce jeton et la clé du projet peuvent ensuite être utilisées pour scanner les sources de votre projet:

Créez ensuite un fichier `sonar-project.properties` à la racine du projet, permettant de configurer le scanner afin qu'il puisse envoyer les résultast de l'analyse au serveur:

```ini
sonar.projectKey=perso:projet
sonar.projectName=Mon projet
sonar.host.url=http://localhost:9000
sonar.sources=./src
sonar.login=sqp_59699782e57b5ac2dcf6413d2b5cc5b31078415df
sonar.php.coverage.reportPaths=coverage.xml
```

Dernière étape, il s'agit de lancer le conteneur chargé de l'analyse du code source, le scanner:
```shell
docker run --rm  -v "$PWD:/usr/src" --network=host sonarsource/sonar-scanner-cli
```


Après l'analyse, retour sur l'interface, qui contiendra la liste des problèmes rencontrés:

![Interface SonarQube](/images/content/sonarqube1.png)


### Utilisation en déploiement continu

SonarQube propose des intégrations pour les principales solutions de Continous Integration du marché: Github, GitLab, Bitbucket, Jenkins: <https://docs.sonarqube.org/latest/analysis/ci-integration-overview/>

### Les alternatives

#### Symfony Insights

[Symfony Insight](https://insight.symfony.com/) propose le même genre d'analyses et est spécifique à Symfony, mais propose uniquement une version payante.
