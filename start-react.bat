@echo off
echo Amazon DHC Onboarding Tool - React Edition
echo ==========================================
echo.
echo This will start the React + Electron app with:
echo - Modern React components
echo - Drag & drop functionality  
echo - Rich interactions
echo - Better state management
echo - Enhanced UI/UX
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Copy the React package.json
if exist package-react.json (
    echo Setting up React dependencies...
    copy package-react.json package.json
)

REM Copy the React Tailwind config
if exist tailwind-react.config.js (
    copy tailwind-react.config.js tailwind.config.js
)

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

REM Build CSS
echo Building Tailwind CSS...
npx tailwindcss -c tailwind.config.js -i ./src/styles/tailwind.css -o ./src/styles/compiled.css

REM Start the React app
echo Starting React + Electron app...
npm run dev

pause






