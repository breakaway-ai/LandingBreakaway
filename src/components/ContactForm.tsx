import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ContactSection = styled.section`
  padding: 6rem 0;
  background-color: var(--color-section-alt);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(87, 108, 168, 0.15) 0%, transparent 70%);
    z-index: 0;
  }
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ContactTitle = styled(motion.h2)`
  font-size: 2.8rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--color-blue);
  position: relative;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-shadow: var(--text-shadow-glow);
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, var(--color-blue), var(--color-blue-light));
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(87, 108, 168, 0.6);
  }
`;

const ContactSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: var(--color-cream);
  opacity: 0.9;
  line-height: 1.6;
  margin-top: 2rem;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const FormContainer = styled(motion.div)`
  grid-column: 2 / 12;
  background: linear-gradient(145deg, var(--color-card-bg), rgba(39, 70, 144, 0.1));
  padding: 3.5rem;
  border-radius: 16px;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(87, 108, 168, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, var(--color-blue), var(--color-blue-light), var(--color-blue));
    z-index: 1;
  }
  
  @media (max-width: 992px) {
    grid-column: 1 / -1;
    padding: 2.5rem;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(87, 108, 168, 0.3) 0%, transparent 70%);
  filter: blur(20px);
  z-index: 0;
  
  &.top-right {
    top: -50px;
    right: -50px;
  }
  
  &.bottom-left {
    bottom: -50px;
    left: -50px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  
  label {
    display: block;
    margin-bottom: 0.8rem;
    font-weight: 600;
    color: var(--color-blue-light);
    font-size: 1.05rem;
    letter-spacing: 0.02em;
  }
`;

const FullWidthFormGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

const FormInput = styled(motion.input)`
  width: 100%;
  padding: 1.2rem 1.5rem;
  border: 2px solid rgba(87, 108, 168, 0.3);
  border-radius: 10px;
  background-color: rgba(245, 243, 245, 0.05);
  color: var(--color-cream);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--color-blue);
    box-shadow: 0 0 0 4px rgba(39, 70, 144, 0.2), 0 0 15px rgba(87, 108, 168, 0.3);
    outline: none;
  }
  
  &::placeholder {
    color: rgba(245, 243, 245, 0.3);
  }
`;

const FormTextarea = styled(motion.textarea)`
  width: 100%;
  padding: 1.2rem 1.5rem;
  border: 2px solid rgba(87, 108, 168, 0.3);
  border-radius: 10px;
  background-color: rgba(245, 243, 245, 0.05);
  color: var(--color-cream);
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 180px;
  resize: vertical;
  
  &:focus {
    border-color: var(--color-blue);
    box-shadow: 0 0 0 4px rgba(39, 70, 144, 0.2), 0 0 15px rgba(87, 108, 168, 0.3);
    outline: none;
  }
  
  &::placeholder {
    color: rgba(245, 243, 245, 0.3);
  }
`;

const SubmitButton = styled(motion.button)`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  background: linear-gradient(90deg, var(--color-blue), var(--color-blue-light));
  color: var(--color-cream-highlight);
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(87, 108, 168, 0.3);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: 1.5rem;
  background-color: rgba(75, 181, 67, 0.15);
  border: 1px solid rgba(75, 181, 67, 0.3);
  border-radius: 10px;
  color: #4BB543;
  margin-top: 2rem;
  text-align: center;
  font-weight: 600;
  text-shadow: 0 0 5px rgba(75, 181, 67, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FormInfo = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-gray);
  opacity: 0.7;
`;

const ContactDetails = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const ContactItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ContactIcon = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), 0 0 15px rgba(87, 108, 168, 0.3);
  
  svg {
    width: 35px;
    height: 35px;
    color: var(--color-cream-highlight);
  }
`;

const ContactText = styled.div`
  font-weight: 600;
  color: var(--color-blue-light);
  font-size: 1.1rem;
  text-shadow: var(--text-shadow-sm);
`;

const InfoCard = styled.div`
  background-color: var(--color-blue);
  border-radius: 10px;
  padding: 2.5rem;
  height: 100%;
  color: var(--color-cream);
  position: relative;
  overflow: hidden;
`;

const InfoFeature = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  position: relative;
  padding-left: 2rem;
  
  svg {
    position: absolute;
    left: 0;
    top: 5px;
    color: var(--color-blue);
  }
`;

// Variantes de animación
const formContainerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const inputVariants = {
  focus: { 
    scale: 1.02,
    borderColor: "var(--color-blue)",
    boxShadow: "0 0 0 4px rgba(39, 70, 144, 0.2), 0 0 15px rgba(87, 108, 168, 0.3)"
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.03,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(87, 108, 168, 0.4)"
  },
  tap: { 
    scale: 0.98
  }
};

const contactItemVariants = {
  hover: {
    y: -8,
    transition: {
      duration: 0.3
    }
  }
};

const iconVariants = {
  hover: {
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.5
    }
  }
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    setIsSubmitted(true);
    
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    });
    
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  return (
    <ContactSection id="contact" className="section-cream">
      <ContactContainer>
        <ContactHeader>
          <ContactTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            ¿Listo para Transformar tu Negocio?
          </ContactTitle>
          <ContactSubtitle
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Solicita tu consultoría gratuita y descubre cómo nuestros ecosistemas
            de agentes inteligentes pueden revolucionar tus operaciones.
          </ContactSubtitle>
        </ContactHeader>
        
        <ContactContent>
          <FormContainer
            variants={formContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <GlowEffect className="top-right" />
            <GlowEffect className="bottom-left" />
            
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Nombre Completo*</label>
                <FormInput 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Correo Electrónico*</label>
                <FormInput 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="company">Empresa</label>
                <FormInput 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="phone">Teléfono</label>
                <FormInput 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </FormGroup>
              
              <FullWidthFormGroup>
                <label htmlFor="message">Mensaje*</label>
                <FormTextarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Cuéntanos sobre tu proyecto o necesidades específicas..."
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </FullWidthFormGroup>
              
              <FullWidthFormGroup>
                <SubmitButton 
                  type="submit"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Solicitar Consultoría Gratuita
                </SubmitButton>
                
                {isSubmitted && (
                  <SuccessMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ¡Gracias por contactarnos! Te responderemos a la brevedad.
                  </SuccessMessage>
                )}
                
                <FormInfo>
                  Al enviar este formulario, aceptas nuestra política de privacidad 
                  y te comprometes a recibir comunicaciones relacionadas con tu consulta.
                </FormInfo>
              </FullWidthFormGroup>
            </Form>
          </FormContainer>
        </ContactContent>
        
        <ContactDetails
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <ContactItem 
            variants={contactItemVariants}
            whileHover="hover"
          >
            <ContactIcon
              variants={iconVariants}
              whileHover="hover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </ContactIcon>
            <ContactText>general@breakaway.work</ContactText>
          </ContactItem>
          
          <ContactItem
            variants={contactItemVariants}
            whileHover="hover"
          >
            <ContactIcon
              variants={iconVariants}
              whileHover="hover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </ContactIcon>
            <ContactText>Querétaro, México</ContactText>
          </ContactItem>
        </ContactDetails>
      </ContactContainer>
    </ContactSection>
  );
};

export default ContactForm; 