// Amazon DHC Onboarding Tool - Interactive JavaScript

const { ipcRenderer } = require('electron');

class AmazonOnboardingApp {
    constructor() {
        this.data = {
            content: {},
            images: {},
            lists: {}
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupImageUploads();
        this.setupDynamicLists();
        this.setupContentEditing();
        this.loadSavedData();
    }

    setupEventListeners() {
        // Control panel buttons
        document.getElementById('save-btn').addEventListener('click', () => this.saveData());
        document.getElementById('load-btn').addEventListener('click', () => this.loadSavedData());
        document.getElementById('export-pdf').addEventListener('click', () => this.exportPDF());
        document.getElementById('export-html').addEventListener('click', () => this.exportHTML());

        // Auto-save on content changes
        document.addEventListener('input', (e) => {
            if (e.target.hasAttribute('contenteditable') || e.target.hasAttribute('data-field')) {
                this.autoSave();
            }
        });
    }

    setupImageUploads() {
        // Hero image upload
        const heroUpload = document.getElementById('hero-upload');
        const heroImage = document.getElementById('hero-image');
        
        heroUpload.addEventListener('change', (e) => {
            this.handleImageUpload(e, heroImage, 'hero-image');
        });

        // Brand image upload
        const brandUpload = document.getElementById('brand-upload');
        const brandImage = document.getElementById('brand-image');
        
        brandUpload.addEventListener('change', (e) => {
            this.handleImageUpload(e, brandImage, 'brand-image');
        });

        // Thumbnail uploads
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                if (index === 3) { // Add new image thumbnail
                    this.addNewThumbnail();
                } else {
                    this.selectThumbnail(index);
                }
            });
        });

        // Expect items image uploads
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('expect-upload')) {
                const img = e.target.previousElementSibling;
                this.handleImageUpload(e, img, `expect-${Date.now()}`);
            }
        });
    }

    handleImageUpload(event, imgElement, imageKey) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const imageData = e.target.result;
            imgElement.src = imageData;
            
            // Save image to assets folder
            const filename = `${imageKey}-${Date.now()}.${file.name.split('.').pop()}`;
            const result = await ipcRenderer.invoke('save-image', imageData, filename);
            
            if (result.success) {
                this.data.images[imageKey] = {
                    filename: filename,
                    path: result.path,
                    data: imageData
                };
                this.showNotification('Image uploaded successfully!');
            } else {
                this.showNotification('Failed to save image: ' + result.error, 'error');
            }
        };
        reader.readAsDataURL(file);
    }

    addNewThumbnail() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Create new thumbnail
                    const thumbnailList = document.querySelector('.thumbnail-list');
                    const newThumb = document.createElement('div');
                    newThumb.className = 'thumbnail';
                    newThumb.innerHTML = `<img src="${e.target.result}" alt="Thumbnail">`;
                    
                    // Insert before the "+" thumbnail
                    thumbnailList.insertBefore(newThumb, thumbnailList.lastElementChild);
                    
                    // Add click handler
                    newThumb.addEventListener('click', () => {
                        this.selectThumbnail(thumbnailList.children.length - 2);
                        document.getElementById('hero-image').src = e.target.result;
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    }

    selectThumbnail(index) {
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    setupDynamicLists() {
        // Add item buttons
        document.querySelectorAll('.add-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                this.addListItem(target);
            });
        });

        // Remove item buttons (delegated event handling)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item')) {
                e.target.parentElement.remove();
                this.autoSave();
            }
        });
    }

    addListItem(listType) {
        let newItem;
        const container = document.querySelector(`[data-list="${listType}"]`);
        
        switch (listType) {
            case 'included':
                newItem = this.createIncludedItem();
                break;
            case 'program-details':
                newItem = this.createDetailItem();
                break;
            case 'testimonials':
                newItem = this.createTestimonial();
                break;
            case 'brand-features':
                newItem = this.createBrandFeature();
                break;
            case 'expect-items':
                newItem = this.createExpectItem();
                break;
            case 'faq':
                newItem = this.createFAQItem();
                break;
        }

        if (newItem && container) {
            container.appendChild(newItem);
            this.autoSave();
        }
    }

    createIncludedItem() {
        const item = document.createElement('div');
        item.className = 'included-item';
        item.innerHTML = `
            <span contenteditable="true">New Item</span>
            <span contenteditable="true">Description of the new item</span>
            <button class="remove-item">×</button>
        `;
        return item;
    }

    createDetailItem() {
        const item = document.createElement('div');
        item.className = 'detail-item';
        item.innerHTML = `
            <div class="detail-icon">○</div>
            <span contenteditable="true">New program detail description</span>
            <button class="remove-item">×</button>
        `;
        return item;
    }

    createTestimonial() {
        const item = document.createElement('div');
        item.className = 'testimonial';
        item.innerHTML = `
            <div class="testimonial-content">
                <div class="quote-icon">"</div>
                <p contenteditable="true">New testimonial content goes here...</p>
                <div class="testimonial-author">
                    <span contenteditable="true">— Author Name, Location</span>
                </div>
            </div>
            <button class="remove-item">×</button>
        `;
        return item;
    }

    createBrandFeature() {
        const item = document.createElement('li');
        item.contentEditable = true;
        item.textContent = 'New brand feature';
        return item;
    }

    createExpectItem() {
        const item = document.createElement('div');
        item.className = 'expect-item';
        item.innerHTML = `
            <div class="expect-image">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjBGMEYwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iNzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiIGZvbnQtc2l6ZT0iMTIiPkltYWdlPC90ZXh0Pgo8L3N2Zz4=" alt="Expect Image">
                <input type="file" class="expect-upload" accept="image/*" style="display: none;">
                <button class="upload-btn" onclick="this.previousElementSibling.click()">Upload</button>
            </div>
            <div class="expect-content">
                <h3 contenteditable="true">New expectation title</h3>
                <p contenteditable="true">Description of what to expect...</p>
            </div>
            <button class="remove-item">×</button>
        `;
        return item;
    }

    createFAQItem() {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <div class="faq-question" contenteditable="true">New question?</div>
            <div class="faq-answer" contenteditable="true">Answer to the new question...</div>
            <button class="remove-item">×</button>
        `;
        return item;
    }

    setupContentEditing() {
        // Track all editable content
        document.querySelectorAll('[contenteditable="true"]').forEach(element => {
            element.addEventListener('blur', () => {
                const field = element.getAttribute('data-field');
                if (field) {
                    this.data.content[field] = element.innerHTML || element.textContent;
                }
            });

            // Handle Enter key in single-line fields
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
                        e.preventDefault();
                        element.blur();
                    }
                }
            });
        });
    }

    async saveData() {
        this.collectAllData();
        const result = await ipcRenderer.invoke('save-data', this.data);
        
        if (result.success) {
            this.showNotification('Data saved successfully!');
        } else {
            this.showNotification('Failed to save data: ' + result.error, 'error');
        }
    }

    async loadSavedData() {
        const result = await ipcRenderer.invoke('load-data');
        
        if (result.success) {
            this.data = result.data;
            this.populateContent();
            this.showNotification('Data loaded successfully!');
        } else {
            console.log('No saved data found or error loading:', result.error);
        }
    }

    collectAllData() {
        // Collect all content fields
        document.querySelectorAll('[data-field]').forEach(element => {
            const field = element.getAttribute('data-field');
            this.data.content[field] = element.innerHTML || element.textContent;
        });

        // Collect all contenteditable content
        document.querySelectorAll('[contenteditable="true"]').forEach(element => {
            const field = element.getAttribute('data-field');
            if (field) {
                this.data.content[field] = element.innerHTML || element.textContent;
            }
        });

        // Collect list data
        this.data.lists = {
            included: this.collectListData('.included-list .included-item'),
            programDetails: this.collectListData('.details-list .detail-item'),
            testimonials: this.collectListData('.testimonials .testimonial'),
            brandFeatures: this.collectListData('.brand-features li'),
            expectItems: this.collectListData('.expect-items .expect-item'),
            faq: this.collectListData('.faq-list .faq-item')
        };
    }

    collectListData(selector) {
        const items = [];
        document.querySelectorAll(selector).forEach(item => {
            const editableElements = item.querySelectorAll('[contenteditable="true"]');
            const itemData = {};
            editableElements.forEach((el, index) => {
                itemData[`field_${index}`] = el.innerHTML || el.textContent;
            });
            items.push(itemData);
        });
        return items;
    }

    populateContent() {
        // Populate content fields
        Object.keys(this.data.content || {}).forEach(field => {
            const element = document.querySelector(`[data-field="${field}"]`);
            if (element) {
                if (element.tagName === 'INPUT') {
                    element.value = this.data.content[field];
                } else {
                    element.innerHTML = this.data.content[field];
                }
            }
        });

        // Populate images
        Object.keys(this.data.images || {}).forEach(imageKey => {
            const imageData = this.data.images[imageKey];
            const element = document.getElementById(imageKey);
            if (element && imageData.data) {
                element.src = imageData.data;
            }
        });
    }

    autoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.saveData();
        }, 5000); // Auto-save after 5 seconds of inactivity (reduced frequency)
    }

    async exportPDF() {
        this.showNotification('Generating PDF...', 'info');
        
        try {
            // Hide control panel and edit buttons for clean export
            document.querySelector('.control-panel').style.display = 'none';
            document.querySelectorAll('.upload-btn, .add-item, .remove-item').forEach(btn => {
                btn.style.display = 'none';
            });

            // Remove contenteditable attributes temporarily
            const editableElements = document.querySelectorAll('[contenteditable="true"]');
            editableElements.forEach(el => {
                el.setAttribute('data-was-editable', 'true');
                el.removeAttribute('contenteditable');
            });

            // Generate PDF using Puppeteer with exact settings
            const puppeteer = require('puppeteer');
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            const page = await browser.newPage();
            
            // Set viewport to match Amazon's layout
            await page.setViewport({
                width: 1464,
                height: 1200,
                deviceScaleFactor: 1
            });
            
            await page.setContent(document.documentElement.outerHTML, {
                waitUntil: 'networkidle0'
            });

            // Wait for images to load
            await page.evaluate(() => {
                return Promise.all(Array.from(document.images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                }));
            });

            const pdf = await page.pdf({
                width: '1464px',
                height: '2000px',
                printBackground: true,
                margin: {
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0'
                },
                preferCSSPageSize: false
            });

            await browser.close();

            // Show save dialog
            const result = await ipcRenderer.invoke('show-save-dialog', {
                defaultPath: 'amazon-onboarding-export.pdf',
                filters: [
                    { name: 'PDF Files', extensions: ['pdf'] }
                ]
            });

            if (!result.canceled) {
                const fs = require('fs').promises;
                await fs.writeFile(result.filePath, pdf);
                this.showNotification('PDF exported successfully!');
            }

        } catch (error) {
            this.showNotification('Failed to export PDF: ' + error.message, 'error');
        } finally {
            // Restore UI elements
            document.querySelector('.control-panel').style.display = 'flex';
            document.querySelectorAll('.upload-btn, .add-item').forEach(btn => {
                btn.style.display = 'block';
            });

            // Restore contenteditable attributes
            document.querySelectorAll('[data-was-editable="true"]').forEach(el => {
                el.setAttribute('contenteditable', 'true');
                el.removeAttribute('data-was-editable');
            });
        }
    }

    async exportHTML() {
        try {
            this.collectAllData();
            
            // Generate clean HTML
            const cleanHTML = this.generateCleanHTML();
            
            // Show save dialog
            const result = await ipcRenderer.invoke('show-save-dialog', {
                defaultPath: 'amazon-onboarding-export.html',
                filters: [
                    { name: 'HTML Files', extensions: ['html'] }
                ]
            });

            if (!result.canceled) {
                const fs = require('fs').promises;
                await fs.writeFile(result.filePath, cleanHTML);
                this.showNotification('HTML exported successfully!');
            }

        } catch (error) {
            this.showNotification('Failed to export HTML: ' + error.message, 'error');
        }
    }

    generateCleanHTML() {
        // Create a clean version without editing controls
        const clone = document.cloneNode(true);
        
        // Remove editing elements
        clone.querySelectorAll('.control-panel, .upload-btn, .add-item, .remove-item').forEach(el => {
            el.remove();
        });

        // Remove contenteditable attributes
        clone.querySelectorAll('[contenteditable]').forEach(el => {
            el.removeAttribute('contenteditable');
        });

        // Remove data attributes
        clone.querySelectorAll('[data-field], [data-list], [data-target]').forEach(el => {
            el.removeAttribute('data-field');
            el.removeAttribute('data-list');
            el.removeAttribute('data-target');
        });

        return `<!DOCTYPE html>\n${clone.documentElement.outerHTML}`;
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#D5212A' : type === 'info' ? '#0073BB' : '#007600'};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AmazonOnboardingApp();
});
