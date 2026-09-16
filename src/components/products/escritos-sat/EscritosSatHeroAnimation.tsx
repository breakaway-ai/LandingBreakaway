"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  DraftPreview,
  FolderTree,
  MockSidebar,
  NumeralChip,
  PdfUpload,
  PhaseStepper,
  type EscritosSatFlowLabels,
} from "./EscritosSatMockUi";

type EscritosSatHeroAnimationProps = {
  labels: EscritosSatFlowLabels;
  staticMode?: boolean;
};

const CYCLE_MS = 3200;

export default function EscritosSatHeroAnimation({
  labels,
  staticMode = false,
}: EscritosSatHeroAnimationProps) {
  const reduceMotion = useReducedMotion();
  const isStatic = staticMode || reduceMotion;
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (isStatic) return;

    const interval = window.setInterval(() => {
      setScene((current) => (current + 1) % 3);
    }, CYCLE_MS);

    return () => window.clearInterval(interval);
  }, [isStatic]);

  const activeScene = isStatic ? 2 : scene;
  const numeralLabels = [labels.numeral1, labels.numeral2, labels.numeral3];

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-lg bg-sky-50/40"
    >
      <div className="flex h-full min-h-[200px]">
        <MockSidebar />

        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-sky-500">
                Despacho
              </div>
              <div className="font-mono text-[11px] font-semibold text-stone-800">
                {labels.expediente}
              </div>
            </div>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-sky-100 px-2 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wider text-sky-700"
            >
              IA
            </motion.div>
          </div>

          <div className="mt-3">
            <PhaseStepper
              activeIndex={activeScene}
              labels={[
                labels.phaseUpload,
                labels.phaseExpediente,
                labels.phaseBorrador,
              ]}
              compact
            />
          </div>

          <div className="relative mt-3 flex-1 overflow-hidden rounded-md border border-sky-200/70 bg-white p-2.5 sm:p-3">
            <motion.div
              key={activeScene}
              initial={isStatic ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              {activeScene === 0 && (
                <div className="flex h-full flex-col gap-2">
                  <PdfUpload
                    visible
                    label={labels.requerimiento}
                    active={!isStatic}
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
                          visible
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeScene === 1 && (
                <FolderTree visible rootLabel={labels.onedrive} />
              )}

              {activeScene === 2 && (
                <DraftPreview
                  visible
                  title={labels.borrador}
                  statusLabel={labels.listo}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
