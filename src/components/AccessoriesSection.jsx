import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const accessories = [
  {
    id: 1,
    name: 'Earbuds',
    desc: 'Active Noise Cancellation and adaptive audio for an immersive experience.',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=500&q=80',
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 2,
    name: '25W Charger',
    desc: 'Fast charging to keep you powered up all day.',
    price: '$39',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHJA3_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=95&.v=1604085449000',
    color: 'from-pink-500/20 to-orange-500/20'
  }
];

export default function AccessoriesSection() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.accessory-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-transparent py-24 relative z-20 border-t border-white/10" id="accessories">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Magic runs in the family.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore accessories designed specifically to seamlessly integrate with your new iPhone. From pristine audio to magnetic charging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((acc) => (
            <div key={acc.id} className="accessory-card glass-panel flex flex-col items-start hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group rounded-2xl">
              {/* Colored Glow inside card */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${acc.color} rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-500`}></div>
              
              <div className="relative w-full h-48 overflow-hidden bg-black border-b border-white/10">
                <img 
                  src={acc.image} 
                  alt={acc.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                />
              </div>

              <div className="relative z-10 w-full p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{acc.name}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{acc.desc}</p>
                <div className="flex items-center justify-between mt-auto w-full border-t border-white/10 pt-4">
                  <span className="text-white font-medium">{acc.price}</span>
                  <button className="text-xs font-bold uppercase tracking-wider text-black bg-white px-4 py-2 rounded-full hover:bg-gray-200 transition-colors">
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
