import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const MiniSolarSystem: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const linesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group scale={[1.8, 1.8, 1.8]}>
        {/* Núcleo del planeta */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#1a1a2e"
            distort={0.1}
            speed={2}
            emissive="#16213e"
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Líneas de conexión globales */}
        <group ref={linesRef}>
          {[...Array(12)].map((_, i) => (
            <mesh
              key={i}
              rotation={[
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ]}
            >
              <torusGeometry args={[1.1 + Math.random() * 0.3, 0.01, 4, 32]} />
              <meshBasicMaterial
                color={Math.random() > 0.5 ? "#00E5FF" : "#A855F7"}
                transparent
                opacity={0.4}
              />
            </mesh>
          ))}
        </group>
        
        {/* Satélites orbitando */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 2;
          return (
            <mesh
              key={`satellite-${i}`}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 0.5) * 0.5,
                Math.sin(angle) * radius
              ]}
            >
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial
                color="#FFD700"
                emissive="#FFD700"
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}
        
        {/* Campo de energía */}
        <mesh>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshBasicMaterial
            color="#00E5FF"
            transparent
            opacity={0.05}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
};

export default MiniSolarSystem; 