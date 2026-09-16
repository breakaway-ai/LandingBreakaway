"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsCta from "@/components/products/ProductsCta";

export default function ProductsIndexPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductsHero />
        <ProductsCta />
      </main>
      <Footer />
    </>
  );
}
