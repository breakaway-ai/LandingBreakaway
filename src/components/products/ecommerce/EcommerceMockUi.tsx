"use client";

import { motion } from "framer-motion";

export type EcommerceFlowLabels = {
  phaseCatalogo: string;
  phaseCheckout: string;
  phaseGestion: string;
  pedido: string;
  compra: string;
  renta: string;
  suscripcion: string;
  stripe: string;
  envio: string;
  tracking: string;
  entregado: string;
  total: string;
  amount: string;
  trackingNumber: string;
  stripeHint: string;
  admin: string;
};

export function ModalityBadge({
  label,
  variant,
  visible,
  index,
}: {
  label: string;
  variant: "compra" | "renta" | "suscripcion";
  visible: boolean;
  index: number;
}) {
  const styles = {
    compra: "border-[#4C7BB3]/30 bg-blue-50 text-[#4C7BB3]",
    renta: "border-emerald-200 bg-emerald-50 text-emerald-700",
    suscripcion: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className={`rounded border px-2 py-1.5 text-center ${styles[variant]}`}
    >
      <div className="font-mono text-[7px] uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

export function ProductCard({
  visible,
  index,
  badge,
}: {
  visible: boolean;
  index: number;
  badge: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className="rounded border border-stone-200 bg-white p-1.5"
    >
      <div className="aspect-[4/3] rounded bg-neutral-100" />
      <div className="mt-1 flex items-center justify-between gap-1">
        <div className="h-1 flex-1 rounded-full bg-stone-200" />
        <span className="rounded bg-blue-50 px-1 font-mono text-[6px] text-[#4C7BB3]">
          {badge}
        </span>
      </div>
    </motion.div>
  );
}

export function StripeCheckout({
  visible,
  label,
  totalLabel,
  amount,
}: {
  visible: boolean;
  label: string;
  totalLabel: string;
  amount: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.4 }}
      className="rounded border border-indigo-200/80 bg-indigo-50/50 p-2"
    >
      <div className="flex items-center justify-between">
        <div className="font-mono text-[8px] font-semibold text-indigo-800">
          {label}
        </div>
        <div className="rounded bg-indigo-600 px-1.5 py-0.5 font-mono text-[7px] font-bold text-white">
          Stripe
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[9px]">
        <span className="text-stone-500">{totalLabel}</span>
        <span className="font-bold tabular-nums text-stone-800">{amount}</span>
      </div>
      <motion.div className="mt-2 h-1 overflow-hidden rounded-full bg-indigo-100">
        <motion.div
          className="h-full rounded-full bg-indigo-500"
          animate={{ width: visible ? "100%" : "0%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

export function ShipmentTracker({
  visible,
  envioLabel,
  trackingLabel,
  tracking,
  entregadoLabel,
}: {
  visible: boolean;
  envioLabel: string;
  trackingLabel: string;
  tracking: string;
  entregadoLabel: string;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 8 }}
      transition={{ duration: 0.4 }}
      className="rounded border border-emerald-200/80 bg-emerald-50/60 p-2"
    >
      <div className="flex items-center gap-1.5">
        <svg
          viewBox="0 0 16 16"
          className="h-3 w-3 text-emerald-600"
          fill="currentColor"
        >
          <path d="M1 3h2v8H1V3zm3 0h8l2 2v6H4V3zm1 1v5h8V5H5zm9 7H2v1h12v-1z" />
        </svg>
        <span className="font-mono text-[8px] font-semibold text-emerald-800">
          {envioLabel}
        </span>
      </div>
      <div className="mt-1.5 font-mono text-[7px] text-stone-600">
        {trackingLabel}: {tracking}
      </div>
      <motion.span
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 0.25 }}
        className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase text-white"
      >
        {entregadoLabel}
      </motion.span>
    </motion.div>
  );
}

export function CartPulse({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <motion.div
      className="pointer-events-none absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#4C7BB3] font-mono text-[8px] font-bold text-white"
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 1.4, repeat: Infinity }}
    >
      3
    </motion.div>
  );
}
