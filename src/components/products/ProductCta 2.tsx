"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { getPrimaryCtaHref, isExternalBookingUrl } from "@/config/booking";
import type { ProductSlug } from "@/config/products";
import { Link } from "@/i18n/navigation";

type ProductCtaProps = {
  slug: ProductSlug;
};

export default function ProductCta({ slug }: ProductCtaProps) {
  const t = useTranslations(`products.${slug}`);
  const primaryCtaHref = getPrimaryCtaHref("/#contact");
  const primaryCtaExternal = isExternalBookingUrl(primaryCtaHref);

  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-primary-soft/20 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label text-white/70">{t("ctaLabel")}</span>
          <h2 className="mt-5 text-[1.75rem] leading-[1.15] text-white sm:text-4xl">
            {t("ctaHeadline")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-mono text-xs leading-relaxed text-white/70 sm:text-[13px]">
            {t("ctaDescription")}
          </p>

          <div className="mt-10 flex justify-center">
            {primaryCtaExternal ? (
              <a
                href={primaryCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-ink transition-colors hover:bg-white/90"
              >
                {t("ctaButton")}
              </a>
            ) : (
              <Link
                href={primaryCtaHref}
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-ink transition-colors hover:bg-white/90"
              >
                {t("ctaButton")}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
