"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  ComparableCard,
  DocStack,
  HomologacionRow,
  MockField,
  ScanLine,
  SearchRing,
  type AvaluosFlowLabels,
} from "./AvaluosMockUi";

export type AvaluosFeatureVariant =
  "catastro" | "comparables" | "homologacion" | "docs";

type AvaluosFeatureAnimationProps = {
  variant: AvaluosFeatureVariant;
  labels: Pick<
    AvaluosFlowLabels,
    | "claveCatastral"
    | "terreno"
    | "construccion"
    | "homologacion"
    | "avaluoFinal"
    | "entregado"
    | "oferta1"
    | "oferta2"
    | "oferta3"
  >;
};

export default function AvaluosFeatureAnimation({
  variant,
  labels,
}: AvaluosFeatureAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const reduceMotion = useReducedMotion();
  const active = reduceMotion || isInView;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-stone-200/70 bg-stone-50/80 p-3"
    >
      {variant === "catastro" && (
        <>
          <ScanLine active={active && !reduceMotion} />
          <div className="relative z-10 grid w-full max-w-[220px] grid-cols-2 gap-2">
            <MockField
              label={labels.claveCatastral}
              value="09-015-012…"
              visible={active}
            />
            <MockField
              label={labels.terreno}
              value="420 m²"
              visible={active}
              accent="emerald"
            />
            <motion.div
              className="col-span-2 rounded border border-dashed border-stone-300 bg-white/80 px-2 py-3 text-center font-mono text-[8px] text-stone-500"
              animate={
                active && !reduceMotion
                  ? { borderColor: ["#D6D3D1", "#A78BFA", "#D6D3D1"] }
                  : undefined
              }
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              catastro.png → IA
            </motion.div>
            <MockField
              label={labels.construccion}
              value="186 m²"
              visible={active}
              accent="blue"
            />
          </div>
        </>
      )}

      {variant === "comparables" && (
        <>
          <SearchRing active={active && !reduceMotion} />
          <div className="relative z-10 w-full max-w-[240px] space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              <ComparableCard
                price={labels.oferta1}
                index={0}
                visible={active}
                highlight
              />
              <ComparableCard
                price={labels.oferta2}
                index={1}
                visible={active}
              />
              <ComparableCard
                price={labels.oferta3}
                index={2}
                visible={active}
              />
            </div>
            <motion.div
              initial={false}
              animate={{ opacity: active ? 1 : 0 }}
              className="text-center font-mono text-[7px] uppercase tracking-wider text-emerald-600"
            >
              RSMA v2.0 · Inmuebles24
            </motion.div>
          </div>
        </>
      )}

      {variant === "homologacion" && (
        <div className="w-full max-w-[240px]">
          <HomologacionRow visible={active} label={labels.homologacion} />
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
            transition={{ delay: 0.35 }}
            className="mt-2 rounded border border-violet-200 bg-white px-2 py-1.5 text-center font-mono text-[9px] font-semibold tabular-nums text-violet-800"
          >
            V.U.R. · $28,450/m²
          </motion.div>
        </div>
      )}

      {variant === "docs" && (
        <div className="flex w-full max-w-[220px] flex-col items-center gap-2">
          <DocStack
            visible={active}
            title={labels.avaluoFinal}
            deliveredLabel={labels.entregado}
          />
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: 0.25 }}
            className="font-mono text-[7px] text-stone-400"
          >
            Drive · Docs · Sheets
          </motion.div>
        </div>
      )}
    </div>
  );
}
