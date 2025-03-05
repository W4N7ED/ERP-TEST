
@echo off
echo === Installation de l'application de gestion d'inventaire pour Windows ===

:: Vérifier si npm est installé
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
  echo ERROR: Node.js et npm ne sont pas installés.
  echo Veuillez télécharger et installer Node.js depuis https://nodejs.org/
  pause
  exit /b 1
)

:: Installation des dépendances sans les modules natifs
echo Installation des dépendances (mode navigateur uniquement)...
echo Les modules natifs seront ignorés, l'application utilisera uniquement le stockage local

:: Définir les variables d'environnement pour éviter la compilation des modules natifs
set npm_config_build_from_source=false
set npm_config_sqlite=0
set npm_config_sqlite3_binary_host_mirror=https://mapbox-node-binary.s3.amazonaws.com/
set npm_config_runtime=node
set npm_config_target=%NODE_VERSION%
set npm_config_target_arch=x64
set npm_config_nodedir=%APPDATA%\..\Roaming\npm\node_modules\node

:: Installer les dépendances
call npm install --no-optional --only=prod --ignore-scripts

echo.
echo === Installation terminée ===
echo.
echo Pour lancer l'application en mode développement, exécutez : npm run dev
echo L'application sera accessible à l'adresse : http://localhost:8080
echo.

:: Demander à l'utilisateur s'il veut lancer l'application
set /p run_dev="Voulez-vous lancer l'application maintenant ? (y/n) "
if /i "%run_dev%"=="y" (
  npm run dev
)

pause
