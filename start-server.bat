@echo off
echo Amazon DHC Onboarding Tool - Web Server Mode
echo ============================================
echo.
echo This starts a lightweight Node.js web server instead of Electron
echo - No GPU issues
echo - Faster startup
echo - Runs in your browser
echo - All features work the same
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

REM Check if dependencies are installed
if not exist node_modules\express (
    echo Installing server dependencies...
    npm install express multer
)

echo Building CSS...
npx tailwindcss -i ./styles-tailwind.css -o ./styles-compiled.css

echo Starting web server...
node server.js

pause





