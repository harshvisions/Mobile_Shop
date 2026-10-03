import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DesignSection from './components/DesignSection';
import CameraSection from './components/CameraSection';
import PerformanceSection from './components/PerformanceSection';
import ConnectivitySection from './components/ConnectivitySection';
import Configurator from './components/Configurator';
import SpecsSection from './components/SpecsSection';
import AccessoriesSection from './components/AccessoriesSection';
import ContactSection from './components/ContactSection';
import Scene from './components/Scene';
import Iphone17Viewer from './components/Iphone17Viewer';
import { iphoneModels } from './modelsData';

function App() {
  // Default to iPhone 18 Pro Max
  const defaultModel = iphoneModels.find(m => m.id === 'iphone-18-pro-max') || iphoneModels[0];
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [phoneColor, setPhoneColor] = useState(defaultModel.colors[0].value); 

  const handleModelChange = (newModel) => {
    setSelectedModel(newModel);
    setPhoneColor(newModel.colors[0].value); // Default to first color of new model
  };

  return (
    <>
      <Navbar />
      
      {/* Dynamic Aesthetic Background Gradient */}
      <div className="fixed inset-0 z-[-2] bg-[#050505] transition-colors duration-1000">
        <div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] mix-blend-screen pointer-events-none animate-pulse transition-colors duration-1000"
          style={{ backgroundColor: phoneColor, opacity: 0.3 }}
        ></div>
        <div 
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[150px] mix-blend-screen pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: phoneColor, opacity: 0.2 }}
        ></div>
      </div>

      {/* Scrollable Content */}
      <div id="main-scroll-container" className="relative z-10 w-full overflow-x-hidden">
        <Hero model={selectedModel} />
        <DesignSection />
        <CameraSection />
        
        {/* 3D Model in the middle of the website */}
        <div className="w-full min-h-screen relative z-20 flex flex-col md:flex-row items-center justify-center bg-[#050505] border-y border-white/10 overflow-hidden py-12 md:py-0">
           
           {/* Text Content */}
           <div className="w-full md:w-1/2 p-8 md:pl-24 lg:pl-40 z-30 flex flex-col justify-center">
             <h2 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-100 to-gray-600">
               {selectedModel.name}
             </h2>
             <h3 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ color: phoneColor }}>
               Authentic 3D Models.
             </h3>
             <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
               {selectedModel.specs.display} • {selectedModel.specs.chip} • {selectedModel.specs.camera}
             </p>

             <div className="flex flex-wrap gap-4">
               <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95">
                 Buy from $999
               </button>
               <button className="px-8 py-4 glass-panel text-white rounded-full font-bold hover:bg-white/10 transition-transform hover:scale-105 active:scale-95">
                 Learn more
               </button>
             </div>
           </div>

           {/* 3D Viewer */}
           <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative z-20 cursor-grab active:cursor-grabbing">
             <Iphone17Viewer className="w-full h-full" selectedModel={selectedModel} onColorExtracted={setPhoneColor} />
           </div>
           
        </div>
        
        <PerformanceSection />
        <ConnectivitySection />
        <Configurator 
          phoneColor={phoneColor} 
          setPhoneColor={setPhoneColor}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel} 
        />
        <SpecsSection model={selectedModel} />
        <AccessoriesSection />
        <ContactSection />
      </div>

      {/* Loading Screen */}
      <Loader 
        containerStyles={{ backgroundColor: '#050505' }}
        innerStyles={{ width: '300px', height: '4px' }}
        barStyles={{ backgroundColor: 'white' }}
        dataStyles={{ color: 'white', fontFamily: 'Inter' }}
      />
    </>
  );
}

export default App;
