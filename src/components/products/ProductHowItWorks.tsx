"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import AvaluosFlowAnimation from "@/components/products/avaluos/AvaluosFlowAnimation";
import { getAvaluosAnimationLabels } from "@/components/products/avaluos/avaluosAnimationLabels";
import EcommercePipelineAnimation from "@/components/products/ecommerce/EcommercePipelineAnimation";
import { getEcommerceAnimationLabels } from "@/components/products/ecommerce/ecommerceAnimationLabels";
import EscritosSatFlowAnimation from "@/components/products/escritos-sat/EscritosSatFlowAnimation";
import { getEscritosSatAnimationLabels } from "@/components/products/escritos-sat/escritosSatAnimationLabels";
import MultiCotizadorFlowAnimation from "@/components/products/multicotizador/MultiCotizadorFlowAnimation";
import { getMultiCotizadorAnimationLabels } from "@/components/products/multicotizador/multicotizadorAnimationLabels";
import type { FlowAnimationLayout, ProductAnimationId, ProductSlug } from "@/config/products";

const STEP_KEYS = ["step1", "step2", "step3"] as const;
const STEP_CYCLE_MS = 2800;

type ProductHowItWorksProps = {
  slug: ProductSlug;
  stepsSvg: string;
  flowAnimation?: ProductAnimationId;
  flowAnimationLayout?: FlowAnimationLayout;
};

export default function ProductHowItWorks({
  slug,
  stepsSvg,
  flowAnimation,
  flowAnimationLayout = "mock",
}: ProductHowItWorksProps) {
  const t = useTranslations(`products.${slug}`);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.35, once: false });
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!flowAnimation || prefersReducedMotion || !isInView) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % STEP_KEYS.length);
    }, STEP_CYCLE_MS);

    return () => window.clearInterval(interval);
  }, [flowAnimation, isInView, prefersReducedMotion]);

  const showFlowAnimation = Boolean(flowAnimation);
  const isPipelineLayout = flowAnimationLayout === "pipeline";
  const animationStep = prefersReducedMotion
    ? STEP_KEYS.length - 1
    : isInView
      ? activeStep
      : 0;

  const flowContainerClass = showFlowAnimation
    ? isPipelineLayout
      ? "relative mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-stone-50 via-white to-blue-50/40 px-5 py-10 sm:px-10 sm:py-12"
      : "relative mt-10 overflow-hidden rounded-2xl bg-primary px-5 pb-12 pt-8 sm:px-10 sm:pb-14 sm:pt-10"
    : "mt-10 overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 sm:p-8";

  function renderFlowAnimation() {
    if (flowAnimation === "multicotizador") {
      return (
        <MultiCotizadorFlowAnimation
          activeStep={animationStep}
          staticMode={prefersReducedMotion === true}
          labels={getMultiCotizadorAnimationLabels(t)}
        />
      );
    }

    if (flowAnimation === "escritos-sat") {
      return (
        <EscritosSatFlowAnimation
          activeStep={animationStep}
          staticMode={prefersReducedMotion === true}
          labels={getEscritosSatAnimationLabels(t)}
        />
      );
    }

    if (flowAnimation === "avaluos") {
      return (
        <AvaluosFlowAnimation
          activeStep={animationStep}
          staticMode={prefersReducedMotion === true}
          labels={getAvaluosAnimationLabels(t)}
        />
      );
    }

    if (flowAnimation === "ecommerce") {
      return (
        <EcommercePipelineAnimation
          activeStep={animationStep}
          staticMode={prefersReducedMotion === true}
          labels={getEcommerceAnimationLabels(t)}
        />
      );
    }

    return null;
  }

  return (
    <section ref={sectionRef} className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <span className="label text-primary">{t("stepsLabel")}</span>
          <h2 className="mt-5 text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t("stepsHeadline")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className={flowContainerClass}
        >
          {showFlowAnimation ? (
            <>
              {!isPipelineLayout && (
                <div className="pointer-events-none absolute -right-20 top-0 h-[320px] w-[320px] rounded-full bg-white/[0.06] blur-[100px]" />
              )}
              {renderFlowAnimation()}
            </>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={stepsSvg}
              alt=""
              aria-hidden="true"
              className="mx-auto block w-full min-h-[100px] max-w-4xl object-contain sm:min-h-[140px]"
            />
          )}
        </motion.div>

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {STEP_KEYS.map((key, index) => {
            const isActive =
              showFlowAnimation && !prefersReducedMotion && animationStep === index;

            return (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative rounded-xl border p-5 transition-colors ${
                  isActive
                    ? "border-primary/30 bg-primary/[0.04]"
                    : "border-transparent"
                }`}
              >
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                    isActive ? "text-primary-bright" : "text-primary"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3
                  className={`mt-3 font-display text-lg font-semibold ${
                    isActive ? "text-primary" : "text-ink"
                  }`}
                >
                  {t(`${key}Title`)}
                </h3>
                <p className="prose-mono mt-3">{t(`${key}Description`)}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
