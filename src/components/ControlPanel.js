import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentArrowDownIcon, 
  FolderOpenIcon, 
  PrinterIcon,
  ArrowPathIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const ControlPanel = ({ onSave, onLoad, onExportPDF, onExportHTML, isLoading, xrayMode, onToggleXray }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showXrayTooltip, setShowXrayTooltip] = useState(false);

  return (
    <>
      {/* X-Ray Mode Toggle */}
      <motion.div
        onClick={onToggleXray}
        onMouseEnter={() => setShowXrayTooltip(true)}
        onMouseLeave={() => setShowXrayTooltip(false)}
        whileHover={{ 
          scale: 1.03,
          y: -2,
        }}
        animate={{
          right: isExpanded ? 432 : 224,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 1
        }}
        className="fixed z-50 cursor-pointer"
        style={{
          bottom: '32px',
          width: '48px',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            background: xrayMode
              ? 'linear-gradient(135deg, rgba(142, 68, 173, 0.88) 0%, rgba(155, 89, 182, 0.85) 50%, rgba(168, 105, 191, 0.88) 100%)'
              : 'linear-gradient(135deg, rgba(245, 245, 250, 0.35) 0%, rgba(240, 242, 255, 0.31) 50%, rgba(243, 243, 250, 0.33) 100%)',
            border: xrayMode ? '2px solid rgba(255, 255, 255, 0.4)' : '2px solid rgba(200, 200, 220, 0.5)',
            boxShadow: xrayMode
              ? '0 12px 40px rgba(142, 68, 173, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              : '0 8px 24px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          <EyeIcon 
            className="w-6 h-6" 
            style={{ 
              color: xrayMode ? 'white' : '#8E44AD',
              transition: 'color 0.3s ease'
            }} 
          />
        </div>

        {/* Tooltip */}
        {showXrayTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute"
            style={{
              left: '50%',
              bottom: '60px',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              color: '#8E44AD',
              fontSize: '13px',
              fontWeight: '700',
              pointerEvents: 'none',
              letterSpacing: '0.3px'
            }}
          >
            X-Ray Mode
          </motion.div>
        )}
      </motion.div>

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
                  {isLoading && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      Processing...
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full transition-all duration-200 hover:bg-black/5"
                >
                  <XMarkIcon className="w-6 h-6" style={{ color: '#1a1a2e' }} />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 space-y-4 flex-1">
                {/* Educational copy */}
                <div 
                  className="p-4 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    border: '1px solid rgba(99, 102, 241, 0.15)'
                  }}
                >
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ 
                      color: 'rgba(26, 26, 46, 0.85)',
                      lineHeight: '1.6'
                    }}
                  >
                    Your changes are automatically saved as JSON files. Save your project to download it, then share with others or open on different computers using Load Project.
                  </p>
                </div>

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
                  className="pt-3 pb-6"
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
