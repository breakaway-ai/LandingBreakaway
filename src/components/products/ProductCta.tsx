"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-0 h-[320px] w-[320px] rounded-full bg-white/[0.06] blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="label text-white/70">{t("ctaLabel")}</span>
          <h2 className="mt-5 text-[1.75rem] leading-[1.15] text-white sm:text-4xl">
            {t("ctaHeadline")}
          </h2>
          <p className="prose-mono mx-auto mt-5 max-w-xl text-white/75">{t("ctaDescription")}</p>

          {primaryCtaExternal ? (
            <a
              href={primaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
            >
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <Link
              href={primaryCtaHref}
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
            >
              {t("ctaButton")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
