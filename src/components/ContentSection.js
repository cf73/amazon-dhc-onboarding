import React, { useEffect, useRef } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDropzone } from 'react-dropzone';
import { PlusIcon, XMarkIcon, ChevronDownIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import quoteMarks from '../assets/quotemarks.png';
import jadeCheckmark from '../assets/jade-checkmark-transparent.png';

// Sortable Testimonial Component
const SortableTestimonial = ({ item, updateItem, removeItem, textareaRefs }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `testimonial-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative text-center mb-12">
      {/* Content with Glass Effect */}
      <div
        className="rounded-lg transition-all duration-200 relative"
        style={{
          padding: '16px',
          margin: '-16px',
          backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.67)' : 'transparent',
          backdropFilter: isDragging ? 'blur(10px)' : 'none',
          boxShadow: isDragging ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
          border: isDragging ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
        }}
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.67)';
            e.currentTarget.style.backdropFilter = 'blur(10px)';
            e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.backdropFilter = 'none';
            e.currentTarget.style.border = '1px solid transparent';
          }
        }}
      >
        {/* Action Icons - Top Right */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {/* Drag Handle */}
          <div
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
            </svg>
          </div>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem('testimonials', item.id);
            }}
            style={{ cursor: 'pointer', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" fill="rgba(220, 38, 38, 0.1)" />
              <path d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div>
          <textarea
            ref={(el) => (textareaRefs.current[item.id] = el)}
            value={`\u201C${item.text}\u201D`}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/^[\u201C\u201D"]|[\u201C\u201D"]$/g, '');
              updateItem('testimonials', item.id, { text: value });
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className="w-full bg-transparent border-none outline-none resize-none text-center overflow-hidden cursor-text"
            style={{ fontFamily: 'Amazon Ember', fontSize: '20px', fontWeight: '400', lineHeight: '28px', color: '#0F1111', minHeight: '28px', marginBottom: '0' }}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            rows={1}
          />
        </div>
        <div className="flex items-center justify-center" style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', lineHeight: '21px', color: '#565959' }}>
          <span style={{ marginRight: '4px' }}>—</span>
          <input
            type="text"
            value={item.author}
            onChange={(e) => updateItem('testimonials', item.id, { author: e.target.value })}
            className="bg-transparent border-none outline-none text-left cursor-text"
            style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', lineHeight: '21px', color: '#565959' }}
            placeholder="Tanya F., Florida"
          />
        </div>
      </div>
    </div>
  );
};

// Sortable What to Expect Item
const SortableExpectItem = ({ item, index, sections, onUpdateSection }) => {
  const textareaRef = useRef(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `expect-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const backgroundColor = index % 2 === 0 ? '#F5F7FD' : '#FAFAFA';

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [item.description]);

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const updatedItems = sections.whatToExpect.map(expectItem =>
          expectItem.id === item.id ? { ...expectItem, image: reader.result } : expectItem
        );
        onUpdateSection('whatToExpect', updatedItems);
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <div ref={setNodeRef} style={{ ...style, marginBottom: '20px', touchAction: 'none' }}>
      <div
        className="group relative transition-all duration-200"
        style={{
          backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.67)' : backgroundColor,
          backdropFilter: isDragging ? 'blur(10px)' : 'none',
          boxShadow: isDragging ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
          border: isDragging ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
          marginLeft: '60px',
          marginRight: '60px',
          borderRadius: '24px',
        }}
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backdropFilter = 'blur(5px)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backdropFilter = 'none';
          }
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '112px',
            paddingRight: '112px',
            paddingTop: '30px',
            paddingBottom: '30px',
            gap: '100px',
          }}
        >
        {/* Left Column - Text Content */}
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={item.title}
            onChange={(e) => {
              const updatedItems = sections.whatToExpect.map(expectItem =>
                expectItem.id === item.id ? { ...expectItem, title: e.target.value } : expectItem
              );
              onUpdateSection('whatToExpect', updatedItems);
            }}
            className="w-full bg-transparent border-none outline-none mb-4"
            style={{ fontFamily: 'Amazon Ember', fontSize: '18px', fontWeight: '700', color: '#0F1111', lineHeight: '24px' }}
            placeholder="Lorem ipsum dolor"
          />
          <textarea
            ref={textareaRef}
            value={item.description}
            onChange={(e) => {
              const updatedItems = sections.whatToExpect.map(expectItem =>
                expectItem.id === item.id ? { ...expectItem, description: e.target.value } : expectItem
              );
              onUpdateSection('whatToExpect', updatedItems);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
            style={{ fontFamily: 'Amazon Ember', fontSize: '15px', fontWeight: '400', color: '#0F1111', lineHeight: '20px' }}
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </div>

        {/* Right Column - Image */}
        <div className="relative" style={{ flexShrink: 0 }}>
          {item.image ? (
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '350px', height: '250px', objectFit: 'cover', borderRadius: '20px' }}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const updatedItems = sections.whatToExpect.map(expectItem =>
                    expectItem.id === item.id ? { ...expectItem, image: null } : expectItem
                  );
                  onUpdateSection('whatToExpect', updatedItems);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ) : (
            <div
              {...getImageRootProps()}
              className="cursor-pointer"
              style={{ width: '350px', height: '250px', border: '2px dashed #D5D9D9', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F7F7' }}
            >
              <input {...getImageInputProps()} />
              <div className="text-center">
                <PhotoIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Drop image or click to upload</p>
                <p className="text-xs text-gray-400 mt-1">350x250px recommended</p>
              </div>
            </div>
          )}
        </div>

        </div>

        {/* Action Icons - Top Right */}
        <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          {/* Drag Handle */}
          <div
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
            </svg>
          </div>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const updatedItems = sections.whatToExpect.filter(expectItem => expectItem.id !== item.id);
              onUpdateSection('whatToExpect', updatedItems);
            }}
            style={{ cursor: 'pointer', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" fill="rgba(220, 38, 38, 0.1)" />
              <path d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Sortable Bullet Point Component
const SortableBullet = ({ bullet, bulletIndex, sections, onUpdateSection, jadeCheckmark }) => {
  const bulletId = typeof bullet === 'object' && bullet.id ? `fromBrand-${bullet.id}` : `fromBrand-bullet-${bulletIndex}`;
  const bulletText = typeof bullet === 'object' ? bullet.text : bullet;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: bulletId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: bulletIndex === (sections.fromBrand?.bulletPoints || []).length - 1 ? '0' : '16px',
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      {/* Content Row with Glass Effect on Hover */}
      <div
        className="flex items-center rounded-lg transition-all duration-200"
        style={{ 
          gap: '12px',
          padding: '8px 12px',
          margin: '-8px -12px',
          backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.67)' : 'transparent',
          backdropFilter: isDragging ? 'blur(10px)' : 'none',
          boxShadow: isDragging ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
          border: isDragging ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
        }}
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.67)';
            e.currentTarget.style.backdropFilter = 'blur(10px)';
            e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.backdropFilter = 'none';
            e.currentTarget.style.border = '1px solid transparent';
          }
        }}
      >
        <img 
          src={jadeCheckmark} 
          alt="checkmark" 
          style={{ width: '15px', height: '11.25px', flexShrink: 0 }}
        />
        <div className="flex-1">
          <input
            type="text"
            value={bulletText}
            onChange={(e) => {
              const newBullets = [...(sections.fromBrand?.bulletPoints || [])];
              if (typeof newBullets[bulletIndex] === 'object') {
                newBullets[bulletIndex] = { ...newBullets[bulletIndex], text: e.target.value };
              } else {
                newBullets[bulletIndex] = e.target.value;
              }
              onUpdateSection('fromBrand', { ...sections.fromBrand, bulletPoints: newBullets });
            }}
            className="w-full bg-transparent border-none outline-none cursor-text"
            style={{ 
              fontFamily: 'Amazon Ember', 
              fontSize: '14px', 
              fontWeight: '400', 
              color: '#0F1111',
              lineHeight: '20px'
            }}
            placeholder="40,000+ 5-star reviews from Fay clients"
          />
        </div>
        {/* Action Icons - Right Side */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" style={{ marginRight: '-4px' }}>
          {/* Drag Handle */}
          <div
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
            </svg>
          </div>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newBullets = [...(sections.fromBrand?.bulletPoints || [])];
              newBullets.splice(bulletIndex, 1);
              onUpdateSection('fromBrand', { ...sections.fromBrand, bulletPoints: newBullets });
            }}
            style={{ cursor: 'pointer', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" fill="rgba(220, 38, 38, 0.1)" />
              <path d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Sortable FAQ Item
const SortableFAQItem = ({ item, index, sections, updateItem, removeItem, toggleFAQ }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `faq-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={{ ...style, marginBottom: index === sections.faq.length - 1 ? '0' : '0' }}>
      <div
        className="group relative transition-all duration-200"
        style={{
          borderBottom: index === sections.faq.length - 1 ? 'none' : '1px solid #D5D9D9',
          paddingTop: index === 0 ? '0' : '16px',
          paddingBottom: '16px',
          backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.67)' : 'transparent',
          backdropFilter: isDragging ? 'blur(10px)' : 'none',
          boxShadow: isDragging ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
        }}
      >
        <div 
          className="cursor-pointer"
          onClick={() => toggleFAQ(item.id)}
          style={{ paddingRight: '60px' }}
        >
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={item.question}
              onChange={(e) => updateItem('faq', item.id, { question: e.target.value })}
              className="flex-1 bg-transparent border-none outline-none"
              style={{ fontFamily: 'Amazon Ember', fontSize: '16px', fontWeight: '600', color: '#232f3e', lineHeight: '24px' }}
              placeholder="Lorem ipsum dolor sit amet?"
              onClick={(e) => e.stopPropagation()}
            />
            <ChevronDownIcon 
              className="transition-transform flex-shrink-0"
              style={{ 
                width: '20px', 
                height: '20px', 
                color: '#0F1111',
                transform: item.isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                marginLeft: '16px'
              }} 
            />
          </div>
        </div>
        {item.isOpen && (
          <div style={{ paddingTop: '12px', paddingRight: '60px' }}>
            <textarea
              value={item.answer}
              onChange={(e) => updateItem('faq', item.id, { answer: e.target.value })}
              className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
              style={{ fontFamily: 'Amazon Ember', fontSize: '15px', fontWeight: '400', color: '#0F1111', lineHeight: '20px' }}
              placeholder="Lorem ipsum dolor sit amet consectetur..."
              rows={3}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        )}
        
        {/* Action Icons - Top Right */}
        <div className="absolute top-4 right-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
          {/* Drag Handle */}
          <div
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="4" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="8" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="5" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
              <circle cx="11" cy="12" r="1.2" fill="rgba(142, 68, 173, 0.6)" />
            </svg>
          </div>
          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem('faq', item.id);
            }}
            style={{ cursor: 'pointer', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" fill="rgba(220, 38, 38, 0.1)" />
              <path d="M10.5 5.5L5.5 10.5M5.5 5.5L10.5 10.5" stroke="rgba(220, 38, 38, 0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const ContentSection = ({ sections, onUpdateSection }) => {
  const textareaRefs = useRef({});

  useEffect(() => {
    // Auto-resize all textareas on mount and when content changes
    Object.values(textareaRefs.current).forEach(textarea => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
    });
  }, [sections.testimonials, sections.fromBrand]);
  
  const addItem = (sectionName, newItem) => {
    const currentItems = sections[sectionName] || [];
    onUpdateSection(sectionName, [...currentItems, { ...newItem, id: uuidv4() }]);
  };

  const removeItem = (sectionName, itemId) => {
    const currentItems = sections[sectionName] || [];
    onUpdateSection(sectionName, currentItems.filter(item => item.id !== itemId));
  };

  const updateItem = (sectionName, itemId, updates) => {
    const currentItems = sections[sectionName] || [];
    onUpdateSection(sectionName, currentItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
  };

  const toggleFAQ = (itemId) => {
    updateItem('faq', itemId, { isOpen: !sections.faq.find(item => item.id === itemId)?.isOpen });
  };

  return (
    <div className="space-y-8 mt-8">

      {/* Customer Testimonials Section */}
      <div className="pt-6">
        {/* Header with Quote Icon and Title - Shows Once */}
        <div className="text-center mb-8">
          {/* Large Quote Icon */}
          <div className="flex justify-center mb-6">
            <img src={quoteMarks} alt="Quote marks" className="w-12 h-auto" />
          </div>

          {/* Section Title */}
          <h3 className="text-center uppercase mb-8" style={{ fontFamily: 'Amazon Ember', fontSize: '20px', fontWeight: '700', lineHeight: '28px', color: '#017E7E' }}>
            What Members Are Saying
          </h3>
        </div>

        {/* Testimonials Stack */}
        <SortableContext 
          items={(sections.testimonials || []).map(item => `testimonial-${item.id}`)}
          strategy={verticalListSortingStrategy}
        >
          <div className="mb-6 max-w-4xl mx-auto" style={{ paddingTop: '16px' }}>
            {sections.testimonials?.map((item) => (
              <SortableTestimonial
                key={`testimonial-${item.id}`}
                item={item}
                updateItem={updateItem}
                removeItem={removeItem}
                textareaRefs={textareaRefs}
              />
            ))}
          </div>
        </SortableContext>
        <div className="flex justify-center">
          <button
            onClick={() => addItem('testimonials', { 
              text: 'New testimonial content goes here...', 
              author: 'Member Name' 
            })}
            className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark font-medium text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* From the Brand Section */}
      <div className="pt-6" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
        <h2 style={{ fontFamily: 'Amazon Ember', fontSize: '18px', fontWeight: '700', color: '#0F1111', marginBottom: '16px' }}>From the brand</h2>
        <div className="grid items-start mb-8" style={{ gridTemplateColumns: '555px 1fr', gap: '16px' }}>
          {/* Left Column - Image */}
          <div className="relative">
            {sections.fromBrand?.image ? (
              <img
                src={sections.fromBrand.image}
                alt="Brand content"
                className="object-cover rounded-lg"
                style={{ width: '555px', height: '312px' }}
              />
            ) : (
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center" style={{ width: '555px', height: '312px' }}>
                <div className="text-center">
                  <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Upload brand image</p>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    onUpdateSection('fromBrand', { ...sections.fromBrand, image: event.target.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Right Column - Content */}
          <div>
            <div style={{ marginBottom: '8px' }}>
              <input
                type="text"
                value={sections.fromBrand?.category || ''}
                onChange={(e) => onUpdateSection('fromBrand', { ...sections.fromBrand, category: e.target.value })}
                className="bg-transparent border-none outline-none w-full"
                style={{ 
                  fontFamily: 'Amazon Ember', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#232f3e',
                  lineHeight: '21px',
                  textAlign: 'start'
                }}
                placeholder="Fay Nutrition Counseling Program"
              />
            </div>
            
            <h3 style={{ marginBottom: '12px' }}>
              <textarea
                ref={(el) => (textareaRefs.current['fromBrand-title'] = el)}
                value={sections.fromBrand?.title || ''}
                onChange={(e) => onUpdateSection('fromBrand', { ...sections.fromBrand, title: e.target.value })}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="bg-transparent border-none outline-none w-full resize-none overflow-hidden"
                style={{ 
                  fontFamily: 'Amazon Ember', 
                  fontSize: '26px', 
                  fontWeight: '700', 
                  color: '#0F1111',
                  lineHeight: '30px',
                  overflowWrap: 'break-word',
                  textAlign: 'left',
                  minHeight: '30px'
                }}
                placeholder="Your journey to better health starts with Fay"
                rows={1}
              />
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <textarea
                ref={(el) => (textareaRefs.current['fromBrand-description'] = el)}
                value={sections.fromBrand?.description || ''}
                onChange={(e) => onUpdateSection('fromBrand', { ...sections.fromBrand, description: e.target.value })}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                className="bg-transparent border-none outline-none w-full resize-none overflow-hidden"
                style={{ 
                  fontFamily: 'Amazon Ember', 
                  fontSize: '14px', 
                  fontWeight: '400', 
                  color: '#565959',
                  lineHeight: '21px',
                  minHeight: '42px'
                }}
                placeholder="Fay is a leader in the health and wellness space and has helped over 100,000 people improve their health through expert nutrition care."
                rows={2}
              />
            </div>

            {/* Bullet Points */}
            <div style={{ backgroundColor: '#F0F2F2', padding: '24px', borderRadius: '8px' }}>
              <SortableContext
                items={(sections.fromBrand?.bulletPoints || []).map((bullet, bulletIndex) => 
                  typeof bullet === 'object' && bullet.id ? `fromBrand-${bullet.id}` : `fromBrand-bullet-${bulletIndex}`
                )}
                strategy={verticalListSortingStrategy}
              >
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                  {(sections.fromBrand?.bulletPoints || []).map((bullet, bulletIndex) => (
                    <SortableBullet
                      key={typeof bullet === 'object' && bullet.id ? `fromBrand-${bullet.id}` : `fromBrand-bullet-${bulletIndex}`}
                      bullet={bullet}
                      bulletIndex={bulletIndex}
                      sections={sections}
                      onUpdateSection={onUpdateSection}
                      jadeCheckmark={jadeCheckmark}
                    />
                  ))}
                </div>
              </SortableContext>
              <button
                onClick={() => {
                  const newBullet = { id: uuidv4(), text: 'New benefit point' };
                  const newBullets = [...(sections.fromBrand?.bulletPoints || []), newBullet];
                  onUpdateSection('fromBrand', { ...sections.fromBrand, bulletPoints: newBullets });
                }}
                className="flex items-center text-amazon-orange hover:text-amazon-orange-dark"
                style={{ gap: '8px', fontFamily: 'Amazon Ember', fontSize: '13px', fontWeight: '400' }}
              >
                <PlusIcon className="w-4 h-4" />
                Add Bullet Point
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Successful Outcomes Section */}
      <div className="pt-6" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
        <h2 className="text-xl font-bold mb-8 text-amazon-text">
          Successful outcomes of the program†
        </h2>
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Column 1 */}
          <div style={{ textAlign: 'start' }}>
            <div className="mb-2">
              <input
                type="text"
                value={sections.successfulOutcomes?.stat1?.number || '85%'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat1: { ...sections.successfulOutcomes?.stat1, number: e.target.value }
                })}
                className="bg-transparent border-none outline-none w-full"
                style={{ fontFamily: 'Amazon Ember', fontSize: '26px', fontWeight: 'bolder', lineHeight: '30px', color: '#037575', textAlign: 'start' }}
                placeholder="85%"
              />
            </div>
            <div>
              <textarea
                value={sections.successfulOutcomes?.stat1?.description || 'per IVF transfer compared to national average†'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat1: { ...sections.successfulOutcomes?.stat1, description: e.target.value }
                })}
                className="w-full bg-transparent border-none outline-none resize-none"
                style={{ fontFamily: 'Amazon Ember', fontSize: '16px', fontWeight: '400', lineHeight: '24px', color: '#232F3E', textAlign: 'start' }}
                placeholder="consectetur adipiscing elit sed do eiusmod"
                rows={2}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ textAlign: 'start' }}>
            <div className="mb-2">
              <input
                type="text"
                value={sections.successfulOutcomes?.stat2?.number || '9 out of 10'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat2: { ...sections.successfulOutcomes?.stat2, number: e.target.value }
                })}
                className="bg-transparent border-none outline-none w-full"
                style={{ fontFamily: 'Amazon Ember', fontSize: '26px', fontWeight: 'bolder', lineHeight: '30px', color: '#037575', textAlign: 'start' }}
                placeholder="9 out of 10"
              />
            </div>
            <div>
              <textarea
                value={sections.successfulOutcomes?.stat2?.description || 'compared to national average†'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat2: { ...sections.successfulOutcomes?.stat2, description: e.target.value }
                })}
                className="w-full bg-transparent border-none outline-none resize-none"
                style={{ fontFamily: 'Amazon Ember', fontSize: '16px', fontWeight: '400', lineHeight: '24px', color: '#232F3E', textAlign: 'start' }}
                placeholder="tempor incididunt ut labore et dolore"
                rows={2}
              />
            </div>
          </div>

          {/* Column 3 */}
          <div style={{ textAlign: 'start' }}>
            <div className="mb-2">
              <input
                type="text"
                value={sections.successfulOutcomes?.stat3?.number || '$25'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat3: { ...sections.successfulOutcomes?.stat3, number: e.target.value }
                })}
                className="bg-transparent border-none outline-none w-full"
                style={{ fontFamily: 'Amazon Ember', fontSize: '26px', fontWeight: 'bolder', lineHeight: '30px', color: '#037575', textAlign: 'start' }}
                placeholder="$25"
              />
            </div>
            <div>
              <textarea
                value={sections.successfulOutcomes?.stat3?.description || 'compared to national average‡'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat3: { ...sections.successfulOutcomes?.stat3, description: e.target.value }
                })}
                className="w-full bg-transparent border-none outline-none resize-none"
                style={{ fontFamily: 'Amazon Ember', fontSize: '16px', fontWeight: '400', lineHeight: '24px', color: '#232F3E', textAlign: 'start' }}
                placeholder="ut enim ad minim veniam quis nostrud"
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="pt-12">
        <h2 style={{ fontFamily: 'Amazon Ember', fontSize: '18px', fontWeight: '700', color: '#0F1111', marginBottom: '24px', paddingLeft: '60px', paddingRight: '60px' }}>
          What to expect
        </h2>
        <SortableContext
          items={(sections.whatToExpect || []).length > 0 ? sections.whatToExpect.map(item => `expect-${item.id}`) : ['expect-1', 'expect-2']}
          strategy={verticalListSortingStrategy}
        >
          {(sections.whatToExpect && sections.whatToExpect.length > 0 ? sections.whatToExpect : [
            {
              id: '1',
              title: 'Customized plan',
              description: 'Registered Dietitians (RDs) meet with you 1-on-1 to design a plan that is customized to your unique needs. This could include meal planning, journaling, or a number of other methods that are clinically-proven to work.',
              image: null
            },
            {
              id: '2',
              title: 'Affordable care',
              description: 'Seeing a Registered Dietitian can cost up to $150 per session without insurance, but when you book through Fay, you\'re likely to pay closer to $10. In fact, for most people, sessions are free with insurance.',
              image: null
            }
          ]).map((item, index) => (
            <SortableExpectItem
              key={`expect-${item.id}`}
              item={item}
              index={index}
              sections={sections}
              onUpdateSection={onUpdateSection}
            />
          ))}
        </SortableContext>
        <div style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '24px' }}>
          <button
            onClick={() => {
              const currentItems = sections.whatToExpect || [
                {
                  id: '1',
                  title: 'Customized plan',
                  description: 'Registered Dietitians (RDs) meet with you 1-on-1 to design a plan that is customized to your unique needs. This could include meal planning, journaling, or a number of other methods that are clinically-proven to work.',
                  image: null
                },
                {
                  id: '2',
                  title: 'Affordable care',
                  description: 'Seeing a Registered Dietitian can cost up to $150 per session without insurance, but when you book through Fay, you\'re likely to pay closer to $10. In fact, for most people, sessions are free with insurance.',
                  image: null
                }
              ];
              const newItem = {
                id: Date.now().toString(),
                title: 'New section',
                description: 'Description for the new section goes here.',
                image: null
              };
              onUpdateSection('whatToExpect', [...currentItems, newItem]);
            }}
            className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark font-medium text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add Section
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pt-12" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
        <h2 style={{ fontFamily: 'Amazon Ember', fontSize: '20px', fontWeight: '700', color: '#232f3e', lineHeight: '24px', marginBottom: '24px' }}>
          Frequently asked questions
        </h2>
        <SortableContext
          items={(sections.faq || []).map(item => `faq-${item.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {(sections.faq || []).map((item, index) => (
            <SortableFAQItem
              key={`faq-${item.id}`}
              item={item}
              index={index}
              sections={sections}
              updateItem={updateItem}
              removeItem={removeItem}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </SortableContext>
        <button
          onClick={() => addItem('faq', { 
            question: 'New question?', 
            answer: 'Answer to the new question...', 
            isOpen: false 
          })}
          className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark"
          style={{ fontFamily: 'Amazon Ember', fontSize: '13px', fontWeight: '400', marginTop: '16px' }}
        >
          <PlusIcon className="w-4 h-4" />
          Add FAQ
        </button>
      </div>

      {/* About Fay Section */}
      <div className="pt-12" style={{ paddingLeft: '60px', paddingRight: '60px' }}>
        <div className="flex items-start gap-3 mb-6">
          {/* Editable Logo */}
          <div className="flex-shrink-0">
            {sections.aboutFay?.logo ? (
              <div className="relative group">
                <img 
                  src={sections.aboutFay.logo} 
                  alt="Logo" 
                  style={{ width: '120px', height: '40px', objectFit: 'contain' }}
                />
                <button
                  onClick={() => {
                    onUpdateSection('aboutFay', { ...sections.aboutFay, logo: null });
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <XMarkIcon className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                      onUpdateSection('aboutFay', { 
                        ...sections.aboutFay, 
                        logo: reader.result 
                      });
                    };
                    reader.readAsDataURL(file);
                  };
                  input.click();
                }}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-amazon-orange transition-colors"
                style={{ width: '120px', height: '40px' }}
              >
                <PhotoIcon className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Heading */}
          <div>
            <h3 style={{ fontFamily: 'Amazon Ember', fontSize: '20px', fontWeight: '700', color: '#232f3e', lineHeight: '24px' }}>
              About{' '}
              <input
                type="text"
                value={sections.aboutFay?.brandName || 'Company name'}
                onChange={(e) => {
                  onUpdateSection('aboutFay', { 
                    ...sections.aboutFay, 
                    brandName: e.target.value 
                  });
                }}
                className="bg-transparent border-none outline-none"
                style={{ fontFamily: 'Amazon Ember', fontSize: '20px', fontWeight: '700', color: '#232f3e', lineHeight: '24px', width: 'auto', display: 'inline' }}
                placeholder="Company name"
              />
            </h3>
          </div>
        </div>

        {/* Description Paragraphs */}
        <div className="space-y-4">
          <textarea
            value={sections.aboutFay?.paragraph1 || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
            onChange={(e) => {
              onUpdateSection('aboutFay', { 
                ...sections.aboutFay, 
                paragraph1: e.target.value 
              });
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
            style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', color: '#565959', lineHeight: '21px' }}
            placeholder="First paragraph..."
          />
          
          <textarea
            value={sections.aboutFay?.paragraph2 || 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
            onChange={(e) => {
              onUpdateSection('aboutFay', { 
                ...sections.aboutFay, 
                paragraph2: e.target.value 
              });
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
            style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', color: '#565959', lineHeight: '21px' }}
            placeholder="Second paragraph..."
          />
        </div>

        {/* Footer Notes */}
        <div className="mt-8 space-y-2" style={{ fontSize: '12px', color: '#565959', lineHeight: '16px' }}>
          <input
            type="text"
            value={sections.aboutFay?.footnote1 || '* Eligibility is based on application and acceptance into the program.'}
            onChange={(e) => {
              onUpdateSection('aboutFay', { 
                ...sections.aboutFay, 
                footnote1: e.target.value 
              });
            }}
            className="w-full bg-transparent border-none outline-none"
            style={{ fontFamily: 'Amazon Ember', fontSize: '12px', fontWeight: '400', color: '#565959', lineHeight: '16px' }}
            placeholder="* Footnote 1"
          />
          <input
            type="text"
            value={sections.aboutFay?.footnote2 || '† Internal Fay Client Survey, March 2023 (n = 167)'}
            onChange={(e) => {
              onUpdateSection('aboutFay', { 
                ...sections.aboutFay, 
                footnote2: e.target.value 
              });
            }}
            className="w-full bg-transparent border-none outline-none"
            style={{ fontFamily: 'Amazon Ember', fontSize: '12px', fontWeight: '400', color: '#565959', lineHeight: '16px' }}
            placeholder="† Footnote 2"
          />
          <input
            type="text"
            value={sections.aboutFay?.footnote3 || '‡ Source: Internal Claims Processing (Date Range: 01/01/25 — 06/30/25)'}
            onChange={(e) => {
              onUpdateSection('aboutFay', { 
                ...sections.aboutFay, 
                footnote3: e.target.value 
              });
            }}
            className="w-full bg-transparent border-none outline-none"
            style={{ fontFamily: 'Amazon Ember', fontSize: '12px', fontWeight: '400', color: '#565959', lineHeight: '16px' }}
            placeholder="‡ Footnote 3"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;






