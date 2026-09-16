import type { EcommerceFlowLabels } from "./EcommerceMockUi";

type EcommerceAnimationTranslator = {
  (key: string): string;
};

export function getEcommerceAnimationLabels(
  t: EcommerceAnimationTranslator,
): EcommerceFlowLabels {
  return {
    phaseCatalogo: t("flowPhaseCatalogo"),
    phaseCheckout: t("flowPhaseCheckout"),
    phaseGestion: t("flowPhaseGestion"),
    pedido: t("flowPedido"),
    compra: t("flowCompra"),
    renta: t("flowRenta"),
    suscripcion: t("flowSuscripcion"),
    stripe: t("flowStripe"),
    envio: t("flowEnvio"),
    tracking: t("flowTracking"),
    entregado: t("flowEntregado"),
    total: t("flowTotal"),
    amount: t("flowAmount"),
    trackingNumber: t("flowTrackingNumber"),
    stripeHint: t("flowStripeHint"),
    admin: t("flowAdmin"),
  };
}
