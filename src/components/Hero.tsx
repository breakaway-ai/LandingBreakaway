"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getPrimaryCtaHref, isExternalBookingUrl } from "@/config/booking";
import AgentConsole from "./AgentConsole";

export default function Hero() {
  const t = useTranslations();
  const primaryCtaHref = getPrimaryCtaHref("#contact");
  const primaryCtaExternal = isExternalBookingUrl(primaryCtaHref);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-0 h-[440px] w-[440px] rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-accent/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
              <span className="label text-primary">{t("hero.label")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[2.5rem] leading-[1.04] text-ink sm:text-5xl lg:text-[3.6rem]"
            >
              {t.rich("hero.title", {
                highlight: (chunks) => (
                  <span className="text-primary-bright">{chunks}</span>
                ),
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {primaryCtaExternal ? (
                <a
                  href={primaryCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright"
                >
                  {t("hero.cta")}
                  <ArrowRight size={16} />
                </a>
              ) : (
                <Link
                  href={primaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright"
                >
                  {t("hero.cta")}
                  <ArrowRight size={16} />
                </Link>
              )}
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-ink shadow-card transition-shadow hover:shadow-pill"
              >
                {t("hero.secondary")}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AgentConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
