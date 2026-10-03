import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';

export function PhoneModel({ phoneColor = "#111111", model, ...props }) {
  const group = useRef();
  
  // Default fallbacks if model is not provided
  const notchType = model?.notchType || 'island';
  const cameraLayout = model?.cameraLayout || 'pro3';

  // Basic floating animation if not controlled by GSAP
  useFrame((state) => {
    if (!props.disableFloat) {
      const t = state.clock.getElapsedTime();
      group.current.position.y = (Math.sin(t / 1.5)) / 10;
      group.current.rotation.x = Math.cos(t / 2) / 20;
      group.current.rotation.y = Math.sin(t / 2) / 20;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Main Body */}
      <RoundedBox args={[2.5, 5, 0.3]} radius={0.3} smoothness={4}>
        <meshStandardMaterial color={phoneColor} roughness={0.15} metalness={0.8} />
      </RoundedBox>

      {/* Screen (Glassmorphism look) */}
      <RoundedBox args={[2.4, 4.9, 0.31]} radius={0.28} smoothness={4} position={[0, 0, 0.01]}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.1}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.0}
          distortionScale={0.3}
          temporalDistortion={0.0}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#000000"
          transmission={0.95}
        />
      </RoundedBox>
      
      {/* Notch or Dynamic Island */}
      {notchType === 'island' ? (
        <RoundedBox args={[0.7, 0.18, 0.32]} radius={0.09} smoothness={4} position={[0, 2.1, 0.01]}>
          <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.9} />
        </RoundedBox>
      ) : (
        <RoundedBox args={[1.2, 0.3, 0.32]} radius={0.15} smoothness={4} position={[0, 2.35, 0.01]}>
          <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.9} />
        </RoundedBox>
      )}

      {/* Camera Bump */}
      <group position={[0.65, 1.75, 0.16]}>
        {/* Bump Base */}
        <RoundedBox args={[1.1, 1.1, 0.1]} radius={0.3} smoothness={4}>
          <meshStandardMaterial color={phoneColor} roughness={0.2} metalness={0.7} />
        </RoundedBox>
        
        {/* Lenses Layout */}
        {cameraLayout === 'pro3' && (
          <>
            <mesh position={[-0.25, 0.25, 0.08]}>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
              <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
            </mesh>
            <mesh position={[0.25, -0.25, 0.08]}>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
              <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
            </mesh>
            <mesh position={[-0.25, -0.25, 0.08]}>
              <cylinderGeometry args={[0.12, 0.12, 0.05, 32]} />
              <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
            </mesh>
            <mesh position={[0.25, 0.25, 0.06]}>
              <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
              <meshStandardMaterial color="#222" roughness={0.5} />
            </mesh>
          </>
        )}

        {cameraLayout === 'diagonal2' && (
          <>
            <mesh position={[-0.25, 0.25, 0.08]}>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
              <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
            </mesh>
            <mesh position={[0.25, -0.25, 0.08]}>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
              <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
            </mesh>
          </>
        )}

        {cameraLayout === 'vertical2' && (
          <>
            <mesh position={[0, 0.25, 0.08]}>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
              <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
            </mesh>
            <mesh position={[0, -0.25, 0.08]}>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
              <meshStandardMaterial color="#050505" roughness={0.1} metalness={1} />
            </mesh>
          </>
        )}
      </group>
      
      {/* Charging Port Indicator (bottom) */}
      <mesh position={[0, -2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.1, 0.35, 16]} />
        <meshStandardMaterial color="#050505" roughness={0.8} />
      </mesh>
    </group>
  );
}
