const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

// Aggressive GPU and performance fixes for Electron
app.commandLine.appendSwitch('--disable-gpu');
app.commandLine.appendSwitch('--disable-gpu-sandbox');
app.commandLine.appendSwitch('--disable-software-rasterizer');
app.commandLine.appendSwitch('--disable-gpu-process-crash-limit');
app.commandLine.appendSwitch('--no-sandbox');
app.commandLine.appendSwitch('--disable-web-security');
app.commandLine.appendSwitch('--disable-features=VizDisplayCompositor');
app.commandLine.appendSwitch('--disable-accelerated-2d-canvas');
app.commandLine.appendSwitch('--disable-accelerated-jpeg-decoding');
app.commandLine.appendSwitch('--disable-accelerated-mjpeg-decode');
app.commandLine.appendSwitch('--disable-accelerated-video-decode');
app.commandLine.appendSwitch('--disable-gpu-compositing');
app.commandLine.appendSwitch('--disable-gpu-rasterization');
app.commandLine.appendSwitch('--disable-gpu-memory-buffer-compositor-resources');
app.commandLine.appendSwitch('--disable-gpu-memory-buffer-video-frames');
app.commandLine.appendSwitch('--in-process-gpu');
app.commandLine.appendSwitch('--disable-background-timer-throttling');
app.commandLine.appendSwitch('--disable-renderer-backgrounding');
app.commandLine.appendSwitch('--disable-backgrounding-occluded-windows');

// Disable hardware acceleration completely
app.disableHardwareAcceleration();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    show: false, // Don't show until ready to prevent white flash
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      // Aggressive performance optimizations
      webgl: false,
      webgl2: false,
      experimentalFeatures: false,
      backgroundThrottling: false,
      offscreen: false,
      // Security (relaxed for local app)
      webSecurity: false,
      allowRunningInsecureContent: true,
      // Memory and process optimizations
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      // Disable additional GPU features
      hardwareAcceleration: false
    },
    // Window optimizations
    paintWhenInitiallyHidden: false,
    enableLargerThanScreen: false,
    // Remove icon if it doesn't exist to prevent errors
    // icon: path.join(__dirname, 'assets', 'icon.png'),
    title: 'Amazon DHC Onboarding Tool - CPU Only Mode'
  });

  // Show window when ready to prevent flickering
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus the window
    if (process.platform === 'darwin') {
      mainWindow.focus();
    }
    
    console.log('Window shown successfully');
  });

  // Fallback: Force show window after 5 seconds if it doesn't show
  setTimeout(() => {
    if (mainWindow && !mainWindow.isVisible()) {
      console.log('Forcing window to show after timeout');
      mainWindow.show();
    }
  }, 5000);

  // Load the HTML file
  mainWindow.loadFile('index.html');
  
  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Optimize renderer process
  mainWindow.webContents.once('dom-ready', () => {
    // Inject performance optimizations
    mainWindow.webContents.executeJavaScript(`
      // Disable smooth scrolling for better performance
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Optimize animations
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      
      console.log('Electron optimizations applied');
    `);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle file operations
ipcMain.handle('save-data', async (event, data) => {
  try {
    const dataDir = path.join(__dirname, 'user-data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'content.json'), JSON.stringify(data, null, 2));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('load-data', async () => {
  try {
    const dataPath = path.join(__dirname, 'user-data', 'content.json');
    const data = await fs.readFile(dataPath, 'utf8');
    return { success: true, data: JSON.parse(data) };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('save-image', async (event, imageData, filename) => {
  try {
    const assetsDir = path.join(__dirname, 'user-data', 'assets');
    await fs.mkdir(assetsDir, { recursive: true });
    
    // Remove data URL prefix
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    await fs.writeFile(path.join(assetsDir, filename), base64Data, 'base64');
    
    return { success: true, path: path.join(assetsDir, filename) };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('show-save-dialog', async (event, options) => {
  const result = await dialog.showSaveDialog(mainWindow, options);
  return result;
});

ipcMain.handle('show-open-dialog', async (event, options) => {
  const result = await dialog.showOpenDialog(mainWindow, options);
  return result;
});
