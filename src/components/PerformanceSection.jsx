import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PerformanceSection() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.perf-text',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1,
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
    <section ref={containerRef} className="min-h-screen w-full flex items-center justify-center pointer-events-none text-center" id="performance">
      <div className="max-w-4xl mx-auto px-6 w-full pointer-events-auto pt-32">
        <h2 className="perf-text text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-purple-400 via-blue-500 to-white">
          A17 Pro.
        </h2>
        <h3 className="perf-text text-3xl md:text-4xl font-bold text-white mb-6">
          A monster win for gaming.
        </h3>
        <p className="perf-text text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
          It's here. The biggest redesign in the history of Apple GPUs. A17 Pro is an entirely new class of iPhone chip that delivers our best graphics performance by far. Mobile games will look and feel so immersive, with incredibly detailed environments and more realistic characters.
        </p>
      </div>
    </section>
  );
}
