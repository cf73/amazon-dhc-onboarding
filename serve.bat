@echo off
echo Starting Amazon DHC Onboarding Tool...
echo.
echo This will start a local server for full PWA functionality
echo (Service Worker, Manifest, File System Access API)
echo.
echo The app will open at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if http-server is installed globally
npx http-server --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing http-server...
    npm install -g http-server
)

echo Starting server...
start http://localhost:3000/onboarding.html
npx http-server . -p 3000 -c-1 --cors

pause

