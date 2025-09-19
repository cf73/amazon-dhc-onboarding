import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

export const exportToPDF = async (projectData) => {
  try {
    // Hide control panel and all editing UI elements
    const controlPanel = document.querySelector('.fixed.right-4');
    const dragHandles = document.querySelectorAll('[data-rbd-drag-handle-draggable-id]');
    const addButtons = document.querySelectorAll('button');
    const removeButtons = document.querySelectorAll('.amazon-remove-btn, button[class*="remove"]');
    const uploadButtons = document.querySelectorAll('.amazon-upload-btn, .amazon-upload-btn-small');
    
    // Store original styles to restore later
    const originalStyles = new Map();
    
    // Hide control panel
    if (controlPanel) {
      originalStyles.set(controlPanel, controlPanel.style.display);
      controlPanel.style.display = 'none';
    }
    
    // Hide all drag handles
    dragHandles.forEach(handle => {
      originalStyles.set(handle, handle.style.display);
      handle.style.display = 'none';
    });
    
    // Hide add buttons and remove buttons
    addButtons.forEach(btn => {
      if (btn.textContent.includes('Add') || btn.textContent.includes('+')) {
        originalStyles.set(btn, btn.style.display);
        btn.style.display = 'none';
      }
    });
    
    // Hide remove buttons
    removeButtons.forEach(btn => {
      originalStyles.set(btn, btn.style.display);
      btn.style.display = 'none';
    });
    
    // Hide upload buttons
    uploadButtons.forEach(btn => {
      originalStyles.set(btn, btn.style.display);
      btn.style.display = 'none';
    });
    
    // Hide any drag handle indicators (the three dots)
    const dragIndicators = document.querySelectorAll('.cursor-grab, .cursor-grabbing');
    dragIndicators.forEach(indicator => {
      originalStyles.set(indicator, indicator.style.display);
      indicator.style.display = 'none';
    });

    // Wait a moment for DOM updates
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capture the main content area
    const element = document.querySelector('main') || document.body;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: 1464,
      height: element.scrollHeight
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width / 2, canvas.height / 2]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    
    // Save PDF
    pdf.save('amazon-onboarding-export.pdf');

    // Restore all hidden elements
    originalStyles.forEach((originalDisplay, element) => {
      element.style.display = originalDisplay;
    });

  } catch (error) {
    console.error('PDF export failed:', error);
    throw new Error('Failed to generate PDF: ' + error.message);
  }
};

export const exportToHTML = async (projectData) => {
  try {
    // Generate clean HTML from project data
    const cleanHTML = generateCleanHTML(projectData);
    
    // Create blob and download
    const blob = new Blob([cleanHTML], { type: 'text/html;charset=utf-8' });
    saveAs(blob, 'amazon-onboarding-export.html');
    
  } catch (error) {
    console.error('HTML export failed:', error);
    throw new Error('Failed to generate HTML: ' + error.message);
  }
};

