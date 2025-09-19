import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import AmazonHeader from './components/AmazonHeader';
import ProductSection from './components/ProductSection';
import ContentSection from './components/ContentSection';
import ControlPanel from './components/ControlPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { exportToPDF, exportToHTML } from './utils/exportUtils';
import './styles/compiled.css';

function App() {
  // Main application state
  const [projectData, setProjectData] = useLocalStorage('amazon-onboarding-data', {
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore',
    brand: 'Lorem Brand',
    price: '$0',
    priceUnit: '99',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ctaText: 'Lorem Ipsum',
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
          text: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          id: '2',
          text: 'Sed do eiusmod tempor incididunt ut labore'
        },
        {
          id: '3',
          text: 'Ut enim ad minim veniam quis nostrud'
        },
        {
          id: '4',
          text: 'Duis aute irure dolor in reprehenderit'
        }
      ],
      testimonials: [
        {
          id: '1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          author: '– Lorem Ipsum'
        }
      ],
      fromBrand: {
        category: 'Lorem Ipsum Category',
        title: 'Lorem ipsum dolor sit amet consectetur',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        bulletPoints: [
          'Lorem ipsum dolor sit amet consectetur adipiscing elit',
          'Sed do eiusmod tempor incididunt ut labore et dolore',
          'Ut enim ad minim veniam quis nostrud exercitation',
          'Duis aute irure dolor in reprehenderit in voluptate'
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
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;
    
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sectionData = [...projectData.sections[type]];
    const [removed] = sectionData.splice(source.index, 1);
    sectionData.splice(destination.index, 0, removed);

    updateSection(type, sectionData);
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
    <div className="min-h-screen bg-white">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Amazon Header */}
        <AmazonHeader />
        
        {/* Main Content */}
        <main className="max-w-amazon mx-auto px-4 bg-white font-amazon">
          {/* Breadcrumb */}
          <nav className="pt-4 pb-2 text-xs text-amazon-text-light">
            <input
              type="text"
              value={projectData.breadcrumb}
              onChange={(e) => updateProjectData({ breadcrumb: e.target.value })}
              className="bg-transparent border-none outline-none cursor-pointer hover:text-amazon-red hover:underline"
            />
          </nav>

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
        </main>

        {/* Control Panel */}
        <ControlPanel
          onSave={handleSaveProject}
          onLoad={handleLoadProject}
          onExportPDF={handleExportPDF}
          onExportHTML={handleExportHTML}
          isLoading={isLoading}
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
      </DragDropContext>
    </div>
  );
}

export default App;





