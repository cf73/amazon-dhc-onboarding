const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('.'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const assetsDir = path.join(__dirname, 'user-data', 'assets');
    await fs.mkdir(assetsDir, { recursive: true });
    cb(null, assetsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `image-${timestamp}${ext}`);
  }
});

const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Save data endpoint
app.post('/api/save-data', async (req, res) => {
  try {
    const dataDir = path.join(__dirname, 'user-data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'content.json'), JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Load data endpoint
app.get('/api/load-data', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'user-data', 'content.json');
    const data = await fs.readFile(dataPath, 'utf8');
    res.json({ success: true, data: JSON.parse(data) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Image upload endpoint
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    res.json({ 
      success: true, 
      filename: req.file.filename,
      path: req.file.path,
      url: `/user-data/assets/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve uploaded assets
app.use('/user-data/assets', express.static(path.join(__dirname, 'user-data', 'assets')));

// Start server
app.listen(PORT, () => {
  console.log(`Amazon DHC Onboarding Tool running at http://localhost:${PORT}`);
  console.log('This is a lightweight web server alternative to Electron');
  
  // Try to open browser automatically
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  exec(`${start} http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  process.exit(0);
});





