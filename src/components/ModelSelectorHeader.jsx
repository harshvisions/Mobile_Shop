import React from 'react';
import { iphoneModels } from '../modelsData';

export default function ModelSelectorHeader({ selectedModel, onSelectModel }) {
  return (
    <div className="fixed top-16 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10 overflow-x-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 h-12 whitespace-nowrap">
          {iphoneModels.map((model) => (
            <button
              key={model.id}
              onClick={() => onSelectModel(model)}
              className={`text-sm font-medium transition-colors px-2 py-1 rounded-md ${
                selectedModel.id === model.id 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
