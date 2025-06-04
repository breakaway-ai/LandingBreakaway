import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Header from './components/Header';
import About from './components/About';
import Benefits from './components/Benefits';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
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
