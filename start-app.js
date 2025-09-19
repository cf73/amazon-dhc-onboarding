#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Amazon DHC Onboarding Tool - Starting...');

// Ensure user-data directories exist
const userDataPath = path.join(__dirname, 'user-data');
const assetsPath = path.join(userDataPath, 'assets');

if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
  console.log('Created user-data directory');
}
if (!fs.existsSync(assetsPath)) {
  fs.mkdirSync(assetsPath, { recursive: true });
  console.log('Created assets directory');
}

// Check if dependencies are installed
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('Installing dependencies...');
  const { execSync } = require('child_process');
  
  // Copy the correct package.json
  const standalonePackage = path.join(__dirname, 'package-standalone.json');
  const packageJson = path.join(__dirname, 'package.json');
  
  if (fs.existsSync(standalonePackage)) {
    fs.copyFileSync(standalonePackage, packageJson);
    console.log('Updated package.json for standalone mode');
  }
  
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('Dependencies installed successfully');
  } catch (error) {
    console.error('Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

// Determine the correct electron executable path
let electronPath;
const isWindows = process.platform === 'win32';
const isMac = process.platform === 'darwin';

if (isWindows) {
  // Try different Windows electron paths
  const possiblePaths = [
    path.join(__dirname, 'node_modules', '.bin', 'electron.cmd'),
    path.join(__dirname, 'node_modules', 'electron', 'dist', 'electron.exe'),
    'electron'
  ];
  
  electronPath = possiblePaths.find(p => {
    if (p === 'electron') return true; // Will test this later
    return fs.existsSync(p);
  }) || 'electron';
} else {
  electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron');
  if (!fs.existsSync(electronPath)) {
    electronPath = 'electron';
  }
}

const appPath = path.join(__dirname, 'app-standalone.js');

console.log('Launching Amazon DHC Onboarding Tool...');
console.log('Platform:', process.platform);
console.log('Electron path:', electronPath);

// Launch the Electron app
const spawnOptions = {
  stdio: 'inherit',
  env: { ...process.env, ELECTRON_IS_DEV: '0' }
};

// Add Windows-specific options
if (isWindows) {
  spawnOptions.shell = true;
}

const child = spawn(electronPath, [appPath], spawnOptions);

child.on('error', (error) => {
  console.error('Failed to start application:', error.message);
  console.log('\nTroubleshooting:');
  console.log('1. Make sure Node.js is installed');
  console.log('2. Try running: npm install');
  console.log('3. Try running: npm start');
  process.exit(1);
});

child.on('close', (code) => {
  if (code !== 0) {
    console.log(`Application exited with code ${code}`);
  }
  process.exit(code);
});
