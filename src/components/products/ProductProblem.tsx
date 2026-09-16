"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ProductSlug } from "@/config/products";

type ProductProblemProps = {
  slug: ProductSlug;
};

export default function ProductProblem({ slug }: ProductProblemProps) {
  const t = useTranslations(`products.${slug}`);

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="label text-primary">{t("problemLabel")}</span>
          <h2 className="mt-5 text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t("problemHeadline")}
          </h2>
          <p className="prose-mono mt-5">{t("problemDescription")}</p>
        </motion.div>
      </div>
    </section>
  );
}
