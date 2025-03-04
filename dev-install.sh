
#!/bin/bash

# Script d'installation pour le développement local
# Ce script va installer les dépendances nécessaires pour le développement

# Variables de configuration
NODE_VERSION="18.x"

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
