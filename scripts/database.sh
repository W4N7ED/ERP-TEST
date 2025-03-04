
#!/bin/bash

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
