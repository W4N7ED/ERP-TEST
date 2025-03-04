
#!/bin/bash

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
