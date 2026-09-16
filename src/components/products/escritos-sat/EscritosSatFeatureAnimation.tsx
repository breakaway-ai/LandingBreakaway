"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  DraftPreview,
  FolderTree,
  NumeralChip,
  PdfUpload,
  type EscritosSatFlowLabels,
} from "./EscritosSatMockUi";

export type EscritosSatFeatureVariant =
  "requerimiento" | "escrito" | "onedrive" | "ia";

type EscritosSatFeatureAnimationProps = {
  variant: EscritosSatFeatureVariant;
  labels: Pick<
    EscritosSatFlowLabels,
    | "requerimiento"
    | "numerales"
    | "numeral1"
    | "numeral2"
    | "numeral3"
    | "onedrive"
    | "borrador"
    | "listo"
  >;
};

export default function EscritosSatFeatureAnimation({
  variant,
  labels,
}: EscritosSatFeatureAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const reduceMotion = useReducedMotion();
  const active = reduceMotion || isInView;
  const numeralLabels = [labels.numeral1, labels.numeral2, labels.numeral3];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-sky-200/70 bg-sky-50/40 p-3"
    >
      {variant === "requerimiento" && (
        <div className="w-full max-w-[220px] space-y-2">
          <PdfUpload
            visible={active}
            label={labels.requerimiento}
            active={active && !reduceMotion}
          />
          <div className="flex flex-wrap gap-1">
            {numeralLabels.map((numeral, index) => (
              <NumeralChip
                key={numeral}
                label={numeral}
                index={index}
                visible={active}
              />
            ))}
          </div>
        </div>
      )}

      {variant === "escrito" && (
        <div className="w-full max-w-[220px]">
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            className="rounded border border-sky-200 bg-white p-2"
          >
            <div className="font-mono text-[7px] uppercase tracking-wider text-sky-600">
              Devolución IVA
            </div>
            <div className="mt-2 space-y-1">
              {["16%", "0%", "Acreditable"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, x: active ? 0 : 6 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded bg-sky-50 px-1.5 py-0.5 font-mono text-[7px] text-sky-800"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {variant === "onedrive" && (
        <div className="w-full max-w-[220px]">
          <FolderTree visible={active} rootLabel={labels.onedrive} />
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-center font-mono text-[7px] text-sky-500"
          >
            Microsoft 365 · sync
          </motion.div>
        </div>
      )}

      {variant === "ia" && (
        <div className="w-full max-w-[220px]">
          <DraftPreview
            visible={active}
            title={labels.borrador}
            statusLabel={labels.listo}
          />
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: 0.25 }}
            className="mt-2 text-center font-mono text-[7px] text-emerald-600"
          >
            {labels.numerales} · evidencia citada
          </motion.div>
        </div>
      )}
    </div>
  );
}
