const { app, BrowserWindow } = require('electron');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const http = require('http');

// Cross-platform optimizations
app.commandLine.appendSwitch('--disable-logging');
app.commandLine.appendSwitch('--disable-gpu-sandbox');
app.commandLine.appendSwitch('--no-sandbox');

// Hide dock icon on macOS if needed
if (process.platform === 'darwin') {
  app.dock?.hide();
}

// Create Express app
const expressApp = express();
const port = 3847; // Random port to avoid conflicts

// Ensure directories exist
const userDataPath = path.join(__dirname, 'user-data');
const assetsPath = path.join(userDataPath, 'assets');

if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
}
if (!fs.existsSync(assetsPath)) {
  fs.mkdirSync(assetsPath, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, assetsPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Serve static files
expressApp.use('/assets', express.static(assetsPath));
expressApp.use(express.json({ limit: '50mb' }));
expressApp.use(express.static(__dirname));

// API Routes
expressApp.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const fileUrl = `/assets/${req.file.filename}`;
  res.json({ 
    success: true, 
    filename: req.file.filename,
    url: fileUrl,
    path: req.file.path
  });
});

expressApp.post('/api/save-data', (req, res) => {
  try {
    const dataPath = path.join(userDataPath, 'project-data.json');
    fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

expressApp.get('/api/load-data', (req, res) => {
  try {
    const dataPath = path.join(userDataPath, 'project-data.json');
    if (fs.existsSync(dataPath)) {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      res.json(data);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

expressApp.get('/api/assets', (req, res) => {
  try {
    const files = fs.readdirSync(assetsPath).map(filename => ({
      filename,
      url: `/assets/${filename}`,
      path: path.join(assetsPath, filename)
    }));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve the main HTML file
expressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'standalone-app.html'));
});

let mainWindow;
let server;

function createWindow() {
  // Start the Express server
  server = expressApp.listen(port, 'localhost', () => {
    console.log(`Internal server running on http://localhost:${port}`);
    
    // Create the Electron window
    mainWindow = new BrowserWindow({
      width: 1400,
      height: 1000,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: false // Allow local file access
      },
      title: 'Amazon DHC Onboarding Tool',
      icon: path.join(__dirname, 'icon.ico') // Optional icon
    });

    // Load the local server
    mainWindow.loadURL(`http://localhost:${port}`);
    
    // Optional: Open DevTools in development
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
      mainWindow = null;
      if (server) {
        server.close();
      }
    });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (server) {
    server.close();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
