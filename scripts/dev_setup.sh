
#!/bin/bash

# Configurer l'environnement de développement
setup_dev_environment() {
  print_message "Configuration de l'environnement de développement..."
  
  # Installer les dépendances de l'application
  npm install
  
  print_success "Environnement de développement configuré"
}
