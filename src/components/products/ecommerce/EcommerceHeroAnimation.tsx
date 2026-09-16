"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CartPulse,
  ModalityBadge,
  ProductCard,
  ShipmentTracker,
  StripeCheckout,
  type EcommerceFlowLabels,
} from "./EcommerceMockUi";

type EcommerceHeroAnimationProps = {
  labels: EcommerceFlowLabels;
  staticMode?: boolean;
};

const CYCLE_MS = 3200;

export default function EcommerceHeroAnimation({
  labels,
  staticMode = false,
}: EcommerceHeroAnimationProps) {
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
      className="relative h-full w-full overflow-hidden rounded-lg bg-blue-50/40"
    >
      <CartPulse active={!isStatic && activeScene === 0} />

      <div className="flex h-full min-h-[200px] flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-wider text-[#4C7BB3]/70">
              {labels.phaseCatalogo}
            </div>
            <div className="font-mono text-[11px] font-semibold text-stone-800">
              {labels.pedido}
            </div>
          </div>
          <div className="flex gap-1">
            {[labels.compra, labels.renta, labels.suscripcion].map((tag, i) => (
              <span
                key={tag}
                className={`rounded px-1 py-0.5 font-mono text-[6px] uppercase ${
                  i === activeScene % 3
                    ? "bg-[#4C7BB3] text-white"
                    : "bg-white text-stone-400"
                }`}
              >
                {tag.slice(0, 4)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-3 flex-1 overflow-hidden rounded-md border border-blue-200/70 bg-white p-2.5 sm:p-3">
          <motion.div
            key={activeScene}
            initial={isStatic ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {activeScene === 0 && (
              <div className="flex h-full flex-col gap-2">
                <div className="grid grid-cols-3 gap-1.5">
                  <ProductCard visible index={0} badge={labels.compra} />
                  <ProductCard visible index={1} badge={labels.renta} />
                  <ProductCard visible index={2} badge={labels.suscripcion} />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <ModalityBadge
                    label={labels.compra}
                    variant="compra"
                    visible
                    index={0}
                  />
                  <ModalityBadge
                    label={labels.renta}
                    variant="renta"
                    visible
                    index={1}
                  />
                  <ModalityBadge
                    label={labels.suscripcion}
                    variant="suscripcion"
                    visible
                    index={2}
                  />
                </div>
              </div>
            )}

            {activeScene === 1 && (
              <div className="flex h-full flex-col justify-center">
                <StripeCheckout
                  visible
                  label={labels.stripe}
                  totalLabel={labels.total}
                  amount={labels.amount}
                />
              </div>
            )}

            {activeScene === 2 && (
              <ShipmentTracker
                visible
                envioLabel={labels.envio}
                trackingLabel={labels.tracking}
                tracking={labels.trackingNumber}
                entregadoLabel={labels.entregado}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
