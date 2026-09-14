'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Clients from '@/components/Clients';
import Benefits from '@/components/Benefits';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import HashScroll from '@/components/HashScroll';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';

export default function LandingPage() {
  return (
    <>
      <OrganizationJsonLd />
      <HashScroll />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Clients />
        <Benefits />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
