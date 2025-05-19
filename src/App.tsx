import { useEffect } from 'react';
import styled from 'styled-components';
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

function App() {
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

  return (
    <>
      <FontStyles />
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
