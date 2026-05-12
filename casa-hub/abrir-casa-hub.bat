@echo off
setlocal
cd /d "%~dp0"
start "Casa Hub Server" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0local-server.ps1"
timeout /t 2 /nobreak >nul
start http://127.0.0.1:4173
endlocal
