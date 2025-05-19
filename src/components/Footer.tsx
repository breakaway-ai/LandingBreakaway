import React from 'react';
import styled from 'styled-components';

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

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo>BREAK<span>AWAY</span></FooterLogo>
        <Copyright>
          &copy; {currentYear} Breakaway. Todos los derechos reservados.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 