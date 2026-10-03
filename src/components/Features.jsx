import React, { useLayoutEffect, useRef } from 'react';
import { Cpu, Camera, Battery } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.feature-box').forEach((box, i) => {
        gsap.fromTo(box, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: box,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[150vh] w-full relative pt-32 pb-32 pointer-events-none" id="features">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-around">
        
        <div className="feature-box w-full max-w-md ml-auto glass-panel p-8 mb-48 pointer-events-auto transition-transform hover:scale-105 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Camera className="w-10 h-10 mb-6 text-gray-300" />
          <h3 className="text-2xl font-bold mb-3">A camera that captures your wildest imagination.</h3>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            From dramatic framing flexibility to next-generation portraits, see what you can do with our most powerful iPhone camera system.
          </p>
        </div>

        <div className="feature-box w-full max-w-md mr-auto glass-panel p-8 mb-48 pointer-events-auto transition-transform hover:scale-105 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Cpu className="w-10 h-10 mb-6 text-gray-300" />
          <h3 className="text-2xl font-bold mb-3">A17 Pro chip. A monster win for gaming.</h3>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            It's here. The biggest redesign in the history of Apple GPUs. A17 Pro is an entirely new class of iPhone chip that delivers our best graphics performance by far.
          </p>
        </div>

        <div className="feature-box w-full max-w-md ml-auto glass-panel p-8 pointer-events-auto transition-transform hover:scale-105 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <Battery className="w-10 h-10 mb-6 text-gray-300" />
          <h3 className="text-2xl font-bold mb-3">Battery life that's positively Pro.</h3>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            Even with so many advanced new features, iPhone 15 Pro still gives you amazing all‑day battery life. Up to 29 hours video playback on iPhone 15 Pro Max.
          </p>
        </div>

      </div>
    </section>
  );
}
