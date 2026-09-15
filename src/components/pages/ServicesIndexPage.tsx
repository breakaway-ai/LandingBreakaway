"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCta from "@/components/services/ServicesCta";

export default function ServicesIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesCta />
      </main>
      <Footer />
    </>
  );
}
