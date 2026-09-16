"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { EcommerceFlowLabels } from "./EcommerceMockUi";

type EcommercePipelineAnimationProps = {
  activeStep: number;
  staticMode?: boolean;
  labels: EcommerceFlowLabels;
};

const NODE_COLORS = ["#4C7BB3", "#6366F1", "#059669"] as const;

function PipelineIcon({ step }: { step: number }) {
  if (step === 0) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="5" width="7" height="9" rx="1" />
        <rect x="14" y="5" width="7" height="9" rx="1" />
        <rect x="8" y="16" width="8" height="3" rx="0.5" />
      </svg>
    );
  }
  if (step === 1) {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="4" y="6" width="16" height="12" rx="2" />
        <line x1="4" y1="10" x2="20" y2="10" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="8" width="13" height="8" rx="1" />
      <path d="M14 12h4l3 3v-2l-3-3" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}

function StepDetail({
  step,
  active,
  labels,
}: {
  step: number;
  active: boolean;
  labels: EcommerceFlowLabels;
}) {
  if (!active) return <div className="h-[72px]" />;

  if (step === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-1"
      >
        {[labels.compra, labels.renta, labels.suscripcion].map((tag, i) => (
          <span
            key={tag}
            className={`rounded border px-1.5 py-0.5 font-mono text-[7px] ${
              i === 0
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : i === 1
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-amber-200 bg-amber-50 text-amber-700"
            }`}
          >
            {tag}
          </span>
        ))}
      </motion.div>
    );
  }

  if (step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-mono text-[8px] text-indigo-700"
      >
        <span className="rounded bg-indigo-600 px-1.5 py-0.5 text-[7px] font-bold text-white">
          Stripe
        </span>
        <div className="mt-1 tabular-nums text-stone-600">
          {labels.total}: {labels.amount}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center font-mono text-[8px] text-emerald-700"
    >
      <div>
        {labels.tracking}: {labels.trackingNumber}
      </div>
      <div className="mt-0.5 font-semibold uppercase">{labels.entregado}</div>
    </motion.div>
  );
}

export default function EcommercePipelineAnimation({
  activeStep,
  staticMode = false,
  labels,
}: EcommercePipelineAnimationProps) {
  const reduceMotion = useReducedMotion();
  const isStatic = staticMode || reduceMotion;
  const step = isStatic ? 2 : activeStep;

  const phaseLabels: [string, string, string] = [
    labels.phaseCatalogo,
    labels.phaseCheckout,
    labels.phaseGestion,
  ];

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-4xl py-2">
      <div className="mb-6 flex items-center justify-between font-mono text-[10px] text-stone-500">
        <span>{labels.pedido}</span>
        <span className="text-[#4C7BB3]">{phaseLabels[step]}</span>
      </div>

      <div className="relative grid grid-cols-3 gap-2 sm:gap-4">
        {[0, 1, 2].map((index) => {
          const isActive = index === step;
          const isDone = index < step;
          const color = NODE_COLORS[index];

          return (
            <div key={index} className="relative flex flex-col items-center">
              {index < 2 && (
                <div className="pointer-events-none absolute left-[calc(50%+1.5rem)] top-7 hidden h-px w-[calc(100%-3rem)] sm:block">
                  <div className="h-full bg-stone-200" />
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full origin-left bg-gradient-to-r from-[#4C7BB3] to-[#6366F1]"
                    initial={false}
                    animate={{
                      scaleX: isDone
                        ? 1
                        : isActive && index === step - 1
                          ? 1
                          : 0,
                      opacity:
                        isDone || (isActive && index === 0 && step >= 1)
                          ? 1
                          : 0.3,
                    }}
                    style={{ width: "100%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  {!isStatic && isActive && index === step - 1 && (
                    <motion.div
                      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#4C7BB3]"
                      animate={{ left: ["0%", "100%"] }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>
              )}

              <motion.div
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 sm:h-16 sm:w-16"
                style={{
                  borderColor: isActive || isDone ? color : "#E7E5E4",
                  backgroundColor: isActive
                    ? `${color}12`
                    : isDone
                      ? color
                      : "white",
                  color: isDone ? "white" : isActive ? color : "#A8A29E",
                }}
                animate={
                  isActive && !isStatic ? { scale: [1, 1.06, 1] } : { scale: 1 }
                }
                transition={
                  isActive && !isStatic
                    ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
              >
                {isDone ? (
                  <span className="font-mono text-sm font-bold">✓</span>
                ) : (
                  <PipelineIcon step={index} />
                )}
              </motion.div>

              <span
                className="mt-3 max-w-[7rem] text-center font-mono text-[9px] uppercase tracking-wider sm:text-[10px]"
                style={{
                  color: isActive ? color : isDone ? "#57534E" : "#A8A29E",
                }}
              >
                {phaseLabels[index]}
              </span>

              <div className="mt-3 min-h-[72px] w-full max-w-[140px]">
                <StepDetail step={index} active={isActive} labels={labels} />
              </div>
            </div>
          );
        })}
      </div>

      {!isStatic && (
        <motion.div
          className="mx-auto mt-4 h-1 max-w-md overflow-hidden rounded-full bg-stone-200"
          initial={false}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#4C7BB3] via-[#6366F1] to-[#059669]"
            animate={{ width: `${((step + 1) / 3) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </div>
  );
}
