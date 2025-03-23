import React from 'react';
import { motion } from 'framer-motion';

const ProductTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'all', label: 'ALL PRODUCTS' },
    { id: 'bestsellers', label: 'BESTSELLERS' },
    { id: 'new', label: 'NEW ARRIVALS' },
    { id: 'featured', label: 'FEATURED' }
  ];

  return (
    <div className="relative mb-8 mt-4">
      {/* Decorative elements */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t border-amber-800/20 z-0"></div>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-amber-800/30 bg-amber-50 z-10"></div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-amber-800/30 bg-amber-50 z-10"></div>
      
      {/* Main tabs container */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 p-1 shadow-md border border-amber-200 relative z-10">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative px-6 py-2.5 text-sm tracking-wider transition-all duration-300 rounded-full ${
                activeTab === tab.id
                  ? 'text-amber-900 font-medium'
                  : 'text-amber-700 hover:text-amber-800'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-full border border-amber-300 shadow-inner"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 font-serif">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-800/40 rounded-full"></div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Decorative flourishes */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex items-center gap-2">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent"></div>
        <div className="w-1.5 h-1.5 rounded-full border border-amber-800/30 bg-amber-50"></div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-800/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default ProductTabs;
