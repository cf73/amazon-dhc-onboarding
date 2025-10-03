import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PlusIcon, PhotoIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable What's Included Item
const SortableIncludedItem = ({ item, data, onUpdate }) => {
  const textareaRef = React.useRef(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `included-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [item.description]);

  return (
    <div ref={setNodeRef} style={style} className="group grid grid-cols-[200px_1fr] border-b border-gray-200 last:border-b-0 relative">
      {/* Glass effect overlay */}
      <div
        className="absolute inset-0 rounded transition-all duration-200 pointer-events-none"
        style={{
          backgroundColor: isDragging ? 'rgba(255, 255, 255, 0.67)' : 'transparent',
          backdropFilter: isDragging ? 'blur(10px)' : 'none',
          boxShadow: isDragging ? '0 2px 12px rgba(0,0,0,0.1)' : 'none',
          border: isDragging ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
          zIndex: 1,
        }}
      />
      
      <div className="bg-gray-100 p-3 relative z-10" style={{ fontSize: '14px', fontWeight: '400', color: '#0F1111', lineHeight: '20px' }}>
        <input
          type="text"
          value={item.title}
          onChange={(e) => {
            const updatedIncluded = data.sections.included.map(includedItem =>
              includedItem.id === item.id ? { ...includedItem, title: e.target.value } : includedItem
            );
            onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
          }}
          className="w-full bg-transparent border-none outline-none"
          style={{ fontSize: '14px', fontWeight: '400', color: '#0F1111', lineHeight: '20px' }}
          placeholder="Lorem ipsum dolor"
        />
      </div>
      <div className="p-3 relative z-10">
        <textarea
          ref={textareaRef}
          value={item.description}
          onChange={(e) => {
            const updatedIncluded = data.sections.included.map(includedItem =>
              includedItem.id === item.id ? { ...includedItem, description: e.target.value } : includedItem
            );
            onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
          }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
          style={{ fontSize: '14px', fontWeight: '400', color: '#0F1111', lineHeight: '20px', paddingRight: '60px', minHeight: '40px' }}
          placeholder="Lorem ipsum dolor sit amet consectetur"
        />
        {/* Action Icons - Right Side */}
        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
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
            onClick={() => {
              const updatedIncluded = data.sections.included.filter(includedItem => includedItem.id !== item.id);
              onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
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

// Sortable Program For Item
const SortableProgramForItem = ({ item, index, data, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `programFor-${item.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginTop: index === 0 ? '0' : '20px',
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      {/* Content Row with Glass Effect */}
      <div 
        className="flex rounded-lg transition-all duration-200"
        style={{ 
          gap: '12px', 
          alignItems: 'flex-start',
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
        <div className="flex-shrink-0" style={{ width: '24px', height: '24px', marginTop: '0px' }}>
          <svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0498 21.9219C17.0204 21.9219 21.0498 17.8924 21.0498 12.9219C21.0498 7.95131 17.0204 3.92188 12.0498 3.92188C7.07924 3.92188 3.0498 7.95131 3.0498 12.9219C3.0498 17.8924 7.07924 21.9219 12.0498 21.9219Z" stroke="#0F1111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M16 9.92188L10 15.9219L7.5 13.4219" stroke="#159B8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </div>
        <div className="flex-1" style={{ display: 'flex', alignItems: 'center', minHeight: '24px' }}>
          <textarea
            value={item.text}
            onChange={(e) => {
              const currentProgramFor = data.sections?.programFor || [];
              const updatedProgramFor = currentProgramFor.map(programItem =>
                programItem.id === item.id ? { ...programItem, text: e.target.value } : programItem
              );
              onUpdate({ sections: { ...data.sections, programFor: updatedProgramFor } });
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className="w-full bg-transparent border-none outline-none resize-none overflow-hidden cursor-text"
            style={{ fontSize: '14px', fontWeight: '400', color: '#0F1111', lineHeight: '20px', padding: '0', minHeight: '20px' }}
            placeholder="Lorem ipsum dolor sit amet..."
            rows={1}
          />
        </div>
        {/* Action Icons - Right Side */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0" style={{ marginRight: '-4px', marginTop: '0px' }}>
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
              const currentProgramFor = data.sections?.programFor || [];
              const updatedProgramFor = currentProgramFor.filter(programItem => programItem.id !== item.id);
              onUpdate({ sections: { ...data.sections, programFor: updatedProgramFor } });
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

const ProductSection = ({ data, onUpdate, onImageUpload }) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [showThumbnailModal, setShowThumbnailModal] = useState(false);
  const [showPriceTextDropdown, setShowPriceTextDropdown] = useState(false);
  const [priceText, setPriceText] = useState(data.priceText || 'typical copay, may vary based on insurance coverage.');
  const descriptionRef = React.useRef(null);

  // Auto-resize description textarea on mount and data change
  React.useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = descriptionRef.current.scrollHeight + 'px';
    }
  }, [data.description]);

  // Hero image dropzone
  const { getRootProps: getHeroRootProps, getInputProps: getHeroInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onImageUpload(e.target.result, 'hero');
        };
        reader.readAsDataURL(file);
      }
    }
  });

  // Thumbnail dropzone
  const { getRootProps: getThumbRootProps, getInputProps: getThumbInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Upload the full-resolution image, it will be displayed scaled down via CSS
          onImageUpload(e.target.result, 'thumbnail');
          setShowThumbnailModal(false);
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '32px' }}>
      <style>{`
        .product-layout {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 48px;
        }
        
        .product-image-column {
          flex: 0 1 352px;
          min-width: 240px;
          max-width: 352px;
        }
        
        .product-content-column {
          flex: 1 1 400px;
          min-width: 280px;
        }
        
        .buy-box {
          flex: 0 1 350px;
          min-width: 280px;
          max-width: 350px;
        }
        
        @media (max-width: 1200px) {
          .product-image-column {
            flex: 0 1 280px;
          }
          .buy-box {
            flex: 0 1 300px;
            min-width: 260px;
          }
        }
        
        @media (max-width: 1100px) {
          .buy-box {
            flex: 1 1 100%;
            width: 100%;
            max-width: 100%;
            min-width: 100%;
          }
        }
      `}</style>
      <div className="product-layout">
      {/* Left Column - Product Images */}
        <div className="product-image-column">
        {/* Main Product Image */}
        <div className="main-image-container mb-4">
            {data.images?.hero ? (
            <div className="relative group" style={{ width: '100%', paddingTop: '133.5%' }}>
              <img
                src={data.images.hero}
                alt="Main Product"
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => onUpdate({ images: { ...data.images, hero: null } })}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ) : (
            <div 
              {...getHeroRootProps()} 
              className="cursor-pointer border-2 border-dashed rounded-lg transition-colors flex items-center justify-center bg-gray-50"
              style={{ width: '100%', paddingTop: '133.5%', position: 'relative', borderColor: '#D5D9D9' }}
            >
              <input {...getHeroInputProps()} />
                <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <PhotoIcon className="w-12 h-12 mx-auto mb-3" style={{ color: '#8B96A5' }} />
                    <p style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', color: '#565959', marginBottom: '4px' }}>
                      Drop image or click to upload
                    </p>
                    <p style={{ fontFamily: 'Amazon Ember', fontSize: '12px', fontWeight: '400', color: '#8B96A5' }}>
                      352x470px recommended
                    </p>
                    <p style={{ fontFamily: 'Amazon Ember', fontSize: '11px', fontWeight: '400', color: '#8B96A5', marginTop: '8px' }}>
                      Use 2x resolution (704x940px) for high DPI screens
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 mt-4">
          {data.images?.thumbnails?.map((thumb, index) => (
            <div
              key={index}
              className={`relative group ${selectedThumbnail === index ? 'ring-2 ring-amazon-orange' : ''}`}
              style={{ width: '42px', height: '56px' }}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover border border-amazon-border-light rounded hover:border-amazon-orange cursor-pointer"
                style={{ width: '42px', height: '56px' }}
                onClick={() => setSelectedThumbnail(index)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newThumbnails = data.images.thumbnails.filter((_, i) => i !== index);
                  onUpdate({ images: { ...data.images, thumbnails: newThumbnails } });
                }}
                className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <XMarkIcon className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          ))}
          
          {/* Add Thumbnail Button */}
          <div
            onClick={() => setShowThumbnailModal(true)}
            className="border-2 border-dashed rounded flex items-center justify-center cursor-pointer transition-colors"
            style={{ width: '42px', height: '56px', borderColor: '#D5D9D9', backgroundColor: '#F7F7F7' }}
          >
            <PlusIcon className="w-6 h-6" style={{ color: '#8B96A5' }} />
          </div>
        </div>
      </div>

        {/* Thumbnail Upload Modal */}
        {showThumbnailModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={() => setShowThumbnailModal(false)}
          >
            <div
              className="relative"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.33)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '32px',
                maxWidth: '400px',
                width: '90%',
                borderRadius: '24px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowThumbnailModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full transition-all"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <XMarkIcon className="w-5 h-5" style={{ color: '#565959' }} />
              </button>

              <h3 style={{ 
                fontFamily: 'Amazon Ember', 
                fontSize: '18px', 
                fontWeight: '700', 
                color: '#0F1111', 
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                Add Product Image
              </h3>

              <p style={{ 
                fontFamily: 'Amazon Ember', 
                fontSize: '13px', 
                fontWeight: '400', 
                color: '#565959', 
                marginBottom: '24px',
                textAlign: 'center',
                lineHeight: '18px'
              }}>
                Upload the full-size image. It will be automatically<br />scaled to create a thumbnail.
              </p>

              {/* Upload Zone */}
              <div 
                {...getThumbRootProps()} 
                className="cursor-pointer border-2 border-dashed rounded-lg transition-colors flex items-center justify-center"
                style={{ height: '250px', borderColor: '#D5D9D9', backgroundColor: 'rgba(247, 247, 247, 0.8)' }}
              >
                <input {...getThumbInputProps()} />
                <div className="text-center">
                  <PhotoIcon className="w-12 h-12 mx-auto mb-3" style={{ color: '#8B96A5' }} />
                  <p style={{ fontFamily: 'Amazon Ember', fontSize: '14px', fontWeight: '400', color: '#565959', marginBottom: '4px' }}>
                    Drop image or click to upload
                  </p>
                  <p style={{ fontFamily: 'Amazon Ember', fontSize: '12px', fontWeight: '400', color: '#8B96A5' }}>
                    352x470px recommended
                  </p>
                  <p style={{ fontFamily: 'Amazon Ember', fontSize: '11px', fontWeight: '400', color: '#8B96A5', marginTop: '8px' }}>
                    Use 2x resolution (704x940px) for high DPI screens
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Center Column - Main Content */}
        <div className="product-content-column">
        {/* Product Title */}
        <textarea
          value={data.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
          style={{ minHeight: '2.5rem', fontSize: '24px', fontWeight: '700', lineHeight: '34px', color: '#0F1111', marginBottom: '4px' }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
        
        {/* Brand */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '14px', color: '#565959', fontWeight: '400' }}>by </span>
          <input
            type="text"
            value={data.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className="hover:text-amazon-red hover:underline cursor-pointer bg-transparent border-none outline-none"
            style={{ fontSize: '14px', color: '#007185', fontWeight: '400' }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: '#0F1111', fontWeight: '700', marginBottom: '8px' }}>Description</h3>
          <textarea
            ref={descriptionRef}
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className="w-full bg-transparent border border-gray-200 rounded p-3 outline-none focus:border-amazon-orange resize-none overflow-hidden"
            style={{ fontSize: '15px', color: '#0F1111', lineHeight: '20px', fontWeight: '400', minHeight: '80px' }}
          />
        </div>

        {/* What's Included Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: '#0F1111', fontWeight: '700', marginBottom: '8px' }}>What's included*</h3>
          <div className="border border-gray-200 rounded mb-3">
            <SortableContext
              items={(data.sections?.included || []).map(item => `included-${item.id}`)}
              strategy={verticalListSortingStrategy}
            >
              {data.sections?.included?.map((item) => (
                <SortableIncludedItem
                  key={`included-${item.id}`}
                  item={item}
                  data={data}
                  onUpdate={onUpdate}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              const newItem = {
                id: Date.now().toString(),
                title: 'New feature',
                description: 'Description of the new feature'
              };
              const updatedIncluded = [...(data.sections?.included || []), newItem];
              onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
            }}
            className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark"
            style={{ fontSize: '13px', fontWeight: '400' }}
          >
            <PlusIcon className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        {/* Is this program for me? Section */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ border: '1px solid #D5D9D9', borderRadius: '8px', padding: '20px', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '16px', color: '#0F1111', fontWeight: '700', lineHeight: '20px', marginBottom: '20px' }}>Is this program for me?</h3>
            <SortableContext
              items={(data.sections?.programFor || []).map(item => `programFor-${item.id}`)}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '12px' }}>
            {(data.sections?.programFor || [
              { id: '1', text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy" },
              { id: '2', text: "You're thinking ahead for fertility preservation (sperm and egg freezing)" },
              { id: '3', text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment" }
            ]).map((item, index) => (
                  <SortableProgramForItem
                    key={`programFor-${item.id}`}
                    item={item}
                    index={index}
                    data={data}
                    onUpdate={onUpdate}
                  />
            ))}
          </div>
            </SortableContext>
          <button
            onClick={() => {
              const currentProgramFor = data.sections?.programFor || [
                { id: '1', text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy" },
                { id: '2', text: "You're thinking ahead for fertility preservation (sperm and egg freezing)" },
                { id: '3', text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment" }
              ];
              const newItem = {
                id: Date.now().toString(),
                text: 'New criteria for program eligibility'
              };
              const updatedProgramFor = [...currentProgramFor, newItem];
              onUpdate({ sections: { ...data.sections, programFor: updatedProgramFor } });
            }}
              className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark"
              style={{ fontSize: '13px', fontWeight: '400', marginTop: '16px' }}
          >
            <PlusIcon className="w-4 h-4" />
            Add Criteria
          </button>
          </div>
          <div style={{ fontSize: '14px', color: '#0F1111', lineHeight: '20px' }}>
            Check your coverage to see if you're covered by your insurance or employer.
          </div>
        </div>
      </div>

      {/* Right Column - Price & CTA */}
        <div className="buy-box bg-white rounded" style={{ border: '1px solid #D5D9D9', padding: '18px 20px' }}>
        {/* Price Section */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', color: '#0F1111', marginBottom: '4px', fontWeight: '700' }}>Price with coverage:</div>
            <div className="flex items-baseline" style={{ marginBottom: '2px' }}>
              <span style={{ fontSize: '13px', color: '#0F1111', lineHeight: '1', marginRight: '0', position: 'relative', top: '-8px', fontWeight: '400' }}>$</span>
            <input
              type="text"
              value={data.price.replace('$', '')}
              onChange={(e) => handleInputChange('price', '$' + e.target.value)}
                className="bg-transparent border-none outline-none"
                style={{ fontSize: '28px', color: '#0F1111', width: '20px', lineHeight: '1', fontWeight: '400', padding: '0', marginLeft: '0' }}
            />
            <input
              type="text"
              value={data.priceUnit}
              onChange={(e) => handleInputChange('priceUnit', e.target.value)}
                className="bg-transparent border-none outline-none"
                style={{ fontSize: '13px', color: '#0F1111', width: '25px', lineHeight: '1', padding: '0', marginLeft: '0', position: 'relative', top: '-8px', fontWeight: '400' }}
            />
          </div>
            <div 
              className="relative price-text-dropdown group"
              style={{ fontSize: '14px', color: '#565959', lineHeight: '20px' }}
            >
              <div 
                className="cursor-pointer transition-all duration-200 relative"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPriceTextDropdown(!showPriceTextDropdown);
                }}
                style={{ 
                  fontSize: '14px', 
                  color: showPriceTextDropdown ? '#0F1111' : '#565959', 
                  lineHeight: '20px',
                  fontWeight: showPriceTextDropdown ? '500' : '400',
                  paddingRight: '24px',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(142, 68, 173, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>{priceText}</span>
                <div
                  className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                  style={{
                    right: '4px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    pointerEvents: 'none'
                  }}
                >
                  <ChevronDownIcon 
                    className="transition-transform duration-200"
                    style={{ 
                      width: '12px', 
                      height: '12px',
                      transform: showPriceTextDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: '#8E44AD'
                    }} 
                  />
                </div>
              </div>
              
              {/* Dropdown Menu */}
              {showPriceTextDropdown && (
                <>
                  {/* Backdrop to close on outside click */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowPriceTextDropdown(false)}
                  />
                  <div 
                    className="absolute z-50 transition-all duration-200"
                    style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.33)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '12px',
                    minWidth: '320px',
                    left: '0',
                    top: 'calc(100% + 8px)',
                    padding: '8px'
                  }}
                >
                  <div
                    onClick={() => {
                      setPriceText('typical copay, may vary based on insurance coverage.');
                      onUpdate({ priceText: 'typical copay, may vary based on insurance coverage.' });
                      setShowPriceTextDropdown(false);
                    }}
                    className="cursor-pointer transition-all duration-150"
                    style={{ 
                      fontSize: '14px', 
                      color: '#0F1111', 
                      lineHeight: '20px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: priceText === 'typical copay, may vary based on insurance coverage.' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                      fontWeight: priceText === 'typical copay, may vary based on insurance coverage.' ? '500' : '400'
                    }}
                    onMouseEnter={(e) => {
                      if (priceText !== 'typical copay, may vary based on insurance coverage.') {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (priceText !== 'typical copay, may vary based on insurance coverage.') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    typical copay, may vary based on insurance coverage.
                  </div>
                  <div
                    onClick={() => {
                      setPriceText('with covered insurance or employer benefits.');
                      onUpdate({ priceText: 'with covered insurance or employer benefits.' });
                      setShowPriceTextDropdown(false);
                    }}
                    className="cursor-pointer transition-all duration-150"
                    style={{ 
                      fontSize: '14px', 
                      color: '#0F1111', 
                      lineHeight: '20px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: priceText === 'with covered insurance or employer benefits.' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                      fontWeight: priceText === 'with covered insurance or employer benefits.' ? '500' : '400'
                    }}
                    onMouseEnter={(e) => {
                      if (priceText !== 'with covered insurance or employer benefits.') {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (priceText !== 'with covered insurance or employer benefits.') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    with covered insurance or employer benefits.
                  </div>
                  <div
                    onClick={() => {
                      setPriceText('for 1:1 support. Fees apply for additional medical services.');
                      onUpdate({ priceText: 'for 1:1 support. Fees apply for additional medical services.' });
                      setShowPriceTextDropdown(false);
                    }}
                    className="cursor-pointer transition-all duration-150"
                    style={{ 
                      fontSize: '14px', 
                      color: '#0F1111', 
                      lineHeight: '20px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: priceText === 'for 1:1 support. Fees apply for additional medical services.' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                      fontWeight: priceText === 'for 1:1 support. Fees apply for additional medical services.' ? '500' : '400'
                    }}
                    onMouseEnter={(e) => {
                      if (priceText !== 'for 1:1 support. Fees apply for additional medical services.') {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (priceText !== 'for 1:1 support. Fees apply for additional medical services.') {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    for 1:1 support. Fees apply for additional medical services.
                  </div>
                </div>
                </>
              )}
          </div>
        </div>

        {/* CTA Button */}
          <div style={{ marginBottom: '8px' }}>
            <button className="w-full rounded" style={{ backgroundColor: '#FFD814', border: '1px solid #FCD200', padding: '9px 0', boxShadow: '0 2px 5px 0 rgba(213,217,217,0.5)' }}>
            <input
              type="text"
              value={data.ctaText}
              onChange={(e) => handleInputChange('ctaText', e.target.value)}
                className="w-full bg-transparent border-none outline-none text-center"
                style={{ fontSize: '13px', color: '#0F1111', fontWeight: '400', padding: '0' }}
            />
          </button>
        </div>

        {/* Learn More Link */}
          <div>
          <input
            type="text"
            defaultValue="Learn more about coverage and pricing"
              className="w-full bg-transparent border-none outline-none cursor-pointer hover:underline hover:text-red-700"
              style={{ fontSize: '14px', color: '#007185', padding: '0', lineHeight: '20px', textAlign: 'left' }}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;







