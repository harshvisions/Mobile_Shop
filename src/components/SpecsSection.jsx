import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpecsSection({ model }) {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.spec-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [model]);

  if (!model) return null;

  const { specs } = model;

  return (
    <section ref={containerRef} className="min-h-[80vh] w-full flex items-center justify-center relative py-20" id="specs">
      {/* Colorful glow background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 w-full z-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center text-white">
          Specifications for {model.name}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="spec-item glass-panel p-8 hover:bg-white/5 transition-colors">
            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Display</h4>
            <p className="text-xl text-white font-medium">{specs.display}</p>
          </div>
          <div className="spec-item glass-panel p-8 hover:bg-white/5 transition-colors">
            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Chip</h4>
            <p className="text-xl text-white font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {specs.chip}
            </p>
          </div>
          <div className="spec-item glass-panel p-8 hover:bg-white/5 transition-colors">
            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Camera</h4>
            <p className="text-xl text-white font-medium">{specs.camera}</p>
          </div>
          <div className="spec-item glass-panel p-8 hover:bg-white/5 transition-colors">
            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Material</h4>
            <p className="text-xl text-white font-medium">{specs.material}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
