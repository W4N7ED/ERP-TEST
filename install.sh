
#!/bin/bash

# Script d'installation pour l'application de gestion d'inventaire
# Ce script va installer tous les prérequis nécessaires et déployer l'application

source "$(dirname "$0")/scripts/config.sh"
source "$(dirname "$0")/scripts/utils.sh"
source "$(dirname "$0")/scripts/system_check.sh"
source "$(dirname "$0")/scripts/dependencies.sh"
source "$(dirname "$0")/scripts/app_install.sh"
source "$(dirname "$0")/scripts/apache_config.sh"

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

# Vérification du système
check_root
check_os

# Exécuter les étapes d'installation
install_dependencies
install_nodejs
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
