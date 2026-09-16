"use client";

import { motion } from "framer-motion";

export const PHASE_COLORS = [
  "#9CA3AF",
  "#3B82F6",
  "#8B5CF6",
  "#F59E0B",
  "#10B981",
  "#6366F1",
  "#059669",
] as const;

export type AvaluosFlowLabels = {
  phaseCatastro: string;
  phaseComparables: string;
  phaseEntrega: string;
  claveCatastral: string;
  terreno: string;
  construccion: string;
  homologacion: string;
  avaluoFinal: string;
  entregado: string;
  tramite: string;
  oferta1: string;
  oferta2: string;
  oferta3: string;
};

export function MockSidebar() {
  return (
    <div className="flex w-9 shrink-0 flex-col border-r border-stone-200/80 bg-white py-3">
      <div className="px-2 font-serif text-[10px] font-semibold tracking-tight text-stone-800">
        A.
      </div>
      <div className="mt-4 space-y-2 px-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${i === 0 ? "w-full bg-stone-700" : "w-3/4 bg-stone-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PhaseStepper({
  activeIndex,
  labels,
  compact = false,
}: {
  activeIndex: number;
  labels: [string, string, string];
  compact?: boolean;
}) {
  const phases = [
    { color: PHASE_COLORS[1], label: labels[0] },
    { color: PHASE_COLORS[2], label: labels[1] },
    { color: PHASE_COLORS[6], label: labels[2] },
  ];

  return (
    <div className={`flex items-center ${compact ? "gap-1" : "gap-1.5"}`}>
      {phases.map((phase, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;

        return (
          <div key={phase.label} className="flex flex-1 items-center gap-1">
            <motion.div
              className="relative flex flex-1 flex-col items-center gap-1"
              animate={{ opacity: isActive || isDone ? 1 : 0.45 }}
            >
              <motion.div
                className="flex h-5 w-5 items-center justify-center rounded-full border text-[8px] font-semibold"
                style={{
                  borderColor: isActive || isDone ? phase.color : "#D6D3D1",
                  backgroundColor: isDone ? phase.color : isActive ? `${phase.color}18` : "white",
                  color: isDone ? "white" : isActive ? phase.color : "#A8A29E",
                }}
                animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                transition={
                  isActive
                    ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
              >
                {isDone ? "✓" : index + 1}
              </motion.div>
              {!compact && (
                <span
                  className="max-w-[4.5rem] truncate text-center font-mono text-[7px] uppercase tracking-wider"
                  style={{ color: isActive ? phase.color : "#78716C" }}
                >
                  {phase.label}
                </span>
              )}
            </motion.div>
            {index < phases.length - 1 && (
              <div
                className="mb-3 h-px flex-1"
                style={{
                  background: isDone
                    ? `linear-gradient(90deg, ${phase.color}, ${phases[index + 1].color})`
                    : "#E7E5E4",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function MockField({
  label,
  value,
  visible,
  accent = "stone",
}: {
  label: string;
  value: string;
  visible: boolean;
  accent?: "emerald" | "blue" | "stone";
}) {
  const accentClass =
    accent === "emerald"
      ? "border-emerald-200/80 bg-emerald-50/80 text-emerald-800"
      : accent === "blue"
        ? "border-blue-200/80 bg-blue-50/80 text-blue-800"
        : "border-stone-200 bg-white text-stone-800";

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`rounded border px-2 py-1.5 ${accentClass}`}
    >
      <div className="font-mono text-[7px] uppercase tracking-wider opacity-70">{label}</div>
      <div className="mt-0.5 font-mono text-[10px] font-semibold tabular-nums">{value}</div>
    </motion.div>
  );
}

export function ComparableCard({
  price,
  index,
  visible,
  highlight,
}: {
  price: string;
  index: number;
  visible: boolean;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        x: visible ? 0 : 12,
        scale: highlight ? 1.02 : 1,
      }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={`rounded border px-2 py-1.5 ${
        highlight
          ? "border-emerald-300/80 bg-emerald-50/90 shadow-sm"
          : "border-stone-200 bg-white"
      }`}
      style={{ borderLeftWidth: highlight ? 3 : 1, borderLeftColor: highlight ? "#10B981" : undefined }}
    >
      <div className="font-mono text-[7px] uppercase tracking-wider text-stone-500">
        #{index + 1}
      </div>
      <div className="mt-0.5 font-mono text-[10px] font-semibold tabular-nums text-stone-800">
        {price}
      </div>
      <div className="mt-0.5 font-mono text-[7px] text-stone-400">m² · RSMA</div>
    </motion.div>
  );
}

export function HomologacionRow({ visible, label }: { visible: boolean; label: string }) {
  const factors = ["NEG", "UZ", "FA", "F.R."];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded border border-violet-200/70 bg-violet-50/50 p-2"
    >
      <div className="font-mono text-[7px] uppercase tracking-wider text-violet-700">{label}</div>
      <div className="mt-1.5 grid grid-cols-4 gap-1">
        {factors.map((factor, i) => (
          <motion.div
            key={factor}
            initial={false}
            animate={{
              opacity: visible ? 1 : 0,
              backgroundColor: visible ? (i === 3 ? "#EDE9FE" : "#FFFFFF") : "#FFFFFF",
            }}
            transition={{ delay: visible ? 0.15 + i * 0.07 : 0, duration: 0.25 }}
            className="rounded border border-violet-100 px-1 py-1 text-center font-mono text-[7px] text-violet-800"
          >
            {factor}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function DocStack({
  visible,
  title,
  deliveredLabel,
}: {
  visible: boolean;
  title: string;
  deliveredLabel: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.96 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="flex items-center gap-2"
    >
      <div className="relative">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded border border-stone-200 bg-white"
            style={{
              width: 28,
              height: 34,
              left: i * 4,
              top: i * 3,
              zIndex: i,
            }}
            animate={visible ? { y: [0, -2, 0] } : { y: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <div className="relative z-10 flex h-[34px] w-7 items-center justify-center rounded border border-indigo-200 bg-indigo-50">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-indigo-600" fill="currentColor">
            <path d="M4 1h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm4 0v3h3" />
          </svg>
        </div>
      </div>
      <div>
        <div className="font-mono text-[9px] font-semibold text-stone-800">{title}</div>
        <motion.span
          initial={false}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ delay: 0.3 }}
          className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wider text-emerald-700"
        >
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
          {deliveredLabel}
        </motion.span>
      </div>
    </motion.div>
  );
}

export function ScanLine({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-8 bg-gradient-to-b from-primary/0 via-primary/25 to-primary/0"
      animate={{ top: ["10%", "75%", "10%"] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function SearchRing({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <>
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-emerald-400/50"
          style={{ width: 40, height: 40, marginLeft: -20, marginTop: -20 }}
          animate={{ scale: [0.4, 1.3], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}
    </>
  );
}
