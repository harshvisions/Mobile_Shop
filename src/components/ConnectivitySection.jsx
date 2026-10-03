import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ConnectivitySection() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.usb-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen w-full flex items-center justify-start pointer-events-none" id="connectivity">
      <div className="max-w-7xl mx-auto px-6 w-full flex">
        <div className="usb-text w-full max-w-md pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.15)]">
          <p className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-4">Connectivity</p>
          <h2 className="text-4xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Gigablast your gigabits.
          </h2>
          <p className="text-gray-400 font-light leading-relaxed mb-6">
            iPhone 15 Pro is the first iPhone to support USB-C, enabling a huge leap in data transfer speeds and faster pro workflows than ever before.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-xl font-bold">
              20x
            </div>
            <p className="text-sm text-gray-400">faster file transfers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
