"use client";

import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Product } from "@/config/products";

type ProductDetailPageProps = {
  product: Product;
};

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const t = useTranslations();

  return (
    <>
      <Navbar />
      <main className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <span className="label text-primary">{t("productPage.label")}</span>
          <h1 className="mt-5 text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t(product.titleKey)}
          </h1>
          <p className="prose-mono mt-4 max-w-2xl">{t(product.descKey)}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
