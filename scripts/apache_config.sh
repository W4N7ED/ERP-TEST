
#!/bin/bash

# Configurer Apache
configure_apache() {
  print_message "Configuration d'Apache..."
  
  # Activation du module rewrite pour le SPA routing
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    a2enmod rewrite
    a2enmod headers
  fi
  
  # Créer la configuration Apache
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    conf_path="/etc/apache2/sites-available/$APP_NAME.conf"
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    conf_path="/etc/httpd/conf.d/$APP_NAME.conf"
  fi
  
  cat > $conf_path << EOF
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot $APP_DIR/dist
    
    <Directory $APP_DIR/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # CORS Headers
        Header set Access-Control-Allow-Origin "*"
        Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
        Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-client-info, apikey"
        
        # Handle OPTIONS preflight requests
        RewriteEngine On
        RewriteCond %{REQUEST_METHOD} OPTIONS
        RewriteRule ^(.*)$ $1 [R=200,L]
    </Directory>
    
    # Journalisation des erreurs et des accès
    ErrorLog \${APACHE_LOG_DIR}/$APP_NAME-error.log
    CustomLog \${APACHE_LOG_DIR}/$APP_NAME-access.log combined
</VirtualHost>
EOF

  # Activer le site sur les distributions Debian/Ubuntu
  if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
    a2ensite $APP_NAME.conf
    systemctl restart apache2
  elif [[ "$ID" == "centos" || "$ID" == "rhel" || "$ID" == "fedora" ]]; then
    # Sur CentOS/RHEL/Fedora, les configurations sont auto-activées
    systemctl restart httpd
  fi
  
  print_success "Apache configuré pour l'application"
}
