const { spawn } = require('child_process');
const path = require('path');

// Launch the Electron app without showing console
const electronPath = path.join(__dirname, 'node_modules', '.bin', 'electron.cmd');
const appPath = path.join(__dirname, 'app-standalone.js');

const child = spawn(electronPath, [appPath], {
  detached: true,
  stdio: 'ignore',
  windowsHide: true
});

child.unref();
process.exit(0);













