
#!/bin/bash

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
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    chown -R www-data:www-data $APP_DIR
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    chown -R apache:apache $APP_DIR
  fi
  chmod -R 755 $APP_DIR
  
  print_success "Application installée dans $APP_DIR"
}
