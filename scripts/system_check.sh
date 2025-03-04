
#!/bin/bash

# Fonctions de vérification du système

# Vérifier si l'utilisateur est root
check_root() {
  if [ "$EUID" -ne 0 ]; then
    print_error "Ce script doit être exécuté en tant que root (utilisez sudo)"
    exit 1
  fi
}

# Vérifier le système d'exploitation
check_os() {
  if [ ! -f /etc/os-release ]; then
    print_error "Impossible de détecter le système d'exploitation"
    exit 1
  fi

  source /etc/os-release
  print_message "Système d'exploitation détecté : $NAME $VERSION_ID"
  
  if [[ "$ID" != "ubuntu" && "$ID" != "debian" && "$ID" != "centos" && "$ID" != "rhel" && "$ID" != "fedora" ]]; then
    print_error "Distribution non supportée: $ID"
    exit 1
  fi
}
