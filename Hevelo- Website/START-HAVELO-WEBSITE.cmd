@echo off
setlocal
cd /d "%~dp0"

where npm >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is required to run this website locally.
  echo Install the LTS version from https://nodejs.org and run this file again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing website dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo The dependency installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo Starting HAVELO...
echo Keep this window open while viewing the website.
call npm start

endlocal
