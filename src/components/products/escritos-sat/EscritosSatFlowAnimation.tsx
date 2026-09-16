"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  DraftPreview,
  FolderTree,
  MockSidebar,
  NumeralChip,
  PdfUpload,
  PhaseStepper,
  type EscritosSatFlowLabels,
} from "./EscritosSatMockUi";

type EscritosSatFlowAnimationProps = {
  activeStep: number;
  staticMode?: boolean;
  labels: EscritosSatFlowLabels;
};

export default function EscritosSatFlowAnimation({
  activeStep,
  staticMode = false,
  labels,
}: EscritosSatFlowAnimationProps) {
  const reduceMotion = useReducedMotion();
  const isStatic = staticMode || reduceMotion;
  const step = isStatic ? 2 : activeStep;

  const showUpload = step >= 0;
  const showFolders = step >= 1;
  const showDraft = step >= 2;
  const numeralLabels = [labels.numeral1, labels.numeral2, labels.numeral3];

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-3xl"
      style={{ height: "clamp(12rem, 32vw, 18rem)" }}
    >
      <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-white/[0.07] blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-8 -left-12 h-32 w-32 rounded-full bg-sky-400/20 blur-[70px]" />

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
              {labels.expediente}
            </span>
            <motion.span
              animate={
                step === 0
                  ? { backgroundColor: "#DBEAFE", color: "#1D4ED8" }
                  : step === 1
                    ? { backgroundColor: "#E0F2FE", color: "#0369A1" }
                    : { backgroundColor: "#D1FAE5", color: "#047857" }
              }
              className="rounded-full px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider"
            >
              {step === 0
                ? labels.phaseUpload
                : step === 1
                  ? labels.phaseExpediente
                  : labels.phaseBorrador}
            </motion.span>
          </div>

          <div className="mt-3">
            <PhaseStepper
              activeIndex={step}
              labels={[labels.phaseUpload, labels.phaseExpediente, labels.phaseBorrador]}
            />
          </div>

          <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-sky-200/70 bg-sky-50/30 p-3">
            <div className="grid h-full gap-3 md:grid-cols-[1fr_1fr]">
              <div className="space-y-2">
                <PdfUpload
                  visible={showUpload}
                  label={labels.requerimiento}
                  active={!isStatic && step === 0}
                />
                <div>
                  <div className="font-mono text-[7px] uppercase tracking-wider text-sky-600">
                    {labels.numerales}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {numeralLabels.map((numeral, index) => (
                      <NumeralChip
                        key={numeral}
                        label={numeral}
                        index={index}
                        visible={showUpload}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <FolderTree visible={showFolders} rootLabel={labels.onedrive} />
                <DraftPreview
                  visible={showDraft}
                  title={labels.borrador}
                  statusLabel={labels.listo}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
