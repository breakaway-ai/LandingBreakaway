"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductHero from "@/components/products/ProductHero";
import ProductProblem from "@/components/products/ProductProblem";
import ProductFeatures from "@/components/products/ProductFeatures";
import ProductHowItWorks from "@/components/products/ProductHowItWorks";
import ProductCta from "@/components/products/ProductCta";
import { isLandingProduct, type Product } from "@/config/products";

type ProductDetailPageProps = {
  product: Product;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  if (!isLandingProduct(product)) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main>
        <ProductHero
          slug={product.slug}
          heroSvg={product.heroSvg}
          heroAnimation={product.heroAnimation}
        />
        <ProductProblem slug={product.slug} />
        <ProductFeatures
          slug={product.slug}
          featureSvgs={product.featureSvgs}
          featureAnimation={product.featureAnimation}
        />
        <ProductHowItWorks
          slug={product.slug}
          stepsSvg={product.stepsSvg}
          flowAnimation={product.flowAnimation}
          flowAnimationLayout={
            "flowAnimationLayout" in product
              ? product.flowAnimationLayout
              : undefined
          }
        />
        <ProductCta slug={product.slug} />
      </main>
      <Footer />
    </>
  );
}
