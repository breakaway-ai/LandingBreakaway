import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating Orbs
const FloatingOrb = ({ position, color, size }: { position: [number, number, number], color: string, size: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

// Floating Wireframe Shapes
const WireframeShape = ({ position, shape, color }: { position: [number, number, number], shape: string, color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const geometry = shape === 'tetrahedron' ? 
    <tetrahedronGeometry args={[1]} /> : 
    <octahedronGeometry args={[1]} />;

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshBasicMaterial 
          color={color} 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
};

// Data Nodes (representing AI connections)
const DataNode = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      meshRef.current.material.emissiveIntensity = 
        0.5 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial 
        color="#00E5FF" 
        emissive="#00E5FF"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const FloatingElements: React.FC = () => {
  const orbs = [
    { position: [-15, 5, -10] as [number, number, number], color: "#A855F7", size: 1.2 },
    { position: [12, -8, -15] as [number, number, number], color: "#00E5FF", size: 0.8 },
    { position: [-8, -12, -8] as [number, number, number], color: "#A855F7", size: 1.0 },
    { position: [18, 10, -12] as [number, number, number], color: "#00E5FF", size: 0.6 },
  ];

  const wireframes = [
    { position: [-20, -5, -20] as [number, number, number], shape: "tetrahedron", color: "#A855F7" },
    { position: [25, 8, -25] as [number, number, number], shape: "octahedron", color: "#00E5FF" },
    { position: [-10, 15, -15] as [number, number, number], shape: "tetrahedron", color: "#A855F7" },
    { position: [15, -15, -20] as [number, number, number], shape: "octahedron", color: "#00E5FF" },
  ];

  const dataNodes = Array.from({ length: 20 }, () => ({
    position: [
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 30,
      -30 + Math.random() * 20
    ] as [number, number, number]
  }));

  return (
    <group>
      {/* Ambient lighting for the floating elements */}
      <ambientLight intensity={0.2} />
      <pointLight position={[20, 20, 20]} intensity={0.5} color="#A855F7" />
      <pointLight position={[-20, -20, 10]} intensity={0.5} color="#00E5FF" />

      {/* Floating orbs */}
      {orbs.map((orb, index) => (
        <FloatingOrb 
          key={`orb-${index}`}
          position={orb.position} 
          color={orb.color} 
          size={orb.size} 
        />
      ))}

      {/* Wireframe shapes */}
      {wireframes.map((wireframe, index) => (
        <WireframeShape 
          key={`wireframe-${index}`}
          position={wireframe.position} 
          shape={wireframe.shape} 
          color={wireframe.color} 
        />
      ))}

      {/* Data nodes for AI network effect */}
      {dataNodes.map((node, index) => (
        <DataNode 
          key={`node-${index}`}
          position={node.position}
        />
      ))}
    </group>
  );
};

export default FloatingElements; 