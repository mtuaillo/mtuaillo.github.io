---
title: Configurer Apache et PHP-FPM sous Rocky Linux
tags: [apache, linux, rockylinux, php, php-fpm]
createdAt: 2025-04-25
---

Rocky Linux est le successeur de CentOS, créé suite à l'abandon de cette distribution, annoncé par Redhat en décembre 2020. C'est une alternative intéressante pour l'hébergement d'applications:
- stabilité : absence de changements brusques de fonctionnalités susceptibles de perturber les systèmes de production
- support à long terme : cycles de support de 10 ans
- communauté active : soutenu par des professionnels de l'infrastructure IT

### Alternatives

D'autres distributions peuvent également être considérées pour cet usage:
- AlmaLinux : concurrent direct de Rocky Linux
- Debian : distribution communautaire, très stable
- Ubuntu Server : approche moderne avec mises à jour fréquentes, basée sur Debian

## PHP-FPM (FastCGI Process Manager)

PHP-FPM est un gestionnaire de processus FastCGI amélioré pour PHP, conçu pour gérer efficacement les applications web PHP dans les environnements de production.

Ces principaux avantages :
- performance améliorée grâce à la gestion de pools de processus
- isolation et sécurité entre les différentes applications
- redémarrage gracieux sans interruption de service

## Apache


Avant de démarrer l'installation, si vous avez déjà utilisé Apache sous Debian et Ubuntu, sachez qu'il existe quelque différences avec la version pour les distributions de la famille RedHat.

### Différences principales entre Apache sur Debian/Ubuntu Server et RHEL/Rocky Linux

|        | Debian/Ubuntu | RHEL/Rocky Linux |
|--------|---------------|---------------------------|
| Nom du service | `apache2` | `httpd` |
| Répertoire principal | `/etc/apache2/` | `/etc/httpd/` |
| Structure des configurations | Plus modulaire avec plusieurs sous-répertoires | Plus simple avec moins de sous-répertoires |
| Activation des sites | Système `a2ensite`/`a2dissite` | Pas d'équivalent direct |
| Activation des modules | Système `a2enmod`/`a2dismod` | Pas d'équivalent direct |
| Certificats SSL par défaut | `/etc/ssl/certs/` et `/etc/ssl/private/` | `/etc/pki/tls/certs/` et `/etc/pki/tls/private/` |
| Fichier de configuration principal | `apache2.conf` | `httpd.conf` |
| Gestion des modules | Fichiers séparés `.load` et `.conf` dans `mods-available` | Modules généralement dans `/etc/httpd/conf.modules.d/` |
| Utilisateur par défaut | `www-data` | `apache` |


### Structure

```
/etc/httpd/
├── conf/
│   └── httpd.conf        # Fichier de configuration principal
├── conf.d/               # Configurations supplémentaires chargées automatiquement
│   ├── ssl.conf          # Configuration SSL globale (avec VirtualHost par défaut)
│   ├── autoindex.conf    # Configuration pour l'indexation automatique
│   ├── userdir.conf      # Configuration pour les répertoires utilisateurs
│   └── app.conf          # Votre VirtualHost HTTPS personnalisé
├── conf.modules.d/       # Configuration des modules chargés
│   ├── 00-base.conf
│   ├── 00-ssl.conf       # Chargement du module SSL
│   └── ...
├── logs/ -> /var/log/httpd/               # Lien symbolique vers les logs
├── modules/ -> /usr/lib64/httpd/modules/  # Lien symbolique vers les modules compilés
└── run/ -> /run/httpd/                    # Lien symbolique vers les fichiers d'exécution
```


## Installation

### Mise à jour du système

```bash
sudo dnf update -y
```

### Installation d'Apache

```bash
# httpd est le nom du paquet Apache sur les distributions Red Hat,
# contrairement aux distributions Debian où il est nommé apache2
sudo dnf install httpd mod_ssl -y

# démarrage du service Apache
sudo systemctl start httpd
# configuration pour qu'il soit lancé automatiquement avec le démarrage du système
sudo systemctl enable httpd
```

### Configuration du fireawall

```bash
# Ouverture des ports HTTP et HTTPS
# L'option --permanent permet de conserver la configuration entre les redémarrages
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### PHP

```bash
# Installation des dépôts Remi
sudo dnf install -y https://rpms.remirepo.net/enterprise/remi-release-9.rpm

# Reset du module PHP (pour éviter des conflits)
sudo dnf module reset php

# Activation du module PHP 8.4 de Remi
sudo dnf module enable php:remi-8.4

