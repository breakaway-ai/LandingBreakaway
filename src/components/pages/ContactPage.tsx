"use client";

import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import ContactScheduleBanner from "@/components/ContactScheduleBanner";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactForm standalone />
        <ContactScheduleBanner />
      </main>
      <Footer />
    </>
  );
}
