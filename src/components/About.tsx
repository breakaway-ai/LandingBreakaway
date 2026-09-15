"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const features = [
  {
    titleKey: "about.feature1Title",
    descKey: "about.feature1Description",
    svg: "/svgs/about-feature-1.svg",
  },
  {
    titleKey: "about.feature2Title",
    descKey: "about.feature2Description",
    svg: "/svgs/about-feature-2.svg",
  },
  {
    titleKey: "about.feature3Title",
    descKey: "about.feature3Description",
    svg: "/svgs/about-feature-3.svg",
  },
  {
    titleKey: "about.feature4Title",
    descKey: "about.feature4Description",
    svg: "/svgs/about-feature-4.svg",
  },
];

export default function About() {
  const t = useTranslations();

  return (
    <section id="about" className="pt-0 pb-16 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto mb-16 md:mb-20"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/55 sm:text-[11px]">
          {t("about.label")}
        </span>
        <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] leading-[1.1] mb-4 max-w-[920px]">
          {t.rich("about.headline", {
            highlight: (chunks) => (
              <span className="text-primary-bright">{chunks}</span>
            ),
          })}
        </h2>
        <p className="font-sans text-muted text-base leading-relaxed max-w-[680px]">
          {t("about.description")}
        </p>
      </motion.div>

      <div className="px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 rounded-sm overflow-hidden">
          {features.map((feature, i) => (
            <div
              key={feature.titleKey}
              className="bg-background p-8 md:p-10 flex flex-col gap-6 group hover:bg-surface transition-colors"
            >
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={feature.svg}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain"
                />
              </div>
              <span className="font-mono text-[11px] text-primary">{`0${i + 1}`}</span>
              <h3 className="font-serif font-light text-lg tracking-[-0.02em] leading-snug">
                {t(feature.titleKey)}
              </h3>
              <p className="font-sans text-muted text-sm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
