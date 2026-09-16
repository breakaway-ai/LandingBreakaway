import type { EscritosSatFlowLabels } from "./EscritosSatMockUi";

type EscritosSatAnimationTranslator = {
  (key: string): string;
};

export function getEscritosSatAnimationLabels(
  t: EscritosSatAnimationTranslator,
): EscritosSatFlowLabels {
  return {
    phaseUpload: t("flowPhaseUpload"),
    phaseExpediente: t("flowPhaseExpediente"),
    phaseBorrador: t("flowPhaseBorrador"),
    expediente: t("flowExpediente"),
    requerimiento: t("flowRequerimiento"),
    numerales: t("flowNumerales"),
    onedrive: t("flowOneDrive"),
    borrador: t("flowBorrador"),
    listo: t("flowListo"),
    numeral1: t("flowNumeral1"),
    numeral2: t("flowNumeral2"),
    numeral3: t("flowNumeral3"),
  };
}
