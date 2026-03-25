import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataNodes: React.FC = () => {
  const nodesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, index) => {
        // Movimiento suave y orgánico
        const time = state.clock.elapsedTime * 0.5 + index * 1.2;
        const radius = 4 + Math.sin(time * 0.3) * 0.5;
        const angle = time * 0.4;
        const height = Math.sin(time * 0.5) * 1.5;
        
        node.position.x = Math.cos(angle) * radius;
        node.position.z = Math.sin(angle) * radius;
        node.position.y = height;
        
        // Pulsación muy sutil
        const scale = 1 + Math.sin(time * 1.5) * 0.2;
        node.scale.setScalar(scale);
      });
    }
  });

  const nodes = [];
  
  for (let i = 0; i < 6; i++) {
    nodes.push(
      <mesh key={i}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial 
          color={i % 3 === 0 ? "#00E5FF" : i % 3 === 1 ? "#A855F7" : "#10B981"}
          emissive={i % 3 === 0 ? "#00E5FF" : i % 3 === 1 ? "#A855F7" : "#10B981"}
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>
    );
  }
  
  return <group ref={nodesRef}>{nodes}</group>;
};

export default DataNodes; 