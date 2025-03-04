
#!/bin/bash

# Script d'installation pour le développement local
# Ce script va installer les dépendances nécessaires pour le développement

source "$(dirname "$0")/scripts/config.sh"
source "$(dirname "$0")/scripts/utils.sh" 
source "$(dirname "$0")/scripts/system_check.sh"
source "$(dirname "$0")/scripts/dependencies.sh"
source "$(dirname "$0")/scripts/dev_database.sh"
source "$(dirname "$0")/scripts/dev_setup.sh"

# Exécution principale
print_message "=== Configuration de l'environnement de développement ==="

# Vérification du système - pas besoin d'être root pour le développement
check_os

# Installer les dépendances
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
