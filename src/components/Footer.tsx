import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--color-blue-dark);
  padding: 4rem 0 2rem;
  color: var(--color-cream);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterCol = styled.div`
  @media (max-width: 992px) {
    margin-bottom: 2rem;
  }
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  span {
    color: var(--color-cream);
  }
`;

const FooterAbout = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.8;
  max-width: 80%;
  
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(245, 243, 245, 0.2);
  color: var(--color-cream);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-cream);
    color: var(--color-blue-dark);
    transform: translateY(-3px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--color-cream);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--color-blue-light);
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled.li`
  margin-bottom: 0.8rem;
  
  a {
    color: var(--color-cream);
    opacity: 0.8;
    transition: all 0.3s ease;
    
    &:hover {
      opacity: 1;
      color: var(--color-cream);
      padding-left: 5px;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(245, 245, 220, 0.2);
  color: var(--color-cream);
  opacity: 0.7;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterCol>
          <FooterLogo>BREAK<span>AWAY</span></FooterLogo>
          <FooterAbout>
            Transformamos empresas mediante ecosistemas de agentes digitales inteligentes 
            que automatizan procesos end-to-end, eliminan errores y potencian el crecimiento exponencial.
          </FooterAbout>
          <SocialIcons>
            <SocialIcon href="#" aria-label="LinkedIn" className="hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Twitter" className="hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22,5.8a8.49,8.49,0,0,1-2.36.64,4.13,4.13,0,0,0,1.81-2.27,8.21,8.21,0,0,1-2.61,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3.39,4.62a4.16,4.16,0,0,0-.55,2.07A4.09,4.09,0,0,0,4.66,10.1,4.05,4.05,0,0,1,2.8,9.59v.05a4.1,4.1,0,0,0,3.3,4A3.93,3.93,0,0,1,5,13.81a4.9,4.9,0,0,1-.77-.07,4.11,4.11,0,0,0,3.83,2.84A8.22,8.22,0,0,1,3,18.34a7.93,7.93,0,0,1-1-.06,11.57,11.57,0,0,0,6.29,1.85A11.59,11.59,0,0,0,20,8.45c0-.17,0-.35,0-.53A8.43,8.43,0,0,0,22,5.8Z" />
              </svg>
            </SocialIcon>
            <SocialIcon href="#" aria-label="Facebook" className="hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22,12.07A10,10,0,1,0,10.66,22V14.93H7.9V12.07h2.76V9.91c0-2.73,1.64-4.25,4.12-4.25a16.42,16.42,0,0,1,2.49.22V8.3H15.79a1.58,1.58,0,0,0-1.79,1.71v2.06h3l-.49,2.86H14V22A10,10,0,0,0,22,12.07Z" />
              </svg>
            </SocialIcon>
          </SocialIcons>
        </FooterCol>
        
        <FooterCol>
          <FooterTitle>Servicios</FooterTitle>
          <FooterLinks>
            <FooterLink><a href="#about">Ecosistemas de Agentes</a></FooterLink>
            <FooterLink><a href="#benefits">Automatización Inteligente</a></FooterLink>
            <FooterLink><a href="#how-it-works">Optimización de Procesos</a></FooterLink>
            <FooterLink><a href="#">Transformación Digital</a></FooterLink>
          </FooterLinks>
        </FooterCol>
        
        <FooterCol>
          <FooterTitle>Compañía</FooterTitle>
          <FooterLinks>
            <FooterLink><a href="#about">Sobre Nosotros</a></FooterLink>
            <FooterLink><a href="#contact">Contacto</a></FooterLink>
            <FooterLink><a href="#">Carreras</a></FooterLink>
            <FooterLink><a href="#">Blog</a></FooterLink>
          </FooterLinks>
        </FooterCol>
        
        <FooterCol>
          <FooterTitle>Legal</FooterTitle>
          <FooterLinks>
            <FooterLink><a href="#">Términos de Servicio</a></FooterLink>
            <FooterLink><a href="#">Política de Privacidad</a></FooterLink>
            <FooterLink><a href="#">Cookies</a></FooterLink>
          </FooterLinks>
        </FooterCol>
      </FooterContent>
      
      <Copyright>
        &copy; {currentYear} Breakaway. Todos los derechos reservados.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 