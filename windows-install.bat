
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
set npm_config_runtime=electron
set npm_config_target=87
set npm_config_target_arch=x64

:: Installer les dépendances en ignorant complètement better-sqlite3 et autres modules natifs
call npm install --omit=optional --no-optional --ignore-scripts

echo.
echo === Installation terminée ===
echo.
echo Pour lancer l'application en mode développement, exécutez : npm run dev
echo L'application sera accessible à l'adresse : http://localhost:8080
echo.
echo NOTE: L'application fonctionne en mode navigateur sans modules natifs.
echo Les données seront stockées localement dans le navigateur.
echo Pour une installation complète avec support de base de données native,
echo veuillez installer Visual Studio avec le workload "Desktop development with C++".

:: Demander à l'utilisateur s'il veut lancer l'application
set /p run_dev="Voulez-vous lancer l'application maintenant ? (y/n) "
if /i "%run_dev%"=="y" (
  npm run dev
)

pause
