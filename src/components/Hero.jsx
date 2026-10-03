import React from 'react';

export default function Hero({ model }) {
  return (
    <section className="h-screen w-full flex items-center justify-center relative flex-col text-center" id="hero">
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        {/* Placeholder for ambient background video or dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 to-[#050505] mix-blend-multiply"></div>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-pulse">
        {model ? model.name : 'iPhone 15 Pro'}
      </h1>
      <p className="text-xl md:text-3xl text-gray-300 font-medium max-w-2xl mx-auto px-4">
        {model?.type === 'pro' ? 'Titanium. So strong. So light. So Pro.' : 'Wonderfull. Colorful. Powerful.'}
      </p>
      
      <div className="mt-12 flex gap-6">
        <button className="px-8 py-3 bg-black text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
          Buy
        </button>
        <button className="px-8 py-3 glass-panel text-white rounded-full font-medium hover:bg-white/5 transition-colors">
          Learn more
        </button>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 text-sm tracking-widest uppercase">
        Scroll to explore
      </div>
    </section>
  );
}
