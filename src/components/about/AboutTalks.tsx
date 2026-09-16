"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const talks = [
  {
    photo: "/images/panel-agentic.webp",
    width: 1200,
    height: 900,
    altKey: "talk1Alt",
    metaKey: "talk1Meta",
    titleKey: "talk1Title",
    descKey: "talk1Desc",
    href: "https://www.youtube.com/watch?v=N1CC_4Uba9A",
    linkLabelKey: "talk1LinkLabel",
  },
  {
    photo: "/images/stage-booth.webp",
    width: 640,
    height: 427,
    altKey: "talk2Alt",
    metaKey: "talk2Meta",
    titleKey: "talk2Title",
    descKey: "talk2Desc",
    href: "https://youtu.be/l7K2LU9Pk-s?si=V62t0kJAeAB_DFcw",
    linkLabelKey: "talk2LinkLabel",
  },
];

function TalkCard({
  talk,
  index,
  t,
}: {
  talk: (typeof talks)[number];
  index: number;
  t: ReturnType<typeof useTranslations<"aboutPage">>;
}) {
  const content = (
    <>
      <Image
        src={talk.photo}
        alt={t(talk.altKey)}
        width={talk.width}
        height={talk.height}
        loading="lazy"
        className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/45 sm:text-[11px]">
          {t(talk.metaKey)}
        </span>
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-sans text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
            {t(talk.titleKey)}
          </h3>
          {"href" in talk && talk.href ? (
            <ArrowUpRight
              size={18}
              className="mt-0.5 shrink-0 text-ink/25 transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          ) : null}
        </div>
        <p className="flex-1 font-sans text-sm leading-relaxed text-muted">
          {t(talk.descKey)}
        </p>
      </div>
    </>
  );

  const cardClassName =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-card transition-colors hover:border-primary/20 hover:bg-primary-wash/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="h-full"
    >
      {"href" in talk && talk.href ? (
        <a
          href={talk.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(talk.linkLabelKey!)}
          className={cardClassName}
        >
          {content}
        </a>
      ) : (
        <article className={cardClassName}>{content}</article>
      )}
    </motion.div>
  );
}

export default function AboutTalks() {
  const t = useTranslations("aboutPage");

  return (
    <section className="bg-background-alt/60 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto mb-10 md:mb-12"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/55 sm:text-[11px]">
          {t("talksLabel")}
        </span>
        <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] leading-[1.1] mb-4 max-w-[920px]">
          {t("talksHeadline")}
        </h2>
      </motion.div>

      <div className="px-6 md:px-10 max-w-[1400px] mx-auto">
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {talks.map((talk, i) => (
            <TalkCard key={talk.titleKey} talk={talk} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
