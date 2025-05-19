import React from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const AboutSection = styled.section`
  padding: 8rem 0;
  background-color: var(--color-background);
  position: relative;
  overflow: hidden;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--color-cream);
  font-weight: 800;
  letter-spacing: -0.02em;
  text-shadow: 0 0 15px rgba(87, 108, 168, 0.4);
  position: relative;
  display: inline-block;
  
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

const AboutSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--color-cream);
  opacity: 0.9;
  line-height: 1.6;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const AboutTextContent = styled(motion.div)`
  grid-column: 1 / 7;
  
  @media (max-width: 992px) {
    grid-column: 1 / -1;
    order: 2;
  }
`;

const AboutDescription = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.7;
  color: var(--color-cream);
  opacity: 0.9;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;

const FeatureList = styled(motion.div)`
  margin: 3rem 0;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  background-color: var(--color-card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border-left: 3px solid var(--color-blue);
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
      rgba(39, 70, 144, 0.1) 0%,
      rgba(39, 70, 144, 0) 50%,
      rgba(39, 70, 144, 0.1) 100%
    );
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 15px rgba(87, 108, 168, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
  color: var(--color-cream);
  font-size: 1.5rem;
  box-shadow: 0 0 15px rgba(87, 108, 168, 0.5);
  position: relative;
  z-index: 1;
`;

const FeatureContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-cream);
  font-weight: 700;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;

const FeatureDescription = styled.p`
  color: var(--color-cream);
  opacity: 0.85;
  line-height: 1.6;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;

const AboutVisual = styled(motion.div)`
  grid-column: 7 / 13;
  position: relative;
  
  @media (max-width: 992px) {
    grid-column: 1 / -1;
    order: 1;
  }
`;

const VisualContainer = styled(motion.div)`
  background-color: var(--color-blue);
  border-radius: 16px;
  padding: 3rem;
  color: var(--color-cream);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(87, 108, 168, 0.3);
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(245, 245, 220, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.2;
  }
  
  h3 {
    color: var(--color-cream);
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    font-weight: 700;
    position: relative;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-size: 1.1rem;
    position: relative;
    text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }
`;

// Componentes para texto animado
const AnimatedTextContainer = styled(motion.div)`
  margin-top: 2rem;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
`;

const TextBlock = styled(motion.div)`
  margin-bottom: 1.5rem;
  position: relative;
`;

const AnimatedWord = styled(motion.span)`
  display: inline-block;
  margin-right: 0.5rem;
  color: var(--color-cream-highlight);
  font-weight: 600;
`;

const AnimatedHighlight = styled(motion.span)`
  display: inline-block;
  color: var(--color-blue-light);
  font-weight: 700;
  text-shadow: 0 0 10px rgba(87, 108, 168, 0.6);
`;

const AnimatedIcon = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(87, 108, 168, 0.2);
  border-radius: 50%;
  margin-right: 1rem;
  font-size: 1.5rem;
  box-shadow: 0 0 15px rgba(87, 108, 168, 0.3);
`;

const AnimatedDot = styled(motion.span)`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: var(--color-blue-light);
  border-radius: 50%;
  margin: 0 0.5rem;
`;

// Nueva sección de desarrollo de software
const SoftwareDevSection = styled(motion.div)`
  margin-top: 8rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(87, 108, 168, 0.2);
`;

const SoftwareDevContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SoftwareDevTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--color-cream);
  font-weight: 800;
  letter-spacing: -0.02em;
  text-shadow: 0 0 15px rgba(87, 108, 168, 0.4);
  position: relative;
  display: inline-block;
  
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

const SoftwareDevDescription = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.7;
  color: var(--color-cream);
  opacity: 0.9;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
`;

const DevServicesList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DevServiceItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--color-card-bg);
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 0 0 20px rgba(87, 108, 168, 0.4);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background-color: var(--color-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-cream);
  font-size: 1.8rem;
  box-shadow: 0 0 15px rgba(87, 108, 168, 0.5);
  margin-bottom: 0.5rem;
`;

const ServiceText = styled.span`
  color: var(--color-cream);
  font-weight: 600;
  font-size: 1.1rem;
