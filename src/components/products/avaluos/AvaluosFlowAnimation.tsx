"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ComparableCard,
  DocStack,
  HomologacionRow,
  MockField,
  MockSidebar,
  PhaseStepper,
  ScanLine,
  SearchRing,
  type AvaluosFlowLabels,
} from "./AvaluosMockUi";

type AvaluosFlowAnimationProps = {
  activeStep: number;
  staticMode?: boolean;
  labels: AvaluosFlowLabels;
};

export default function AvaluosFlowAnimation({
  activeStep,
  staticMode = false,
  labels,
}: AvaluosFlowAnimationProps) {
  const reduceMotion = useReducedMotion();
  const isStatic = staticMode || reduceMotion;
  const step = isStatic ? 2 : activeStep;

  const showCatastro = step >= 0;
  const showComparables = step >= 1;
  const showDelivery = step >= 2;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-3xl"
      style={{ height: "clamp(12rem, 32vw, 18rem)" }}
    >
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-white/[0.07] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-8 -left-12 h-32 w-32 rounded-full bg-emerald-400/20 blur-[70px]" />

      <motion.div
        initial={isStatic ? false : { opacity: 0, y: 12 }}
        whileInView={isStatic ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex h-full overflow-hidden rounded-xl border border-white/15 bg-white/95 shadow-xl"
      >
        <MockSidebar />

        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-semibold text-stone-800">
              {labels.tramite}
            </span>
            <motion.span
              animate={
                step === 0
                  ? { backgroundColor: "#DBEAFE", color: "#1D4ED8" }
                  : step === 1
                    ? { backgroundColor: "#EDE9FE", color: "#6D28D9" }
                    : { backgroundColor: "#D1FAE5", color: "#047857" }
              }
              className="rounded-full px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider"
            >
              {step === 0
                ? labels.phaseCatastro
                : step === 1
                  ? labels.phaseComparables
                  : labels.phaseEntrega}
            </motion.span>
          </div>

          <div className="mt-3">
            <PhaseStepper
              activeIndex={step}
              labels={[labels.phaseCatastro, labels.phaseComparables, labels.phaseEntrega]}
            />
          </div>

          <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-stone-200/80 bg-stone-50/50 p-3">
            <ScanLine active={!isStatic && step === 0} />
            <SearchRing active={!isStatic && step === 1} />

            <div className="relative z-10 grid h-full gap-3 md:grid-cols-[1fr_1.1fr]">
              <div className="space-y-2">
                <MockField
                  label={labels.claveCatastral}
                  value="09-015-012-34-56-7890"
                  visible={showCatastro}
                />
                <MockField
                  label={labels.terreno}
                  value="420 m²"
                  visible={showCatastro}
                  accent="emerald"
                />
                <MockField
                  label={labels.construccion}
                  value="186 m²"
                  visible={showCatastro}
                  accent="blue"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-3 gap-1.5">
                  <ComparableCard
                    price={labels.oferta1}
                    index={0}
                    visible={showComparables}
                    highlight={step === 1}
                  />
                  <ComparableCard
                    price={labels.oferta2}
                    index={1}
                    visible={showComparables}
                  />
                  <ComparableCard
                    price={labels.oferta3}
                    index={2}
                    visible={showComparables}
                  />
                </div>

                <HomologacionRow visible={showComparables} label={labels.homologacion} />

                <DocStack
                  visible={showDelivery}
                  title={labels.avaluoFinal}
                  deliveredLabel={labels.entregado}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
