"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const graduationPhoto = "/images/graduation.webp";

const stats = [
  { type: "static" as const, value: "2024", labelKey: "storyStat1Label" },
  { type: "count" as const, value: 3, suffix: "", labelKey: "storyStat2Label" },
  { type: "count" as const, value: 100, suffix: "%", labelKey: "storyStat3Label" },
];

function AnimatedCount({
  value,
  suffix = "",
  isInView,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  isInView: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 1,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, delay]);

  return (
    <>
      {display}
      {suffix}
    </>
  );
}

function StatItem({
  stat,
  index,
  label,
}: {
  stat: (typeof stats)[number];
  index: number;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <dt className="font-display text-2xl font-bold text-primary">
        {stat.type === "static" ? (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {stat.value}
          </motion.span>
        ) : (
          <AnimatedCount
            value={stat.value}
            suffix={stat.suffix}
            isInView={isInView}
            delay={index * 0.15}
          />
        )}
      </dt>
      <dd className="mt-2 font-mono text-[10.5px] leading-relaxed text-ink-dim">
        {label}
      </dd>
    </motion.div>
  );
}

export default function AboutStory() {
  const t = useTranslations("aboutPage");

  return (
    <section className="bg-background-alt/60 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto mb-10 md:mb-12"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/55 sm:text-[11px]">
              {t("storyLabel")}
            </span>

            <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] leading-[1.1] mb-4 max-w-[920px]">
              {t("storyHeadline")}
            </h2>

            <div className="mt-7 max-w-lg space-y-5 font-mono text-xs leading-relaxed text-ink-dim sm:text-[12.5px]">
              <p className="font-sans text-muted text-base leading-relaxed max-w-[680px]">
                {t("storyText1")}
              </p>
              <p className="font-sans text-muted text-base leading-relaxed max-w-[680px]">
                {t("storyText2")}
              </p>
            </div>

            <dl className="mt-10 grid gap-8 border-t border-ink/10 pt-8 sm:grid-cols-3 sm:gap-6">
              {stats.map((stat, i) => (
                <StatItem
                  key={stat.labelKey}
                  stat={stat}
                  index={i}
                  label={t(stat.labelKey)}
                />
              ))}
            </dl>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-[22px] shadow-console"
          >
            <Image
              src={graduationPhoto}
              alt={t("storyPhotoAlt")}
              width={900}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-[center_30%] lg:aspect-square"
            />
          </motion.figure>
        </div>
      </motion.div>
    </section>
  );
}
