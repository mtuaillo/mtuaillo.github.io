---
title: Configurer un runner gitlab avec Docker
tags: [ci, gitlab, docker]
createdAt: 2024-11-22
---

Un runner GitLab est un agent essentiel dans l'automatisation du processus de développement grâce à l'intégration continue (CI) et la livraison continue (CD). En s'appuyant sur Docker, on peut créer des environnements de build reproductibles et isolés.

## Qu'est ce qu'un runner gitlab ?

**Un runner est un agent exécutant les tâches d'une pipeline CI/CD de Gitlab.** Lorsqu'un événement déclenche un pipeline (par exemple, un push sur une branche), GitLab envoie les instructions à un runner disponible. Celui-ci va alors cloner le projet, exécuter les tâches définies dans `.gitlab-ci.yml`. Les résultats sont ensuite visibles sur l'interface web de Gitlab. Cela permet d'automatiser les tâches répétitives, comme garantir la qualité du code, exécuter des tests automatisés ou encore réduire le temps de mise en production en préparant un livrable.

Il est possible d'enregistrer plusieurs runners pour un même projet (afin de pouvoir lancer des pipelines en parallèle), d'en partager entre différents projets, ou au contraire de les rendre spécifiques à un projet en particulier.

Cet article détaille:
- comment configurer et lancer un runner sur un serveur, en passant par docker
- comment configurer le runner et la pipeline afin de permettre de construire une image à partir d'un fichier Dockerfile
- et enfin comment utiliser cette image pour exécuter les différentes étapes de la pipeline 

## Prérequis

Avant de démarrer, il est nécessaire d'installer Docker sur le serveur. La documentation officielle est très complète et donne la marche à suivre pour de nombreux OS: https://docs.docker.com/engine/install/.

Un accès à la rubrique CI/CD du serveur Gitlab est également requis.

## Créer le fichier de configuration

La première étape va consister à générer un fichier de configuration pour le runner [^1]. Ces informations vont notamment permettre au runner de savoir sur quel serveur Gitlab se connecter, et comment exécuter les tâches.

```shell
docker run --rm -it -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register
```

Cette commande est interactive et va permettre de saisir les principales informations (nom, serveur, token, mode d'exécution, ...). Le token est spécifique au projet et est disponible dans l'interface Gitlab, sous la rubrique Settings > CI / CD

Les données saisies seront ensuite stockées dans le fichier `/srv/gitlab-runner/config` sur le serveur hôte.

A noter qu'il est possible de lancer plusieurs fois cette commande, pour créer plusieurs runners dans le même fichier de configuration.


## Adapter le runner

Le fichier de configuration est au format [TOML](https://fr.wikipedia.org/wiki/TOML), il est donc possible de l'éditer pour l'adapter à ses besoins.

Voici un exemple:

```toml
[[runners]]
  name = "nom du runner"
  url = "url, ip ou alias du repo git"
  id = 1
  token = "token fourni par l'interface"
  token_obtained_at = 2024-11-19T11:14:12Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "docker:24.0.5"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache", "/var/run/docker.sock:/var/run/docker.sock"]
    extra_hosts = ["git-interne:192.168.1.42"]
    pull_policy = ["if-not-present"]
    shm_size = 0
    network_mtu = 0
```

Cette configuration est quasiment celle de base, avec quelques points spécifiques:
- volumes: on monte le fichier `/var/run/docker.sock`, afin que le runner puisse communiquer avec le docker de l'hôte
- pull_policy: `if-not-present` permet de configurer docker afin qu'il vérifie d'abord si l'image est présente en locale avant d'essayer de la pull depuis un registry, ce qui va permettre d'utiliser une image construite en local.

## Démarrer le conteneur

Une fois la configuration terminée, on peut démarrer le conteneur du runner avec cette commande:

```shell
docker run --detach
	--name gitlab-runner
	--restart always
	--volume /srv/gitlab-runner/config:/etc/gitlab-runner
	--volume /var/run/docker.sock:/var/run/docker.sock
	gitlab/gitlab-runner:latest
```

A ce stade, il doit donc apparaître dans l'interface Gitlab.

## Modifications ultérieures

Pour prendre en compte d'éventuelles modifications au fichier de configuration après le démarrage du conteneur, il sera nécessaire de le redémarrer:

```shell
docker restart gitlab-runner
```

## Utiliser un Dockerfile pour exécuter les tâches de la CI

Cette méthode est pratique, particulièrement quand on ne dispose pas d'un registry Docker privé sous la main. L'idée est de construire une image à partir d'un fichier Dockerfile dès la première étape (stage) de la CI, ce qui permettra ensuite d'utiliser cette image pour les étapes suivantes. Seule la première pipeline construira cette image, Docker la mettant en cache pour les exécutions suivantes.

Pour utiliser docker dans un conteneur, docker [^2] & gitlab [^3] déconseillent de faire du DinD (Docker in Docker) et recommande plutôt d'utiliser la méthode du `socket binding`, et cette solution est la combinaison de trois points:
- partager le docker.sock en volume 
- utiliser une image docker dans le premier stage pour construire une image à partir d'un Dockerfile
- régler la pull policy du runner à `if-not-present`, afin de pouvoir accéder à l'image qui vient d'être générée

Voici le fichier `.gitlab-ci.yml` qui permet de construire:

```yml
default:
  image: service/app:latest

stages:
- docker
- tests

docker:
  image: docker:24.0.5
  stage: docker
  script:
    - cd docker/php
    - docker build -t service/app .

tests:
  script:
    - vendor/bin/phpunit
```

Les étapes (stages) exécutées après la première seront ainsi tous exécutés dans l'image définie par défaut pour la pipeline, soit `service/app`, que l'on construit à l'étape `docker`.

[^1]: Doc gitlab https://docs.gitlab.com/runner/install/docker.html
[^2]: N'utilisez pas Docker in Docker (dind) pour une CI: https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/
[^3]: https://docs.gitlab.com/ee/ci/docker/using_docker_build.html#use-the-docker-executor-with-docker-socket-binding
