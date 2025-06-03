import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BenefitsSection = styled.section`
  padding: 8rem 0;
  background: linear-gradient(135deg, #1E0B2C 0%, #0F0117 100%);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(white 1px, transparent 1px);
    background-size: 50px 50px;
    opacity: 0.05;
    pointer-events: none;
  }
`;

const BenefitsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 5;
`;

const BenefitsSectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 5;
`;

const BenefitsTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF !important;
  font-weight: 800;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
  text-shadow: none !important;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--color-blue), var(--color-blue-light), var(--color-blue));
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(87, 108, 168, 0.6);
  }
`;

const BenefitsSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--color-cream);
  opacity: 0.9;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
`;

const BenefitsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 5;
  
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
  box-shadow: var(--shadow-md);
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 3px solid var(--color-blue);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(87, 108, 168, 0.1) 0%,
      rgba(87, 108, 168, 0) 50%,
      rgba(87, 108, 168, 0.1) 100%
    );
    z-index: 0;
  }
`;

const BenefitIcon = styled(motion.div)`
  height: 80px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 1;
  font-size: 3rem;
`;

const BenefitTitle = styled(motion.h3)`
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: #FFFFFF !important;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
  text-shadow: none !important;
  text-align: center;
`;

const BenefitDescription = styled(motion.p)`
  color: var(--color-cream);
  line-height: 1.7;
  opacity: 0.9;
  position: relative;
  z-index: 1;
  text-shadow: var(--text-shadow-sm);
  text-align: center;
`;

// Nueva animación inspirada en redes neuronales y agentes inteligentes
const NeuralNetworkAnimation = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

const NodePoint = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-blue-light);
  box-shadow: 0 0 10px var(--color-blue-light), 0 0 20px rgba(138, 79, 255, 0.4);
  z-index: 1;
`;

const ConnectionLine = styled(motion.div)`
  position: absolute;
  height: 4px;
  background: linear-gradient(90deg, rgba(138, 79, 255, 0.3), rgba(138, 79, 255, 0.9), rgba(138, 79, 255, 0.3));
  transform-origin: left center;
  box-shadow: 0 0 12px rgba(138, 79, 255, 0.5);
  z-index: 1;
`;

const DataPacket = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  z-index: 2;
`;

// Background elements
const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-blue-light) 0%, rgba(87, 108, 168, 0) 70%);
  opacity: 0.1;
  z-index: 0;
`;

