"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHero from "@/components/products/ProductHero";
import ProductInfo from "@/components/products/ProductInfo";
import ProductCta from "@/components/products/ProductCta";
import type { Product } from "@/config/products";

type ProductDetailPageProps = {
  product: Product;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  return (
    <>
      <Navbar />
      <main>
        <ProductHero product={product} />
        <ProductInfo product={product} />
        <ProductCta product={product} />
      </main>
      <Footer />
    </>
  );
}
