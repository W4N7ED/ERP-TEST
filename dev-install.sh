
#!/bin/bash

# Script d'installation pour le développement local
# Ce script va installer les dépendances nécessaires pour le développement

# Variables de configuration
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

# Vérifier le système d'exploitation
if [ ! -f /etc/os-release ]; then
  print_error "Impossible de détecter le système d'exploitation"
  exit 1
fi

source /etc/os-release
print_message "Système d'exploitation détecté : $NAME $VERSION_ID"

# Installer les dépendances selon la distribution
install_dependencies() {
  print_message "Installation des dépendances système pour le développement..."
  
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    sudo apt update -y
    sudo apt install -y curl wget git build-essential
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    sudo dnf update -y
    sudo dnf install -y curl wget git make gcc gcc-c++
  else
    print_error "Distribution non supportée: $ID"
    exit 1
  fi
  
  print_success "Dépendances système installées"
}

# Installer Node.js
install_nodejs() {
  print_message "Vérification de Node.js..."
  
  # Vérifier si Node.js est déjà installé
  if command -v node &> /dev/null; then
    node_current_version=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    
    if [ "$node_current_version" -ge "${NODE_VERSION%.*}" ]; then
      print_success "Node.js $(node -v) est déjà installé et à jour"
      return
    else
      print_message "Node.js $(node -v) est installé mais une version plus récente est requise"
    fi
  fi
  
  print_message "Installation de Node.js $NODE_VERSION..."
  
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION | sudo -E bash -
    sudo apt install -y nodejs
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    curl -fsSL https://rpm.nodesource.com/setup_$NODE_VERSION | sudo -E bash -
    sudo dnf install -y nodejs
  fi
  
  # Vérifier l'installation
  node_version=$(node -v)
  npm_version=$(npm -v)
  print_success "Node.js $node_version et npm $npm_version installés"
}

# Installer MySQL pour le développement
install_mysql_dev() {
  print_message "Voulez-vous installer MySQL pour le développement ? (y/n)"
  read -r install_mysql
  
  if [[ "$install_mysql" == "y" || "$install_mysql" == "Y" ]]; then
    if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
      sudo apt install -y mysql-server
      sudo systemctl enable mysql
      sudo systemctl start mysql
    elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
      sudo dnf install -y mysql-server
      sudo systemctl enable mysqld
      sudo systemctl start mysqld
    fi
    
    print_success "MySQL installé et démarré"
    
    # Configuration d'une base de données pour le développement
    print_message "Voulez-vous créer une base de données pour le développement ? (y/n)"
    read -r create_db
    
    if [[ "$create_db" == "y" || "$create_db" == "Y" ]]; then
      print_message "Entrez le mot de passe root MySQL (laissez vide s'il n'y en a pas):"
      read -s mysql_root_password
      
      if [ -z "$mysql_root_password" ]; then
        sudo mysql -e "CREATE DATABASE IF NOT EXISTS devdb;"
        sudo mysql -e "CREATE USER IF NOT EXISTS 'devuser'@'localhost' IDENTIFIED BY 'devpassword';"
        sudo mysql -e "GRANT ALL PRIVILEGES ON devdb.* TO 'devuser'@'localhost';"
        sudo mysql -e "FLUSH PRIVILEGES;"
      else
        sudo mysql -u root -p"$mysql_root_password" -e "CREATE DATABASE IF NOT EXISTS devdb;"
        sudo mysql -u root -p"$mysql_root_password" -e "CREATE USER IF NOT EXISTS 'devuser'@'localhost' IDENTIFIED BY 'devpassword';"
        sudo mysql -u root -p"$mysql_root_password" -e "GRANT ALL PRIVILEGES ON devdb.* TO 'devuser'@'localhost';"
        sudo mysql -u root -p"$mysql_root_password" -e "FLUSH PRIVILEGES;"
      fi
      
      print_success "Base de données de développement créée:"
      print_message "Base de données: devdb"
      print_message "Utilisateur: devuser"
      print_message "Mot de passe: devpassword"
    fi
  else
    print_message "Installation de MySQL ignorée"
  fi
}

# Configurer l'environnement de développement
setup_dev_environment() {
  print_message "Configuration de l'environnement de développement..."
  
  # Installer les dépendances de l'application
  npm install
  
  print_success "Environnement de développement configuré"
}

# Exécution principale
print_message "=== Configuration de l'environnement de développement ==="

install_dependencies
install_nodejs
install_mysql_dev
setup_dev_environment

print_success "=== Configuration terminée avec succès ==="
print_message "Pour lancer l'application en mode développement, exécutez : npm run dev"
print_message "L'application sera accessible à l'adresse : http://localhost:8080"

# Demander à l'utilisateur s'il veut lancer l'application
print_message "Voulez-vous lancer l'application maintenant ? (y/n)"
read -r run_dev

if [[ "$run_dev" == "y" || "$run_dev" == "Y" ]]; then
  npm run dev
fi
