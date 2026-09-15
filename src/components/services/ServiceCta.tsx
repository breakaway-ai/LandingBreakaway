"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ScheduleLink from "@/components/ScheduleLink";
import type { Service } from "@/config/services";

type ServiceCtaProps = {
  service: Service;
};

const primaryButtonClassName =
  "inline-flex min-h-14 w-full items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-ink transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:w-auto sm:min-h-[3.75rem] sm:px-12 sm:text-lg";

const secondaryButtonClassName =
  "inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-10 py-4 text-base font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:w-auto sm:min-h-[3.75rem] sm:px-12 sm:text-lg";

export default function ServiceCta({ service }: ServiceCtaProps) {
  const detail = useTranslations(`serviceDetail.${service.detailKey}`);
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-primary-soft/20 blur-[100px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="label text-white/70">{t("ctaSection.label")}</span>
          <h2 className="mx-auto mt-4 text-balance text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:mt-5">
            {detail("ctaHeadline")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-xs leading-relaxed text-white/70 sm:mt-5 sm:text-[13px]">
            {detail("ctaText")}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/#contact" className={primaryButtonClassName}>
              {t("ctaSection.contactButton")}
            </Link>
            <ScheduleLink className={secondaryButtonClassName}>
              {t("ctaSection.scheduleButton")}
            </ScheduleLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
