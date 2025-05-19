import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import About from './components/About';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

// Add Google Fonts
const FontStyles = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
`;

// Scroll progress indicator
const ScrollProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-blue);
  transform-origin: 0%;
  z-index: 1000;
`;

// Custom cursor
const Cursor = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(87, 108, 168, 0.3);
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9999;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
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
      const cursor = document.querySelector('.custom-cursor') as HTMLElement;
      if (cursor) {
        cursor.style.left = `${e.clientX - 10}px`;
        cursor.style.top = `${e.clientY - 10}px`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <FontStyles />
      <ScrollProgressBar style={{ scaleX }} />
      <Cursor className="custom-cursor" />
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
