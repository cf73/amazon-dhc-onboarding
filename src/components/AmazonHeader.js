import React from 'react';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import amazonLogo from '../assets/amazonlogo1.png';
import cartIcon from '../assets/cart.png';

const AmazonHeader = () => {
  return (
    <header className="w-full">
      {/* Main Header Bar */}
      <div style={{ backgroundColor: '#131921' }} className="h-[60px] flex items-center pl-3 pr-3 gap-4">
        {/* Amazon Logo */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          <img 
            src={amazonLogo} 
            alt="Amazon" 
            className="h-10" 
          />
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex h-[40px] w-full">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search Amazon"
              className="flex-1 min-w-0 px-3 text-[15px] border-0 outline-none rounded-l-[4px]"
            />
            {/* Search Button */}
            <button style={{ backgroundColor: '#febd69' }} className="hover:bg-orange-400 px-3 flex items-center justify-center rounded-r-[4px] w-[45px] border-0 outline-none flex-shrink-0">
              <MagnifyingGlassIcon className="w-5 h-5 text-black" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Account */}
        <div className="flex-shrink-0 px-3 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          <div className="text-white text-[14px] font-bold">Account</div>
        </div>

        {/* Returns & Orders */}
        <div className="flex-shrink-0 px-3 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          <div className="text-white">
            <div className="text-[12px] leading-tight">Returns</div>
            <div className="text-[14px] font-bold leading-tight">& Orders</div>
          </div>
        </div>

        {/* Cart */}
        <div className="flex-shrink-0 px-2 py-1.5 hover:outline hover:outline-1 hover:outline-white cursor-pointer">
          <img src={cartIcon} alt="Cart" className="h-12 w-auto" />
        </div>
      </div>

      {/* Teal Navigation Bar */}
      <div style={{ backgroundColor: '#017e7e' }} className="h-[60px] flex items-center px-3">
        <div className="flex items-center gap-2 px-3 py-2 hover:outline hover:outline-1 hover:outline-white cursor-pointer text-white">
          <span className="text-[15px] font-medium">Browse all health</span>
          <ChevronDownIcon className="w-4 h-4" strokeWidth={2} />
        </div>
      </div>
    </header>
  );
};

export default AmazonHeader;

