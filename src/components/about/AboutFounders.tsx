"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { useTranslations } from "next-intl";

const STACK_OFFSET_PX = 28;
const STACK_SCALE_STEP = 0.05;

const founders = [
  {
    roleKey: "founder1Role",
    nameKey: "founder1Name",
    descKey: "founder1Desc",
    linkedinKey: "founder1LinkedIn",
  },
  {
    roleKey: "founder2Role",
    nameKey: "founder2Name",
    descKey: "founder2Desc",
    linkedinKey: "founder2LinkedIn",
  },
  {
    roleKey: "founder3Role",
    nameKey: "founder3Name",
    descKey: "founder3Desc",
    linkedinKey: "founder3LinkedIn",
  },
];

function FounderPhotoPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex aspect-[4/5] w-[200px] shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-ink/15 bg-background-alt sm:w-[240px]">
      <div className="flex flex-col items-center gap-2 text-ink/25">
        <User className="h-10 w-10" strokeWidth={1.25} />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
          {initials}
        </span>
      </div>
    </div>
  );
}

function FounderContent({
  founder,
  t,
}: {
  founder: (typeof founders)[number];
  t: ReturnType<typeof useTranslations<"aboutPage">>;
}) {
  const name = t(founder.nameKey);
  const linkedinUrl = t(founder.linkedinKey);

  return (
    <div className="flex w-full flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-10">
      <FounderPhotoPlaceholder name={name} />

      <div className="flex min-w-0 flex-1 flex-col gap-4 text-center sm:text-left">
        <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-primary sm:text-[11px]">
          {t(founder.roleKey)} · {t("foundersDegree")}
        </p>

        <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-light leading-[1.08] tracking-[-0.02em] text-ink">
          {name}
        </h3>

        <p className="font-sans text-base leading-relaxed text-muted">
          {t(founder.descKey)}
        </p>

        <a
          href={linkedinUrl}
          target={linkedinUrl.startsWith("#") ? undefined : "_blank"}
          rel={linkedinUrl.startsWith("#") ? undefined : "noopener noreferrer"}
          aria-disabled={linkedinUrl === "#"}
          className="mx-auto inline-flex w-fit items-center gap-2 font-sans text-sm font-semibold text-ink transition-colors hover:text-primary sm:mx-0"
        >
          {t("foundersLinkedIn")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

const cardSurfaceClass =
  "relative w-full max-w-[980px] overflow-hidden rounded-[28px] border border-ink/10 bg-background px-6 py-8 shadow-[0_24px_60px_-28px_rgba(21,17,34,0.28)] sm:px-10 sm:py-12 lg:px-14 lg:py-14";

function StackedFounderCard({
  founder,
  index,
  total,
  progress,
  t,
}: {
  founder: (typeof founders)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  t: ReturnType<typeof useTranslations<"aboutPage">>;
}) {
  // Each card pins at the top of the viewport at progress `index / (total - 1)`
  // (the moment the next card starts sliding over it) and keeps shrinking
  // and dimming from there until the end of the section.
  const start = total > 1 ? index / (total - 1) : 0;
  const isLast = index === total - 1;
  const targetScale = 1 - (total - 1 - index) * STACK_SCALE_STEP;

  const scale = useTransform(
    progress,
    [start, 1],
    [1, isLast ? 1 : targetScale],
  );
  const veilOpacity = useTransform(progress, [start, 1], [0, isLast ? 0 : 0.55]);

  return (
    <div className="sticky top-0 flex h-[82dvh] min-h-[620px] items-center justify-center px-6 md:px-10">
      <motion.article
        style={{
          scale,
          top: `calc(-4vh + ${index * STACK_OFFSET_PX}px)`,
          transformOrigin: "top center",
        }}
        className={cardSurfaceClass}
      >
        <FounderContent founder={founder} t={t} />

        <motion.div
          aria-hidden="true"
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-background-alt"
        />
      </motion.article>
    </div>
  );
}

function FoundersStack({
  t,
}: {
  t: ReturnType<typeof useTranslations<"aboutPage">>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      {founders.map((founder, i) => (
        <StackedFounderCard
          key={founder.roleKey}
          founder={founder}
          index={i}
          total={founders.length}
          progress={scrollYProgress}
          t={t}
        />
      ))}
    </div>
  );
}

function FoundersStatic({
  t,
}: {
  t: ReturnType<typeof useTranslations<"aboutPage">>;
}) {
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-10 px-6 md:gap-14 md:px-10">
      {founders.map((founder) => (
        <article key={founder.roleKey} className={cardSurfaceClass}>
          <FounderContent founder={founder} t={t} />
        </article>
      ))}
    </div>
  );
}

export default function AboutFounders() {
  const t = useTranslations("aboutPage");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="founders" className="pt-16 md:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mb-4 max-w-[1400px] px-6 md:mb-6 md:px-10"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/55 sm:text-[11px]">
          {t("foundersLabel")}
        </span>
        <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] leading-[1.1] mb-4 max-w-[920px]">
          {t("foundersHeadline")}
        </h2>
        <p className="font-sans text-muted text-base leading-relaxed max-w-[680px]">
          {t("foundersIntro")}
        </p>
      </motion.div>

      {prefersReducedMotion ? <FoundersStatic t={t} /> : <FoundersStack t={t} />}
    </section>
  );
}
