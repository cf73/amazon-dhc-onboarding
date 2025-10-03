import React from 'react';
import { MagnifyingGlassIcon, ShoppingCartIcon, MapPinIcon, Bars3Icon } from '@heroicons/react/24/outline';
import amazonLogo from '../assets/amazonlogo.png';

const AmazonHeader = () => {
  return (
    <header className="w-full">
      {/* Main Header Bar */}
      <div style={{ backgroundColor: '#131921' }} className="h-[60px] flex items-center px-3 gap-3">
        {/* Amazon Prime Logo */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          <img 
            src={amazonLogo} 
            alt="Amazon Prime" 
            className="h-10" 
          />
        </div>

        {/* Deliver To */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer flex items-start gap-1">
          <MapPinIcon className="w-5 h-5 text-white mt-1" />
          <div className="text-white">
            <div className="text-[12px] text-gray-300 leading-tight">Deliver to Conrad</div>
            <div className="text-[14px] font-bold leading-tight">Cambridge 02138</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-[800px]">
          <div className="flex h-[40px] w-full">
            {/* All Dropdown */}
            <div style={{ backgroundColor: '#e6e6e6' }} className="hover:bg-gray-300 px-3 flex items-center justify-center cursor-pointer rounded-l-[4px]">
              <span className="text-[13px] text-gray-700 whitespace-nowrap">All</span>
              <svg className="w-3 h-3 ml-1 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search Amazon"
              className="flex-1 px-3 text-[15px] border-0 outline-none"
            />
            {/* Search Button */}
            <button style={{ backgroundColor: '#febd69' }} className="hover:bg-orange-400 px-3 flex items-center justify-center rounded-r-[4px] w-[45px] border-0 outline-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-black" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer flex items-center gap-1">
          <div className="w-6 h-4 bg-contain bg-no-repeat" style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 7410 3900%22%3E%3Cpath fill=%22%23b22234%22 d=%22M0 0h7410v3900H0z%22/%3E%3Cpath d=%22M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0%22 stroke=%22%23fff%22 stroke-width=%22300%22/%3E%3Cpath fill=%22%233c3b6e%22 d=%22M0 0h2964v2100H0z%22/%3E%3C/svg%3E')" 
          }}></div>
          <span className="text-[13px] text-white font-bold">EN</span>
          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Account & Lists */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          <div className="text-white">
            <div className="text-[12px] leading-tight">Hello, Tom</div>
            <div className="text-[14px] font-bold leading-tight flex items-center gap-1">
              Account & Lists
              <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Returns & Orders */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          <div className="text-white">
            <div className="text-[12px] leading-tight">Returns</div>
            <div className="text-[14px] font-bold leading-tight">& Orders</div>
          </div>
        </div>

        {/* Cart */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer flex items-end gap-2">
          <div className="relative">
            <ShoppingCartIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
            <span style={{ color: '#f08804' }} className="absolute top-0 left-1/2 text-[16px] font-bold">0</span>
          </div>
          <span className="text-[14px] font-bold text-white pb-1">Cart</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <div style={{ backgroundColor: '#232f3e' }} className="h-[39px] flex items-center px-3 gap-3 text-white text-[14px]">
        {/* All Menu */}
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer flex items-center gap-1">
          <Bars3Icon className="w-5 h-5" strokeWidth={2} />
          <span className="font-bold">All</span>
        </div>

        {/* Rufus */}
        <div className="px-3 py-1 bg-white text-black rounded-full cursor-pointer flex items-center gap-1 text-[13px] hover:bg-gray-100">
          <span>✨</span>
          <span className="font-medium">Rufus</span>
        </div>

        {/* Menu Items */}
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">Amazon Haul</div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">Early Prime Deals</div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">Same-Day Delivery</div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          Medical Care
          <svg className="w-3 h-3 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">Luxury</div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">Amazon Basics</div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">Prime Video</div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">Buy Again</div>
        <div className="px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          Groceries
          <svg className="w-3 h-3 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Sports Banner */}
        <div className="ml-auto flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded cursor-pointer hover:bg-gray-100">
          <div style={{ backgroundColor: '#AA0000' }} className="w-6 h-6 rounded-full flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">SF</span>
          </div>
          <span className="font-bold text-[13px]">VS</span>
          <div style={{ backgroundColor: '#003594' }} className="w-6 h-6 rounded-full flex items-center justify-center">
            <span style={{ color: '#FFA300' }} className="text-[10px] font-bold">LA</span>
          </div>
          <div className="bg-red-600 text-white px-2 py-0.5 rounded text-[11px] font-bold ml-1">
            LIVE NOW
          </div>
        </div>
      </div>
    </header>
  );
};

export default AmazonHeader;

