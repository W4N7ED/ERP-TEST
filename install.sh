
#!/bin/bash

# Script d'installation pour l'application de gestion d'inventaire
# Ce script va installer tous les prérequis nécessaires et déployer l'application

# Variables de configuration
APP_NAME="GestionInventaire"
APP_DIR="/var/www/html/$APP_NAME"
GITHUB_REPO="https://github.com/votre-utilisateur/votre-repo.git"
NODE_VERSION="18.x"
MYSQL_VERSION="8.0"

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
    apt install -y curl wget git build-essential apache2
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    dnf update -y
    dnf install -y curl wget git make gcc gcc-c++ httpd
    systemctl enable httpd
    systemctl start httpd
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

# Installer MySQL si l'utilisateur le souhaite
install_mysql() {
  print_message "Voulez-vous installer MySQL ? (y/n)"
  read -r install_db
  
  if [[ "$install_db" == "y" || "$install_db" == "Y" ]]; then
    print_message "Installation de MySQL $MYSQL_VERSION..."
    
    if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
      apt install -y mysql-server
      systemctl enable mysql
      systemctl start mysql
    elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
      dnf install -y mysql-server
      systemctl enable mysqld
      systemctl start mysqld
    fi
    
    print_success "MySQL installé et démarré"
    
    # Sécurisation de MySQL
    print_message "Configuration de MySQL..."
    print_message "Voulez-vous exécuter mysql_secure_installation pour sécuriser l'installation ? (y/n)"
    read -r secure_mysql
    
    if [[ "$secure_mysql" == "y" || "$secure_mysql" == "Y" ]]; then
      mysql_secure_installation
    fi
    
    # Configuration de la base de données pour l'application
    print_message "Création de la base de données et de l'utilisateur pour l'application..."
    print_message "Veuillez entrer le mot de passe root MySQL:"
    read -s mysql_root_password
    
    mysql -u root -p${mysql_root_password} -e "CREATE DATABASE IF NOT EXISTS appdb;"
    mysql -u root -p${mysql_root_password} -e "CREATE USER IF NOT EXISTS 'appuser'@'localhost' IDENTIFIED BY 'password';"
    mysql -u root -p${mysql_root_password} -e "GRANT ALL PRIVILEGES ON appdb.* TO 'appuser'@'localhost';"
    mysql -u root -p${mysql_root_password} -e "FLUSH PRIVILEGES;"
    
    print_success "MySQL configuré avec : \n - Base de données: appdb\n - Utilisateur: appuser\n - Mot de passe: password"
    print_message "N'oubliez pas de changer le mot de passe en production !"
  else
    print_message "Installation de MySQL ignorée"
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
  
  # Définir les permissions correctes pour Apache
  chown -R www-data:www-data $APP_DIR
  chmod -R 755 $APP_DIR
  
  print_success "Application installée dans $APP_DIR"
}

# Configurer Apache
configure_apache() {
  print_message "Configuration d'Apache..."
  
  # Activation du module rewrite pour le SPA routing
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    a2enmod rewrite
  fi
  
  # Créer la configuration Apache
  cat > /etc/apache2/sites-available/$APP_NAME.conf << EOF
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot $APP_DIR/dist
    
    <Directory $APP_DIR/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Journalisation des erreurs et des accès
    ErrorLog \${APACHE_LOG_DIR}/$APP_NAME-error.log
    CustomLog \${APACHE_LOG_DIR}/$APP_NAME-access.log combined
</VirtualHost>
EOF

  # Activer le site sur les distributions Debian/Ubuntu
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    a2ensite $APP_NAME.conf
    systemctl restart apache2
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    # Sur CentOS/RHEL/Fedora, les configurations sont auto-activées
    systemctl restart httpd
  fi
  
  print_success "Apache configuré pour l'application"
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
install_mysql
install_app
configure_apache

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
