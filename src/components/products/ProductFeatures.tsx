"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ProductFeatureVisual from "@/components/products/ProductFeatureVisual";
import type { ProductAnimationId, ProductSlug } from "@/config/products";

const FEATURE_KEYS = ["feature1", "feature2", "feature3", "feature4"] as const;

type ProductFeaturesProps = {
  slug: ProductSlug;
  featureSvgs: readonly string[];
  featureAnimation?: ProductAnimationId;
};

export default function ProductFeatures({
  slug,
  featureSvgs,
  featureAnimation,
}: ProductFeaturesProps) {
  const t = useTranslations(`products.${slug}`);

  return (
    <section className="border-y border-ink/10 bg-background-alt py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="label text-primary">{t("featuresLabel")}</span>
          <h2 className="mt-5 text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t("featuresHeadline")}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-stone-200 sm:grid-cols-2">
          {FEATURE_KEYS.map((key, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="flex flex-col gap-5 bg-background p-6 transition-colors hover:bg-surface sm:p-8"
            >
              <div className="relative aspect-[16/9] w-full">
                <ProductFeatureVisual
                  slug={slug}
                  index={index}
                  featureSvgs={featureSvgs}
                  featureAnimation={featureAnimation}
                />
              </div>
              <span className="font-mono text-[11px] text-primary">
                {`0${index + 1}`}
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">
                {t(`${key}Title`)}
              </h3>
              <p className="prose-mono">{t(`${key}Description`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
