@echo off
echo Amazon DHC Onboarding Tool - Windows Launcher
echo =============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Run the simple launcher
node launch-simple.js

if %errorlevel% neq 0 (
    echo.
    echo Application failed to start. Press any key to exit.
    pause >nul
)