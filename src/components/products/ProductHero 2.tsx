"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import ProductHeroVisual from "@/components/products/ProductHeroVisual";
import { getPrimaryCtaHref, isExternalBookingUrl } from "@/config/booking";
import type { ProductAnimationId, ProductSlug } from "@/config/products";
import { Link } from "@/i18n/navigation";

type ProductHeroProps = {
  slug: ProductSlug;
  heroSvg: string;
  heroAnimation?: ProductAnimationId;
};

export default function ProductHero({ slug, heroSvg, heroAnimation }: ProductHeroProps) {
  const t = useTranslations(`products.${slug}`);
  const primaryCtaHref = getPrimaryCtaHref("/#contact");
  const primaryCtaExternal = isExternalBookingUrl(primaryCtaHref);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-6 h-[440px] w-[440px] rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 sm:gap-6"
        >
          <span className="label shrink-0 text-primary">{t("heroLabel")}</span>
          <span className="h-px flex-1 bg-ink/10" />
        </motion.div>

        <div className="mt-9 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-mono text-xs uppercase tracking-[0.14em] text-ink-dim sm:text-[13px]"
            >
              {t("heroSubtitle")}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 text-[2.5rem] leading-[1.03] text-ink sm:text-5xl lg:text-[3.5rem]"
            >
              {t.rich("heroHeadline", {
                highlight: (chunks) => (
                  <span className="text-primary-bright">{chunks}</span>
                ),
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="prose-mono mt-7 max-w-xl"
            >
              {t("heroDescription")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {primaryCtaExternal ? (
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright"
                >
                  {t("heroCta")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright"
                >
                  {t("heroCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              <p className="font-mono text-[11px] text-ink-dim">
                {t("heroAudience")}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="rounded-2xl border border-ink/10 bg-surface p-5 sm:p-6"
          >
            <div className="relative aspect-[16/10] w-full">
              <ProductHeroVisual
                slug={slug}
                heroSvg={heroSvg}
                heroAnimation={heroAnimation}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
