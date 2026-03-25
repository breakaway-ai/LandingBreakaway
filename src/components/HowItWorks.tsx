import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HowItWorksSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #1E0B2C 0%, #0F0117 100%);
  color: var(--color-cream);
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

const HowItWorksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const HowItWorksTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: var(--color-cream);
  position: relative;
  letter-spacing: -0.02em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: var(--color-blue-light);
    box-shadow: 0 0 10px rgba(138, 79, 255, 0.5);
  }
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background-color: var(--color-blue-light);
    box-shadow: 0 0 10px rgba(138, 79, 255, 0.5);
    transform: translateX(-50%);
    z-index: 1;
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const FlowStep = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  position: relative;
  z-index: 2;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    text-align: right;
    
    @media (max-width: 768px) {
      flex-direction: row;
      text-align: left;
    }
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--color-blue-light);
  color: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 0 15px rgba(138, 79, 255, 0.5);
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.25rem;
  }
`;

const StepContent = styled.div`
  flex: 1;
  background-color: rgba(30, 11, 44, 0.8);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-left: 3px solid var(--color-blue-light);
  border-top: 1px solid rgba(138, 79, 255, 0.3);
  border-bottom: 1px solid rgba(138, 79, 255, 0.3);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-blue-light);
  letter-spacing: -0.02em;
  text-shadow: 0 0 8px rgba(138, 79, 255, 0.5);
`;

const StepDescription = styled.p`
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 1rem;
  color: var(--color-cream);
`;

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const flowSteps = [
    {
      number: 1,
      titleKey: "howItWorks.step1Title",
      descriptionKey: "howItWorks.step1Description"
    },
    {
      number: 2,
      titleKey: "howItWorks.step2Title",
      descriptionKey: "howItWorks.step2Description"
    },
    {
      number: 3,
      titleKey: "howItWorks.step3Title",
      descriptionKey: "howItWorks.step3Description"
    },
    {
      number: 4,
      titleKey: "howItWorks.step4Title",
      descriptionKey: "howItWorks.step4Description"
    },
    {
      number: 5,
      titleKey: "howItWorks.step5Title",
      descriptionKey: "howItWorks.step5Description"
    }
  ];
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  return (
    <HowItWorksSection id="how-it-works" ref={ref} className="section-dark">
      <motion.div style={{ opacity, scale }}>
        <HowItWorksContainer>
          <HowItWorksTitle>{t('howItWorks.sectionTitle')}</HowItWorksTitle>
          
          <FlowContainer>
            {flowSteps.map((step, index) => (
              <FlowStep
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="hover-lift"
              >
                <StepNumber>{step.number}</StepNumber>
                <StepContent>
                  <StepTitle>{t(step.titleKey)}</StepTitle>
                  <StepDescription>{t(step.descriptionKey)}</StepDescription>
                </StepContent>
              </FlowStep>
            ))}
          </FlowContainer>
        </HowItWorksContainer>
      </motion.div>
    </HowItWorksSection>
  );
};

export default HowItWorks; 