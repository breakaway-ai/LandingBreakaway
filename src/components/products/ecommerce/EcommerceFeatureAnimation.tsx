"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  ModalityBadge,
  ProductCard,
  ShipmentTracker,
  StripeCheckout,
  type EcommerceFlowLabels,
} from "./EcommerceMockUi";

export type EcommerceFeatureVariant = "modalidades" | "stripe" | "envios" | "admin";

type EcommerceFeatureAnimationProps = {
  variant: EcommerceFeatureVariant;
  labels: Pick<
    EcommerceFlowLabels,
    | "compra"
    | "renta"
    | "suscripcion"
    | "stripe"
    | "total"
    | "envio"
    | "tracking"
    | "entregado"
    | "amount"
    | "trackingNumber"
    | "stripeHint"
    | "admin"
  >;
};

const ADMIN_MODULES = ["Catálogo", "Ventas", "Rentas", "Suscripciones"];

export default function EcommerceFeatureAnimation({
  variant,
  labels,
}: EcommerceFeatureAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });
  const reduceMotion = useReducedMotion();
  const active = reduceMotion || isInView;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-blue-200/70 bg-blue-50/30 p-3"
    >
      {variant === "modalidades" && (
        <div className="w-full max-w-[240px] space-y-2">
          <div className="grid grid-cols-3 gap-1.5">
            <ProductCard visible={active} index={0} badge={labels.compra} />
            <ProductCard visible={active} index={1} badge={labels.renta} />
            <ProductCard visible={active} index={2} badge={labels.suscripcion} />
          </div>
          <div className="grid grid-cols-3 gap-1">
            <ModalityBadge label={labels.compra} variant="compra" visible={active} index={0} />
            <ModalityBadge label={labels.renta} variant="renta" visible={active} index={1} />
            <ModalityBadge
              label={labels.suscripcion}
              variant="suscripcion"
              visible={active}
              index={2}
            />
          </div>
        </div>
      )}

      {variant === "stripe" && (
        <div className="w-full max-w-[220px]">
          <StripeCheckout
            visible={active}
            label={labels.stripe}
            totalLabel={labels.total}
            amount={labels.amount}
          />
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-center font-mono text-[7px] text-indigo-500"
          >
            {labels.stripeHint}
          </motion.div>
        </div>
      )}

      {variant === "envios" && (
        <div className="w-full max-w-[220px]">
          <ShipmentTracker
            visible={active}
            envioLabel={labels.envio}
            trackingLabel={labels.tracking}
            tracking={labels.trackingNumber}
            entregadoLabel={labels.entregado}
          />
        </div>
      )}

      {variant === "admin" && (
        <div className="w-full max-w-[220px] space-y-2">
          <motion.div
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            className="font-mono text-[8px] font-semibold uppercase tracking-wider text-[#4C7BB3]"
          >
            {labels.admin}
          </motion.div>
          <div className="grid grid-cols-2 gap-1.5">
            {ADMIN_MODULES.map((mod, index) => (
              <motion.div
                key={mod}
                initial={false}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 4 }}
                transition={{ delay: index * 0.07 }}
                className="rounded border border-blue-100 bg-white px-2 py-1.5 font-mono text-[7px] text-stone-700"
              >
                {mod}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
