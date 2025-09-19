import React from 'react';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const AmazonHeader = () => {
  return (
    <header className="amazon-header-gradient h-15 flex items-center px-4">
      <div className="flex items-center mr-4">
        <div className="flex items-center text-white no-underline">
          <span className="text-2xl font-bold tracking-tight">amazon</span>
          <span className="text-xs ml-1">.us</span>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 max-w-3xl mx-6">
        <div className="relative">
          <div className="flex h-10">
            <input
              type="text"
              placeholder="Search Amazon"
              className="w-full h-full px-3 py-0 border-2 border-amazon-orange rounded-l border-r-0 focus:outline-none focus:ring-0 focus:border-amazon-orange text-sm"
            />
            <div className="bg-amazon-orange hover:bg-amazon-orange-dark h-full px-3 flex items-center justify-center rounded-r cursor-pointer border-2 border-amazon-orange">
              <MagnifyingGlassIcon className="w-4 h-4 text-amazon-text" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 mr-4">
        {/* Account */}
        <div className="text-white hover:border hover:border-white rounded px-2 py-1 text-center cursor-pointer">
          <div className="text-xs leading-3">Hello, sign in</div>
          <div className="text-sm font-bold leading-4">Account & Lists</div>
        </div>
        
        {/* Orders */}
        <div className="text-white hover:border hover:border-white rounded px-2 py-1 text-center cursor-pointer">
          <div className="text-xs leading-3">Returns</div>
          <div className="text-sm font-bold leading-4">& Orders</div>
        </div>
        
        {/* Cart */}
        <div className="text-white hover:border hover:border-white rounded px-2 py-1 text-center relative cursor-pointer">
          <div className="flex items-center justify-center">
            <ShoppingCartIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-amazon-orange text-amazon-text rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
              0
            </span>
          </div>
          <div className="text-sm font-bold leading-4">Cart</div>
        </div>
      </div>
    </header>
  );
};

export default AmazonHeader;






