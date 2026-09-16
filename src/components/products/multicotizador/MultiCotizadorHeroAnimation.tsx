"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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

type MultiCotizadorHeroAnimationProps = {
  labels: MultiCotizadorFlowLabels;
  staticMode?: boolean;
};

const CYCLE_MS = 3200;

export default function MultiCotizadorHeroAnimation({
  labels,
  staticMode = false,
}: MultiCotizadorHeroAnimationProps) {
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

  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-lg bg-violet-50/50"
    >
      <div className="flex h-full min-h-[200px]">
        <MockSidebar />

        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-violet-400">
                Cotizador
              </div>
              <div className="font-mono text-[11px] font-semibold text-stone-800">
                {labels.cotizacion}
              </div>
            </div>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-primary-wash px-2 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wider text-primary"
            >
              WL
            </motion.div>
          </div>

          <div className="mt-3">
            <PhaseStepper
              activeIndex={activeScene}
              labels={[labels.phaseDatos, labels.phaseComparar, labels.phaseEmitir]}
              compact
            />
          </div>

          <div className="relative mt-3 flex-1 overflow-hidden rounded-md border border-violet-200/70 bg-white p-2.5 sm:p-3">
            <PulseRing active={!isStatic && activeScene === 1} />

            <motion.div
              key={activeScene}
              initial={isStatic ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 h-full"
            >
              {activeScene === 0 && (
                <div className="grid h-full grid-cols-2 gap-2">
                  <MockField label={labels.vehiculo} value="VW Jetta 2022" visible />
                  <MockField label={labels.placa} value="ABC-123-D" visible />
                  <motion.div
                    className="col-span-2 rounded border border-dashed border-violet-300 bg-violet-50/50 px-2 py-3"
                    animate={isStatic ? undefined : { borderColor: ["#DDD6FE", "#A78BFA", "#DDD6FE"] }}
                    transition={{ duration: 2.4, repeat: Infinity }}
                  >
                    <div className="font-mono text-[7px] uppercase tracking-wider text-violet-500">
                      {labels.formLabel}
                    </div>
                    <div className="mt-2 space-y-1">
                      {[0.9, 0.65, 0.8].map((w, i) => (
                        <div
                          key={i}
                          className="h-1 rounded-full bg-violet-200"
                          style={{ width: `${w * 100}%` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {activeScene === 1 && (
                <div className="flex h-full flex-col justify-center gap-2">
                  <QuoteGrid visible quotes={labels.quotes} />
                  <div className="text-center font-mono text-[7px] uppercase tracking-wider text-primary">
                    6 aseguradoras · paralelo
                  </div>
                </div>
              )}

              {activeScene === 2 && (
                <div className="flex h-full flex-col justify-center gap-2">
                  <PolicyCard visible title={labels.policyLabel} statusLabel={labels.emitida} />
                  <PdfBadge visible label={labels.pdfLabel} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
