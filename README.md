
# Application de Gestion d'Inventaire

Une application de gestion d'inventaire, de projets et d'interventions conçue pour fonctionner sur les systèmes Linux.

## Fonctionnalités

- Gestion d'inventaire
- Gestion des projets
- Suivi des interventions
- Gestion des clients et fournisseurs
- Création de devis
- Système de permissions et rôles

## Prérequis

- Node.js (v18 ou supérieure)
- Une base de données (PostgreSQL, MySQL ou SQLite)
- Serveur Linux (Ubuntu, Debian, CentOS, RHEL, Fedora)

## Installation rapide

### Méthode 1 : Script d'installation automatique

```bash
# Télécharger le script d'installation
wget -O install.sh https://raw.githubusercontent.com/votre-utilisateur/votre-repo/main/install.sh

# Rendre le script exécutable
chmod +x install.sh

# Exécuter le script en tant que root
sudo ./install.sh
```

### Méthode 2 : Installation manuelle

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

2. Installer les dépendances :
```bash
npm install
```

3. Démarrer l'application en mode développement :
```bash
npm run dev
```

4. Construire l'application pour la production :
```bash
npm run build
```

## Configuration de la base de données

L'application supporte les types de bases de données suivants :

- PostgreSQL (recommandé)
- MySQL
- SQLite
- Base de données simulée (pour test uniquement)

Vous pouvez configurer votre base de données directement depuis l'interface de l'application lors de la première exécution.

## Déploiement avec Nginx

Pour déployer l'application avec Nginx, utilisez la configuration suivante :

```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    
    root /chemin/vers/votre-app/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|jsx|ts|tsx)$ {
        add_header Content-Type "text/javascript" always;
    }
}
```

## Sécurité

Pour une utilisation en production, veillez à :

1. Configurer un pare-feu
2. Mettre en place HTTPS avec Let's Encrypt
3. Changer les mots de passe par défaut
4. Restreindre les accès à la base de données

## Licence

Cette application est distribuée sous licence MIT.
