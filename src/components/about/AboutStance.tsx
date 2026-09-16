"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const stances = [
  { titleKey: "stance1Title", descKey: "stance1Desc" },
  { titleKey: "stance2Title", descKey: "stance2Desc" },
  { titleKey: "stance3Title", descKey: "stance3Desc" },
];

export default function AboutStance() {
  const t = useTranslations("aboutPage");

  return (
    <section className="py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto mb-10 md:mb-12"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/55 sm:text-[11px]">
          {t("stanceLabel")}
        </span>
        <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] leading-[1.1] mb-4 max-w-[920px]">
          {t("stanceHeadline")}
        </h2>
      </motion.div>

      <div className="px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 rounded-sm overflow-hidden">
          {stances.map((stance, i) => (
            <motion.article
              key={stance.titleKey}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-background p-8 md:p-10 flex flex-col gap-6 group hover:bg-surface transition-colors"
            >
              <span className="font-mono text-[11px] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif font-light text-lg tracking-[-0.02em] leading-snug">
                {t(stance.titleKey)}
              </h3>
              <p className="font-sans text-muted text-sm leading-relaxed">
                {t.rich(stance.descKey, {
                  highlight: (chunks) => (
                    <span className="mark">{chunks}</span>
                  ),
                })}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
