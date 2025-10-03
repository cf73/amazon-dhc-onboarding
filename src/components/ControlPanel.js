import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentArrowDownIcon, 
  FolderOpenIcon, 
  PrinterIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ControlPanel = ({ onSave, onLoad, onExportPDF, onExportHTML, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div 
        className="fixed z-50"
        style={{
          bottom: '32px',
          right: '32px',
        }}
      >
        <motion.div
          onClick={() => !isExpanded && setIsExpanded(true)}
          animate={{
            width: isExpanded ? 384 : 160,
            height: isExpanded ? 480 : 48,
          }}
          whileHover={!isExpanded ? { 
            scale: 1.03,
            y: -2,
          } : {}}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1
          }}
          style={{
            position: 'relative',
            borderRadius: 24,
            cursor: isExpanded ? 'default' : 'pointer',
            overflow: 'hidden',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            animate={{
              background: isExpanded 
                ? 'linear-gradient(135deg, rgba(245, 245, 250, 0.35) 0%, rgba(240, 242, 255, 0.31) 50%, rgba(243, 243, 250, 0.33) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.88) 0%, rgba(139, 92, 246, 0.85) 50%, rgba(168, 85, 247, 0.88) 100%)',
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              position: 'absolute',
              inset: 0,
            }}
          />
          
          {/* Animated border */}
          <motion.div
            animate={{
              borderColor: isExpanded ? 'rgba(200, 200, 220, 0.5)' : 'rgba(255, 255, 255, 0.4)',
              borderWidth: '2px',
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              borderStyle: 'solid',
              pointerEvents: 'none'
            }}
          />
          
          {/* Animated shadow and inset highlight */}
          <motion.div
            animate={{
              boxShadow: isExpanded 
                ? '0 20px 60px rgba(99, 102, 241, 0.25), inset 0 2px 4px rgba(255, 255, 255, 0.7)'
                : '0 12px 40px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              pointerEvents: 'none'
            }}
          />

          {/* Content container */}
          <div style={{ position: 'relative', height: '100%', zIndex: 1 }}>
            {/* Collapsed state - centered text */}
            <motion.div
              animate={{ opacity: isExpanded ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: isExpanded ? 'none' : 'auto'
              }}
            >
              <span className="text-white font-semibold text-[15px] whitespace-nowrap">Amazon CMS</span>
            </motion.div>

            {/* Expanded content */}
            <motion.div
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ 
                duration: 0.4,
                delay: isExpanded ? 0.25 : 0,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                pointerEvents: isExpanded ? 'auto' : 'none',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header */}
              <div 
                className="px-6 py-5 flex items-center justify-between flex-shrink-0"
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <div>
                  <h3 className="font-bold text-lg mb-1" style={{ color: '#1a1a2e' }}>Amazon CMS</h3>
                  <div className="text-sm" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Ready'
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full transition-all duration-200 hover:bg-black/5"
                >
                  <XMarkIcon className="w-6 h-6" style={{ color: '#1a1a2e' }} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-3 flex-1">
                <button
                  onClick={onSave}
                  disabled={isLoading}
                  className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontSize: '15px'
                  }}
                >
                  <DocumentArrowDownIcon className="w-5 h-5" />
                  Save Project
                </button>
                
                <button
                  onClick={onLoad}
                  disabled={isLoading}
                  className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontSize: '15px'
                  }}
                >
                  <FolderOpenIcon className="w-5 h-5" />
                  Load Project
                </button>
                
                <div 
                  className="pt-3 pb-2"
                  style={{
                    borderTop: '1px solid rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <p 
                    className="text-xs mb-3 font-semibold tracking-wider"
                    style={{ color: 'rgba(0, 0, 0, 0.4)' }}
                  >
                    EXPORT
                  </p>
                  
                  <button
                    onClick={onExportPDF}
                    disabled={isLoading}
                    className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      fontSize: '15px'
                    }}
                  >
                    <PrinterIcon className="w-5 h-5" />
                    Export PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ControlPanel;
