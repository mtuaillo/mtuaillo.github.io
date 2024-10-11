---
title: Connexion LDAP sécurisée avec PHP
tags: [php, ldap]
createdAt: 2024-09-23
---

LDAP (Lightweight Directory Access Protocol) est un protocole standardisé largement utilisé dans les grandes entreprises pour gérer les informations sur les employés. Lors de la mise en place d'applications métiers internes, il est fréquent d'utiliser cette solution pour gérer l'authentification des utilisateurs.

## Prérequis

### Extension PHP

Pour pouvoir utiliser les fonctionnalités LDAP en PHP, il est tout d'abord nécessaire d'installer l'extension `php-ldap` via le gestionnaire de paquets
du système (ici APT):

```shell
sudo apt-get install php-ldap
```

L'installation ajoutera également les librairies [OpenLDAP](https://www.openldap.org/) [1] dans le système. [^1]. Pour plus d'informations sur l'extension et les fonctionnalités qu'elle apporte, consulter https://www.php.net/manual/en/book.ldap.php.

### Certificat

Un certificat (CA pour `Certificate Authentication`) est un fichier nécessaire afin de chiffrer la connexion au serveur. Il est en général disponible auprès du service gérant le serveur LDAP.

Ce fichier doit ensuite être placé côté client, généralement dans le répertoire `/etc/openldap/certs/`. Dans cet exemple le chemin complet sera `/etc/openldap/certs/AC.crt`.

## starttls ou LDAPS

Il existe deux manières différentes de se connecter à un serveur avec une connexion chiffrée:

**LDAPS (LDAP over SSL)** :
- développé dans les années 1990 comme une extension sécurisée du protocole LDAP [^2]
- utilise un port dédié (636 par défaut) pour les connexions sécurisées [^3]
- la connexion est chiffrée dès le début de la session

**StartTLS** :
- introduit plus tard comme une alternative plus flexible à LDAPS
- utilise le port standard LDAP (389) et permet de passer à une connexion sécurisée sur demande
- la connexion commence en clair, puis est sécurisée via une commande StartTLS


**Principales différences** :
- flexibilité : StartTLS est plus flexible car il permet de basculer entre connexions sécurisées et non sécurisées sur le même port
- compatibilité : LDAPS peut poser des problèmes avec certains pare-feu ou équilibreurs de charge, tandis que StartTLS est généralement plus compatible
- sécurité initiale : LDAPS offre une sécurité immédiate dès le début de la connexion, alors que StartTLS a une brève période non chiffrée

Aujourd'hui, StartTLS est souvent recommandé pour sa flexibilité et sa facilité d'implémentation, mais les deux méthodes restent largement utilisées selon les besoins spécifiques des organisations.

## starttls

Voyons désormais comment configurer starttls côté PHP.

Il va être possible de configurer la connexion au serveur LDAP de 2 façons:
- soit au niveau système, en modifiant le fichier de configuration OpenLDAP
- soit dans le script PHP, en utilisant les méthodes `ldap_set_option()`

### Avec ldap_set_option()

Petite subtilité ici, il faut configurer les options relatives à TLS **AVANT** d'établir la connexion:

```php
// Chemin vers le fichier contenant le certificat
ldap_set_option(null, LDAP_OPT_X_TLS_CACERTFILE, '/etc/openldap/certs/AC.crt');

// Demande la vérification du certificat serveur
// @see https://www.php.net/manual/en/ldap.constants.php#constant.ldap-opt-x-tls-require-cert 
ldap_set_option(null, LDAP_OPT_X_TLS_REQUIRE_CERT, LDAP_OPT_X_TLS_DEMAND);

$connection = ldap_connect("ldap://{$host}");

// Sélection du protocole à utiliser (2 ou 3)
ldap_set_option($connection, LDAP_OPT_PROTOCOL_VERSION, 3);

// Suivi automatique des referrals retourné par le serveur, à adapter en fonction de la configuration serveur
ldap_set_option($connection, LDAP_OPT_REFERRALS, 0);

ldap_start_tls($connection);
ldap_bind($connection, $user, $password);
```

Note: en spécifiant le protocole lors de l'appel à la méthode `ldap_connect()` (ici `ldap://`), il n'est pas nécessaire de préciser le port si vous utilisez celui par défault, 389 sera utilisé automatiquement pour ldap, et 636 pour ldaps.

### Avec /etc/openldap/ldap.conf

Cette même configuration est également réalisable en modifiant le fichier `/etc/openldap/ldap.conf` [^4], qui va régir les paramètres de la connexion côté client.


```ini
TLS_REQCERT	require
TLS_CACERT	/etc/openldap/certs/AC.crt
VERSION		3
REFERRALS 	off
```

Il n'est pas nécessaire de faire les deux, et privilégier la méthode qui s'adapte le mieux à la situation.

## Références

[^1]: Dépendances du paquet `php-ldap`: https://packages.ubuntu.com/noble/php8.3-ldap
[^2]: Comparatif LDAPS et starttls: https://www.arsouyes.org/articles/2020/36_LDAPs_vs_starttls/index.fr.html
[^3]: Documentation OpenLDAP pour LDAPS et starttls: https://www.openldap.org/faq/data/cache/185.html
[^4]: Configuration OpenLDAP: https://www.openldap.org/software//man.cgi?query=ldap.conf&sektion=5&apropos=0&manpath=OpenLDAP+2.4-Release
