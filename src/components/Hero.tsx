"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AgentConsole from "./AgentConsole";
import PrimaryCtaButton from "./PrimaryCtaButton";
import Clients from "./Clients";

export default function Hero() {
  const t = useTranslations();

  return (
    <section id="hero" className="pt-28 md:pt-36">
      <div className="flex flex-col items-center text-center px-6 md:px-10 max-w-[1400px] mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 max-w-[1150px] font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.04em] text-foreground"
        >
          {t.rich("hero.title", {
            br: () => <br />,
            highlight: (chunks) => (
              <span className="relative inline-block">
                {chunks}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 181.59 7.19"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute left-0 top-full -mt-[0.14em] h-[0.3em] w-full overflow-visible text-primary-bright"
                >
                  <path
                    d="M1.32,7.17C25.56,2.82,50.43,2.29,75,2.13c23-.15,46.01.39,68.99,1.38,12.2.52,24.4,1.18,36.59,2.03,1.35.09,1.34-2.01,0-2.1-22.51-1.56-45.06-2.53-67.61-3.06C90.18-.14,67.36-.22,44.58.76,29.91,1.39,15.23,2.55.76,5.14c-1.33.24-.77,2.26.56,2.02h0Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            ),
            accent: (chunks) => (
              <span className="text-primary-bright">{chunks}</span>
            ),
          })}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-sans text-sm md:text-base text-muted max-w-[800px] leading-relaxed mb-8 text-center w-full"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-5 mb-10"
        >
          <PrimaryCtaButton variant="hero" />
        </motion.div>
      </div>
      <div className="flex flex-col items-center text-center px-6 md:px-10 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="w-full max-w-[1150px] mb-14"
        >
          <AgentConsole />
        </motion.div>
        <Clients />
      </div>
    </section>
  );
}
