// Amazon DHC Onboarding Tool - PWA Version with File System Access API

class AmazonOnboardingPWA {
    constructor() {
        this.data = {
            content: {},
            images: {},
            lists: {},
            projectName: 'amazon-onboarding-project'
        };
        this.fileHandle = null;
        this.hasFileSystemAccess = 'showOpenFilePicker' in window;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupImageUploads();
        this.setupDynamicLists();
        this.setupContentEditing();
        this.loadFromLocalStorage();
        this.showCompatibilityInfo();
    }

    showCompatibilityInfo() {
        if (!this.hasFileSystemAccess) {
            this.showNotification('File System Access not supported. Using fallback mode with downloads.', 'info');
        }
    }

    setupEventListeners() {
        // Control panel buttons - with null checks
        const saveBtn = document.getElementById('save-btn');
        const loadBtn = document.getElementById('load-btn');
        const exportPdfBtn = document.getElementById('export-pdf');
        const exportHtmlBtn = document.getElementById('export-html');

        if (saveBtn) saveBtn.addEventListener('click', () => this.saveProject());
        if (loadBtn) loadBtn.addEventListener('click', () => this.loadProject());
        if (exportPdfBtn) exportPdfBtn.addEventListener('click', () => this.exportPDF());
        if (exportHtmlBtn) exportHtmlBtn.addEventListener('click', () => this.exportHTML());

        // Auto-save to localStorage on content changes
        document.addEventListener('input', (e) => {
            if (e.target.hasAttribute('contenteditable') || e.target.hasAttribute('data-field')) {
                this.autoSaveToLocalStorage();
            }
        });
    }

