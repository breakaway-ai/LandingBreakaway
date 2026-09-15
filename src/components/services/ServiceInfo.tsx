"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Service } from "@/config/services";

type ServiceInfoProps = {
  service: Service;
};

const FEATURES = ["feature1", "feature2", "feature3"] as const;
const DELIVERABLES = ["deliverable1", "deliverable2", "deliverable3", "deliverable4"] as const;

export default function ServiceInfo({ service }: ServiceInfoProps) {
  const detail = useTranslations(`serviceDetail.${service.detailKey}`);

  return (
    <section className="relative border-t border-ink/10 bg-background-alt/50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div>
          <span className="label text-primary">{detail("infoLabel")}</span>
          <h2 className="mt-5 max-w-xl text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {detail("infoHeadline")}
          </h2>
          <p className="prose-mono mt-5 max-w-2xl">{detail("infoIntro")}</p>
        </div>

        <div className="mt-12 border-t border-ink/10 sm:mt-14">
          {FEATURES.map((feature, index) => (
            <article
              key={feature}
              className="grid gap-3 border-b border-ink/10 py-9 sm:gap-4 sm:py-10 lg:grid-cols-[64px_1fr] lg:gap-8"
            >
              <span className="label text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="max-w-md font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                  {detail(`${feature}Title`)}
                </h3>
                <p className="prose-mono mt-4 max-w-lg">
                  {detail.rich(`${feature}Desc`, {
                    highlight: (chunks) => <span className="mark">{chunks}</span>,
                  })}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
            <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
              {detail("deliverablesTitle")}
            </h3>
            <ul className="mt-5 space-y-3">
              {DELIVERABLES.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{detail(item)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-primary-wash p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold text-ink sm:text-xl">
              {detail("idealForTitle")}
            </h3>
            <p className="prose-mono mt-4">{detail("idealForDesc")}</p>
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-ink-dim">
              {detail("timelineNote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
