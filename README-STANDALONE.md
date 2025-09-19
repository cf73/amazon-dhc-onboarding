# Amazon DHC Onboarding Tool - Standalone Edition

A self-contained desktop application that runs on **Windows**, **macOS**, and **Linux** without requiring any server setup or installation.

## 🚀 Quick Start

### For End Users (No Technical Knowledge Required)

**Windows:**
- Double-click `start-app.bat`

**macOS/Linux:**
- Double-click `start-app.sh` (or run `./start-app.sh` in Terminal)

The app will:
1. ✅ Check for Node.js (install if needed)
2. ✅ Install dependencies automatically
3. ✅ Create data folders
4. ✅ Launch the desktop app

## 📁 What Gets Created

The app creates a `user-data` folder containing:
```
user-data/
├── assets/           # Uploaded images
│   ├── hero-image-123.jpg
│   └── thumbnail-456.jpg
└── project-data.json # All text content and settings
```

## 🎯 Features

- **📝 Rich Text Editing** - Edit all content inline
- **🖼️ Image Management** - Drag & drop image uploads
- **💾 Auto-Save** - All changes saved automatically
- **📄 PDF Export** - High-quality PDF generation
- **🌐 HTML Export** - Clean, production-ready HTML
- **💼 Project Management** - Save/load complete projects
- **🔄 Cross-Platform** - Works on Windows, Mac, and Linux

## 🛠️ For Developers

### Development Mode
```bash
# Copy the standalone configuration
cp package-standalone.json package.json

# Install dependencies
npm install

# Start development
npm start
```

### Building Distributables

**Windows Executable:**
```bash
npm run dist-win
```

**macOS App:**
```bash
npm run dist-mac
```

**Linux AppImage:**
```bash
npm run dist-linux
```

**All Platforms:**
```bash
npm run dist-all
```

Built files will be in `dist-standalone/`

## 🏗️ Architecture

- **Frontend**: HTML/CSS/JavaScript (Amazon-styled interface)
- **Backend**: Express.js server (runs internally)
- **Desktop**: Electron wrapper (cross-platform)
- **Storage**: Local file system (no database needed)

## 📦 Distribution

The built executables are completely self-contained:
- **Windows**: `.exe` installer or portable `.exe`
- **macOS**: `.dmg` installer or `.zip` archive
- **Linux**: `.AppImage` (runs on any Linux distro)

Users can run these files on any computer without installing Node.js, Electron, or any other dependencies.

## 🔧 Technical Details

- **Port**: Uses `localhost:3847` internally (invisible to user)
- **Data**: Stored in `user-data/` folder next to executable
- **Images**: Uploaded to `user-data/assets/` with unique filenames
- **Projects**: Saved as JSON in `user-data/project-data.json`
- **Exports**: Generated in user's Downloads folder

## 🚨 Troubleshooting

**"Node.js not found" error:**
- Install Node.js from https://nodejs.org/
- Restart the application

**App won't start:**
- Try running `npm install` in the app folder
- Check that all files are present
- On macOS, you may need to allow the app in Security & Privacy settings

**Images not uploading:**
- Check that the app has write permissions to its folder
- Try running as administrator (Windows) or with sudo (Linux/Mac)

## 📋 System Requirements

- **Windows**: Windows 7 or later
- **macOS**: macOS 10.10 or later
- **Linux**: Most modern distributions
- **RAM**: 512MB minimum
- **Disk**: 200MB for app + space for user data


