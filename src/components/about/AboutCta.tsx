"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

const primaryButtonClassName =
  "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:min-h-[3.25rem] sm:px-10 sm:text-base";

export default function AboutCta() {
  const t = useTranslations("aboutPage");

  return (
    <section className="relative overflow-hidden bg-primary py-12 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-primary-soft/20 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
        >
          <div className="min-w-0 flex-1">
            <h2 className="text-balance text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              {t("ctaHeadline")}
            </h2>
            <p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-white/70 sm:text-[13px]">
              {t("ctaText")}
            </p>
          </div>

          <a
            href="mailto:general@breakaway.work"
            className={primaryButtonClassName}
          >
            <Mail className="h-4 w-4" />
            {t("ctaButton")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