const generateCleanHTML = (projectData) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amazon DHC Onboarding - ${projectData.title}</title>
    <style>
        /* Amazon-specific styles */
        .amazon-header-gradient {
            background: linear-gradient(to bottom, #37475a, #2f3947);
        }
        .amazon-cta-btn {
            background: #FF9900;
            color: #0F1111;
            border: 1px solid #FF9900;
            border-radius: 8px;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .amazon-cta-btn:hover {
            background: #E47911;
            border-color: #E47911;
        }
        .max-w-amazon { max-width: 1464px; }
        .font-amazon { font-family: "Amazon Ember", Arial, sans-serif; }
        .text-amazon-text { color: #0F1111; }
        .text-amazon-text-light { color: #565959; }
        .text-amazon-red { color: #B12704; }
        .text-amazon-orange { color: #FF9900; }
        .border-amazon-border-light { border-color: #D5D9D9; }
        .bg-amazon-bg { background-color: #F7F8F8; }
        /* Add more styles as needed */
    </style>
</head>
<body>
    <!-- Amazon Header -->
    <header class="amazon-header-gradient" style="height: 60px; display: flex; align-items: center; padding: 0 16px;">
        <div style="display: flex; align-items: center; margin-right: 16px;">
            <span style="font-size: 24px; font-weight: bold; color: white;">amazon</span>
            <span style="font-size: 12px; margin-left: 4px; color: white;">.us</span>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-amazon font-amazon" style="margin: 0 auto; padding: 0 16px; background: white;">
        <!-- Breadcrumb -->
        <nav style="padding-top: 16px; padding-bottom: 8px; font-size: 12px; color: #565959;">
            ${projectData.breadcrumb}
        </nav>

        <!-- Product Section -->
        <div style="display: grid; grid-template-columns: 320px 1fr 300px; gap: 32px; margin-top: 16px; align-items: start;">
            <!-- Left Column - Product Image -->
            <div style="position: relative;">
                ${projectData.images?.hero ? 
                  `<img src="${projectData.images.hero}" alt="Product Image" style="width: 100%; height: 320px; object-fit: cover; border: 1px solid #D5D9D9; border-radius: 4px;" />` :
                  `<div style="width: 100%; height: 320px; background: #F0F0F0; border: 1px solid #D5D9D9; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 18px;">Product Image</div>`
                }
            </div>

            <!-- Center Column - Main Content -->
            <div style="padding-right: 24px;">
                <h1 style="font-size: 24px; font-weight: normal; line-height: 1.3; margin-bottom: 12px; color: #0F1111;">${projectData.title}</h1>
                
                <div style="margin-bottom: 16px;">
                    <span style="font-size: 14px; color: #565959;">by </span>
                    <span style="font-size: 14px; color: #0F1111; font-weight: 500;">${projectData.brand}</span>
                </div>

                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 12px; color: #0F1111;">Description</h3>
                    <div style="font-size: 14px; line-height: 1.4; color: #0F1111;">${projectData.description}</div>
                </div>

                <!-- What's Included Section -->
                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 12px; color: #0F1111;">What's included*</h3>
                    <div style="border: 1px solid #E5E7EB; border-radius: 4px;">
                        ${projectData.sections.included?.map(item => `
                            <div style="display: grid; grid-template-columns: 200px 1fr; border-bottom: 1px solid #E5E7EB;">
                                <div style="background: #F3F4F6; padding: 12px; font-size: 14px; font-weight: 500; color: #0F1111;">${item.title}</div>
                                <div style="padding: 12px; font-size: 14px; color: #0F1111;">${item.description}</div>
                            </div>
                        `).join('') || ''}
                    </div>
                </div>

                <!-- Is this program for me? Section -->
                <div style="margin-bottom: 24px;">
                    <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 12px; color: #0F1111;">Is this program for me?</h3>
                    <div style="margin-bottom: 12px;">
                        ${(projectData.sections?.programFor || [
                            { text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy" },
                            { text: "You're thinking ahead for fertility preservation (sperm and egg freezing)" },
                            { text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment" }
                        ]).map(item => `
                            <div style="display: flex; align-items: start; gap: 12px; margin-bottom: 12px;">
                                <div style="width: 20px; height: 20px; border-radius: 50%; background: #14B8A6; display: flex; align-items: center; justify-content: center; margin-top: 2px; flex-shrink: 0;">
                                    <svg style="width: 12px; height: 12px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div style="font-size: 14px; color: #0F1111;">${item.text}</div>
                            </div>
                        `).join('') || ''}
                    </div>
                    <div style="font-size: 12px; color: #565959;">
                        Progyny services are available to you if covered by your employer benefits and enrolled in an eligible medical plan. Some programs may have additional requirements based on clinical eligibility.
                    </div>
                </div>
            </div>

            <!-- Right Column - Price & CTA -->
            <div style="background: white; border: 1px solid #E5E7EB; border-radius: 8px; padding: 24px;">
                <div style="margin-bottom: 16px;">
                    <div style="font-size: 14px; color: #565959; margin-bottom: 4px;">Price with coverage:</div>
                    <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: 8px;">
                        <span style="font-size: 32px; color: #B12704; font-weight: normal;">${projectData.price}</span>
                        <span style="font-size: 18px; color: #565959; vertical-align: super;">${projectData.priceUnit}</span>
                    </div>
                    <div style="font-size: 12px; color: #565959;">Per 1:1 support. Fees apply for additional medical services.</div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <button style="width: 100%; background: #FBBF24; color: #0F1111; font-weight: 500; padding: 12px 16px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer;">${projectData.ctaText}</button>
                </div>
                
                <div style="text-align: center;">
                    <a href="#" style="font-size: 14px; color: #2563EB; text-decoration: none;">Learn more about coverage and pricing</a>
                </div>
            </div>
        </div>



        <!-- Testimonials Section -->
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #D5D9D9;">
            <!-- Header with Quote Icon and Title - Shows Once -->
            <div style="text-align: center; margin-bottom: 32px;">
                <!-- Large Quote Icon -->
                <div style="display: flex; justify-content: center; margin-bottom: 24px;">
                    <svg style="width: 48px; height: 48px; color: #14B8A6;" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                </div>
                
                <!-- Section Title -->
                <h3 style="font-size: 18px; font-weight: 600; color: #0D9488; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px;">
                    What Members Are Saying
                </h3>
            </div>

            <!-- Testimonials Stack -->
            <div style="display: flex; flex-direction: column; gap: 48px; margin-bottom: 24px; max-width: 1024px; margin-left: auto; margin-right: auto;">
                ${projectData.sections.testimonials?.map(item => `
                    <div style="text-align: center;">
                        <!-- Testimonial Text -->
                        <p style="font-size: 20px; color: #374151; line-height: 1.6; margin-bottom: 12px; font-weight: 300;">"${item.text}"</p>
                        
                        <!-- Author -->
                        <div style="font-size: 14px; color: #6B7280;">${item.author}</div>
                    </div>
                `).join('') || ''}
            </div>
        </div>

        <!-- From the Brand Section -->
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #D5D9D9;">
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 32px; color: #0F1111;">From the brand</h2>
            <div style="display: grid; grid-template-columns: 400px 1fr; gap: 32px; align-items: start; margin-bottom: 32px;">
                <!-- Left Column - Image -->
                <div>
                    ${projectData.sections.fromBrand?.image ? 
                      `<img src="${projectData.sections.fromBrand.image}" alt="Brand content" style="width: 100%; height: 256px; object-fit: cover; border-radius: 8px;" />` :
                      `<div style="width: 100%; height: 256px; background: #F3F4F6; border: 2px dashed #D1D5DB; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px;">Brand Image</div>`
                    }
                </div>
                
                <!-- Right Column - Content -->
                <div>
                    <div style="font-size: 14px; color: #6B7280; margin-bottom: 12px;">${projectData.sections.fromBrand?.category || ''}</div>
                    
                    <h3 style="font-size: 24px; font-weight: bold; color: #0F1111; margin-bottom: 16px; line-height: 1.2;">${projectData.sections.fromBrand?.title || ''}</h3>
                    
                    <div style="color: #6B7280; line-height: 1.6; margin-bottom: 24px;">${projectData.sections.fromBrand?.description || ''}</div>
                    
                    <!-- Bullet Points -->
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${(projectData.sections.fromBrand?.bulletPoints || []).map(bullet => `
                            <div style="display: flex; align-items: start; gap: 12px;">
                                <div style="width: 20px; height: 20px; border-radius: 4px; background: #14B8A6; display: flex; align-items: center; justify-content: center; margin-top: 2px; flex-shrink: 0;">
                                    <svg style="width: 12px; height: 12px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div style="font-size: 14px; color: #374151;">${bullet}</div>
                            </div>
                        `).join('') || ''}
                    </div>
                </div>
            </div>
        </div>

        <!-- Successful Outcomes Section -->
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #D5D9D9;">
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 32px; color: #0F1111;">${projectData.sections.successfulOutcomes?.title || 'Successful outcomes of the program'}</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 32px; margin-bottom: 32px;">
                <!-- Column 1 -->
                <div style="text-align: center;">
                    <div style="margin-bottom: 8px;">
                        <span style="font-size: 32px; font-weight: bold; color: #14B8A6;">${projectData.sections.successfulOutcomes?.stat1?.number || '12%'}</span>
                        <span style="font-size: 32px; font-weight: bold; color: #14B8A6; margin-left: 4px;">${projectData.sections.successfulOutcomes?.stat1?.label || 'more pregnancies'}</span>
                    </div>
                    <div style="font-size: 14px; color: #6B7280;">${projectData.sections.successfulOutcomes?.stat1?.description || 'per IVF transfer compared to national average†'}</div>
                </div>

                <!-- Column 2 -->
                <div style="text-align: center;">
                    <div style="margin-bottom: 8px;">
                        <span style="font-size: 32px; font-weight: bold; color: #14B8A6;">${projectData.sections.successfulOutcomes?.stat2?.number || '21%'}</span>
                        <span style="font-size: 32px; font-weight: bold; color: #14B8A6; margin-left: 4px;">${projectData.sections.successfulOutcomes?.stat2?.label || 'fewer miscarriages'}</span>
                    </div>
                    <div style="font-size: 14px; color: #6B7280;">${projectData.sections.successfulOutcomes?.stat2?.description || 'compared to national average†'}</div>
                </div>

                <!-- Column 3 -->
                <div style="text-align: center;">
                    <div style="margin-bottom: 8px;">
                        <span style="font-size: 32px; font-weight: bold; color: #14B8A6;">${projectData.sections.successfulOutcomes?.stat3?.number || '23%'}</span>
                        <span style="font-size: 32px; font-weight: bold; color: #14B8A6; margin-left: 4px;">${projectData.sections.successfulOutcomes?.stat3?.label || 'more live births'}</span>
                    </div>
                    <div style="font-size: 14px; color: #6B7280;">${projectData.sections.successfulOutcomes?.stat3?.description || 'compared to national average‡'}</div>
                </div>
            </div>
        </div>

        <!-- FAQ Section -->
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #D5D9D9;">
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #0F1111;">Frequently Asked Questions</h2>
            <div style="margin-bottom: 24px;">
                ${projectData.sections.faq?.map(item => `
                    <div style="border: 1px solid #D5D9D9; border-radius: 8px; margin-bottom: 16px; overflow: hidden;">
                        <div style="background: #F7F8F8; padding: 16px;">
                            <h3 style="font-weight: 500; font-size: 14px; color: #0F1111; margin: 0;">${item.question}</h3>
                        </div>
                        <div style="padding: 16px; background: white;">
                            <p style="font-size: 14px; color: #0F1111; line-height: 1.4; margin: 0;">${item.answer}</p>
                        </div>
                    </div>
                `).join('') || ''}
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer style="background: #232F3E; color: white; margin-top: 48px; padding: 32px 0; text-align: center;">
        <div style="max-width: 1464px; margin: 0 auto; padding: 0 16px;">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                <span style="font-size: 24px; font-weight: bold;">amazon</span>
                <span style="font-size: 12px; margin-left: 4px;">.us</span>
            </div>
            <div style="font-size: 12px; color: #ccc;">
                © 1996-2025, Amazon.com, Inc. or its affiliates
            </div>
        </div>
    </footer>
</body>
</html>`;
};






