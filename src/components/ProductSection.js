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
    <div style={{ paddingLeft: '60px', paddingRight: '60px', paddingTop: '16px' }}>
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
          className="w-full font-normal leading-8 mb-2 text-amazon-text bg-transparent border-none outline-none resize-none overflow-hidden"
          style={{ minHeight: '2.5rem', fontSize: '28px' }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
        />
        
        {/* Brand */}
        <div className="mb-5">
          <span className="text-sm text-amazon-text-light">by </span>
          <input
            type="text"
            value={data.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            className="text-sm hover:text-amazon-red hover:underline cursor-pointer bg-transparent border-none outline-none"
            style={{ color: '#007185' }}
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-bold mb-3" style={{ fontSize: '16px', color: '#0F1111' }}>Description</h3>
          <textarea
            value={data.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full leading-6 bg-transparent border border-gray-200 rounded p-3 outline-none focus:border-amazon-orange resize-none"
            style={{ fontSize: '14px', color: '#0F1111' }}
            rows={4}
          />
        </div>

        {/* What's Included Section */}
        <div className="mb-6">
          <h3 className="font-bold mb-3" style={{ fontSize: '16px', color: '#0F1111' }}>What's included*</h3>
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
          <h3 className="font-bold mb-3" style={{ fontSize: '16px', color: '#0F1111' }}>Is this program for me?</h3>
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
        <div className="flex-shrink-0 w-[350px] bg-white border rounded-lg p-5" style={{ borderColor: '#D5D9D9', boxShadow: '0 2px 5px rgba(15,17,17,0.15)' }}>
        {/* Price Section */}
        <div className="mb-5">
          <div className="font-bold mb-1" style={{ fontSize: '14px', color: '#0F1111' }}>Price with coverage:</div>
          <div className="flex items-baseline mb-2" style={{ gap: '2px' }}>
            <span style={{ fontSize: '21px', color: '#0F1111', lineHeight: '1' }}>$</span>
            <input
              type="text"
              value={data.price.replace('$', '')}
              onChange={(e) => handleInputChange('price', '$' + e.target.value)}
              className="bg-transparent border-none outline-none"
              style={{ fontSize: '28px', color: '#0F1111', width: '70px', lineHeight: '1', fontWeight: '400' }}
            />
            <input
              type="text"
              value={data.priceUnit}
              onChange={(e) => handleInputChange('priceUnit', e.target.value)}
              className="bg-transparent border-none outline-none"
              style={{ fontSize: '13px', color: '#565959', width: '40px', verticalAlign: 'super', position: 'relative', top: '-5px' }}
            />
          </div>
          <div style={{ fontSize: '12px', color: '#565959', lineHeight: '16px' }}>
            <input
              type="text"
              defaultValue="Per 1:1 support. Fees apply for additional medical services."
              className="w-full bg-transparent border-none outline-none"
              style={{ fontSize: '12px', color: '#565959' }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-3">
          <button className="w-full transition-colors rounded-lg" style={{ backgroundColor: '#FFD814', border: '1px solid #FCD200', padding: '10px 16px', boxShadow: '0 2px 5px 0 rgba(213,217,217,0.5)' }}>
            <input
              type="text"
              value={data.ctaText}
              onChange={(e) => handleInputChange('ctaText', e.target.value)}
              className="w-full bg-transparent border-none outline-none text-center"
              style={{ fontSize: '15px', color: '#0F1111', fontWeight: '400' }}
            />
          </button>
        </div>

        {/* Learn More Link */}
        <div className="text-center">
          <input
            type="text"
            defaultValue="Learn more about coverage and pricing"
            className="w-full bg-transparent border-none outline-none text-center cursor-pointer hover:underline hover:text-red-700"
            style={{ fontSize: '13px', color: '#007185' }}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;






