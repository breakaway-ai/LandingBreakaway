"use client";

import { useTranslations } from "next-intl";
import ScheduleLink from "@/components/ScheduleLink";
import { getScheduleHref } from "@/config/booking";

const buttonClassName =
  "inline-flex shrink-0 items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:px-10 sm:py-4 sm:text-base";

export default function ContactScheduleBanner() {
  const t = useTranslations();

  if (!getScheduleHref()) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-primary py-10 sm:py-12">
      <div className="pointer-events-none absolute -right-16 top-0 h-[240px] w-[240px] rounded-full bg-white/[0.06] blur-[100px]" />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
        <div className="max-w-xl">
          <h2 className="text-xl font-bold leading-snug tracking-[-0.02em] text-white sm:text-2xl">
            {t("contactForm.scheduleBannerTitle")}
          </h2>
          <p className="mt-2 font-mono text-xs leading-relaxed text-white/70 sm:text-[13px]">
            {t("contactForm.scheduleBannerSubtitle")}
          </p>
        </div>

        <ScheduleLink className={buttonClassName}>
          {t("contactForm.scheduleBannerButton")}
        </ScheduleLink>
      </div>
    </section>
  );
}
