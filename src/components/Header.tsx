import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logoImage from '../assets/logo.png';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Generate particles for background effect
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 15 + 8,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <header className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-blue-dark to-background pt-[150px] box-border">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 z-0 opacity-15 w-full h-full" 
           style={{ 
             backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
             backgroundSize: '50px 50px' 
           }}>
      </div>
      
      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled 
            ? 'py-4 shadow-md bg-background bg-opacity-80' 
            : 'py-6 bg-background bg-opacity-80'
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 md:px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center text-2xl font-bold text-cream"
          >
            <img src={logoImage} alt="Breakaway Logo" className="h-10 mr-3 md:h-8 md:mr-2" />
            BREAK<span className="text-blue-light">AWAY</span>
          </motion.div>
          
          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-4 md:gap-2">
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-light text-cream px-6 py-3 rounded font-semibold transition-all duration-300 shadow-glow md:px-4 md:py-2 md:text-sm md:whitespace-nowrap"
            >
              Consultoría Gratuita
            </motion.a>
            
            {/* Hamburger Menu Button (mobile only) */}
            <button 
              onClick={toggleMenu}
              className="hidden md:flex flex-col justify-between w-[30px] h-[20px] bg-transparent border-none cursor-pointer p-0 z-50"
            >
              <div 
                className="w-full h-[2px] bg-cream transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}
              />
              <div 
                className="w-full h-[2px] bg-cream transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <div 
                className="w-full h-[2px] bg-cream transition-all duration-300"
                style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}
              />
            </button>
          </div>
          
          {/* Navigation Links */}
          <ul 
            className={`flex list-none gap-10 md:fixed md:top-[80px] md:left-0 md:w-full md:flex-col md:bg-background md:bg-opacity-95 md:backdrop-blur-md md:p-6 md:gap-6 md:shadow-lg md:items-center md:z-50 ${
              menuOpen ? 'md:flex' : 'md:hidden'
            }`}
          >
            {["Tecnología", "Beneficios", "Contacto"].map((item, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <a 
                  href={`#${item.toLowerCase() === "tecnología" ? "about" : item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-cream font-semibold relative transition-colors duration-300 text-base hover:text-blue-light after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-light after:transition-width after:duration-300 hover:after:w-full md:text-lg"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>
      
      {/* Background grid effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: 'radial-gradient(var(--tw-colors-gray) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute w-full h-full top-0 left-0 z-0 overflow-hidden">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-light opacity-70"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              boxShadow: '0 0 25px #8A4FFF, 0 0 40px rgba(138, 79, 255, 0.6)'
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto px-8 text-center relative z-10 md:px-4">
        <motion.div
          style={{
            opacity,
            scale,
            y,
          }}
        >
          <div className="max-w-3xl z-10 mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              className="text-6xl mb-6 text-cream font-extrabold leading-tight tracking-tight md:text-4xl md:mb-4"
            >
              Empodera tu Negocio con <span className="text-blue-light">Agentes Inteligentes</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-2xl mb-12 text-white opacity-90 max-w-2xl mx-auto md:text-xl md:mb-8"
            >
              Ecosistemas de Agentes Digitales que Automatizan Procesos, Eliminan Errores y Potencian el Crecimiento Exponencial
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-6 justify-center md:flex-col md:max-w-xs md:mx-auto md:gap-4"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-light text-cream px-10 py-4 rounded font-semibold transition-all duration-300 shadow-glow relative overflow-hidden md:px-6 md:py-3 md:text-base"
              >
                Solicita tu Consultoría
              </motion.a>
              
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent text-cream border-2 border-blue-light px-10 py-4 rounded font-semibold transition-all duration-300 relative overflow-hidden shadow-sm hover:bg-blue-light hover:bg-opacity-20 hover:shadow-glow md:px-6 md:py-3 md:text-base"
              >
                Descubre Cómo
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header; 