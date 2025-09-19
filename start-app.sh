#!/bin/bash

echo "Amazon DHC Onboarding Tool - macOS/Linux Launcher"
echo "================================================="
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    echo
    read -p "Press any key to exit..."
    exit 1
fi

# Make the launcher executable
chmod +x launch-simple.js

# Run the simple launcher
node launch-simple.js

if [ $? -ne 0 ]; then
    echo
    echo "Application failed to start. Press any key to exit."
    read -n 1
fi
