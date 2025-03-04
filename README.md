
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
- Une base de données (MySQL recommandé, PostgreSQL ou SQLite supportés)
- Serveur Linux (Ubuntu, Debian, CentOS, RHEL, Fedora)
- Serveur Apache

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

Le script va automatiquement:
1. Installer les dépendances nécessaires
2. Installer Node.js
3. Installer et configurer MySQL (optionnel)
4. Cloner l'application depuis le dépôt
5. Configurer Apache pour servir l'application

### Méthode 2 : Installation pour développement

```bash
# Télécharger le script d'installation pour développement
wget -O dev-install.sh https://raw.githubusercontent.com/votre-utilisateur/votre-repo/main/dev-install.sh

# Rendre le script exécutable
chmod +x dev-install.sh

# Exécuter le script
./dev-install.sh
```

### Méthode 3 : Installation manuelle

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

- MySQL (recommandé)
- PostgreSQL
- SQLite
- Base de données simulée (pour test uniquement)

Vous pouvez configurer votre base de données directement depuis l'interface de l'application lors de la première exécution.

## Déploiement avec Apache

Pour déployer l'application avec Apache, utilisez la configuration suivante :

```apache
<VirtualHost *:80>
    ServerName votre-domaine.com
    DocumentRoot /var/www/html/GestionInventaire/dist
    
    <Directory /var/www/html/GestionInventaire/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/gestioninventaire-error.log
    CustomLog ${APACHE_LOG_DIR}/gestioninventaire-access.log combined
</VirtualHost>
```

Assurez-vous que le module rewrite est activé :
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

## Sécurité

Pour une utilisation en production, veillez à :

1. Configurer un pare-feu
2. Mettre en place HTTPS avec Let's Encrypt
3. Changer les mots de passe par défaut
4. Restreindre les accès à la base de données

## Licence

Cette application est distribuée sous licence MIT.

```
