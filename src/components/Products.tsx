"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRODUCTS } from "@/config/products";

export default function Products() {
  const t = useTranslations();
  const section = useTranslations("productsSection");

  return (
    <section id="products" className="bg-background py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-10 max-w-[1400px] px-6 md:mb-12 md:px-10"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/55 sm:text-[11px]">
          {section("label")}
        </span>
        <h2 className="mb-4 max-w-[920px] font-serif text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.1] tracking-[-0.02em]">
          {section("headline")}
        </h2>
        <p className="max-w-[680px] font-sans text-base leading-relaxed text-muted">
          {section("sectionSubtitle")}
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-[1400px] gap-4 px-6 md:grid-cols-3 md:gap-5 md:px-10">
        {PRODUCTS.map((product, index) => (
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={`/products/${product.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-background-alt/60 shadow-card transition-colors hover:border-primary/20 hover:bg-primary-wash/30"
            >
              <div className="flex aspect-[4/3] items-center justify-center bg-background-alt p-6 md:p-8">
                <div className="relative h-full w-full rounded-lg border border-dashed border-ink/15 p-4">
                  <Image
                    src={product.svg}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
                    {t(product.titleKey)}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="mt-0.5 shrink-0 text-ink/25 transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <p className="flex-1 font-sans text-sm leading-relaxed text-muted">
                  {t(product.descKey)}
                </p>
                <p className="font-sans text-xs leading-relaxed text-ink/45">
                  {t(product.footerKey)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-[1400px] px-6 md:mt-12 md:px-10"
      >
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-mono text-[11px] text-ink-dim transition-colors hover:text-primary"
        >
          {section("viewAll")}
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  );
}
