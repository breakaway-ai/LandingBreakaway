import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';

const BenefitsSection = styled.section`
  padding: 8rem 0;
  background-color: var(--color-cream);
  position: relative;
  overflow: hidden;
`;

const BenefitsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BenefitsSectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const BenefitsTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--color-blue);
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const BenefitsSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-background);
  opacity: 0.9;
  line-height: 1.6;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled(motion.div)`
  background-color: var(--color-card-bg);
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 3px solid var(--color-blue);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const BenefitIcon = styled.div`
  height: 80px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: var(--color-blue);
  letter-spacing: -0.02em;
`;

const BenefitDescription = styled.p`
  color: var(--color-gray);
  line-height: 1.7;
  opacity: 0.85;
`;

const AnimationContainer = styled.div`
  width: 100%;
  height: 250px;
  position: relative;
  margin-bottom: 5rem;
`;

// 3D Text for Benefits Visualization
const Benefit3DText = ({ 
  text, 
  position, 
  rotation 
}: { 
  text: string, 
  position: [number, number, number], 
  rotation: [number, number, number] 
}) => {
  return (
    <Text3D
      font="/fonts/montserrat.json"
      position={position}
      rotation={rotation}
      size={0.5}
      height={0.1}
      curveSegments={12}
    >
      {text}
      <meshStandardMaterial color="#A0522D" />
    </Text3D>
  );
};

// Custom component to simulate 3D text since we don't have the actual font file
const BenefitsAnimation = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} autoRotate />
      <Center>
        <mesh>
          <torusGeometry args={[2, 0.2, 16, 100]} />
          <meshStandardMaterial color="#A0522D" />
        </mesh>
        <mesh position={[0, 0, 0.5]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#4A4A4A" />
        </mesh>
      </Center>
    </Canvas>
  );
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: "🤖",
      title: "Automatización Integral Inteligente",
      description: "Nuestros agentes digitales automatizan procesos completos end-to-end, eliminando ineficiencias y errores humanos, permitiéndote enfocarte en lo que realmente importa."
    },
    {
      icon: "📉",
      title: "Reducción Radical de Costos",
      description: "Logra hasta un 70% de reducción en costos operativos mediante la automatización de tareas repetitivas y la optimización de recursos en toda tu organización."
    },
    {
      icon: "🚀",
      title: "Escalabilidad Sin Límites",
      description: "Escala tu operación sin las limitaciones tradicionales del crecimiento humano, permitiendo una expansión exponencial y adaptación rápida a nuevos mercados."
    },
    {
      icon: "🧠",
      title: "Decisiones Basadas en Datos",
      description: "Transforma tu toma de decisiones con agentes que analizan datos en tiempo real, mejorando la precisión y anticipándose a las necesidades del mercado."
    },
    {
      icon: "⚙️",
      title: "Optimización Continua",
      description: "Implementa sistemas que aprenden y mejoran constantemente, adaptándose a cambios y optimizando procesos automáticamente sin intervención manual."
    },
    {
      icon: "🔄",
      title: "Flujos de Trabajo de Bajo Código",
      description: "Crea rápidamente flujos de trabajo complejos conectando agentes y herramientas con una interfaz sencilla, sin necesidad de conocimientos técnicos avanzados."
    }
  ];
  
  return (
    <BenefitsSection id="benefits" className="section-cream">
      <BenefitsContainer>
        <BenefitsSectionHeader>
          <BenefitsTitle>Beneficios de Nuestros Agentes Inteligentes</BenefitsTitle>
          <BenefitsSubtitle>
            Los ecosistemas de agentes digitales de Breakaway transforman la operación de tu empresa, 
            automatizando tareas complejas y maximizando la eficiencia en todos los niveles.
          </BenefitsSubtitle>
        </BenefitsSectionHeader>
        
        <AnimationContainer>
          <BenefitsAnimation />
        </AnimationContainer>
        
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="hover-lift"
            >
              <BenefitIcon>
                <span style={{ fontSize: '3rem' }}>{benefit.icon}</span>
              </BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </BenefitsContainer>
    </BenefitsSection>
  );
};

export default Benefits; 