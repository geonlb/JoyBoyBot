@echo off
echo Lancement de JoyBoyBot...
start cmd /k "cd /d C:\Users\sdeni\Documents\JoyBoyBot && node index.js"
timeout /t 2
echo Lancement du serveur web...
start cmd /k "cd /d C:\Users\sdeni\Documents\JoyBoyBot && node serveur.js"
timeout /t 2
echo Lancement de ngrok...
start cmd /k "ngrok http 3000"
echo Tout est lance ! N oublie pas de copier le lien ngrok sur Discord !
pause