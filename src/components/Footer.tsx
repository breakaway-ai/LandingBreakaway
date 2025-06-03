import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Trans } from 'react-i18next';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #0F0117 0%, #1E0B2C 100%);
  padding: 3rem 0;
  color: var(--color-cream);
  text-align: center;
  border-top: 3px solid var(--color-blue-light);
  box-shadow: 0 -5px 15px rgba(138, 79, 255, 0.2);
  position: relative;
  
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

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const FooterLogo = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  span {
    color: var(--color-blue-light);
    text-shadow: 0 0 10px rgba(138, 79, 255, 0.5);
  }
`;

const Copyright = styled.div`
  color: var(--color-cream);
  opacity: 0.7;
  font-size: 0.9rem;
  margin-top: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const SocialIcon = styled(motion.a)`
  color: var(--color-cream);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
  
  &:hover {
    color: var(--color-blue-light);
    transform: translateY(-3px);
  }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>BREAK<span>AWAY</span></FooterLogo>
        
        <SocialLinks>
          <SocialIcon 
            href="https://www.linkedin.com/company/breakawayai" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </SocialIcon>
        </SocialLinks>
        
        <Copyright>
          <Trans i18nKey="footer.copyright" values={{ currentYear }}>
            &copy; {{currentYear}} Breakaway. Todos los derechos reservados.
          </Trans>
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 