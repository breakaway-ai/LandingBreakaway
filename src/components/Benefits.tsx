import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  position: relative;
`;

const BenefitsTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--color-blue);
  font-weight: 800;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
  text-shadow: var(--text-shadow-glow);
  
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
  color: var(--color-background);
  opacity: 0.9;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
`;

const BenefitsGrid = styled(motion.div)`
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
  color: var(--color-cream-highlight);
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
  text-shadow: var(--text-shadow-md);
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

const DecorativeWave = styled(motion.div)`
  width: 100%;
  height: 150px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(87, 108, 168, 0.1),
    transparent
  );
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(87, 108, 168, 0.05) 10px,
      rgba(87, 108, 168, 0.05) 20px
    );
    animation: wave 10s linear infinite;
  }
  
  @keyframes wave {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
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
  
  // Círculos de fondo
  const backgroundCircles = [
    { size: 300, top: '10%', left: '5%', delay: 0 },
    { size: 200, top: '60%', left: '80%', delay: 0.2 },
    { size: 250, top: '30%', left: '70%', delay: 0.4 },
  ];
  
  return (
    <BenefitsSection id="benefits" className="section-cream" ref={sectionRef}>
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
            Beneficios de Nuestros Agentes Inteligentes
          </BenefitsTitle>
          <BenefitsSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Los ecosistemas de agentes digitales de Breakaway transforman la operación de tu empresa, 
            automatizando tareas complejas y maximizando la eficiencia en todos los niveles.
          </BenefitsSubtitle>
        </BenefitsSectionHeader>
        
        <DecorativeWave 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        
        <BenefitsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px 0px" }}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              variants={containerVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2), 0 0 20px rgba(87, 108, 168, 0.4)"
              }}
              className="hover-lift"
            >
              <BenefitIcon
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {benefit.icon}
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