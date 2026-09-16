"use client";

import { motion } from "framer-motion";

export type EscritosSatFlowLabels = {
  phaseUpload: string;
  phaseExpediente: string;
  phaseBorrador: string;
  expediente: string;
  requerimiento: string;
  numerales: string;
  onedrive: string;
  borrador: string;
  listo: string;
  numeral1: string;
  numeral2: string;
  numeral3: string;
};

export function MockSidebar() {
  return (
    <div className="flex w-9 shrink-0 flex-col border-r border-sky-200/70 bg-white py-3">
      <div className="px-1.5 font-mono text-[8px] font-bold leading-tight text-sky-700">
        SAT
      </div>
      <div className="mt-4 space-y-2 px-2.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1 rounded-full ${i === 0 ? "w-full bg-sky-600" : "w-3/4 bg-sky-100"}`}
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
  const colors = ["#2563EB", "#0284C7", "#059669"];

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
                  borderColor: isActive || isDone ? color : "#BAE6FD",
                  backgroundColor: isDone
                    ? color
                    : isActive
                      ? `${color}18`
                      : "white",
                  color: isDone ? "white" : isActive ? color : "#7DD3FC",
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
                    : "#E0F2FE",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PdfUpload({
  visible,
  label,
  active,
}: {
  visible: boolean;
  label: string;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded border border-dashed border-sky-300 bg-sky-50/60 px-2 py-3"
    >
      {active && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-6 bg-gradient-to-b from-sky-400/0 via-sky-400/25 to-sky-400/0"
          animate={{ top: ["5%", "80%", "5%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <div className="relative z-10 flex items-center gap-2">
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4 text-red-500"
          fill="currentColor"
        >
          <path d="M4 1h5l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        </svg>
        <div>
          <div className="font-mono text-[8px] font-semibold text-stone-800">
            {label}
          </div>
          <div className="font-mono text-[7px] text-sky-600">
            requerimiento.pdf
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function NumeralChip({
  label,
  index,
  visible,
}: {
  label: string;
  index: number;
  visible: boolean;
}) {
  return (
    <motion.span
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      className="inline-flex rounded border border-sky-200 bg-white px-1.5 py-0.5 font-mono text-[7px] text-sky-800"
    >
      {label}
    </motion.span>
  );
}

export function FolderTree({
  visible,
  rootLabel,
}: {
  visible: boolean;
  rootLabel: string;
}) {
  const folders = ["Anexo A", "Anexo B", "Soporte"];

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -8 }}
      transition={{ duration: 0.4 }}
      className="rounded border border-sky-200/80 bg-white p-2"
    >
      <div className="flex items-center gap-1.5 font-mono text-[8px] font-semibold text-sky-700">
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
          <path d="M1 3h5l1 1h8v9H1V3z" />
        </svg>
        {rootLabel}
      </div>
      <div className="mt-1.5 space-y-1 pl-3">
        {folders.map((folder, index) => (
          <motion.div
            key={folder}
            initial={false}
            animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -6 }}
            transition={{ delay: 0.1 + index * 0.08 }}
            className="flex items-center gap-1 font-mono text-[7px] text-stone-600"
          >
            <span className="text-sky-400">└</span>
            {folder}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function DraftPreview({
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
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.4 }}
      className="rounded border border-emerald-200/80 bg-emerald-50/60 p-2"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono text-[8px] font-semibold text-stone-800">
          {title}
        </div>
        <span className="rounded-full bg-emerald-600 px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wider text-white">
          {statusLabel}
        </span>
      </div>
      <div className="mt-2 space-y-1">
        {[0.95, 0.85, 0.7, 0.9].map((w, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ width: visible ? `${w * 100}%` : "0%" }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
            className="h-1 rounded-full bg-emerald-200"
          />
        ))}
      </div>
    </motion.div>
  );
}
