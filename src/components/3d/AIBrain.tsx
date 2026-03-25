import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AIBrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotación suave y elegante
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Pulsación sutil
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
    
    // Rotación del anillo
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group>
        
        {/* Núcleo principal - más sutil */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <MeshDistortMaterial 
            color="#8B5CF6" 
            distort={0.3} 
            speed={1.5}
            transparent
            opacity={0.7}
            emissive="#8B5CF6"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Halo sutil */}
        <mesh>
          <sphereGeometry args={[2.1, 32, 32]} />
          <meshBasicMaterial
            color="#A855F7"
            transparent
            opacity={0.08}
          />
        </mesh>
        
        {/* Un solo anillo elegante */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2.5, 0.03, 8, 64]} />
            <meshStandardMaterial
              color="#00E5FF"
              emissive="#00E5FF"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
          
          {/* Solo 4 nodos en el anillo */}
          {[...Array(4)].map((_, i) => {
            const angle = (i / 4) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * 2.5,
                  Math.sin(angle) * 0.7,
                  Math.sin(angle) * 2.5
                ]}
              >
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                  color="#00E5FF"
                  emissive="#00E5FF"
                  emissiveIntensity={0.4}
                />
              </mesh>
            );
          })}
        </group>
        
        {/* Núcleo interno brillante */}
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default AIBrain; 