import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DesignSection() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.design-text',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 1,
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
    <section ref={containerRef} className="min-h-screen w-full flex items-center justify-start pointer-events-none" id="design">
      <div className="max-w-7xl mx-auto px-6 w-full flex">
        <div className="design-text w-full max-w-md pointer-events-auto bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <h2 className="text-5xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Forged in titanium.
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-6">
            iPhone 15 Pro is the first iPhone to feature an aerospace‑grade titanium design, using the same alloy that spacecraft use for missions to Mars.
          </p>
          <p className="text-lg text-gray-400 font-light leading-relaxed">
            Titanium has one of the best strength‑to‑weight ratios of any metal, making these our lightest Pro models ever. You'll notice the difference the moment you pick one up.
          </p>
        </div>
      </div>
    </section>
  );
}
