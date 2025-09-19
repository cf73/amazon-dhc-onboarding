import React from 'react';
import { 
  DocumentArrowDownIcon, 
  FolderOpenIcon, 
  DocumentTextIcon, 
  PrinterIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const ControlPanel = ({ onSave, onLoad, onExportPDF, onExportHTML, isLoading }) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-40 w-64">
      <div className="mb-4">
        <h3 className="font-bold text-lg text-amazon-text mb-1">Amazon Onboarding Tool</h3>
        <div className="text-sm text-amazon-text-light">
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
      
      <div className="space-y-3">
        <button
          onClick={onSave}
          disabled={isLoading}
          className="w-full flex items-center gap-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
        >
          <DocumentArrowDownIcon className="w-5 h-5" />
          Save Project
        </button>
        
        <button
          onClick={onLoad}
          disabled={isLoading}
          className="w-full flex items-center gap-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
        >
          <FolderOpenIcon className="w-5 h-5" />
          Load Project
        </button>
        
        <div className="border-t pt-3">
          <p className="text-xs text-gray-500 mb-2 font-medium">EXPORT OPTIONS</p>
          
          <button
            onClick={onExportPDF}
            disabled={isLoading}
            className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors mb-2"
          >
            <PrinterIcon className="w-5 h-5" />
            Export PDF
          </button>
          
          <button
            onClick={onExportHTML}
            disabled={isLoading}
            className="w-full flex items-center gap-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Export HTML
          </button>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t text-xs text-gray-500">
        <p className="mb-1">🚀 <strong>React Mode:</strong> Enhanced interactions</p>
        <p>💾 <strong>Auto-save:</strong> Changes saved automatically</p>
      </div>
    </div>
  );
};

export default ControlPanel;






