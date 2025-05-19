import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Float } from '@react-three/drei';

const HeaderContainer = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
  background-color: var(--color-background);
`;

const NavBar = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1.5rem 0;
  background-color: rgba(27, 27, 30, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(motion.div)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-cream);
  
  span {
    color: var(--color-blue);
    text-shadow: 0 0 10px rgba(87, 108, 168, 0.4);
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: var(--color-cream);
  font-weight: 600;
  position: relative;
  transition: color 0.3s ease;
  font-size: 1.05rem;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-blue);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--color-blue-light);
    text-shadow: 0 0 8px rgba(87, 108, 168, 0.8);
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const NavButton = styled(motion.a)`
  padding: 0.8rem 1.5rem;
  background-color: var(--color-blue);
  color: var(--color-cream);
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4), 0 0 15px rgba(87, 108, 168, 0.4);
    background-color: var(--color-blue-dark);
  }
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 5;
`;

const HeroText = styled.div`
  max-width: 800px;
  z-index: 5;
  margin-bottom: 4rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-cream);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  
  span {
    color: var(--color-blue-light);
    text-shadow: 0 0 15px rgba(87, 108, 168, 0.8);
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: var(--color-blue-light);
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto 3rem;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-weight: 500;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  background-color: var(--color-blue);
  color: var(--color-cream);
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), 0 0 20px rgba(87, 108, 168, 0.4);
    background-color: var(--color-blue-dark);
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const SecondaryButton = styled(motion.a)`
  padding: 1rem 2.5rem;
  background-color: transparent;
  color: var(--color-cream);
  border: 2px solid var(--color-blue);
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(87, 108, 168, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background-color: var(--color-blue);
    color: var(--color-cream);
    box-shadow: 0 0 15px rgba(87, 108, 168, 0.4);
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const AnimationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.6;
`;

const HeroBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-image: radial-gradient(var(--color-gray) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.1;
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
`;

const Particle = styled(motion.div)`
  position: absolute;
  background-color: var(--color-blue-light);
  border-radius: 50%;
  opacity: 0.2;
`;

// Estrella fugaz
const ShootingStar = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: var(--color-cream-highlight);
  border-radius: 50%;
  opacity: 0.8;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.7),
      transparent
    );
    transform: translateY(-100%) rotate(-45deg);
    transform-origin: bottom;
  }
`;

// 3D Animation
const AnimatedLogo = () => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial 
          color="#274690" 
          attach="material" 
          distort={0.5} 
          speed={2} 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
};

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
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
  
  // Generate particles for background effect
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  // Generar estrellas fugaces
  const shootingStars = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    top: Math.random() * 80 + 10, // 10-90%
    left: Math.random() * 80 + 10, // 10-90%
    size: Math.random() * 2 + 1,
    delay: Math.random() * 15,
    duration: Math.random() * 3 + 2
  }));

  return (
    <HeaderContainer>
      <NavBar 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ 
          boxShadow: scrolled ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none',
          padding: scrolled ? '1rem 0' : '1.5rem 0',
        }}
      >
        <NavContainer>
          <Logo
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BREAK<span>AWAY</span>
          </Logo>
          <NavList>
            {["Tecnología", "Beneficios", "Contacto"].map((item, i) => (
              <motion.li key={i}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <NavLink 
                  href={`#${item.toLowerCase() === "tecnología" ? "about" : item.toLowerCase()}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </NavLink>
              </motion.li>
            ))}
          </NavList>
          <NavButton 
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Consultoría Gratuita
          </NavButton>
        </NavContainer>
      </NavBar>
      
      {/* Animación 3D detrás del texto */}
      <AnimationContainer>
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <OrbitControls enableZoom={false} autoRotate={true} rotateSpeed={0.5} />
          <AnimatedLogo />
        </Canvas>
      </AnimationContainer>
      
      <HeroBackground 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      />
      
      {/* Estrellas fugaces */}
      <FloatingParticles>
        {shootingStars.map(star => (
          <ShootingStar
            key={`star-${star.id}`}
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            initial={{ 
              opacity: 0,
              x: 0,
              y: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [0, -200],
              y: [0, 200],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 20 + 10
            }}
          />
        ))}
        
        {particles.map(particle => (
          <Particle
            key={particle.id}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              repeat: Infinity,
              duration: particle.duration,
              ease: "easeInOut",
            }}
          />
        ))}
      </FloatingParticles>
      
      <HeroContent>
        <motion.div
          style={{
            opacity,
            scale,
            y,
          }}
        >
          <HeroText>
            <HeroTitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
            >
              Empodera tu Negocio con <span>Agentes Inteligentes</span>
            </HeroTitle>
            <HeroSubtitle
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Ecosistemas de Agentes Digitales que Automatizan Procesos, Eliminan Errores y Potencian el Crecimiento Exponencial
            </HeroSubtitle>
            <HeroButtons
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <PrimaryButton href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Solicita tu Consultoría
              </PrimaryButton>
              <SecondaryButton href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Descubre Cómo
              </SecondaryButton>
            </HeroButtons>
          </HeroText>
        </motion.div>
      </HeroContent>
    </HeaderContainer>
  );
};

export default Header; 