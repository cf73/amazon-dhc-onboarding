#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Amazon DHC Onboarding Tool - Simple Launcher');
console.log('==============================================');
console.log();

// Ensure user-data directories exist
const userDataPath = path.join(__dirname, 'user-data');
const assetsPath = path.join(userDataPath, 'assets');

if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
  console.log('✓ Created user-data directory');
}
if (!fs.existsSync(assetsPath)) {
  fs.mkdirSync(assetsPath, { recursive: true });
  console.log('✓ Created assets directory');
}

// Setup package.json
const standalonePackage = path.join(__dirname, 'package-standalone.json');
const packageJson = path.join(__dirname, 'package.json');

if (fs.existsSync(standalonePackage)) {
  fs.copyFileSync(standalonePackage, packageJson);
  console.log('✓ Updated package.json for standalone mode');
}

// Check if dependencies are installed
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: __dirname });
    console.log('✓ Dependencies installed successfully');
  } catch (error) {
    console.error('✗ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

console.log();
console.log('Starting Amazon DHC Onboarding Tool...');
console.log('Platform:', process.platform);

// Use npm to run electron (this handles all the path issues)
try {
  const child = spawn('npm', ['run', 'electron'], {
    stdio: 'inherit',
    cwd: __dirname,
    shell: true,
    env: { ...process.env, ELECTRON_IS_DEV: '0' }
  });

  child.on('error', (error) => {
    console.error('✗ Failed to start application:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure Node.js is installed');
    console.log('2. Try running: npm install');
    console.log('3. Check that all files are present');
    process.exit(1);
  });

  child.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.log(`Application exited with code ${code}`);
    }
    process.exit(code || 0);
  });

} catch (error) {
  console.error('✗ Failed to launch:', error.message);
  process.exit(1);
}













