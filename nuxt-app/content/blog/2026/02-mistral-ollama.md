---
title: Configurer Mistral Vibe pour utiliser un modèle d'IA en local avec Ollama
tags: [ia, ollama, mistral]
createdAt: 2026-02-25
---

L'hébergement local d'un modèle LLM présente plusieurs intérêts par rapport à l'utilisation d'un service en ligne:
- confidentialité : votre code et vos données restent sur votre infrastructure
- coût : pas de facturation par token, utilisation illimitée
- personnalisation : contrôle total sur les paramètres et le fine-tuning
- disponibilité : pas de dépendance à une connexion internet ou à un service tiers

## Pourquoi Ollama ?

[Ollama](https://ollama.com/) est un serveur local qui héberge et exécute des modèles LLM, et fournit une API compatible OpenAI.
Il se distingue par sa rapidité de mise en place:
- installation en une commande
- gestion automatique des dépendances (ROCm, CUDA)
- API compatible OpenAI disponible
- support GPU transparent
- pas de configuration complexe de conteneurs ou d'environnements

## Pourquoi Mistral Vibe ?

Mistral Vibe est un agent CLI de codage qui utilise un LLM pour comprendre votre projet, manipuler des fichiers, exécuter des commandes.
Il permet simplement de :
- configurer un fournisseur cloud ou local
- créer des agents personnalisés
- définir des skills réutilisables
- fournir des outils à LLM pour l'exploration et l'édition de fichiers
- configurer des serveurs MCP


## Architecture

Ces deux outils vont nous permettre de mettre en place un mode client-serveur au travers de l'API OpenAI, dont la spécification est disponible ici: https://developers.openai.com/api/reference/overview/. Ollama fera office de serveur sur une machine dédiée et équipée d'un matériel adéquat à l'exploitation d'un modèle (gpu, ram). Mistral Vibe sera lui exécuté sur le poste de travail du développeur.

## Installation d'Ollama sur un serveur (Fedora)

Dans l'exemple qui suit, Ollama sera installé sur un serveur distant (ici sous Fedora).

### Ollama

```bash
# Installer Ollama
curl -fsSL https://ollama.com/install.sh | sh
# Vérifier que le service tourne
systemctl status ollama
```

### Téléchargement d'un modèle

```bash
ollama pull devstral-small-2
```

### Configuration pour l'accès distant

Créer le fichier de configuration `override.conf`:
```bash
sudo mkdir -p /etc/systemd/system/ollama.service.d/
sudo nano /etc/systemd/system/ollama.service.d/override.conf
```

Ce fichier permet de renseigner des variables d'environnement pour le service, il y est notamment possible de configurer la taille du contexte ou le niveau de log:
```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_CONTEXT_LENGTH=48000"
Environment="OLLAMA_DEBUG=1"
Environment="HSA_OVERRIDE_GFX_VERSION=10.3.0"
```

Note : La variable `HSA_OVERRIDE_GFX_VERSION=10.3.0` permet de supporter certains GPU AMD anciens (ici, l'architecture gfx1031), non officiellement supportés par ROCm.

### Redémarrage du service

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

### Configuration du firewall

```bash
sudo firewall-cmd --permanent --add-port=11434/tcp
sudo firewall-cmd --reload
```


## Installation et configuration Mistral Vibe sur le poste de travail

### Mistral Vibe

```bash
# Installation rapide (recommandée)
curl -LsSf https://mistral.ai/vibe/install.sh | bash
```

Premier lancement :
```bash
vibe
```

Vibe va créer un fichier de configuration `~/.vibe/config.toml` et demander une clé API Mistral (on peut passer cette étape pour configurer directement Ollama).

### Configuration pour Ollama distant

Éditer le fichier de configuration :
```bash
nano ~/.vibe/config.toml
```

Ajouter les sections suivantes pour définir Ollama en tant que provider, ainsi que le modèle que l'on vient de télécharger sur le serveur:

```toml
# Modèle actif
active_model = "ollama-devstral-small-2"

# Définir le provider Ollama
[[providers]]
name = "ollama"
api_base = "http://IP_FEDORA:11434/v1"
# Laisser vide, pas besoin de clé d'API pour Ollama local
api_key_env_var = ""
api_style = "openai"
backend = "generic"

# Définir le modèle
[[models]]
name = "devstral-small-2"
provider = "ollama"
alias = "ollama-devstral-small-2"
temperature = 0.2
input_price = 0.0
output_price = 0.0
```

### Utilisation de Mistral Vibe

Lancer Vibe depuis le dossier du projet :
```bash
cd /chemin/vers/projet
vibe
```

Il est ensuite possible de sélectionner le modèle avec la commande `/model`.

---

## Dépannage

### journalctl

Il est possible de consulter les logs d'Ollama avec cette commande:
```bash
journalctl -u ollama -f
```

Le niveau de log est configurable avec la variable d'environnement `OLLAMA_DEBUG`.

## Conclusion

Cette configuration permet de bénéficier d'un assistant de codage puissant tout en gardant le contrôle sur vos données. Le couple Ollama + Mistral Vibe offre une alternative intéressante aux solutions cloud pour le développement quotidien, avec l'avantage de l'utilisation illimitée et de la personnalisation complète.
