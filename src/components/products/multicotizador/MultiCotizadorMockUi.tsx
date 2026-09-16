"use client";

import { motion } from "framer-motion";

export type MultiCotizadorFlowLabels = {
  phaseDatos: string;
  phaseComparar: string;
  phaseEmitir: string;
  cotizacion: string;
  vehiculo: string;
  placa: string;
  formLabel: string;
  policyLabel: string;
  emitida: string;
  pdfLabel: string;
  quotes: string[];
};

const INSURER_CODES = ["AXA", "GNP", "HDI", "MAP", "Qui", "ZUR"];

export function MockSidebar() {
  return (
    <div className="flex w-9 shrink-0 flex-col border-r border-violet-200/70 bg-white py-3">
      <div className="px-2 font-mono text-[9px] font-bold tracking-tight text-primary">
        MC
      </div>
      <div className="mt-4 space-y-2 px-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${i === 0 ? "w-full bg-primary" : "w-3/4 bg-violet-100"}`}
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
  const colors = ["#6D28D9", "#7C3AED", "#059669"];

  return (
    <div className={`flex items-center ${compact ? "gap-1" : "gap-1.5"}`}>
      {labels.map((label, index) => {
        const isActive = index === activeIndex;
        const isDone = index < activeIndex;
        const color = colors[index] ?? colors[0];

        return (
          <div key={label} className="flex flex-1 items-center gap-1">
            <motion.div
              className="relative flex flex-1 flex-col items-center gap-1"
              animate={{ opacity: isActive || isDone ? 1 : 0.45 }}
            >
              <motion.div
                className="flex h-5 w-5 items-center justify-center rounded-full border text-[8px] font-semibold"
                style={{
                  borderColor: isActive || isDone ? color : "#DDD6FE",
                  backgroundColor: isDone
                    ? color
                    : isActive
                      ? `${color}18`
                      : "white",
                  color: isDone ? "white" : isActive ? color : "#A78BFA",
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
                  style={{ color: isActive ? color : "#78716C" }}
                >
                  {label}
                </span>
              )}
            </motion.div>
            {index < labels.length - 1 && (
              <div
                className="mb-3 h-px flex-1"
                style={{
                  background: isDone
                    ? `linear-gradient(90deg, ${color}, ${colors[index + 1]})`
                    : "#EDE9FE",
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
}: {
  label: string;
  value: string;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="rounded border border-violet-200/70 bg-white px-2 py-1.5"
    >
      <div className="font-mono text-[7px] uppercase tracking-wider text-violet-500">
        {label}
      </div>
      <div className="mt-0.5 font-mono text-[10px] font-semibold tabular-nums text-stone-800">
        {value}
      </div>
    </motion.div>
  );
}

export function QuoteCard({
  insurer,
  price,
  index,
  visible,
  highlight,
}: {
  insurer: string;
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
        y: visible ? 0 : 8,
        scale: highlight ? 1.03 : 1,
      }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`rounded border px-1.5 py-1.5 text-center ${
        highlight
          ? "border-primary bg-primary-wash shadow-sm ring-1 ring-primary/20"
          : "border-violet-100 bg-white"
      }`}
    >
      <div className="font-mono text-[7px] font-semibold uppercase tracking-wider text-violet-600">
        {insurer}
      </div>
      <div
        className={`mt-0.5 font-mono text-[9px] font-bold tabular-nums ${
          highlight ? "text-primary" : "text-stone-800"
        }`}
      >
        {price}
      </div>
    </motion.div>
  );
}

export function QuoteGrid({
  visible,
  quotes,
  highlightIndex = 4,
}: {
  visible: boolean;
  quotes: string[];
  highlightIndex?: number;
}) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {INSURER_CODES.map((insurer, index) => (
        <QuoteCard
          key={insurer}
          insurer={insurer}
          price={quotes[index] ?? quotes[0]}
          index={index}
          visible={visible}
          highlight={index === highlightIndex}
        />
      ))}
    </div>
  );
}

export function PolicyCard({
  visible,
  title,
  statusLabel,
}: {
  visible: boolean;
  title: string;
  statusLabel: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.96 }}
      transition={{ duration: 0.4 }}
      className="rounded border border-emerald-200/80 bg-emerald-50/80 p-2.5"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono text-[9px] font-semibold text-stone-800">
          {title}
        </div>
        <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wider text-white">
          {statusLabel}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-emerald-100">
        <motion.div
          className="h-full rounded-full bg-emerald-500"
          initial={false}
          animate={{ width: visible ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export function PdfBadge({
  visible,
  label,
}: {
  visible: boolean;
  label: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 8 }}
      transition={{ duration: 0.35, delay: 0.15 }}
      className="inline-flex items-center gap-1.5 rounded border border-violet-200 bg-white px-2 py-1"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3 text-red-500"
        fill="currentColor"
      >
        <path d="M4 1h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
      </svg>
      <span className="font-mono text-[8px] font-medium text-stone-700">
        {label}
      </span>
    </motion.div>
  );
}

export function PulseRing({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
      animate={{ scale: [0.5, 1.4], opacity: [0.6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
    />
  );
}