const Benefits: React.FC = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: "🤖",
      titleKey: "benefits.benefit1Title",
      descriptionKey: "benefits.benefit1Description"
    },
    {
      icon: "📉",
      titleKey: "benefits.benefit2Title",
      descriptionKey: "benefits.benefit2Description"
    },
    {
      icon: "🚀",
      titleKey: "benefits.benefit3Title",
      descriptionKey: "benefits.benefit3Description"
    },
    {
      icon: "🧠",
      titleKey: "benefits.benefit4Title",
      descriptionKey: "benefits.benefit4Description"
    },
    {
      icon: "⚙️",
      titleKey: "benefits.benefit5Title",
      descriptionKey: "benefits.benefit5Description"
    },
    {
      icon: "🔄",
      titleKey: "benefits.benefit6Title",
      descriptionKey: "benefits.benefit6Description"
    }
  ];
  
  // Referencias para animaciones basadas en scroll
  const sectionRef = useRef(null);
  
  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0, 
      rotate: -30 
    },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: {
      scale: 1.2,
      rotate: [0, -5, 5, -5, 0],
      transition: { 
        duration: 0.5, 
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };
  
  // Círculos de fondo
  const backgroundCircles = [
    { size: 300, top: '10%', left: '5%', delay: 0 },
    { size: 200, top: '60%', left: '80%', delay: 0.2 },
    { size: 250, top: '30%', left: '70%', delay: 0.4 },
  ];
  
  // Nuevas constantes para la animación
  const nodes = [
    { id: 1, x: "5%", y: "10%", delay: 0 },
    { id: 2, x: "20%", y: "30%", delay: 0.3 },
    { id: 3, x: "40%", y: "15%", delay: 0.5 },
    { id: 4, x: "60%", y: "40%", delay: 0.2 },
    { id: 5, x: "85%", y: "20%", delay: 0.4 },
    { id: 6, x: "15%", y: "65%", delay: 0.6 },
    { id: 7, x: "35%", y: "80%", delay: 0.1 },
    { id: 8, x: "75%", y: "75%", delay: 0.7 },
    { id: 9, x: "30%", y: "20%", delay: 0.25 },
    { id: 10, x: "70%", y: "30%", delay: 0.35 },
    { id: 11, x: "10%", y: "45%", delay: 0.45 },
    { id: 12, x: "50%", y: "60%", delay: 0.55 },
    { id: 13, x: "95%", y: "50%", delay: 0.15 },
    { id: 14, x: "25%", y: "90%", delay: 0.65 },
    { id: 15, x: "65%", y: "85%", delay: 0.75 },
    { id: 16, x: "85%", y: "90%", delay: 0.85 },
    { id: 17, x: "45%", y: "40%", delay: 0.33 },
    { id: 18, x: "90%", y: "10%", delay: 0.42 },
  ];
  
  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 9 },
    { from: 1, to: 11 },
    { from: 2, to: 4 },
    { from: 2, to: 6 },
    { from: 2, to: 9 },
    { from: 2, to: 11 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 3, to: 9 },
    { from: 3, to: 10 },
    { from: 4, to: 5 },
    { from: 4, to: 7 },
    { from: 4, to: 10 },
    { from: 4, to: 12 },
    { from: 5, to: 8 },
    { from: 5, to: 10 },
    { from: 6, to: 7 },
    { from: 6, to: 11 },
    { from: 6, to: 12 },
    { from: 7, to: 8 },
    { from: 7, to: 12 },
    { from: 8, to: 10 },
    { from: 9, to: 10 },
    { from: 9, to: 12 },
    { from: 10, to: 12 },
    { from: 11, to: 12 },
  ];
  
  // Calcular ángulo entre dos nodos para la rotación de la línea
  const calculateAngle = (fromX: string, fromY: string, toX: string, toY: string) => {
    const fromXNum = parseFloat(fromX) / 100;
    const fromYNum = parseFloat(fromY) / 100;
    const toXNum = parseFloat(toX) / 100;
    const toYNum = parseFloat(toY) / 100;
    
    return Math.atan2(toYNum - fromYNum, toXNum - fromXNum) * (180 / Math.PI);
  };
  
  // Calcular longitud entre dos nodos
  const calculateLength = (fromX: string, fromY: string, toX: string, toY: string) => {
    const fromXNum = parseFloat(fromX) / 100;
    const fromYNum = parseFloat(fromY) / 100;
    const toXNum = parseFloat(toX) / 100;
    const toYNum = parseFloat(toY) / 100;
    
    const a = (toXNum - fromXNum);
    const b = (toYNum - fromYNum);
    
    return Math.sqrt(a * a + b * b) * 100 + "%";
  };
  
  return (
    <BenefitsSection id="benefits" ref={sectionRef}>
      <NeuralNetworkAnimation
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {nodes.map((node) => (
          <NodePoint 
            key={`node-${node.id}`}
            style={{ 
              left: node.x, 
              top: node.y 
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: node.delay,
              repeatType: "reverse"
            }}
          />
        ))}
        
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          const angle = calculateAngle(fromNode.x, fromNode.y, toNode.x, toNode.y);
          const length = calculateLength(fromNode.x, fromNode.y, toNode.x, toNode.y);
          
          return (
            <ConnectionLine 
              key={`connection-${index}`}
              style={{ 
                left: fromNode.x, 
                top: fromNode.y,
                width: length,
                transform: `rotate(${angle}deg)`
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: Math.random() * 2,
                repeatType: "reverse"
              }}
            />
          );
        })}
        
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <DataPacket 
              key={`packet-${index}`}
              initial={{ 
                left: fromNode.x, 
                top: fromNode.y,
                opacity: 0
              }}
              animate={{ 
                left: toNode.x, 
                top: toNode.y,
                opacity: [0, 0.7, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.2 % 5,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </NeuralNetworkAnimation>
      
      {backgroundCircles.map((circle, index) => (
        <BackgroundCircle
          key={index}
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: circle.delay }}
        />
      ))}
      
      <BenefitsContainer>
        <BenefitsSectionHeader>
          <BenefitsTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.7 }}
          >
            {t('benefits.sectionTitle')}
          </BenefitsTitle>
          <BenefitsSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('benefits.sectionSubtitle')}
          </BenefitsSubtitle>
        </BenefitsSectionHeader>
        
        <BenefitsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px 0px" }}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2), 0 0 20px rgba(87, 108, 168, 0.4)"
              }}
              className="hover-lift"
            >
              <BenefitIcon
                variants={iconVariants}
                whileHover="hover"
              >
                {benefit.icon}
              </BenefitIcon>
              <BenefitTitle>{t(benefit.titleKey)}</BenefitTitle>
              <BenefitDescription>{t(benefit.descriptionKey)}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </BenefitsContainer>
    </BenefitsSection>
  );
};

export default Benefits; 