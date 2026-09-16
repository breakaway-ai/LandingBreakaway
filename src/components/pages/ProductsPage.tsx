"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, productDetailPath } from "@/config/products";
import { Link } from "@/i18n/navigation";

export default function ProductsPage() {
  const t = useTranslations();
  const tPage = useTranslations("productsPage");

  return (
    <>
      <Navbar />
      <main className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="label text-primary">{tPage("label")}</span>
            <h1 className="mt-5 text-[2rem] leading-[1.1] text-ink sm:text-5xl">
              {tPage("headline")}
            </h1>
            <p className="prose-mono mt-5 max-w-2xl">{tPage("subtitle")}</p>
          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {PRODUCTS.map((product, index) => (
              <motion.article
                key={product.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.06 }}
              >
                <Link
                  href={productDetailPath(product.slug)}
                  className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-surface p-6 transition-colors hover:border-primary/30 hover:bg-surface/80 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-xl font-semibold text-ink">
                      {t(product.titleKey)}
                    </h2>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-dim transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <p className="prose-mono mt-4 flex-1">{t(product.descKey)}</p>
                  <span className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                    {tPage("cardLink")}
                  </span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
