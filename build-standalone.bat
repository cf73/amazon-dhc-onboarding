@echo off
echo Amazon DHC Onboarding Tool - Build Standalone Executable
echo ========================================================
echo.
echo This will create a distributable .exe file that users can
echo run on any Windows computer without installing anything.
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is required for building
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Setup standalone package
if exist package-standalone.json (
    echo Setting up build configuration...
    copy package-standalone.json package.json
)

REM Install dependencies if needed
if not exist node_modules (
    echo Installing build dependencies...
    npm install
)

REM Create user-data directory structure
if not exist user-data mkdir user-data
if not exist user-data\assets mkdir user-data\assets

REM Build the executable
echo.
echo Building standalone executable...
echo This may take a few minutes...
echo.
npm run dist-win

echo.
echo ========================================================
echo BUILD COMPLETE!
echo.
echo The standalone executable has been created in:
echo   dist-standalone\
echo.
echo You can now distribute the .exe file to users.
echo They can run it on any Windows computer without
echo installing Node.js, Electron, or any other dependencies.
echo.
echo The app will:
echo - Create its own user-data folder for persistence
echo - Handle image uploads and storage automatically  
echo - Export PDFs and HTML files
echo - Work completely offline
echo ========================================================
echo.
pause


