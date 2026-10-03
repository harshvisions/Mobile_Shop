import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CameraSection() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.camera-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[120vh] w-full flex items-center justify-end pointer-events-none" id="camera">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-end">
        <div className="w-full max-w-lg pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-3xl shadow-[0_0_40px_rgba(236,72,153,0.15)]">
          <p className="camera-text text-sm font-bold tracking-widest text-pink-400 uppercase mb-4">Pro Camera System</p>
          <h2 className="camera-text text-4xl md:text-5xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-400">
            Wildly powerful. <br/> Completely natural.
          </h2>
          <p className="camera-text text-lg text-gray-300 font-light leading-relaxed mb-6">
            The advanced 48MP Main camera is more advanced than ever, capturing super‑high‑resolution photos with a new level of detail and color.
          </p>
          <div className="camera-text flex gap-8 border-t border-white/10 pt-6 mt-6">
            <div>
              <p className="text-3xl font-bold text-white mb-1">48MP</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Main Camera</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">5x</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Optical Zoom</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
