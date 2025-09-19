# Amazon DHC Onboarding Tool

A desktop application for creating Amazon-style product detail pages for health partner onboarding. This tool allows partners to easily create professional product pages without design skills, with full editing capabilities and export options.

## Features

### ✨ Visual Editor
- **Pixel-perfect Amazon styling** - Matches Amazon's exact design system
- **Live editing** - All text content is editable in-place
- **Image uploads** - Upload and manage product images with carousel
- **Dynamic lists** - Add/remove bullet points, FAQs, testimonials
- **Real-time preview** - See exactly how the final page will look

### 💾 Data Management
- **Auto-save** - Your work is automatically saved as you edit
- **Persistent storage** - Close and reopen without losing progress
- **Local file system** - All data stored securely on your computer

### 📤 Export Options
- **PDF Export** - Generate professional PDFs for review and approval
- **HTML Export** - Clean, production-ready HTML/CSS code
- **Asset management** - All images organized and optimized

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Windows, macOS, or Linux

### Setup
1. Download or clone this project
2. Open terminal/command prompt in the project folder
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
```bash
npm start
```

The application will open in a new window.

### Building Executables
To create standalone executables for distribution:

**Windows:**
```bash
npm run build-win
```

**macOS:**
```bash
npm run build-mac
```

**Linux:**
```bash
npm run build-linux
```

Built applications will be in the `dist/` folder.

## Usage

### Getting Started
1. Launch the application
2. Start editing any text by clicking on it
3. Upload images by clicking the "Upload" buttons
4. Add or remove list items using the + and × buttons
5. Your changes are automatically saved

### Editing Content
- **Text**: Click any text to edit it directly
- **Images**: Click "Upload" buttons to replace placeholder images
- **Lists**: Use + buttons to add items, × buttons to remove them
- **Carousel**: Click thumbnails to add more product images

### Exporting Your Work
- **Save Progress**: Manually save your current work
- **Export PDF**: Generate a PDF for review and approval
- **Export HTML**: Get clean HTML/CSS code for development

## File Structure

```
amazon-dhc-onboarding/
├── index.html          # Main application interface
├── styles.css          # Amazon-style CSS
├── script.js           # Interactive functionality
├── main.js             # Electron main process
├── package.json        # Project configuration
├── user-data/          # Saved content and settings
├── assets/             # Uploaded images and files
└── dist/               # Built executables (after build)
```

## Customization

### Adding New Sections
To add new editable sections:
1. Add HTML structure in `index.html`
2. Add corresponding CSS in `styles.css`
3. Update JavaScript in `script.js` to handle the new content

### Modifying Styling
All visual styling is in `styles.css`. The design closely matches Amazon's design system:
- Colors: Amazon Orange (#FF9900), Dark Blue (#131921)
- Typography: Amazon Ember font family
- Spacing: Consistent with Amazon's grid system

### Export Customization
Modify the export functions in `script.js` to change:
- PDF formatting and layout
- HTML structure and styling
- Asset organization

## Technical Details

### Built With
- **Electron** - Cross-platform desktop app framework
- **HTML/CSS/JavaScript** - Core web technologies
- **Puppeteer** - PDF generation
- **Node.js** - File system operations

### Data Storage
- Content saved as JSON in `user-data/content.json`
- Images stored in `user-data/assets/` folder
- All data remains local to your computer

### Browser Compatibility
The exported HTML works in all modern browsers:
- Chrome/Edge 80+
- Firefox 75+
- Safari 13+

## Troubleshooting

### Common Issues

**App won't start:**
- Ensure Node.js is installed
- Run `npm install` to install dependencies
- Check that all files are present

**Images not uploading:**
- Check file permissions in the project folder
- Ensure image files are valid (JPG, PNG, GIF)
- Try smaller image files (< 10MB)

**Export not working:**
- Ensure you have write permissions
- Check available disk space
- Try exporting to a different location

### Support
For technical issues or questions:
1. Check the console for error messages (F12 in the app)
2. Verify all dependencies are installed
3. Try restarting the application

## Development

### Development Mode
Run with development tools:
```bash
NODE_ENV=development npm start
```

### Code Structure
- `main.js` - Electron main process, handles file operations
- `script.js` - Frontend JavaScript, handles UI interactions
- `styles.css` - All styling and layout
- `index.html` - Application structure and content

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for internal use at Amazon DHC. All rights reserved.

---

**Amazon DHC Onboarding Tool v1.0.0**  
Built for streamlined partner onboarding and content creation.

