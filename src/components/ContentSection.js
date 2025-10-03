import React, { useEffect, useRef } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon, XMarkIcon, ChevronDownIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';
import quoteMarks from '../assets/quotemarks.png';
import jadeCheckmark from '../assets/jade-checkmark-transparent.png';

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
        <Droppable droppableId="testimonials" type="testimonials">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mb-6 max-w-4xl mx-auto">
              {sections.testimonials?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group hover:shadow-sm transition-shadow relative text-center mb-12 ${
                        snapshot.isDragging ? 'shadow-lg bg-white rounded-lg p-4' : ''
                      }`}
                    >
                      <div {...provided.dragHandleProps} className="absolute top-2 left-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-2 h-4 flex flex-col justify-center space-y-0.5">
                          <div className="w-full h-0.5 bg-gray-400 rounded"></div>
                          <div className="w-full h-0.5 bg-gray-400 rounded"></div>
                          <div className="w-full h-0.5 bg-gray-400 rounded"></div>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <div>
                        <textarea
                          ref={(el) => (textareaRefs.current[item.id] = el)}
                          value={`\u201C${item.text}\u201D`}
                          onChange={(e) => {
                            let value = e.target.value;
                            // Remove quotes if user adds them, we'll add them automatically
                            value = value.replace(/^[\u201C\u201D"]|[\u201C\u201D"]$/g, '');
                            updateItem('testimonials', item.id, { text: value });
                          }}
                          onInput={(e) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                          className="w-full bg-transparent border-none outline-none resize-none text-center overflow-hidden"
                          style={{ fontFamily: 'Amazon Ember', fontSize: '20px', fontWeight: '400', lineHeight: '28px', color: '#0F1111', minHeight: '28px', marginBottom: '0' }}
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                          rows={1}
                        />
                      </div>

                      {/* Author */}
                      <div className="flex items-center justify-center" style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', lineHeight: '21px', color: '#565959' }}>
                        <span style={{ marginRight: '4px' }}>—</span>
                        <input
                          type="text"
                          value={item.author}
                          onChange={(e) => updateItem('testimonials', item.id, { author: e.target.value })}
                          className="bg-transparent border-none outline-none text-left"
                          style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', lineHeight: '21px', color: '#565959' }}
                          placeholder="Tanya F., Florida"
                        />
                      </div>

                      <button
                        onClick={() => removeItem('testimonials', item.id)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(sections.fromBrand?.bulletPoints || []).map((bullet, bulletIndex) => (
                  <div key={bulletIndex} className="group flex items-center" style={{ gap: '12px' }}>
                    <img 
                      src={jadeCheckmark} 
                      alt="checkmark" 
                      style={{ width: '15px', height: '11.25px', flexShrink: 0 }}
                    />
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => {
                          const newBullets = [...(sections.fromBrand?.bulletPoints || [])];
                          newBullets[bulletIndex] = e.target.value;
                          onUpdateSection('fromBrand', { ...sections.fromBrand, bulletPoints: newBullets });
                        }}
                        className="w-full bg-transparent border-none outline-none"
                        style={{ 
                          fontFamily: 'Amazon Ember', 
                          fontSize: '14px', 
                          fontWeight: '400', 
                          color: '#0F1111',
                          lineHeight: '20px'
                        }}
                        placeholder="40,000+ 5-star reviews from Fay clients"
                      />
                      <button
                        onClick={() => {
                          const newBullets = [...(sections.fromBrand?.bulletPoints || [])];
                          newBullets.splice(bulletIndex, 1);
                          onUpdateSection('fromBrand', { ...sections.fromBrand, bulletPoints: newBullets });
                        }}
                        className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newBullets = [...(sections.fromBrand?.bulletPoints || []), 'New benefit point'];
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
      </div>

      {/* Successful Outcomes Section */}
      <div className="pt-6 border-t border-amazon-border-light">
        <h2 className="text-xl font-bold mb-8 text-amazon-text">
          <input
            type="text"
            value={sections.successfulOutcomes?.title || 'Successful outcomes of the program'}
            onChange={(e) => onUpdateSection('successfulOutcomes', { ...sections.successfulOutcomes, title: e.target.value })}
            className="w-full bg-transparent border-none outline-none text-xl font-bold text-amazon-text"
            placeholder="Lorem ipsum dolor sit amet"
          />
        </h2>
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Column 1 */}
          <div className="text-center">
            <div className="mb-2">
              <input
                type="text"
                value={sections.successfulOutcomes?.stat1?.number || '12%'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat1: { ...sections.successfulOutcomes?.stat1, number: e.target.value }
                })}
                className="text-3xl font-bold text-teal-600 bg-transparent border-none outline-none text-center w-full"
                placeholder="42%"
              />
              <span className="text-3xl font-bold text-teal-600 ml-1">
                <input
                  type="text"
                  value={sections.successfulOutcomes?.stat1?.label || 'more pregnancies'}
                  onChange={(e) => onUpdateSection('successfulOutcomes', { 
                    ...sections.successfulOutcomes, 
                    stat1: { ...sections.successfulOutcomes?.stat1, label: e.target.value }
                  })}
                  className="bg-transparent border-none outline-none text-center"
                  placeholder="lorem ipsum"
                />
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <textarea
                value={sections.successfulOutcomes?.stat1?.description || 'per IVF transfer compared to national average†'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat1: { ...sections.successfulOutcomes?.stat1, description: e.target.value }
                })}
                className="w-full bg-transparent border-none outline-none text-center resize-none text-sm text-gray-600"
                placeholder="consectetur adipiscing elit sed do eiusmod"
                rows={2}
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="text-center">
            <div className="mb-2">
              <input
                type="text"
                value={sections.successfulOutcomes?.stat2?.number || '21%'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat2: { ...sections.successfulOutcomes?.stat2, number: e.target.value }
                })}
                className="text-3xl font-bold text-teal-600 bg-transparent border-none outline-none text-center w-full"
                placeholder="67%"
              />
              <span className="text-3xl font-bold text-teal-600 ml-1">
                <input
                  type="text"
                  value={sections.successfulOutcomes?.stat2?.label || 'fewer miscarriages'}
                  onChange={(e) => onUpdateSection('successfulOutcomes', { 
                    ...sections.successfulOutcomes, 
                    stat2: { ...sections.successfulOutcomes?.stat2, label: e.target.value }
                  })}
                  className="bg-transparent border-none outline-none text-center"
                  placeholder="dolor sit amet"
                />
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <textarea
                value={sections.successfulOutcomes?.stat2?.description || 'compared to national average†'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat2: { ...sections.successfulOutcomes?.stat2, description: e.target.value }
                })}
                className="w-full bg-transparent border-none outline-none text-center resize-none text-sm text-gray-600"
                placeholder="tempor incididunt ut labore et dolore"
                rows={2}
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="text-center">
            <div className="mb-2">
              <input
                type="text"
                value={sections.successfulOutcomes?.stat3?.number || '23%'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat3: { ...sections.successfulOutcomes?.stat3, number: e.target.value }
                })}
                className="text-3xl font-bold text-teal-600 bg-transparent border-none outline-none text-center w-full"
                placeholder="89%"
              />
              <span className="text-3xl font-bold text-teal-600 ml-1">
                <input
                  type="text"
                  value={sections.successfulOutcomes?.stat3?.label || 'more live births'}
                  onChange={(e) => onUpdateSection('successfulOutcomes', { 
                    ...sections.successfulOutcomes, 
                    stat3: { ...sections.successfulOutcomes?.stat3, label: e.target.value }
                  })}
                  className="bg-transparent border-none outline-none text-center"
                  placeholder="magna aliqua"
                />
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <textarea
                value={sections.successfulOutcomes?.stat3?.description || 'compared to national average‡'}
                onChange={(e) => onUpdateSection('successfulOutcomes', { 
                  ...sections.successfulOutcomes, 
                  stat3: { ...sections.successfulOutcomes?.stat3, description: e.target.value }
                })}
                className="w-full bg-transparent border-none outline-none text-center resize-none text-sm text-gray-600"
                placeholder="ut enim ad minim veniam quis nostrud"
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pt-6 border-t border-amazon-border-light">
        <h2 className="text-xl font-bold mb-5 text-amazon-text">Frequently Asked Questions</h2>
        <Droppable droppableId="faq" type="faq">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 mb-6">
              {sections.faq?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`group border border-amazon-border-light rounded-lg overflow-hidden relative ${
                        snapshot.isDragging ? 'shadow-lg' : ''
                      }`}
                    >
                      <div {...provided.dragHandleProps} className="absolute top-2 left-2 cursor-grab z-10">
                        <div className="w-2 h-4 flex flex-col justify-center space-y-0.5">
                          <div className="w-full h-0.5 bg-gray-400 rounded"></div>
                          <div className="w-full h-0.5 bg-gray-400 rounded"></div>
                          <div className="w-full h-0.5 bg-gray-400 rounded"></div>
                        </div>
                      </div>
                      <div 
                        className="bg-amazon-bg p-4 cursor-pointer hover:bg-gray-100 pl-8"
                        onClick={() => toggleFAQ(item.id)}
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={item.question}
                            onChange={(e) => updateItem('faq', item.id, { question: e.target.value })}
                            className="font-medium text-sm text-amazon-text bg-transparent border-none outline-none flex-1 mr-4"
                            placeholder="Lorem ipsum dolor sit amet?"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <ChevronDownIcon className={`w-4 h-4 text-amazon-text-light transition-transform ${
                            item.isOpen ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </div>
                      {item.isOpen && (
                        <div className="p-4 bg-white">
                          <textarea
                            value={item.answer}
                            onChange={(e) => updateItem('faq', item.id, { answer: e.target.value })}
                            className="text-sm text-amazon-text leading-5 w-full bg-transparent border-none outline-none resize-none"
                            placeholder="Lorem ipsum dolor sit amet consectetur..."
                            rows={3}
                          />
                        </div>
                      )}
                      <button
                        onClick={() => removeItem('faq', item.id)}
                        className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <button
          onClick={() => addItem('faq', { 
            question: 'New question?', 
            answer: 'Answer to the new question...', 
            isOpen: false 
          })}
          className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark font-medium text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Add FAQ
        </button>
      </div>
    </div>
  );
};

export default ContentSection;






