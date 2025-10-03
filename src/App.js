import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import AmazonHeader from './components/AmazonHeader';
import ProductSection from './components/ProductSection';
import ContentSection from './components/ContentSection';
import ControlPanel from './components/ControlPanel';
import Footer from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportToPDF, exportToHTML } from './utils/exportUtils';
import './styles/compiled.css';

function App() {
  // Main application state
  const [projectData, setProjectData] = useLocalStorage('amazon-onboarding-data', {
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
    brand: 'Lorem Brand',
    price: '$0',
    priceUnit: '00',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ctaText: 'Check insurance coverage',
    breadcrumb: 'Lorem & Ipsum',
    images: {
      hero: null,
      thumbnails: []
    },
    sections: {
      included: [
        {
          id: '1',
          title: 'Lorem ipsum dolor sit amet',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        },
        {
          id: '2',
          title: 'Consectetur adipiscing elit',
          description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
        },
        {
          id: '3',
          title: 'Sed do eiusmod tempor',
          description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
        },
        {
          id: '4',
          title: 'Incididunt ut labore',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        },
        {
          id: '5',
          title: 'Et dolore magna aliqua',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium'
        }
      ],
      programDetails: [
        {
          id: '1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
        },
        {
          id: '2',
          text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
        },
        {
          id: '3',
          text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur'
        }
      ],
      programFor: [
        {
          id: '1',
          text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy"
        },
        {
          id: '2',
          text: "You're thinking ahead for fertility preservation (sperm and egg freezing)"
        },
        {
          id: '3',
          text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment"
        }
      ],
      testimonials: [
        {
          id: '1',
          text: 'This program changed my life! I feel healthier and more energetic than ever before. Highly recommend to anyone looking to improve their well-being.',
          author: 'Sarah L., California'
        },
        {
          id: '2',
          text: 'I was skeptical at first, but the results speak for themselves. The personalized approach made all the difference. Thank you, Amazon Health!',
          author: 'David P., New York'
        },
        {
          id: '3',
          text: 'Easy to follow and incredibly effective. The support system is fantastic, and I\'ve achieved goals I never thought possible.',
          author: 'Emily R., Texas'
        }
      ],
      fromBrand: {
        category: 'Company Name Nutrition Counseling Program',
        title: 'Your journey to better health starts with Company Name',
        description: 'Company Name is a leader in the health and wellness space and has helped over 100,000 people improve their health through expert nutrition care.',
        bulletPoints: [
          { id: '1', text: '40,000+ 5-star reviews from Company Name clients' },
          { id: '2', text: 'Personalized 1:1 care from a registered dietitian' },
          { id: '3', text: 'Covered by insurance for 90% of Americans' }
        ],
        image: null
      },
      successfulOutcomes: {
        title: 'Lorem ipsum dolor sit amet',
        stat1: {
          number: '42%',
          label: 'lorem ipsum',
          description: 'consectetur adipiscing elit sed do eiusmod'
        },
        stat2: {
          number: '67%',
          label: 'dolor sit amet',
          description: 'tempor incididunt ut labore et dolore'
        },
        stat3: {
          number: '89%',
          label: 'magna aliqua',
          description: 'ut enim ad minim veniam quis nostrud'
        }
      },
      faq: [
        {
          id: '1',
          question: 'Lorem ipsum dolor sit amet consectetur?',
          answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
          isOpen: false
        },
        {
          id: '2',
          question: 'Sed do eiusmod tempor incididunt?',
          answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
          isOpen: false
        },
        {
          id: '3',
          question: 'Ut labore et dolore magna aliqua?',
          answer: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
          isOpen: false
        }
      ]
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [xrayMode, setXrayMode] = useState(false);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before drag starts
      },
    })
  );

  // Migrate old data format on mount
  useEffect(() => {
    // Check if fromBrand bulletPoints need migration (from strings to objects)
    if (projectData.sections?.fromBrand?.bulletPoints) {
      const bullets = projectData.sections.fromBrand.bulletPoints;
      const needsMigration = bullets.some(bullet => typeof bullet === 'string');
      
      if (needsMigration) {
        const migratedBullets = bullets.map((bullet, index) => {
          if (typeof bullet === 'string') {
            return { id: `${Date.now()}-${index}`, text: bullet };
          }
          return bullet;
        });
        
        setProjectData(prevData => ({
          ...prevData,
          sections: {
            ...prevData.sections,
            fromBrand: {
              ...prevData.sections.fromBrand,
              bulletPoints: migratedBullets
            }
          }
        }));
      }
    }
  }, [projectData.sections.fromBrand.bulletPoints, setProjectData]); // Run when bulletPoints change

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      // Auto-save is handled by useLocalStorage hook
      console.log('Auto-saved project data');
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [projectData]);

  // Update project data
  const updateProjectData = (updates) => {
    setProjectData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Update specific section
  const updateSection = (sectionName, data) => {
    setProjectData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionName]: data
      }
    }));
  };

  // Handle drag and drop reordering
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    // Parse the ID to get the type and actual ID
    const activeId = active.id;
    const overId = over.id;

    // Handle fromBrand bullet points
    if (activeId.startsWith('fromBrand-')) {
      const bulletPoints = [...(projectData.sections.fromBrand?.bulletPoints || [])];
      const oldIndex = bulletPoints.findIndex(b => `fromBrand-${b.id}` === activeId);
      const newIndex = bulletPoints.findIndex(b => `fromBrand-${b.id}` === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newBullets = arrayMove(bulletPoints, oldIndex, newIndex);
        updateSection('fromBrand', { ...projectData.sections.fromBrand, bulletPoints: newBullets });
      }
      return;
    }

    // Handle programFor items
    if (activeId.startsWith('programFor-')) {
      const programForItems = [...(projectData.sections.programFor || [])];
      const oldIndex = programForItems.findIndex(item => `programFor-${item.id}` === activeId);
      const newIndex = programForItems.findIndex(item => `programFor-${item.id}` === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(programForItems, oldIndex, newIndex);
        updateSection('programFor', newItems);
      }
      return;
    }

    // Handle testimonials
    if (activeId.startsWith('testimonial-')) {
      const testimonials = [...(projectData.sections.testimonials || [])];
      const oldIndex = testimonials.findIndex(item => `testimonial-${item.id}` === activeId);
      const newIndex = testimonials.findIndex(item => `testimonial-${item.id}` === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newTestimonials = arrayMove(testimonials, oldIndex, newIndex);
        updateSection('testimonials', newTestimonials);
      }
      return;
    }

    // Handle included items
    if (activeId.startsWith('included-')) {
      const includedItems = [...(projectData.sections.included || [])];
      const oldIndex = includedItems.findIndex(item => `included-${item.id}` === activeId);
      const newIndex = includedItems.findIndex(item => `included-${item.id}` === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newIncluded = arrayMove(includedItems, oldIndex, newIndex);
        updateSection('included', newIncluded);
      }
      return;
    }

    // Handle whatToExpect items
    if (activeId.startsWith('expect-')) {
      const expectItems = [...(projectData.sections.whatToExpect || [])];
      const oldIndex = expectItems.findIndex(item => `expect-${item.id}` === activeId);
      const newIndex = expectItems.findIndex(item => `expect-${item.id}` === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newExpect = arrayMove(expectItems, oldIndex, newIndex);
        updateSection('whatToExpect', newExpect);
      }
      return;
    }

    // Handle faq items
    if (activeId.startsWith('faq-')) {
      const faqItems = [...(projectData.sections.faq || [])];
      const oldIndex = faqItems.findIndex(item => `faq-${item.id}` === activeId);
      const newIndex = faqItems.findIndex(item => `faq-${item.id}` === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newFaq = arrayMove(faqItems, oldIndex, newIndex);
        updateSection('faq', newFaq);
      }
      return;
    }

    // Handle footnote items
    if (activeId.startsWith('footnote-')) {
      const footnotes = [...(projectData.sections.aboutFay?.footnotes || [])];
      const oldIndex = footnotes.findIndex(item => `footnote-${item.id}` === activeId);
      const newIndex = footnotes.findIndex(item => `footnote-${item.id}` === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newFootnotes = arrayMove(footnotes, oldIndex, newIndex);
        updateSection('aboutFay', { ...projectData.sections.aboutFay, footnotes: newFootnotes });
      }
      return;
    }
  };

  // Export functions
  const handleExportPDF = async () => {
    setIsLoading(true);
    try {
      await exportToPDF(projectData);
      showNotification('PDF exported successfully!', 'success');
    } catch (error) {
      showNotification('Failed to export PDF: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportHTML = async () => {
    setIsLoading(true);
    try {
      await exportToHTML(projectData);
      showNotification('HTML exported successfully!', 'success');
    } catch (error) {
      showNotification('Failed to export HTML: ' + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Save/Load project
  const handleSaveProject = async () => {
    try {
      const dataStr = JSON.stringify(projectData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      if (window.showSaveFilePicker) {
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: 'amazon-onboarding-project.json',
          types: [{
            description: 'Amazon Onboarding Projects',
            accept: { 'application/json': ['.json'] }
          }]
        });
        
        const writable = await fileHandle.createWritable();
        await writable.write(dataBlob);
        await writable.close();
      } else {
        // Fallback for browsers without File System Access API
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'amazon-onboarding-project.json';
        a.click();
        URL.revokeObjectURL(url);
      }
      
      showNotification('Project saved successfully!', 'success');
    } catch (error) {
      showNotification('Failed to save project: ' + error.message, 'error');
    }
  };

  const handleLoadProject = async () => {
    try {
      if (window.showOpenFilePicker) {
        const [fileHandle] = await window.showOpenFilePicker({
          types: [{
            description: 'Amazon Onboarding Projects',
            accept: { 'application/json': ['.json'] }
          }]
        });
        
        const file = await fileHandle.getFile();
        const contents = await file.text();
        const data = JSON.parse(contents);
        setProjectData(data);
      } else {
        // Fallback for browsers without File System Access API
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            const contents = await file.text();
            const data = JSON.parse(contents);
            setProjectData(data);
          }
        };
        input.click();
      }
      
      showNotification('Project loaded successfully!', 'success');
    } catch (error) {
      showNotification('Failed to load project: ' + error.message, 'error');
    }
  };

  // Notification system
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className={`min-h-screen bg-white ${xrayMode ? 'xray-mode' : ''}`}>
      <style>{`
        .xray-mode input[type="text"]:not([readonly]),
        .xray-mode textarea:not([readonly]) {
          outline: 2px dashed #8E44AD !important;
          outline-offset: 2px;
          color: #8E44AD !important;
        }
        .xray-mode input[type="text"]:not([readonly]):focus,
        .xray-mode textarea:not([readonly]):focus {
          outline: 2px solid #8E44AD !important;
        }
        .xray-mode .price-text-dropdown > div {
          outline: 2px dashed #8E44AD !important;
          outline-offset: 2px;
          color: #8E44AD !important;
        }
        .xray-mode .price-text-dropdown > div span {
          color: #8E44AD !important;
        }
      `}</style>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* Amazon Header */}
        <AmazonHeader />
        
        {/* Main Content */}
        <main className="bg-white font-amazon">
          {/* Product Section */}
          <ProductSection
            data={projectData}
            onUpdate={updateProjectData}
            onImageUpload={(imageData, type) => {
              if (type === 'hero') {
                updateProjectData({
                  images: { ...projectData.images, hero: imageData }
                });
              } else {
                const newThumbnails = [...projectData.images.thumbnails, imageData];
                updateProjectData({
                  images: { ...projectData.images, thumbnails: newThumbnails }
                });
              }
            }}
          />

          {/* Content Sections */}
          <ContentSection
            sections={projectData.sections}
            onUpdateSection={updateSection}
          />

          {/* Footer */}
          <Footer 
            data={projectData.footer}
            onUpdate={(footerData) => updateProjectData({ footer: footerData })}
          />
        </main>

        {/* Control Panel */}
        <ControlPanel
          onSave={handleSaveProject}
          onLoad={handleLoadProject}
          onExportPDF={handleExportPDF}
          onExportHTML={handleExportHTML}
          isLoading={isLoading}
          xrayMode={xrayMode}
          onToggleXray={() => setXrayMode(!xrayMode)}
        />

        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === 'error' ? 'bg-red-500' : 
            notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
          } text-white`}>
            {notification.message}
          </div>
        )}
      </DndContext>
    </div>
  );
}

export default App;





