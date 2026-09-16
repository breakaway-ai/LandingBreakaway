"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useTranslations } from "next-intl";
import ProcessAssembly from "./ProcessAssembly";

const steps = [
  { titleKey: "howItWorks.step1Title", descKey: "howItWorks.step1Description" },
  { titleKey: "howItWorks.step2Title", descKey: "howItWorks.step2Description" },
  { titleKey: "howItWorks.step3Title", descKey: "howItWorks.step3Description" },
  { titleKey: "howItWorks.step4Title", descKey: "howItWorks.step4Description" },
  { titleKey: "howItWorks.step5Title", descKey: "howItWorks.step5Description" },
];

const WORKER_LABEL_KEYS = [
  "hero.nodeAgent1",
  "hero.nodeAgent2",
  "hero.nodeAgent3",
  "hero.nodeAgent4",
];

const STEP_SCROLL_VH = 100;

function ProcessPanel({
  t,
  activeStep,
  maxRevealedStep,
}: {
  t: ReturnType<typeof useTranslations>;
  activeStep: number;
  maxRevealedStep: number;
}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const visibleSteps = steps.slice(0, maxRevealedStep + 1);
  const gridColumns = `repeat(${visibleSteps.length}, minmax(7rem, 14rem))`;

  const activeItem = steps[activeStep];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary px-5 py-8 sm:px-6 sm:py-10 md:px-14 md:py-14">
      <div className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[320px] rounded-full bg-primary-soft/10 blur-[100px]" />

      <div className="relative">
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-white/55 sm:text-[11px]">
          {t("process.label")}
        </span>
        <h2 className="max-w-[920px] font-serif text-[clamp(1.75rem,3.5vw,3.25rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
          {t("howItWorks.sectionTitle")}
        </h2>
      </div>

      {/* Mobile: single active step with description */}
      <div className="relative mt-8 min-h-[7.5rem] md:hidden">
        <motion.div
          key={activeItem.titleKey}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-serif text-[clamp(2rem,8vw,2.75rem)] font-light leading-none tracking-[-0.04em] text-primary-soft">
            {String(activeStep + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-serif text-base font-light leading-snug tracking-[-0.02em] text-white">
            {t(activeItem.titleKey)}
          </h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">
            {t(activeItem.descKey)}
          </p>
        </motion.div>
      </div>

      {/* Desktop: horizontal step grid */}
      <ol
        className="relative mt-10 hidden w-fit max-w-full gap-x-6 sm:gap-x-8 md:mt-14 md:grid md:gap-x-10 [--process-gap:1.5rem] sm:[--process-gap:2rem] md:[--process-gap:2.5rem]"
        style={{ gridTemplateColumns: gridColumns }}
        aria-label={t("process.label")}
      >
        {visibleSteps.map((item, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;

          return (
            <motion.li
              key={item.titleKey}
              layout
              className="flex min-w-0 flex-col"
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{
                  opacity: isActive ? 1 : isPast ? 0.52 : 0.72,
                  y: 0,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-serif text-[clamp(1.5rem,2.5vw,2.75rem)] font-light leading-none tracking-[-0.04em] text-primary-soft">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  className={`mt-2 font-serif text-[11px] font-light leading-snug tracking-[-0.02em] sm:mt-2.5 sm:text-sm md:text-[15px] ${
                    isActive ? "text-white" : "text-white/70"
                  }`}
                >
                  {t(item.titleKey)}
                </h3>
                <p
                  className={`mt-1.5 hidden font-sans text-[11px] leading-relaxed sm:mt-2 sm:block sm:text-xs md:text-[13px] ${
                    isActive ? "text-white/60" : "text-white/40"
                  }`}
                >
                  {t(item.descKey)}
                </p>
              </motion.div>
            </motion.li>
          );
        })}
      </ol>

      {/* Mobile: full-width progress track */}
      <div
        aria-hidden="true"
        className="relative mt-6 grid h-3.5 w-full grid-cols-5 md:hidden"
      >
        <div className="absolute left-0 right-0 top-[6px] h-0.5 bg-white/50" />
        {steps.map((item, i) => {
          const isRevealed = i <= maxRevealedStep;

          return (
            <div
              key={`${item.titleKey}-mobile-point`}
              className="relative flex justify-center"
            >
              <motion.span
                className="relative z-10 h-3.5 w-3.5 rounded-full"
                animate={{
                  scale: i === activeStep ? 1.25 : 1,
                  backgroundColor: "#ffffff",
                  boxShadow:
                    i === activeStep
                      ? "0 0 0 4px rgba(255,255,255,0.22), 0 0 20px rgba(255,255,255,0.75)"
                      : "0 0 0 4px rgba(255,255,255,0.12)",
                  opacity: !isRevealed
                    ? 0.2
                    : i === activeStep
                      ? 1
                      : i < activeStep
                        ? 0.35
                        : 0.45,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          );
        })}
      </div>

      {/* Desktop: aligned timeline track */}
      <div
        ref={timelineRef}
        aria-hidden="true"
        className="relative mt-6 hidden h-3.5 w-fit max-w-full gap-x-6 sm:gap-x-8 md:grid md:gap-x-10 [--process-gap:1.5rem] sm:[--process-gap:2rem] md:[--process-gap:2.5rem]"
        style={{ gridTemplateColumns: gridColumns }}
      >
        <div className="absolute left-0 right-0 top-[6px] h-0.5 bg-white/50" />
        {visibleSteps.map((item, i) => (
          <div key={`${item.titleKey}-test-point`} className="relative min-w-0">
            <motion.span
              className="absolute left-0 top-0 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full"
              animate={{
                scale: i === activeStep ? 1.25 : 1,
                backgroundColor: "#ffffff",
                boxShadow:
                  i === activeStep
                    ? "0 0 0 4px rgba(255,255,255,0.22), 0 0 20px rgba(255,255,255,0.75)"
                    : "0 0 0 4px rgba(255,255,255,0.12)",
                opacity: i === activeStep ? 1 : i < activeStep ? 0.35 : 0.45,
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ))}
      </div>
      <ProcessAssembly
        activeStep={activeStep}
        hubLabel={t("hero.nodeMain")}
        workerLabels={WORKER_LABEL_KEYS.map((key) => t(key))}
      />
    </div>
  );
}

function ProcessStatic({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section id="process" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 md:px-14 md:py-16">
          <div className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />

          <div className="relative">
            <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-white/55 sm:text-[11px]">
              {t("process.label")}
            </span>
            <h2 className="max-w-[920px] font-serif text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.1] tracking-[-0.02em] text-white">
              {t("howItWorks.sectionTitle")}
            </h2>
          </div>

          <div className="relative mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
            {steps.map((step, i) => (
              <div key={step.titleKey} className="relative">
                <span className="mb-6 hidden h-3.5 w-3.5 rounded-full bg-white ring-4 ring-white/25 lg:block" />
                <p className="font-serif text-[clamp(2rem,3vw,2.75rem)] font-light leading-none tracking-[-0.04em] text-primary-soft">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-base font-light leading-snug tracking-[-0.02em] text-white sm:text-lg">
                  {t(step.titleKey)}
                </h3>
                <p className="mt-2.5 font-sans text-sm leading-relaxed text-white/60">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
          <ProcessAssembly
            activeStep={steps.length - 1}
            hubLabel={t("hero.nodeMain")}
            workerLabels={WORKER_LABEL_KEYS.map((key) => t(key))}
            staticMode
          />
        </div>
      </div>
    </section>
  );
}

export default function Process() {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [maxRevealedStep, setMaxRevealedStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActiveStep(index);
    setMaxRevealedStep((prev) => Math.max(prev, index));
  });

  if (prefersReducedMotion) {
    return <ProcessStatic t={t} />;
  }

  return (
    <section
      id="process"
      ref={containerRef}
      style={{
        position: "relative",
        height: `${steps.length * STEP_SCROLL_VH}vh`,
      }}
    >
      <div className="sticky top-0 flex h-[100dvh] items-center px-6 md:px-10">
        <div className="mx-auto w-full max-w-[1400px]">
          <ProcessPanel
            t={t}
            activeStep={activeStep}
            maxRevealedStep={maxRevealedStep}
          />
        </div>
      </div>
    </section>
  );
}
