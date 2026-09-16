"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
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

type AvaluosHeroAnimationProps = {
  labels: AvaluosFlowLabels;
  staticMode?: boolean;
};

const CYCLE_MS = 3200;

export default function AvaluosHeroAnimation({
  labels,
  staticMode = false,
}: AvaluosHeroAnimationProps) {
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
      className="relative h-full w-full overflow-hidden rounded-lg bg-stone-50"
    >
      <div className="flex h-full min-h-[200px]">
        <MockSidebar />

        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-wider text-stone-400">
                Dashboard
              </div>
              <div className="font-mono text-[11px] font-semibold text-stone-800">
                {labels.tramite}
              </div>
            </div>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rounded-full bg-blue-100 px-2 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wider text-blue-700"
            >
              IA
            </motion.div>
          </div>

          <div className="mt-3">
            <PhaseStepper
              activeIndex={activeScene}
              labels={[labels.phaseCatastro, labels.phaseComparables, labels.phaseEntrega]}
              compact
            />
          </div>

          <div className="relative mt-3 flex-1 overflow-hidden rounded-md border border-stone-200/80 bg-white p-2.5 sm:p-3">
            <ScanLine active={!isStatic && activeScene === 0} />
            <SearchRing active={!isStatic && activeScene === 1} />

            <motion.div
              key={activeScene}
              initial={isStatic ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 h-full"
            >
              {activeScene === 0 && (
                <div className="grid h-full grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <MockField
                      label={labels.claveCatastral}
                      value="09-015-012-34-56-7890"
                      visible
                    />
                    <MockField label={labels.terreno} value="420 m²" visible accent="emerald" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-full flex-col rounded border border-dashed border-stone-300 bg-stone-50/80 p-2">
                      <div className="font-mono text-[7px] uppercase tracking-wider text-stone-400">
                        Upload
                      </div>
                      <div className="mt-auto flex justify-center">
                        <motion.div
                          animate={isStatic ? undefined : { y: [0, -3, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                          className="rounded border border-stone-200 bg-white px-2 py-1 font-mono text-[8px] text-stone-600"
                        >
                          catastro.png
                        </motion.div>
                      </div>
                    </div>
                    <MockField
                      label={labels.construccion}
                      value="186 m²"
                      visible
                      accent="blue"
                    />
                  </div>
                </div>
              )}

              {activeScene === 1 && (
                <div className="flex h-full flex-col gap-2">
                  <div className="grid grid-cols-3 gap-1.5">
                    <ComparableCard price={labels.oferta1} index={0} visible highlight />
                    <ComparableCard price={labels.oferta2} index={1} visible />
                    <ComparableCard price={labels.oferta3} index={2} visible />
                  </div>
                  <HomologacionRow visible label={labels.homologacion} />
                </div>
              )}

              {activeScene === 2 && (
                <div className="flex h-full flex-col justify-center">
                  <DocStack visible title={labels.avaluoFinal} deliveredLabel={labels.entregado} />
                  <motion.div
                    initial={false}
                    animate={{ opacity: isStatic ? 1 : [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mt-3 font-mono text-[7px] text-stone-400"
                  >
                    Google Drive · synced
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
