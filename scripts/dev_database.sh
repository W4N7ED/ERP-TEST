
#!/bin/bash

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
