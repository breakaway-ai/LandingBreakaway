import React from 'react';

const NeuralNetwork: React.FC = () => {
  const nodes = [];
  
  // Create nodes
  for (let i = 0; i < 12; i++) {
    nodes.push(
      <mesh key={i} position={[
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3
      ]}>
        {/* Increased size slightly for better visibility if used alongside AIRobot */}
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.7} />
      </mesh>
    );
  }
  
  return <group>{nodes}</group>;
};

export default NeuralNetwork; 