import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--color-blue);
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const AboutSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-dark-brown);
  opacity: 0.9;
  line-height: 1.6;
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

const AboutTextContent = styled.div`
  grid-column: 1 / 7;
  
  @media (max-width: 992px) {
    grid-column: 1 / -1;
    order: 2;
  }
`;

const AboutDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.7;
  color: var(--color-cream);
  opacity: 0.9;
`;

const FeatureList = styled.div`
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
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
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-cream);
  font-weight: 700;
`;

const FeatureDescription = styled.p`
  color: var(--color-cream);
  opacity: 0.85;
  line-height: 1.6;
`;

const AboutVisual = styled.div`
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
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    font-size: 1.1rem;
    position: relative;
  }
`;

const Code = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 10px;
  margin-top: 2rem;
  font-family: 'Fira Code', monospace;
  position: relative;
  
  &:before {
    content: 'Modelo de Agente';
    position: absolute;
    top: -15px;
    left: 20px;
    background-color: var(--color-gray);
    color: var(--color-cream);
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    border-radius: 5px;
    font-weight: 600;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CodeLine = styled.div`
  color: #f8f8f8;
  line-height: 1.6;
  
  .keyword {
    color: #F5F5DC;
  }
  
  .string {
    color: #F5F5DC;
  }
  
  .function {
    color: #A0522D;
  }
  
  .comment {
    color: #4A4A4A;
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: var(--color-card-bg);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
  border-left: 3px solid var(--color-blue);
`;

const HighlightBox = styled.div`
  padding: 2rem;
  background-color: var(--color-blue);
  color: var(--color-cream);
  border-radius: 10px;
  margin-top: 3rem;
`;

const StatsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  background-color: var(--color-blue);
  border-radius: 10px;
  padding: 2rem;
`;

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
  
  return (
    <AboutSection id="about">
      <AboutContainer>
        <AboutHeader>
          <AboutTitle>Transforma tu Negocio con Agentes Inteligentes</AboutTitle>
          <AboutSubtitle>
            La próxima generación de automatización empresarial ha llegado, 
            revolucionando la forma en que las empresas operan y crecen.
          </AboutSubtitle>
        </AboutHeader>
        
        <AboutContent>
          <AboutTextContent>
            <AboutDescription>
              En Breakaway, desarrollamos ecosistemas de agentes digitales avanzados
              que revolucionan cualquier industria mediante la automatización
              inteligente de procesos empresariales complejos.
            </AboutDescription>
            <AboutDescription>
              Nuestros agentes supervisores orquestan flujos complejos mientras
              los agentes operativos ejecutan tareas específicas con precisión y
              eficiencia superiores a las capacidades humanas.
            </AboutDescription>
            
            <FeatureList>
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="hover-lift"
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
          
          <AboutVisual>
            <VisualContainer
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3>Arquitectura Modular Adaptativa</h3>
              <p>
                Diseñamos cada ecosistema de agentes con una arquitectura modular
                que permite escalar componentes de forma independiente, garantizando
                adaptabilidad constante a los cambios del mercado y tecnológicos.
              </p>
              <p>
                Nuestros sistemas incluyen agentes con memoria contextual compartida
                que aprenden y mejoran continuamente, optimizando su rendimiento con cada interacción.
              </p>
              
              <Code>
                <CodeLine><span className="keyword">class</span> <span className="function">AgenteSupervisor</span> {'{'}</CodeLine>
                <CodeLine>  <span className="comment">// Orquesta flujos complejos</span></CodeLine>
                <CodeLine>  <span className="function">optimizarFlujo</span>() {'{'}</CodeLine>
                <CodeLine>    <span className="keyword">const</span> decisiones = <span className="function">analizarDatos</span>()</CodeLine>
                <CodeLine>    <span className="keyword">return</span> <span className="function">asignarTareas</span>(decisiones)</CodeLine>
                <CodeLine>  {'}'}</CodeLine>
                <CodeLine>{'}'}</CodeLine>
              </Code>
            </VisualContainer>
          </AboutVisual>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About; 