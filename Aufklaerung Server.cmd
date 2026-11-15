@echo off
rem Startet die Aufklaerung als zentralen Server fuer das Praxisnetz.
rem Jeder Rechner oeffnet dann einmal  http://<dieser Rechner>:4173/?raum=zimmer-1
rem (je Zimmer ein eigener Name). Port 4173 muss in der Windows-Firewall
rem fuer private Netzwerke freigegeben sein.
cd /d "%~dp0"
title Aufklaerung Server
if not exist node_modules (
  echo Erste Einrichtung, bitte einen Moment Geduld ...
  call npm install || goto fehler
)
call npm run build || goto fehler
node server/start.mjs --netz
goto ende

:fehler
echo.
echo Start fehlgeschlagen. Bitte die Meldung oben beachten.
pause

:ende