    setupImageUploads() {
        // Hero image upload - with null checks
        const heroUpload = document.getElementById('hero-upload');
        const heroImage = document.getElementById('hero-image');
        
        if (heroUpload && heroImage) {
            heroUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e, heroImage, 'hero-image');
            });
        }

        // Brand image upload - with null checks
        const brandUpload = document.getElementById('brand-upload');
        const brandImage = document.getElementById('brand-image');
        
        if (brandUpload && brandImage) {
            brandUpload.addEventListener('change', (e) => {
                this.handleImageUpload(e, brandImage, 'brand-image');
            });
        }

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

    async handleImageUpload(event, imgElement, imageKey) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const imageData = await this.fileToBase64(file);
            imgElement.src = imageData;
            
            // Store image data
            this.data.images[imageKey] = {
                filename: `${imageKey}-${Date.now()}.${file.name.split('.').pop()}`,
                data: imageData,
                originalName: file.name
            };
            
            this.showNotification('Image uploaded successfully!');
            this.autoSaveToLocalStorage();
        } catch (error) {
            this.showNotification('Failed to upload image: ' + error.message, 'error');
        }
    }

    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    addNewThumbnail() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const imageData = await this.fileToBase64(file);
                    
                    // Create new thumbnail
                    const thumbnailList = document.querySelector('.thumbnail-list');
                    const newThumb = document.createElement('div');
                    newThumb.className = 'thumbnail';
                    newThumb.innerHTML = `<img src="${imageData}" alt="Thumbnail">`;
                    
                    // Insert before the "+" thumbnail
                    thumbnailList.insertBefore(newThumb, thumbnailList.lastElementChild);
                    
                    // Add click handler
                    newThumb.addEventListener('click', () => {
                        this.selectThumbnail(thumbnailList.children.length - 2);
                        document.getElementById('hero-image').src = imageData;
                    });

                    this.autoSaveToLocalStorage();
                } catch (error) {
                    this.showNotification('Failed to add thumbnail: ' + error.message, 'error');
                }
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
        document.querySelectorAll('.amazon-add-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target.getAttribute('data-target');
                this.addListItem(target);
            });
        });

        // Remove item buttons (delegated event handling)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('amazon-remove-btn')) {
                e.target.closest('.group').remove();
                this.autoSaveToLocalStorage();
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
            this.autoSaveToLocalStorage();
        }
    }

    createIncludedItem() {
        const item = document.createElement('div');
        item.className = 'group flex items-start py-3 border-b border-gray-100 hover:bg-amazon-bg rounded px-2 -mx-2';
        item.innerHTML = `
            <div class="flex-1">
                <div class="font-semibold text-sm text-amazon-text mb-1">
                    <span contenteditable="true" class="amazon-editable">New Item</span>
                </div>
                <div class="text-sm text-amazon-text-light leading-5">
                    <span contenteditable="true" class="amazon-editable">Description of the new item</span>
                </div>
            </div>
            <button class="amazon-remove-btn group-hover:flex ml-4">×</button>
        `;
        return item;
    }

    createDetailItem() {
        const item = document.createElement('div');
        item.className = 'detail-item';
        item.innerHTML = `
            <div class="detail-icon">○</div>
            <span contenteditable="true">New program detail description</span>
            <button class="amazon-remove-btn">×</button>
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
            <button class="amazon-remove-btn">×</button>
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
                <button class="amazon-upload-btn" onclick="this.previousElementSibling.click()">Upload</button>
            </div>
            <div class="expect-content">
                <h3 contenteditable="true">New expectation title</h3>
                <p contenteditable="true">Description of what to expect...</p>
            </div>
            <button class="amazon-remove-btn">×</button>
        `;
        return item;
    }

    createFAQItem() {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <div class="faq-question" contenteditable="true">New question?</div>
            <div class="faq-answer" contenteditable="true">Answer to the new question...</div>
            <button class="amazon-remove-btn">×</button>
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
                this.autoSaveToLocalStorage();
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

    // File System Access API methods
    async saveProject() {
        this.collectAllData();
        
        if (this.hasFileSystemAccess) {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: `${this.data.projectName}.json`,
                    types: [{
                        description: 'Amazon Onboarding Projects',
                        accept: { 'application/json': ['.json'] }
                    }]
                });

                const writable = await fileHandle.createWritable();
                await writable.write(JSON.stringify(this.data, null, 2));
                await writable.close();

                this.fileHandle = fileHandle;
                this.showNotification('Project saved successfully!');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    this.showNotification('Failed to save project: ' + error.message, 'error');
                }
            }
        } else {
            // Fallback: download as file
            this.downloadAsFile(JSON.stringify(this.data, null, 2), `${this.data.projectName}.json`, 'application/json');
            this.showNotification('Project downloaded successfully!');
        }
    }

    async loadProject() {
        if (this.hasFileSystemAccess) {
            try {
                const [fileHandle] = await window.showOpenFilePicker({
                    types: [{
                        description: 'Amazon Onboarding Projects',
                        accept: { 'application/json': ['.json'] }
                    }]
                });

                const file = await fileHandle.getFile();
                const contents = await file.text();
                this.data = JSON.parse(contents);
                
                this.fileHandle = fileHandle;
                this.populateContent();
                this.saveToLocalStorage();
                this.showNotification('Project loaded successfully!');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    this.showNotification('Failed to load project: ' + error.message, 'error');
                }
            }
        } else {
            // Fallback: file input
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        const contents = await file.text();
                        this.data = JSON.parse(contents);
                        this.populateContent();
                        this.saveToLocalStorage();
                        this.showNotification('Project loaded successfully!');
                    } catch (error) {
                        this.showNotification('Failed to load project: ' + error.message, 'error');
                    }
                }
            };
            input.click();
        }
    }

    // LocalStorage methods for persistence
    saveToLocalStorage() {
        try {
            localStorage.setItem('amazon-onboarding-data', JSON.stringify(this.data));
        } catch (error) {
            console.warn('Failed to save to localStorage:', error);
        }
    }

    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem('amazon-onboarding-data');
            if (saved) {
                this.data = { ...this.data, ...JSON.parse(saved) };
                this.populateContent();
            }
        } catch (error) {
            console.warn('Failed to load from localStorage:', error);
        }
    }

    autoSaveToLocalStorage() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            this.collectAllData();
            this.saveToLocalStorage();
        }, 2000); // Auto-save to localStorage every 2 seconds
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
            included: this.collectListData('[data-list="included"] .group'),
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
            const editableElements = item.querySelectorAll('[contenteditable="true"], .amazon-editable');
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

    // Export methods
    async exportPDF() {
        this.showNotification('Generating PDF...', 'info');
        
        try {
            // Hide control panel and edit buttons for clean export
            document.querySelector('.control-panel').style.display = 'none';
            document.querySelectorAll('.amazon-upload-btn, .amazon-add-btn, .amazon-remove-btn').forEach(btn => {
                btn.style.display = 'none';
            });

            // Remove contenteditable attributes temporarily
            const editableElements = document.querySelectorAll('[contenteditable="true"]');
            editableElements.forEach(el => {
                el.setAttribute('data-was-editable', 'true');
                el.removeAttribute('contenteditable');
            });

            // Use browser's print to PDF functionality
            const printWindow = window.open('', '_blank');
            printWindow.document.write(document.documentElement.outerHTML);
            printWindow.document.close();
            
            // Wait a moment for content to load
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
                this.showNotification('PDF print dialog opened!');
            }, 1000);

        } catch (error) {
            this.showNotification('Failed to export PDF: ' + error.message, 'error');
        } finally {
            // Restore UI elements
            document.querySelector('.control-panel').style.display = 'flex';
            document.querySelectorAll('.amazon-upload-btn, .amazon-add-btn').forEach(btn => {
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
            
            if (this.hasFileSystemAccess) {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: 'amazon-onboarding-export.html',
                    types: [{
                        description: 'HTML Files',
                        accept: { 'text/html': ['.html'] }
                    }]
                });

                const writable = await fileHandle.createWritable();
                await writable.write(cleanHTML);
                await writable.close();
                
                this.showNotification('HTML exported successfully!');
            } else {
                // Fallback: download
                this.downloadAsFile(cleanHTML, 'amazon-onboarding-export.html', 'text/html');
                this.showNotification('HTML downloaded successfully!');
            }

        } catch (error) {
            if (error.name !== 'AbortError') {
                this.showNotification('Failed to export HTML: ' + error.message, 'error');
            }
        }
    }

    generateCleanHTML() {
        // Create a clean version without editing controls
        const clone = document.cloneNode(true);
        
        // Remove editing elements
        clone.querySelectorAll('.control-panel, .amazon-upload-btn, .amazon-add-btn, .amazon-remove-btn').forEach(el => {
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

    // Utility methods
    downloadAsFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000);
    }
}

// Initialize the PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AmazonOnboardingPWA();
});
