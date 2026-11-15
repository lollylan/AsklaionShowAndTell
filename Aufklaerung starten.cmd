@echo off
rem Doppelklick startet die Aufklaerung und oeffnet die Steuerung im Browser.
cd /d "%~dp0"
title Aufklaerung
if not exist node_modules (
  echo Erste Einrichtung, bitte einen Moment Geduld ...
  call npm install || goto fehler
)
call npm run build || goto fehler
node server/start.mjs --oeffnen
goto ende

:fehler
echo.
echo Start fehlgeschlagen. Bitte die Meldung oben beachten.
pause

:ende
