import type { MultiCotizadorFlowLabels } from "./MultiCotizadorMockUi";

type MultiCotizadorAnimationTranslator = {
  (key: string): string;
  raw: (key: string) => unknown;
};

export function getMultiCotizadorAnimationLabels(
  t: MultiCotizadorAnimationTranslator,
): MultiCotizadorFlowLabels {
  return {
    phaseDatos: t("flowPhaseDatos"),
    phaseComparar: t("flowPhaseComparar"),
    phaseEmitir: t("flowPhaseEmitir"),
    cotizacion: t("flowCotizacion"),
    vehiculo: t("flowVehiculo"),
    placa: t("flowPlaca"),
    formLabel: t("flowFormLabel"),
    policyLabel: t("flowPolicyLabel"),
    emitida: t("flowEmitida"),
    pdfLabel: t("flowPdfLabel"),
    quotes: t.raw("flowQuotes") as string[],
  };
}
