"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  PdfBadge,
  PulseRing,
  QuoteGrid,
  type MultiCotizadorFlowLabels,
} from "./MultiCotizadorMockUi";

export type MultiCotizadorFeatureVariant =
  "insurers" | "compare" | "pdf" | "whitelabel";

type MultiCotizadorFeatureAnimationProps = {
  variant: MultiCotizadorFeatureVariant;
  labels: Pick<MultiCotizadorFlowLabels, "quotes" | "pdfLabel" | "policyLabel">;
};

const INSURERS = [
  "AXA",
  "GNP",
  "HDI",
  "MAPFRE",
  "Quálitas",
  "Chubb",
  "Zurich",
  "TuMomento",
];

export default function MultiCotizadorFeatureAnimation({
  variant,
  labels,
}: MultiCotizadorFeatureAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const reduceMotion = useReducedMotion();
  const active = reduceMotion || isInView;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-violet-200/70 bg-violet-50/40 p-3"
    >
      {variant === "insurers" && (
        <div className="grid w-full max-w-[240px] grid-cols-4 gap-1.5">
          {INSURERS.map((name, index) => (
            <motion.div
              key={name}
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.92 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="rounded border border-violet-100 bg-white px-1 py-1.5 text-center font-mono text-[7px] font-semibold uppercase tracking-wide text-violet-700"
            >
              {name}
            </motion.div>
          ))}
        </div>
      )}

      {variant === "compare" && (
        <>
          <PulseRing active={active && !reduceMotion} />
          <div className="relative z-10 w-full max-w-[240px]">
            <QuoteGrid visible={active} quotes={labels.quotes} />
          </div>
        </>
      )}

      {variant === "pdf" && (
        <div className="flex flex-col items-center gap-2">
          <PdfBadge visible={active} label={labels.pdfLabel} />
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[7px] text-violet-500"
          >
            email · branded
          </motion.div>
        </div>
      )}

      {variant === "whitelabel" && (
        <div className="flex w-full max-w-[220px] flex-col gap-2">
          <motion.div
            initial={false}
            animate={{
              borderColor: active
                ? ["#DDD6FE", "#6D28D9", "#DDD6FE"]
                : "#DDD6FE",
            }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="rounded border-2 border-dashed bg-white px-3 py-4 text-center"
          >
            <motion.div
              animate={
                active && !reduceMotion ? { scale: [1, 1.05, 1] } : undefined
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="font-display text-sm font-bold text-primary"
            >
              TU MARCA
            </motion.div>
            <div className="mt-1 font-mono text-[7px] text-stone-400">
              logo · colores · copy
            </div>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            className="rounded bg-stone-100 px-2 py-1 text-center font-mono text-[7px] text-stone-500"
          >
            admin · usuarios · credenciales
          </motion.div>
        </div>
      )}
    </div>
  );
}
