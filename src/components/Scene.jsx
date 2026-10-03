import React, { useRef, useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows, PresentationControls } from '@react-three/drei';
import { PhoneModel } from './PhoneModel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Scene({ phoneColor, model }) {
  const phoneRef = useRef();
  const groupRef = useRef();
  const { viewport } = useThree();

  // Responsive scaling based on 3D viewport
  const isMobile = viewport.width < 5;
  const scale = isMobile ? 0.7 : 1;

  useLayoutEffect(() => {
    if (!phoneRef.current) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP ANIMATIONS
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "#main-scroll-container", start: "top top", end: "bottom bottom", scrub: 1 }
        });
        tl.to(phoneRef.current.rotation, { y: Math.PI / 2, x: 0, z: -0.1, ease: "power1.inOut" }, 0);
        tl.to(phoneRef.current.position, { x: 1.5, y: 0, z: 0.5, ease: "power1.inOut" }, 0);
        
        tl.to(phoneRef.current.rotation, { y: Math.PI, x: -0.2, z: 0.1, ease: "power1.inOut" }, 0.2);
        tl.to(phoneRef.current.position, { x: -1.5, y: 0.2, z: 1, ease: "power1.inOut" }, 0.2);

        tl.to(phoneRef.current.rotation, { y: Math.PI * 1.8, x: 0.2, z: 0, ease: "power1.inOut" }, 0.4);
        tl.to(phoneRef.current.position, { x: 0, y: 0, z: 0.5, ease: "power1.inOut" }, 0.4);

        tl.to(phoneRef.current.rotation, { y: Math.PI * 2, x: -Math.PI / 2.5, z: 0, ease: "power1.inOut" }, 0.6);
        tl.to(phoneRef.current.position, { x: 1.5, y: 1, z: 1, ease: "power1.inOut" }, 0.6);

        tl.to(phoneRef.current.rotation, { y: Math.PI * 2, x: 0, z: 0, ease: "power1.inOut" }, 0.8);
        tl.to(phoneRef.current.position, { x: 0, y: 0, z: 0, ease: "power1.inOut" }, 0.8);
      });

      // MOBILE ANIMATIONS (Less horizontal movement, keep phone mostly centered but animated)
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "#main-scroll-container", start: "top top", end: "bottom bottom", scrub: 1 }
        });
        tl.to(phoneRef.current.rotation, { y: Math.PI / 2, x: 0, z: -0.1, ease: "power1.inOut" }, 0);
        tl.to(phoneRef.current.position, { x: 0, y: -1.5, z: 0.5, ease: "power1.inOut" }, 0); // Move down instead of right
        
        tl.to(phoneRef.current.rotation, { y: Math.PI, x: -0.2, z: 0.1, ease: "power1.inOut" }, 0.2);
        tl.to(phoneRef.current.position, { x: 0, y: 1.5, z: 1, ease: "power1.inOut" }, 0.2); // Move up instead of left

        tl.to(phoneRef.current.rotation, { y: Math.PI * 1.8, x: 0.2, z: 0, ease: "power1.inOut" }, 0.4);
        tl.to(phoneRef.current.position, { x: 0, y: 0, z: 0.5, ease: "power1.inOut" }, 0.4);

        tl.to(phoneRef.current.rotation, { y: Math.PI * 2, x: -Math.PI / 2.5, z: 0, ease: "power1.inOut" }, 0.6);
        tl.to(phoneRef.current.position, { x: 0, y: -1, z: 1, ease: "power1.inOut" }, 0.6); // Move slightly down

        tl.to(phoneRef.current.rotation, { y: Math.PI * 2, x: 0, z: 0, ease: "power1.inOut" }, 0.8);
        tl.to(phoneRef.current.position, { x: 0, y: 0, z: 0, ease: "power1.inOut" }, 0.8);
      });

    });

    return () => ctx.revert();
  }, [model]);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />
      <directionalLight position={[0, 10, -10]} intensity={1} color="#ec4899" />

      <Sparkles count={250} scale={22} size={2.5} speed={0.5} opacity={0.4} color="#f472b6" />
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={phoneRef}>
          <PresentationControls 
            global={true} 
            cursor={true}
            snap={{ mass: 4, tension: 400 }}
            speed={2}
            zoom={1}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Infinity, Infinity]}
          >
            <PhoneModel phoneColor={phoneColor} model={model} disableFloat={true} />
          </PresentationControls>
        </group>
      </Float>

      <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={20} blur={2} far={4.5} color="#a855f7" />
    </group>
  );
}
