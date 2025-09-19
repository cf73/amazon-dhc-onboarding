@echo off
echo Amazon DHC Onboarding Tool - Standalone Edition
echo ===============================================
echo.
echo This creates a SELF-CONTAINED desktop app that:
echo - Runs a local server internally (invisible to user)
echo - Handles file uploads and storage automatically
echo - Persists all data locally in user-data folder
echo - Can be distributed as a single .exe file
echo - No installation or setup required by end users
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is required for building the app
    echo Please install Node.js from https://nodejs.org/
    echo.
    echo After installation, this will create a standalone .exe
    echo that end users can run without Node.js installed.
    pause
    exit /b 1
)

REM Setup standalone package
if exist package-standalone.json (
    echo Setting up standalone app...
    copy package-standalone.json package.json
)

REM Create user-data directory if it doesn't exist
if not exist user-data mkdir user-data
if not exist user-data\assets mkdir user-data\assets

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

REM Start the standalone app
echo.
echo Starting standalone app...
echo The app runs a local server internally but appears as a desktop app.
echo.
npm start

pause


