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
    <div className="grid grid-cols-[320px_1fr_300px] gap-8 mt-4 items-start">
      {/* Left Column - Product Images */}
      <div className="relative">
        {/* Main Product Image */}
        <div className="main-image-container mb-4">
          <div 
            {...getHeroRootProps()} 
            className="relative group cursor-pointer border-2 border-dashed border-gray-300 hover:border-amazon-orange rounded-lg transition-colors"
          >
            <input {...getHeroInputProps()} />
            {data.images?.hero ? (
              <img
                src={data.images.hero}
                alt="Main Product"
                className="w-full h-80 object-cover border border-amazon-border-light rounded"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-gray-50 border border-amazon-border-light rounded">
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
      <div className="pr-6">
        {/* Product Title */}
        <textarea
          value={data.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="w-full text-2xl font-normal leading-7 mb-3 text-amazon-text bg-transparent border-none outline-none resize-none overflow-hidden"
          style={{ minHeight: '2.5rem' }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
        
        {/* Brand */}
        <div className="mb-4">
          <span className="text-sm text-amazon-text-light">by </span>
          <input
            type="text"
            value={data.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className="text-sm text-amazon-text hover:text-amazon-red hover:underline cursor-pointer font-medium bg-transparent border-none outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-base font-bold mb-3 text-amazon-text">Description</h3>
          <textarea
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full text-sm leading-5 text-amazon-text bg-transparent border border-gray-200 rounded p-3 outline-none focus:border-amazon-orange resize-none"
            rows={4}
          />
        </div>

        {/* What's Included Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold mb-3 text-amazon-text">What's included*</h3>
          <div className="border border-gray-200 rounded mb-3">
            {data.sections?.included?.map((item, index) => (
              <div key={item.id} className="group grid grid-cols-[200px_1fr] border-b border-gray-200 last:border-b-0">
                <div className="bg-gray-100 p-3 text-sm font-medium text-amazon-text relative">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updatedIncluded = data.sections.included.map(includedItem =>
                        includedItem.id === item.id ? { ...includedItem, title: e.target.value } : includedItem
                      );
                      onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
                    }}
                    className="w-full bg-transparent border-none outline-none font-medium"
                    placeholder="Lorem ipsum dolor"
                  />
                </div>
                <div className="p-3 text-sm text-amazon-text relative">
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const updatedIncluded = data.sections.included.map(includedItem =>
                        includedItem.id === item.id ? { ...includedItem, description: e.target.value } : includedItem
                      );
                      onUpdate({ sections: { ...data.sections, included: updatedIncluded } });
                    }}
                    className="w-full bg-transparent border-none outline-none resize-none"
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
            className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark font-medium text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        {/* Is this program for me? Section */}
        <div className="mb-6">
          <h3 className="text-base font-bold mb-3 text-amazon-text">Is this program for me?</h3>
          <div className="space-y-3 mb-3">
            {(data.sections?.programFor || [
              { id: '1', text: "You're looking to grow your family through assisted reproductive technology (fertility treatment), adoption, or surrogacy" },
              { id: '2', text: "You're thinking ahead for fertility preservation (sperm and egg freezing)" },
              { id: '3', text: "You're looking for relief from the financial, emotional, and administrative burden of navigating fertility treatment" }
            ]).map((item, index) => (
              <div key={item.id} className="group flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div className="flex-1 relative">
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
                    className="w-full text-sm text-amazon-text bg-transparent border-none outline-none resize-none"
                    placeholder="Lorem ipsum dolor sit amet..."
                    rows={2}
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
            className="flex items-center gap-2 text-amazon-orange hover:text-amazon-orange-dark font-medium text-sm mb-3"
          >
            <PlusIcon className="w-4 h-4" />
            Add Criteria
          </button>
          <div className="mt-4 text-xs text-amazon-text-light">
            Progyny services are available to you if covered by your employer benefits and enrolled in an eligible medical plan. Some programs may have additional requirements based on clinical eligibility.
          </div>
        </div>
      </div>

      {/* Right Column - Price & CTA */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Price Section */}
        <div className="mb-4">
          <div className="text-sm text-amazon-text-light mb-1">Price with coverage:</div>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-sm">$</span>
            <input
              type="text"
              value={data.price.replace('$', '')}
              onChange={(e) => handleInputChange('price', '$' + e.target.value)}
              className="text-3xl text-amazon-red font-normal bg-transparent border-none outline-none w-16"
            />
            <input
              type="text"
              value={data.priceUnit}
              onChange={(e) => handleInputChange('priceUnit', e.target.value)}
              className="text-lg text-amazon-text-light align-super bg-transparent border-none outline-none w-8"
            />
          </div>
          <div className="text-xs text-amazon-text-light">
            <input
              type="text"
              defaultValue="Per 1:1 support. Fees apply for additional medical services."
              className="w-full bg-transparent border-none outline-none text-xs"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-4">
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-amazon-text font-medium py-3 px-4 rounded text-sm transition-colors">
            <input
              type="text"
              value={data.ctaText}
              onChange={(e) => handleInputChange('ctaText', e.target.value)}
              className="w-full bg-transparent border-none outline-none text-center font-medium"
            />
          </button>
        </div>

        {/* Learn More Link */}
        <div className="text-center">
          <input
            type="text"
            defaultValue="Learn more about coverage and pricing"
            className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer bg-transparent border-none outline-none text-center w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSection;