# Installation des extensions PHP
sudo dnf install -y \
    # Base
    php84-php-common \       # Extensions communes
    php84-php-cli \          # Interface en ligne de commande PHP
    # Production
    php84-php-fpm \          # FastCGI Process Manager
    php84-php-opcache \      # Optimisation des performances
    # Selon les besoins de l'application
    php84-php-dom \          # Manipulation de documents XML/HTML
    php84-php-pdo_pgsql \    # Support PostgreSQL
    php84-php-xml \          # Support XML
    php84-php-intl \         # Fonctions internationales
    php84-php-mbstring \     # Support des chaînes multi-octets
    php84-php-zip            # Gestion des archives ZIP
```

Pourquoi utiliser les dépôts Remi ? Parce que les dépôts officiels de Rocky Linux sont assez conservateurs en termes de versions de logiciels : actuellement, il ne contient que la version 8.2. Remi permet d'avoir des versions plus récentes, telle que la 8.4.

#### Configuration PHP

Toutes les modifications apportées à la configuration PHP (située habituellement dans le php.ini) sont ici centralisées dans un nouveau fichier, afin de pouvoir ensuite les retrouver, les déplacer ou les migrer facilement.

Ce fichier est `/etc/opt/remi/php84/php.d/production.ini` :
```ini
; Gestion des erreurs
error_reporting = E_ALL & ~E_DEPRECATED & ~E_STRICT
display_errors = Off
log_errors = On
error_log = /var/log/php/errors.log

; Performances
opcache.enable = 1

; Timezone
date.timezone = Europe/Paris
```

### PHP-FPM

Une fois PHP configuré, on peut ensuite activer et démarrer le service PHP-FPM:

```bash
sudo systemctl start php84-php-fpm
sudo systemctl enable php84-php-fpm
```

### VirtualHost & HTTPS

Un certificat auto-signé généré est pratique mais uniquement destiné au développement. En production, préférez Let's Encrypt, un certificat commercial ou émis par votre organisation.

```bash
# Génération d'un certificat SSL auto-signé
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/pki/tls/private/httpd-app-selfsigned.key \
    -out /etc/pki/tls/certs/httpd-app-selfsigned.crt \
    -subj "/C=FR/ST=Region/L=Ville/O=Organisation/CN=localhost"
```

On peut alors configurer un `virtual host` pour l'application. Cette configuration se place dans `/etc/httpd/conf.d/00-app.conf` :

```apache
<VirtualHost _default_:80>
  ServerName localhost
  Redirect permanent / https://localhost
</VirtualHost>

<VirtualHost *:443>
    ServerName localhost
    DocumentRoot /var/www/html

    SSLEngine on
    SSLCertificateFile /etc/pki/tls/certs/httpd-app-selfsigned.crt
    SSLCertificateKeyFile /etc/pki/tls/private/httpd-app-selfsigned.key

    <Directory /var/www/html>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

Redémarrez Apache pour appliquer ces modifications :
```bash
sudo systemctl restart httpd
```

### Nettoyage & sécurisation basique

Pour terminer, on peut désactiver la configuration Apache non nécessaire, comme la page d'accueil par défaut et la possibilité de naviguer dans les répertoires :

```bash
remove rm -f /etc/httpd/conf.d/{autoindex.conf,userdir.conf,welcome.conf}
```

On peut également ajouter un fichier de configuration global, qui s'appliquera à tous les virtual hosts:

Par exemple, créer un fichier `/etc/httpd/conf.d/security.conf` :

```apache
# Désactive l'affichage des informations système
ServerSignature Off
ServerTokens Prod
```

## Debug

Cette commande permet d'afficher la liste des virtual hosts actuellement configurés sur le serveur :

```bash
httpd -t -D DUMP_VHOSTS
```

## Logs

Ces deux commandes permettent ensuite d'accéder aux logs des services Apache & PHP FPM :

```bash
# Logs Apache
sudo journalctl -u httpd

# Logs PHP-FPM
sudo journalctl -u php84-php-fpm
```

## Voir aussi

Un exemple de la mise en place d'Apache & PHP-FPM sur Debian via Docker est disponible ici:
- https://github.com/mtuaillo/formation-symfony-debutant/tree/master/docker/debian-apache2


## Ressources

- Documentation Rocky Linux : https://docs.rockylinux.org
- Configuration SSL d'Apache dans Rocky Linux : https://docs.rockylinux.org/guides/web/mod_SSL_apache/
- Documentation Apache : https://httpd.apache.org
- Documentation PHP : https://www.php.net/docs
- Remi's RPM Repository : https://blog.remirepo.net/
