import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { PlusIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProductSection = ({ data, onUpdate, onImageUpload }) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

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
          onImageUpload(e.target.result, 'thumbnail');
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
      <div className="flex items-start" style={{ minWidth: '798px', gap: '48px' }}>
        {/* Left Column - Product Images */}
        <div className="flex-shrink-0 w-[352px]">
        {/* Main Product Image */}
        <div className="main-image-container mb-4">
          <div 
            {...getHeroRootProps()} 
            className="relative group cursor-pointer border-2 border-dashed border-gray-300 hover:border-amazon-orange rounded-lg transition-colors"
            style={{ width: '352px', height: '470px' }}
          >
            <input {...getHeroInputProps()} />
            {data.images?.hero ? (
              <img
                src={data.images.hero}
                alt="Main Product"
                className="object-cover border border-amazon-border-light rounded"
                style={{ width: '352px', height: '470px' }}
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-50 border border-amazon-border-light rounded" style={{ width: '352px', height: '470px' }}>
                <div className="text-center">
                  <PhotoIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Drop image here or click to upload</p>
                  <p className="text-gray-400 text-xs mt-1">Main product image</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm transition-opacity">
                {data.images?.hero ? 'Change Image' : 'Upload Image'}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-2 mt-4">
          {data.images?.thumbnails?.map((thumb, index) => (
            <div
              key={index}
              className={`cursor-pointer ${selectedThumbnail === index ? 'ring-2 ring-amazon-orange' : ''}`}
              onClick={() => setSelectedThumbnail(index)}
            >
              <img
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                className="w-16 h-16 object-cover border border-amazon-border-light rounded hover:border-amazon-orange"
              />
            </div>
          ))}
          
          {/* Add Thumbnail Button */}
          <div
            {...getThumbRootProps()}
            className="w-16 h-16 border-2 border-dashed border-gray-300 hover:border-amazon-orange rounded flex items-center justify-center cursor-pointer transition-colors"
          >
            <input {...getThumbInputProps()} />
            <PlusIcon className="w-6 h-6 text-gray-400 hover:text-amazon-orange" />
          </div>
        </div>
        </div>

        {/* Center Column - Main Content */}
        <div className="flex-1">
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
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full bg-transparent border border-gray-200 rounded p-3 outline-none focus:border-amazon-orange resize-none"
            style={{ fontSize: '15px', color: '#0F1111', lineHeight: '20px', fontWeight: '400' }}
            rows={4}
          />
        </div>

        {/* What's Included Section */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: '#0F1111', fontWeight: '700', marginBottom: '8px' }}>What's included*</h3>
          <div className="border border-gray-200 rounded mb-3">
            {data.sections?.included?.map((item, index) => (
              <div key={item.id} className="group grid grid-cols-[200px_1fr] border-b border-gray-200 last:border-b-0">
                <div className="bg-gray-100 p-3 relative" style={{ fontSize: '14px', fontWeight: '400', color: '#0F1111', lineHeight: '20px' }}>
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
                <div className="p-3 relative">
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const updatedIncluded = data.sections.included.map(includedItem =>
                        includedItem.id === item.id ? { ...includedItem, description: e.target.value } : includedItem
                      );
                      onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
                    }}
                    className="w-full bg-transparent border-none outline-none resize-none"
                    style={{ fontSize: '14px', fontWeight: '400', color: '#0F1111', lineHeight: '20px' }}
                    placeholder="Lorem ipsum dolor sit amet consectetur"
                    rows={2}
                  />
                  <button
                    onClick={() => {
                      const updatedIncluded = data.sections.included.filter(includedItem => includedItem.id !== item.id);
                      onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
                    }}
                    className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
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
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {(data.sections?.programFor || [
                { id: '1', text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy" },
                { id: '2', text: "You're thinking ahead for fertility preservation (sperm and egg freezing)" },
                { id: '3', text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment" }
              ]).map((item, index) => (
                <div key={item.id} className="group flex" style={{ gap: '12px', marginTop: index === 0 ? '0' : '20px', alignItems: 'flex-start' }}>
                  <div className="flex-shrink-0" style={{ width: '24px', height: '24px', marginTop: '0px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.0498 21.9219C17.0204 21.9219 21.0498 17.8924 21.0498 12.9219C21.0498 7.95131 17.0204 3.92188 12.0498 3.92188C7.07924 3.92188 3.0498 7.95131 3.0498 12.9219C3.0498 17.8924 7.07924 21.9219 12.0498 21.9219Z" stroke="#0F1111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M16 9.92188L10 15.9219L7.5 13.4219" stroke="#159B8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className="flex-1 relative" style={{ display: 'flex', alignItems: 'center', minHeight: '24px' }}>
                    <textarea
                      value={item.text}
                      onChange={(e) => {
                        const currentProgramFor = data.sections?.programFor || [
                          { id: '1', text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy" },
                          { id: '2', text: "You're thinking ahead for fertility preservation (sperm and egg freezing)" },
                          { id: '3', text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment" }
                        ];
                        const updatedProgramFor = currentProgramFor.map(programItem =>
                          programItem.id === item.id ? { ...programItem, text: e.target.value } : programItem
                        );
                        onUpdate({ sections: { ...data.sections, programFor: updatedProgramFor } });
                      }}
                      onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      className="w-full bg-transparent border-none outline-none resize-none overflow-hidden"
                      style={{ fontSize: '14px', fontWeight: '400', color: '#0F1111', lineHeight: '20px', padding: '0', minHeight: '20px' }}
                      placeholder="Lorem ipsum dolor sit amet..."
                      rows={1}
                    />
                    <button
                      onClick={() => {
                        const currentProgramFor = data.sections?.programFor || [
                          { id: '1', text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy" },
                          { id: '2', text: "You're thinking ahead for fertility preservation (sperm and egg freezing)" },
                          { id: '3', text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment" }
                        ];
                        const updatedProgramFor = currentProgramFor.filter(programItem => programItem.id !== item.id);
                        onUpdate({ sections: { ...data.sections, programFor: updatedProgramFor } });
                      }}
                      className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
        <div className="flex-shrink-0 w-[350px] bg-white rounded" style={{ border: '1px solid #D5D9D9', padding: '18px 20px' }}>
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
            <div style={{ fontSize: '14px', color: '#565959', lineHeight: '20px' }}>
              <input
                type="text"
                defaultValue="typical copay, may vary based on insurance coverage."
                className="w-full bg-transparent border-none outline-none"
                style={{ fontSize: '14px', color: '#565959', padding: '0', lineHeight: '20px' }}
              />
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






