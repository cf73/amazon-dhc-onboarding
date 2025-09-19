import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { PlusIcon, XMarkIcon, ChevronDownIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

const ContentSection = ({ sections, onUpdateSection }) => {
  
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
      <div className="pt-6 border-t border-amazon-border-light">
        <h2 className="text-xl font-bold mb-5 text-amazon-text">What customers are saying</h2>
        
        {/* Header with Quote Icon and Title - Shows Once */}
        <div className="text-center mb-8">
          {/* Large Quote Icon */}
          <div className="flex justify-center mb-6">
            <svg className="w-12 h-12 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
          </div>

          {/* Section Title */}
          <h3 className="text-lg font-semibold text-teal-600 uppercase tracking-wider mb-8 letterspacing-wide">
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
                      <div className="mb-3">
                        <textarea
                          value={`"${item.text}"`}
                          onChange={(e) => {
                            let value = e.target.value;
                            // Remove quotes if user adds them, we'll add them automatically
                            value = value.replace(/^[""]|[""]$/g, '');
                            updateItem('testimonials', item.id, { text: value });
                          }}
                          className="text-xl text-gray-700 leading-relaxed w-full bg-transparent border-none outline-none resize-none text-center font-light"
                          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                          rows={4}
                        />
                      </div>

                      {/* Author */}
                      <div className="text-gray-500 text-sm">
                        <input
                          type="text"
                          value={item.author}
                          onChange={(e) => updateItem('testimonials', item.id, { author: e.target.value })}
                          className="w-full bg-transparent border-none outline-none text-center"
                          placeholder="– Lorem Ipsum"
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
        <button
          onClick={() => addItem('testimonials', { 
            text: 'New testimonial content goes here...', 
            author: '– Member Name' 
          })}
          className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark font-medium text-sm"
        >
          <PlusIcon className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      {/* From the Brand Section */}
      <div className="pt-6 border-t border-amazon-border-light">
        <h2 className="text-xl font-bold mb-8 text-amazon-text">From the brand</h2>
        <div className="grid grid-cols-[400px_1fr] gap-8 items-start mb-8">
          {/* Left Column - Image */}
          <div className="relative">
            {sections.fromBrand?.image ? (
              <img
                src={sections.fromBrand.image}
                alt="Brand content"
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
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
            <div className="mb-3">
              <input
                type="text"
                value={sections.fromBrand?.category || ''}
                onChange={(e) => onUpdateSection('fromBrand', { ...sections.fromBrand, category: e.target.value })}
                className="text-sm text-gray-600 bg-transparent border-none outline-none w-full"
                placeholder="Lorem Ipsum Category"
              />
            </div>
            
            <h3 className="mb-4">
              <textarea
                value={sections.fromBrand?.title || ''}
                onChange={(e) => onUpdateSection('fromBrand', { ...sections.fromBrand, title: e.target.value })}
                className="text-2xl font-bold text-amazon-text bg-transparent border-none outline-none w-full resize-none leading-tight"
                placeholder="Lorem ipsum dolor sit amet consectetur"
                rows={2}
              />
            </h3>
            
            <div className="mb-6">
              <textarea
                value={sections.fromBrand?.description || ''}
                onChange={(e) => onUpdateSection('fromBrand', { ...sections.fromBrand, description: e.target.value })}
                className="text-gray-600 leading-relaxed bg-transparent border-none outline-none w-full resize-none"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                rows={3}
              />
            </div>

            {/* Bullet Points */}
            <div className="space-y-3">
              {(sections.fromBrand?.bulletPoints || []).map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="group-bullet flex items-start gap-3">
                  <div className="w-5 h-5 rounded-sm bg-teal-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => {
                        const newBullets = [...(sections.fromBrand?.bulletPoints || [])];
                        newBullets[bulletIndex] = e.target.value;
                        onUpdateSection('fromBrand', { ...sections.fromBrand, bulletPoints: newBullets });
                      }}
                      className="w-full text-sm text-gray-700 bg-transparent border-none outline-none"
                      placeholder="Lorem ipsum dolor sit amet consectetur adipiscing elit"
                    />
                    <button
                      onClick={() => {
                        const newBullets = [...(sections.fromBrand?.bulletPoints || [])];
                        newBullets.splice(bulletIndex, 1);
                        onUpdateSection('fromBrand', { ...sections.fromBrand, bulletPoints: newBullets });
                      }}
                      className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700 opacity-0 group-bullet:hover:opacity-100 transition-opacity"
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
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
              >
                <PlusIcon className="w-4 h-4" />
                Add Bullet Point
              </button>
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






