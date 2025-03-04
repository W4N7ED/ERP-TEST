
#!/bin/bash

# Script d'installation pour l'application de gestion d'inventaire
# Ce script va installer tous les prérequis nécessaires et déployer l'application

# Variables de configuration
APP_NAME="GestionInventaire"
APP_DIR="/opt/$APP_NAME"
GITHUB_REPO="https://github.com/votre-utilisateur/votre-repo.git"
NODE_VERSION="18.x"
POSTGRES_VERSION="15"

# Fonction pour afficher les messages
print_message() {
  echo -e "\e[1;34m$1\e[0m"
}

print_error() {
  echo -e "\e[1;31m$1\e[0m"
}

print_success() {
  echo -e "\e[1;32m$1\e[0m"
}

# Vérifier si l'utilisateur est root
if [ "$EUID" -ne 0 ]; then
  print_error "Ce script doit être exécuté en tant que root (utilisez sudo)"
  exit 1
fi

# Vérifier le système d'exploitation
if [ ! -f /etc/os-release ]; then
  print_error "Impossible de détecter le système d'exploitation"
  exit 1
fi

source /etc/os-release
print_message "Système d'exploitation détecté : $NAME $VERSION_ID"

# Installer les dépendances selon la distribution
install_dependencies() {
  print_message "Installation des dépendances système..."
  
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    apt update -y
    apt install -y curl wget git build-essential nginx
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    dnf update -y
    dnf install -y curl wget git make gcc gcc-c++ nginx
  else
    print_error "Distribution non supportée: $ID"
    exit 1
  fi
  
  print_success "Dépendances système installées"
}

# Installer Node.js
install_nodejs() {
  print_message "Installation de Node.js $NODE_VERSION..."
  
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION | bash -
    apt install -y nodejs
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    curl -fsSL https://rpm.nodesource.com/setup_$NODE_VERSION | bash -
    dnf install -y nodejs
  fi
  
  # Vérifier l'installation
  node_version=$(node -v)
  npm_version=$(npm -v)
  print_success "Node.js $node_version et npm $npm_version installés"
}

# Installer PostgreSQL si l'utilisateur le souhaite
install_postgresql() {
  print_message "Voulez-vous installer PostgreSQL ? (y/n)"
  read -r install_pg
  
  if [[ "$install_pg" == "y" || "$install_pg" == "Y" ]]; then
    print_message "Installation de PostgreSQL $POSTGRES_VERSION..."
    
    if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
      apt install -y postgresql-$POSTGRES_VERSION postgresql-contrib
      systemctl enable postgresql
      systemctl start postgresql
    elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
      dnf install -y postgresql-server postgresql-contrib
      postgresql-setup --initdb
      systemctl enable postgresql
      systemctl start postgresql
    fi
    
    print_success "PostgreSQL installé et démarré"
    
    # Configuration de PostgreSQL
    print_message "Configuration de PostgreSQL..."
    sudo -u postgres psql -c "CREATE USER appuser WITH PASSWORD 'password';"
    sudo -u postgres psql -c "CREATE DATABASE appdb OWNER appuser;"
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;"
    
    print_success "PostgreSQL configuré avec : \n - Base de données: appdb\n - Utilisateur: appuser\n - Mot de passe: password"
    print_message "N'oubliez pas de changer le mot de passe en production !"
  else
    print_message "Installation de PostgreSQL ignorée"
  fi
}

# Cloner le dépôt et installer l'application
install_app() {
  print_message "Installation de l'application dans $APP_DIR..."
  
  # Créer le répertoire de l'application s'il n'existe pas
  mkdir -p $APP_DIR
  
  # Cloner le dépôt
  git clone $GITHUB_REPO $APP_DIR/temp
  
  # Déplacer les fichiers et supprimer le répertoire temporaire
  cp -r $APP_DIR/temp/* $APP_DIR/
  rm -rf $APP_DIR/temp
  
  # Installer les dépendances de l'application
  cd $APP_DIR
  npm install
  
  # Construire l'application
  npm run build
  
  print_success "Application installée dans $APP_DIR"
}

# Configurer Nginx
configure_nginx() {
  print_message "Configuration de Nginx..."
  
  # Créer la configuration Nginx
  cat > /etc/nginx/conf.d/$APP_NAME.conf << EOF
server {
    listen 80;
    server_name _;
    
    # Special location for Let's Encrypt certificate validation
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    # Racine du site
    root $APP_DIR/dist;
    index index.html;
    
    # Configuration des types MIME
    include /etc/nginx/mime.types;
    
    # Définir explicitement les types MIME pour JavaScript et TypeScript
    types {
        text/javascript js;
        text/javascript jsx;
        text/javascript ts;
        text/javascript tsx;
        application/json json;
    }
    
    # Route toutes les demandes à index.html pour le SPA
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Configuration explicite pour les fichiers JavaScript et TypeScript
    location ~* \.(js|jsx|ts|tsx)$ {
        add_header Content-Type "text/javascript" always;
    }
    
    # Configuration pour les fichiers JSON
    location ~* \.json$ {
        add_header Content-Type "application/json" always;
    }
    
    # Gestion des 404
    error_page 404 /index.html;
}
EOF

  # Redémarrer Nginx
  systemctl restart nginx
  
  print_success "Nginx configuré pour l'application"
}

# Exécution principale
print_message "=== Installation de l'application $APP_NAME ==="

# Demander confirmation avant de commencer
print_message "Ce script va installer l'application et ses dépendances sur votre système."
print_message "Voulez-vous continuer ? (y/n)"
read -r confirmation

if [[ "$confirmation" != "y" && "$confirmation" != "Y" ]]; then
  print_message "Installation annulée"
  exit 0
fi

# Exécuter les étapes d'installation
install_dependencies
install_nodejs
install_postgresql
install_app
configure_nginx

print_success "=== Installation terminée avec succès ==="
print_message "L'application est accessible à l'adresse : http://localhost"
print_message "Pour une configuration plus avancée, consultez la documentation."

# Demander à l'utilisateur s'il veut lancer l'application en mode développement
print_message "Voulez-vous lancer l'application en mode développement ? (y/n)"
read -r run_dev

if [[ "$run_dev" == "y" || "$run_dev" == "Y" ]]; then
  cd $APP_DIR
  npm run dev
fi
