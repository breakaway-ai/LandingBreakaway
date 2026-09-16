import type { AvaluosFlowLabels } from "./AvaluosMockUi";

type AvaluosAnimationTranslator = {
  (key: string): string;
  raw: (key: string) => unknown;
};

export function getAvaluosAnimationLabels(t: AvaluosAnimationTranslator): AvaluosFlowLabels {
  return {
    phaseCatastro: t("flowPhaseCatastro"),
    phaseComparables: t("flowPhaseComparables"),
    phaseEntrega: t("flowPhaseEntrega"),
    claveCatastral: t("flowClaveCatastral"),
    terreno: t("flowTerreno"),
    construccion: t("flowConstruccion"),
    homologacion: t("flowHomologacion"),
    avaluoFinal: t("flowAvaluoFinal"),
    entregado: t("flowEntregado"),
    tramite: t("flowTramite"),
    oferta1: t("flowOferta1"),
    oferta2: t("flowOferta2"),
    oferta3: t("flowOferta3"),
  };
}
