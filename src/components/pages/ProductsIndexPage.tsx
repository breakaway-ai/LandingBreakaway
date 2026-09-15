"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import ServicesCta from "@/components/services/ServicesCta";

export default function ProductsIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductsHero />
        <ServicesCta />
      </main>
      <Footer />
    </>
  );
}
