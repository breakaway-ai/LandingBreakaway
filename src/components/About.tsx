"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import PageContainer from "./PageContainer";

const features = [
  { titleKey: "about.feature1Title", descKey: "about.feature1Description" },
  { titleKey: "about.feature2Title", descKey: "about.feature2Description" },
  { titleKey: "about.feature3Title", descKey: "about.feature3Description" },
];

export default function About() {
  const t = useTranslations();

  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-32">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="label text-primary">{t("about.label")}</span>
          <h2 className="mx-auto mt-5 max-w-3xl text-[1.75rem] leading-[1.15] text-ink sm:text-4xl lg:text-[2.6rem]">
            {t.rich("about.headline", {
              highlight: (chunks) => (
                <span className="text-primary-bright">{chunks}</span>
              ),
            })}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-2 sm:gap-10"
        >
          <p className="prose-mono">{t("about.description1")}</p>
          <p className="prose-mono">{t("about.description2")}</p>
        </motion.div>

        <div className="mt-12 grid gap-8 border-t border-ink/10 pt-10 sm:mt-16 sm:grid-cols-3 sm:gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="font-mono text-[11px] text-primary">{`0${i + 1}`}</span>
              <h3 className="mt-3 text-[15px] text-ink sm:text-base">
                {t(feature.titleKey)}
              </h3>
              <p className="prose-mono mt-2.5">{t(feature.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
