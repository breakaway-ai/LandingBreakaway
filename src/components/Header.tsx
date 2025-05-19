import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';

const HeaderContainer = styled.header`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
  background-color: var(--color-background);
`;

const NavBar = styled.nav`
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

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-cream);
  
  span {
    color: var(--color-blue);
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

const NavLink = styled.a`
  color: var(--color-cream);
  font-weight: 600;
  position: relative;
  transition: color 0.3s ease;
  font-size: 1.05rem;
  
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
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const NavButton = styled.a`
  padding: 0.8rem 1.5rem;
  background-color: var(--color-blue);
  color: var(--color-cream);
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    background-color: var(--color-blue-dark);
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
  
  &:hover {
    background-color: var(--color-blue);
    color: var(--color-cream);
  }
`;

const AnimationContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.5;
`;

const HeroBackground = styled.div`
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

// 3D Animation
const AnimatedLogo = () => {
  return (
    <mesh>
      <sphereGeometry args={[1.4, 64, 64]} />
      <MeshDistortMaterial 
        color="#274690" 
        attach="material" 
        distort={0.5} 
        speed={2} 
      />
    </mesh>
  );
};

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <HeaderContainer>
      <NavBar style={{ 
        boxShadow: scrolled ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none',
        padding: scrolled ? '1rem 0' : '1.5rem 0',
      }}>
        <NavContainer>
          <Logo>BREAK<span>AWAY</span></Logo>
          <NavList>
            <li><NavLink href="#about">Tecnología</NavLink></li>
            <li><NavLink href="#benefits">Beneficios</NavLink></li>
            <li><NavLink href="#contact">Contacto</NavLink></li>
          </NavList>
          <NavButton href="#contact">Consultoría Gratuita</NavButton>
        </NavContainer>
      </NavBar>
      
      <AnimationContainer>
        <Canvas>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <OrbitControls enableZoom={false} autoRotate={true} rotateSpeed={0.5} />
          <AnimatedLogo />
        </Canvas>
      </AnimationContainer>
      
      <HeroBackground />
      
      <HeroContent>
        <HeroText>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Empodera tu Negocio con Agentes Inteligentes
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
      </HeroContent>
    </HeaderContainer>
  );
};

export default Header; 