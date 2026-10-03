import React from 'react';
import { iphoneModels } from '../modelsData';

export default function Configurator({ phoneColor, setPhoneColor, selectedModel, setSelectedModel }) {
  
  const handleModelChange = (e) => {
    const newModel = iphoneModels.find(m => m.id === e.target.value);
    if (newModel) {
      setSelectedModel(newModel);
      setPhoneColor(newModel.colors[0].value); // Default to first color of new model
    }
  };

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center pointer-events-none" id="configurator">
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 glass-panel p-6 rounded-3xl w-full max-w-xl pointer-events-auto shadow-[0_0_50px_rgba(255,255,255,0.05)] border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-tight text-white">Make it yours.</h2>
        
        <div className="flex flex-col items-center">
          
          {/* Model Selection Dropdown */}
          <div className="mb-6 w-full max-w-xs">
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2 text-center">
              Select Model
            </label>
            <div className="relative">
              <select 
                value={selectedModel.id} 
                onChange={handleModelChange}
                className="w-full appearance-none bg-black/80 border border-white/20 text-white rounded-xl py-3 px-4 pr-8 focus:outline-none focus:border-purple-500 font-medium transition-colors"
              >
                {iphoneModels.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4">Select Finish</p>
          
          {/* Color Selection */}
          <div className="flex gap-4 mb-6 flex-wrap justify-center">
            {selectedModel.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setPhoneColor(c.value)}
                className={`w-12 h-12 rounded-full transition-all duration-300 relative border-2 ${
                  phoneColor === c.value ? 'border-white scale-110' : 'border-transparent hover:scale-105 hover:border-black/50'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              >
                {phoneColor === c.value && (
                  <span className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)]"></span>
                )}
              </button>
            ))}
          </div>

          <p className="text-white font-medium text-lg mb-8">
            {selectedModel.colors.find(c => c.value === phoneColor)?.name || 'Custom Finish'}
          </p>

          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
            Pre-order {selectedModel.name}
          </button>
        </div>
      </div>
    </section>
  );
}
