import React from 'react';
import { Float } from '@react-three/drei';

const GeometricShapes: React.FC = () => {
  const shapes = [];
  
  for (let i = 0; i < 8; i++) {
    shapes.push(
      <Float key={i} speed={1 + Math.random()} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh position={[
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          {Math.random() > 0.5 ? (
            <octahedronGeometry args={[0.3 + Math.random() * 0.3]} />
          ) : (
            <tetrahedronGeometry args={[0.3 + Math.random() * 0.3]} />
          )}
          <meshStandardMaterial 
            color={Math.random() > 0.5 ? "#A855F7" : "#00E5FF"} 
            transparent
            opacity={0.6}
            wireframe={Math.random() > 0.5}
          />
        </mesh>
      </Float>
    );
  }
  
  return <>{shapes}</>;
};

export default GeometricShapes; 