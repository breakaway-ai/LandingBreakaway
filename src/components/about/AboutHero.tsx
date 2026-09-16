"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("aboutPage");

  return (
    <section id="about-hero" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="flex flex-col items-center px-6 md:px-10 max-w-[1400px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-5 max-w-[1400px] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.04em] text-foreground"
        >
          {t.rich("heroHeadline", {
            highlight: (chunks) => (
              <span className="text-primary-bright">{chunks}</span>
            ),
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-[1400px] text-base leading-relaxed text-muted sm:text-lg"
        >
          {t("heroDescription")}
        </motion.p>
      </div>
    </section>
  );
}