`;

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const wordVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5
    }
  })
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: { 
    scale: 1.2,
    rotate: 15,
    transition: {
      duration: 0.3
    }
  }
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: (i: number) => ({
    scale: [1, 1.5, 1],
    transition: {
      delay: i * 0.1,
      repeat: Infinity,
      repeatDelay: 2,
      duration: 0.5
    }
  })
};

const About: React.FC = () => {
  const features = [
    {
      icon: "🔄",
      title: "Ecosistemas Interconectados",
      description: "Redes de agentes digitales especializados que trabajan juntos para automatizar procesos completos de negocio."
    },
    {
      icon: "🧠",
      title: "Inteligencia Adaptativa",
      description: "Agentes capaces de tomar decisiones basadas en datos y adaptarse a cambios en tiempo real."
    },
    {
      icon: "⚡",
      title: "Eficiencia Superior",
      description: "Optimización continua que elimina ineficiencias y errores humanos en todos los procesos."
    }
  ];
  
  // Refs para animaciones basadas en scroll
  const aboutRef = React.useRef(null);
  const softwareRef = React.useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px 0px" });
  const isSoftwareInView = useInView(softwareRef, { once: true, margin: "-100px 0px" });
  
  // Textos para animación
  const animatedTexts = [
    {
      icon: "🔍",
      text: "Análisis de datos en tiempo real",
      highlight: "inteligencia artificial"
    },
    {
      icon: "🤖",
      text: "Automatización de procesos mediante",
      highlight: "agentes autónomos"
    },
    {
      icon: "📊",
      text: "Optimización continua con",
      highlight: "aprendizaje adaptativo"
    }
  ];
  
  return (
    <AboutSection id="about">
      <AboutContainer>
        <AboutHeader>
          <AboutTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.7 }}
          >
            Transforma tu Negocio con Agentes Inteligentes
          </AboutTitle>
          <AboutSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            La próxima generación de automatización empresarial ha llegado, 
            revolucionando la forma en que las empresas operan y crecen.
          </AboutSubtitle>
        </AboutHeader>
        
        <AboutContent>
          <AboutTextContent
            ref={aboutRef}
            initial="hidden"
            animate={isAboutInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <AboutDescription variants={itemVariants}>
              En Breakaway, desarrollamos ecosistemas de agentes digitales avanzados
              que revolucionan cualquier industria mediante la automatización
              inteligente de procesos empresariales complejos.
            </AboutDescription>
            <AboutDescription variants={itemVariants}>
              Nuestros agentes supervisores orquestan flujos complejos mientras
              los agentes operativos ejecutan tareas específicas con precisión y
              eficiencia superiores a las capacidades humanas.
            </AboutDescription>
            
            <FeatureList variants={containerVariants}>
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="hover-lift"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25), 0 0 20px rgba(87, 108, 168, 0.4)"
                  }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureContent>
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </FeatureContent>
                </FeatureItem>
              ))}
            </FeatureList>
          </AboutTextContent>
          
          <AboutVisual
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          >
            <VisualContainer
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ 
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px rgba(87, 108, 168, 0.4)"
              }}
            >
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Arquitectura Modular Adaptativa
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Diseñamos cada ecosistema de agentes con una arquitectura modular
                que permite escalar componentes de forma independiente, garantizando
                adaptabilidad constante a los cambios del mercado y tecnológicos.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Nuestros sistemas incluyen agentes con memoria contextual compartida
                que aprenden y mejoran continuamente, optimizando su rendimiento con cada interacción.
              </motion.p>
              
              {/* Textos animados en lugar del código */}
              <AnimatedTextContainer
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                whileHover={{ 
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)"
                }}
              >
                {animatedTexts.map((item, index) => (
                  <TextBlock
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                  >
                    <AnimatedIcon
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      {item.icon}
                    </AnimatedIcon>
                    
                    {item.text.split(' ').map((word, i) => (
                      <AnimatedWord
                        key={i}
                        custom={i}
                        variants={wordVariants}
                      >
                        {word}
                      </AnimatedWord>
                    ))}
                    
                    <AnimatedHighlight
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: {
                          delay: 0.5 + index * 0.2,
                          duration: 0.5,
                          type: "spring"
                        }
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        color: "var(--color-cream-highlight)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {item.highlight}
                    </AnimatedHighlight>
                    
                    {[0, 1, 2].map((dot) => (
                      <AnimatedDot
                        key={dot}
                        custom={dot}
                        variants={dotVariants}
                      />
                    ))}
                  </TextBlock>
                ))}
              </AnimatedTextContainer>
            </VisualContainer>
          </AboutVisual>
        </AboutContent>
        
        {/* Nueva sección de desarrollo de software */}
        <SoftwareDevSection
          ref={softwareRef}
          initial={{ opacity: 0 }}
          animate={isSoftwareInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <SoftwareDevContainer>
            <SoftwareDevTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Desarrollo Integral de Software
            </SoftwareDevTitle>
            <SoftwareDevDescription
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Complementamos nuestra especialización en agentes con desarrollo integral de software en todas sus modalidades: aplicaciones web, móviles multiplataforma, sistemas backend y plataformas empresariales, todos diseñados para integrarse perfectamente con nuestros ecosistemas de agentes inteligentes.
            </SoftwareDevDescription>
            
            <DevServicesList
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {[
                { icon: "📱", text: "Apps Móviles" },
                { icon: "🖥️", text: "Aplicaciones Web" },
                { icon: "⚙️", text: "Sistemas Backend" },
                { icon: "🔄", text: "Integración API" },
                { icon: "🛠️", text: "DevOps" },
                { icon: "🔒", text: "Seguridad" }
              ].map((service, index) => (
                <DevServiceItem 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <ServiceIcon>{service.icon}</ServiceIcon>
                  <ServiceText>{service.text}</ServiceText>
                </DevServiceItem>
              ))}
            </DevServicesList>
          </SoftwareDevContainer>
        </SoftwareDevSection>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 