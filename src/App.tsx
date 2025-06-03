import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import About from './components/About';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const LanguageSwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10001;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 20px;
  display: flex;
  gap: 8px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);

  @media (max-width: 768px) { // Para tablets y móviles
    top: 10px;
    right: 10px;
    padding: 6px;
    gap: 5px;
  }
`;

interface LanguageButtonProps {
  isActive: boolean;
}

const LanguageButton = styled.button<LanguageButtonProps>`
  padding: 8px 12px;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) { // Para tablets y móviles
    font-size: 0.75rem;
    padding: 6px 10px;
    border-radius: 12px;
  }

  // Estilos base para el botón (principalmente para el inactivo por defecto)
  background-color: transparent;
  color: var(--color-cream);
  border: none; // Sin borde por defecto para el inactivo

  // Estilos cuando el botón está ACTIVO
  ${props => props.isActive && `
    background-color: var(--color-blue-light);
    color: var(--color-cream-highlight);
    border: 1px solid var(--color-blue-light); // Borde sólido que coincide con el fondo
  `}

  // Estilos HOVER
  &:hover {
    ${props => props.isActive ? `
      // Hover sobre el botón ACTIVO
      background-color: var(--color-blue); // Un poco más oscuro o diferente para el hover activo
      border-color: var(--color-blue); // El borde coincide
    ` : `
      // Hover sobre el botón INACTIVO
      background-color: rgba(255, 255, 255, 0.15); // Fondo sutil al hacer hover
      color: var(--color-cream-highlight); // Texto un poco más brillante
      border: 1px solid rgba(255, 255, 255, 0.3); // Aparece un borde sutil al hacer hover
    `}
  }
`;

function App() {
  const { i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add Google Fonts to the document head
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Custom cursor effect
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 10}px`;
        cursorRef.current.style.top = `${e.clientY - 10}px`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      {/* Selector de Idioma Mejorado */}
      <LanguageSwitcherContainer>
        <LanguageButton 
          onClick={() => i18n.changeLanguage('es')} 
          isActive={i18n.language === 'es' || i18n.language.startsWith('es-')}
        >
          ES
        </LanguageButton>
        <LanguageButton 
          onClick={() => i18n.changeLanguage('en')} 
          isActive={i18n.language === 'en' || i18n.language.startsWith('en-')}
        >
          EN
        </LanguageButton>
      </LanguageSwitcherContainer>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue z-[1000] origin-[0%]"
        style={{ scaleX }}
      />
      
      {/* Custom Cursor (hidden on mobile) */}
      <div 
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full bg-blue-light bg-opacity-30 mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      />
      
      <Header />
      <About />
      <Benefits />
      <HowItWorks />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;
