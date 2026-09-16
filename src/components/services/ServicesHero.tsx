"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/config/services";

export default function ServicesHero() {
  const t = useTranslations();
  const page = useTranslations("servicesPage");
  const illustrations = useTranslations("serviceIllustrations");

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <div className="pointer-events-none absolute -left-40 top-6 h-[440px] w-[440px] rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="label shrink-0 text-primary">{page("heroLabel")}</span>
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        <h1 className="mt-9 max-w-4xl text-[2.5rem] leading-[1.03] text-ink sm:text-5xl lg:text-[3.75rem]">
          {page.rich("headline", {
            highlight: (chunks) => (
              <span className="text-primary-bright">{chunks}</span>
            ),
          })}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {page("subtitle")}
        </p>

        <div className="mt-12 border-t border-ink/10 sm:mt-14">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group -mx-4 grid gap-5 border-b border-ink/10 px-4 py-7 transition-colors hover:bg-primary-wash/40 sm:-mx-5 sm:grid-cols-[96px_1fr_auto] sm:items-center sm:gap-6 sm:px-5 sm:py-8 lg:gap-8"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-dashed border-ink/15 bg-background-alt sm:h-24 sm:w-24">
                <Image
                  src={service.svg}
                  alt={illustrations(service.detailKey)}
                  fill
                  sizes="96px"
                  className="object-contain p-2.5 sm:p-3"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-primary sm:text-xl">
                  {t(service.titleKey)}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:max-w-xl">
                  {t(service.menuDescKey)}
                </p>
                <p className="mt-2 font-mono text-[11px] text-ink-dim">
                  {t(service.footerKey)}
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="shrink-0 text-ink/25 transition-colors group-hover:text-primary max-sm:hidden"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
