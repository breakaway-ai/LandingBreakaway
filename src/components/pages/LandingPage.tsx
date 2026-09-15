"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";

export default function LandingPage() {
  return (
    <>
      <OrganizationJsonLd />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <CtaSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
