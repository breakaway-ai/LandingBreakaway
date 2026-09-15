"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AgentConsole from "./AgentConsole";
import PageContainer from "./PageContainer";
import PrimaryCtaButton from "./PrimaryCtaButton";

export default function Hero() {
  const t = useTranslations();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <PageContainer className="relative">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full font-display text-[3.25rem] font-normal leading-[1.04] text-ink sm:text-[4.25rem] lg:text-[4.25rem]"
          >
            {t.rich("hero.title", {
              br: () => <br />,
              highlight: (chunks) => (
                <span className="text-primary-bright">{chunks}</span>
              ),
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base lg:text-[17px]"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <PrimaryCtaButton variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="my-10 w-full"
          >
            <AgentConsole />
          </motion.div>
        </div>
      </PageContainer>
    </section>
  );
}
