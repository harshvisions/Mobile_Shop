import React, { Suspense, useRef, useLayoutEffect, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const modelPaths = {
  'iphone-12': '/iphone_12_pro/scene.gltf',
  'iphone-12-pro': '/iphone_12_pro/scene.gltf',
  'iphone-13': '/apple_iphone_13_pro_max/scene.gltf',
  'iphone-13-pro': '/apple_iphone_13_pro_max/scene.gltf',
  'iphone-14': '/iphone_14_pro/scene.gltf',
  'iphone-14-pro': '/iphone_14_pro/scene.gltf',
  'iphone-15': '/iphone_15_pro_max_made_in_blender/scene.gltf',
  'iphone-15-pro': '/iphone_15_pro_max_made_in_blender/scene.gltf',
  'iphone-16': '/iphone_16_-_free/scene.gltf',
  'iphone-16-pro': '/iphone_16_pro_max/scene.gltf',
  'iphone-17-pro': '/iphone_17_pro/scene.gltf',
  'iphone-17-pro-max': '/iphone_17_pro_max/scene.gltf',
  'iphone-18-pro-max': '/apple_iphone_18_pro_max_burgundy_2026/scene.gltf'
};

function DynamicModel({ modelId, onColorExtracted }) {
  const modelPath = modelPaths[modelId] || '/iphone_17_pro/scene.gltf';
  const { scene } = useGLTF(modelPath);
  const wrapperRef = useRef();

  useEffect(() => {
    if (scene) {
      // 1. Extract dominant color from the model to theme the website
      if (onColorExtracted) {
        let extractedColor = null;
        scene.traverse((child) => {
          if (child.isMesh && child.material && child.material.color && !extractedColor) {
            const matName = child.material.name.toLowerCase();
            // Avoid extracting color from screens, glass, or lenses
            if (!matName.includes('screen') && !matName.includes('glass') && !matName.includes('lens') && !matName.includes('black')) {
              extractedColor = '#' + child.material.color.getHexString();
            }
          }
        });
        
        // If we found a valid color, update the website theme!
        if (extractedColor && extractedColor !== '#ffffff' && extractedColor !== '#000000') {
          onColorExtracted(extractedColor);
        }
      }

      // 2. Auto-scale the model so they all appear fully visible
      import('three').then((THREE) => {
        if (wrapperRef.current) {
          wrapperRef.current.scale.set(1, 1, 1);
          wrapperRef.current.position.set(0, 0, 0);
          wrapperRef.current.updateMatrixWorld(true);
        }

        const box = new THREE.Box3();
        box.makeEmpty();
        
        scene.updateMatrixWorld(true);
        scene.traverse((child) => {
          if (child.isMesh) {
            box.expandByObject(child);
          }
        });

        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        
        if (maxDim > 0 && wrapperRef.current) {
          const targetSize = 5.5; // A bigger target size to ensure the model looks massive and fully visible
          const scale = targetSize / maxDim;
          wrapperRef.current.scale.setScalar(scale);

          // Center the model precisely using the mesh bounding box
          const center = new THREE.Vector3();
          box.getCenter(center);
          wrapperRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        }
      });
    }
  }, [scene, modelPath, onColorExtracted]);

  return (
    <group ref={wrapperRef}>
      <primitive 
        object={scene} 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]} 
      />
    </group>
  );
}

function AnimatedGroup({ children }) {
  const groupRef = useRef();
  
  useLayoutEffect(() => {
    if (!groupRef.current) return;
    
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP ANIMATIONS - CENTERED & FULL SIZE
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { 
            trigger: "#main-scroll-container", 
            start: "top top", 
            end: "bottom bottom", 
            scrub: 1 
          }
        });
        
        // Start centered, no rotation
        tl.fromTo(groupRef.current.position, 
          { x: 0, y: 0, z: 0 }, 
          { x: 0, y: 0, z: 0, ease: "none" }, 0
        );
        
        // Spin continuously through the scroll
        tl.fromTo(groupRef.current.rotation, 
          { y: 0, x: 0.1, z: -0.05 }, 
          { y: Math.PI * 8, x: -0.1, z: 0.05, ease: "none" }, 0
        );
      });

      // MOBILE ANIMATIONS - CENTERED & FULL SIZE
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { 
            trigger: "#main-scroll-container", 
            start: "top top", 
            end: "bottom bottom", 
            scrub: 1 
          }
        });
        
        // Start centered
        tl.fromTo(groupRef.current.position, 
          { x: 0, y: 0, z: 0 }, 
          { x: 0, y: 0, z: 0, ease: "none" }, 0
        );
        
        // Spin continuously through the scroll
        tl.fromTo(groupRef.current.rotation, 
          { y: 0, x: 0.1, z: -0.05 }, 
          { y: Math.PI * 8, x: -0.1, z: 0.05, ease: "none" }, 0
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}

export default function Iphone17Viewer({ className = "w-full h-screen", selectedModel, onColorExtracted }) {
  return (
    <div className={`relative ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, 10, -10]} intensity={1} color="#ffffff" />
        <directionalLight position={[0, -10, 0]} intensity={0.5} color="#ffffff" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <AnimatedGroup>
              <DynamicModel modelId={selectedModel?.id} onColorExtracted={onColorExtracted} />
            </AnimatedGroup>
          </Float>
          
          <Environment preset="studio" />
          
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.2} 
            scale={20} 
            blur={3} 
            far={4.5} 
            color="#000000" 
          />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

// Preload common models to avoid loading flash
useGLTF.preload('/iphone_17_pro/scene.gltf');
useGLTF.preload('/iphone_15_pro_max_made_in_blender/scene.gltf');
