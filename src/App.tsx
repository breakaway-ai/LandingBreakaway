import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Benefits from './components/Benefits';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Process />
      <Benefits />
      <ContactForm />
      <Footer />
    </>
  );
}

export default App;
