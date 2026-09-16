"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MockField,
  MockSidebar,
  PdfBadge,
  PhaseStepper,
  PolicyCard,
  PulseRing,
  QuoteGrid,
  type MultiCotizadorFlowLabels,
} from "./MultiCotizadorMockUi";

type MultiCotizadorFlowAnimationProps = {
  activeStep: number;
  staticMode?: boolean;
  labels: MultiCotizadorFlowLabels;
};

export default function MultiCotizadorFlowAnimation({
  activeStep,
  staticMode = false,
  labels,
}: MultiCotizadorFlowAnimationProps) {
  const reduceMotion = useReducedMotion();
  const isStatic = staticMode || reduceMotion;
  const step = isStatic ? 2 : activeStep;

  const showForm = step >= 0;
  const showQuotes = step >= 1;
  const showPolicy = step >= 2;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-3xl"
      style={{ height: "clamp(12rem, 32vw, 18rem)" }}
    >
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-white/[0.07] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-8 -left-12 h-32 w-32 rounded-full bg-violet-300/25 blur-[70px]" />

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
              {labels.cotizacion}
            </span>
            <motion.span
              animate={
                step === 0
                  ? { backgroundColor: "#EDE9FE", color: "#6D28D9" }
                  : step === 1
                    ? { backgroundColor: "#F1ECFE", color: "#7C3AED" }
                    : { backgroundColor: "#D1FAE5", color: "#047857" }
              }
              className="rounded-full px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider"
            >
              {step === 0
                ? labels.phaseDatos
                : step === 1
                  ? labels.phaseComparar
                  : labels.phaseEmitir}
            </motion.span>
          </div>

          <div className="mt-3">
            <PhaseStepper
              activeIndex={step}
              labels={[
                labels.phaseDatos,
                labels.phaseComparar,
                labels.phaseEmitir,
              ]}
            />
          </div>

          <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-violet-200/70 bg-violet-50/30 p-3">
            <PulseRing active={!isStatic && step === 1} />

            <div className="relative z-10 grid h-full gap-3 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-2">
                <MockField
                  label={labels.vehiculo}
                  value="VW Jetta 2022"
                  visible={showForm}
                />
                <MockField
                  label={labels.placa}
                  value="ABC-123-D"
                  visible={showForm}
                />
                <motion.div
                  initial={false}
                  animate={{ opacity: showForm ? 1 : 0 }}
                  className="rounded border border-dashed border-violet-300 bg-white px-2 py-2 font-mono text-[8px] text-violet-600"
                >
                  {labels.formLabel} · 4 pasos
                </motion.div>
              </div>

              <div className="flex flex-col gap-2">
                <QuoteGrid visible={showQuotes} quotes={labels.quotes} />
                <PolicyCard
                  visible={showPolicy}
                  title={labels.policyLabel}
                  statusLabel={labels.emitida}
                />
                <PdfBadge visible={showPolicy} label={labels.pdfLabel} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
