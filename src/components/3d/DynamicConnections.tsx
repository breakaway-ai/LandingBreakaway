import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DynamicConnections: React.FC = () => {
  const connectionsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (connectionsRef.current) {
      connectionsRef.current.children.forEach((connection, index) => {
        // Animar opacidad de las conexiones
        const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + index * 0.5) * 0.2;
        if (connection instanceof THREE.Mesh && connection.material instanceof THREE.MeshBasicMaterial) {
          connection.material.opacity = opacity;
        }
      });
    }
  });
  
  const connections = [];
  
  // Crear conexiones dinámicas
  for (let i = 0; i < 6; i++) {
    const startAngle = (i / 6) * Math.PI * 2;
    const endAngle = ((i + 2) / 6) * Math.PI * 2;
    const radius = 4;
    
    const start = new THREE.Vector3(
      Math.cos(startAngle) * radius,
      Math.sin(startAngle * 0.5) * 2,
      Math.sin(startAngle) * radius
    );
    
    const end = new THREE.Vector3(
      Math.cos(endAngle) * radius,
      Math.sin(endAngle * 0.5) * 2,
      Math.sin(endAngle) * radius
    );
    
    const distance = start.distanceTo(end);
    const center = start.clone().add(end).multiplyScalar(0.5);
    const direction = end.clone().sub(start).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction);
    
    connections.push(
      <mesh
        key={i}
        position={center.toArray() as [number, number, number]}
        quaternion={quaternion}
      >
        <cylinderGeometry args={[0.008, 0.008, distance]} />
        <meshBasicMaterial
          color="#00D9FF"
          transparent
          opacity={0.4}
        />
      </mesh>
    );
  }
  
  return <group ref={connectionsRef}>{connections}</group>;
};

export default DynamicConnections; 