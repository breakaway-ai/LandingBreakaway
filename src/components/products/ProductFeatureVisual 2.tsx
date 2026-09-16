"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import AvaluosFeatureAnimation, {
  type AvaluosFeatureVariant,
} from "@/components/products/avaluos/AvaluosFeatureAnimation";
import { getAvaluosAnimationLabels } from "@/components/products/avaluos/avaluosAnimationLabels";
import EcommerceFeatureAnimation, {
  type EcommerceFeatureVariant,
} from "@/components/products/ecommerce/EcommerceFeatureAnimation";
import { getEcommerceAnimationLabels } from "@/components/products/ecommerce/ecommerceAnimationLabels";
import EscritosSatFeatureAnimation, {
  type EscritosSatFeatureVariant,
} from "@/components/products/escritos-sat/EscritosSatFeatureAnimation";
import { getEscritosSatAnimationLabels } from "@/components/products/escritos-sat/escritosSatAnimationLabels";
import MultiCotizadorFeatureAnimation, {
  type MultiCotizadorFeatureVariant,
} from "@/components/products/multicotizador/MultiCotizadorFeatureAnimation";
import { getMultiCotizadorAnimationLabels } from "@/components/products/multicotizador/multicotizadorAnimationLabels";
import type { ProductAnimationId, ProductSlug } from "@/config/products";

const AVALUOS_VARIANTS: AvaluosFeatureVariant[] = [
  "catastro",
  "comparables",
  "homologacion",
  "docs",
];

const MULTI_VARIANTS: MultiCotizadorFeatureVariant[] = [
  "insurers",
  "compare",
  "pdf",
  "whitelabel",
];

const SAT_VARIANTS: EscritosSatFeatureVariant[] = [
  "requerimiento",
  "escrito",
  "onedrive",
  "ia",
];

const ECOMMERCE_VARIANTS: EcommerceFeatureVariant[] = [
  "modalidades",
  "stripe",
  "envios",
  "admin",
];

type ProductFeatureVisualProps = {
  slug: ProductSlug;
  index: number;
  featureSvgs: readonly string[];
  featureAnimation?: ProductAnimationId;
};

export default function ProductFeatureVisual({
  slug,
  index,
  featureSvgs,
  featureAnimation,
}: ProductFeatureVisualProps) {
  const t = useTranslations(`products.${slug}`);

  if (featureAnimation === "avaluos") {
    return (
      <AvaluosFeatureAnimation
        variant={AVALUOS_VARIANTS[index] ?? "catastro"}
        labels={getAvaluosAnimationLabels(t)}
      />
    );
  }

  if (featureAnimation === "multicotizador") {
    return (
      <MultiCotizadorFeatureAnimation
        variant={MULTI_VARIANTS[index] ?? "insurers"}
        labels={getMultiCotizadorAnimationLabels(t)}
      />
    );
  }

  if (featureAnimation === "escritos-sat") {
    return (
      <EscritosSatFeatureAnimation
        variant={SAT_VARIANTS[index] ?? "requerimiento"}
        labels={getEscritosSatAnimationLabels(t)}
      />
    );
  }

  if (featureAnimation === "ecommerce") {
    return (
      <EcommerceFeatureAnimation
        variant={ECOMMERCE_VARIANTS[index] ?? "modalidades"}
        labels={getEcommerceAnimationLabels(t)}
      />
    );
  }

  return (
    <Image
      src={featureSvgs[index] ?? featureSvgs[0]}
      alt=""
      aria-hidden="true"
      fill
      sizes="(max-width: 640px) 100vw, 50vw"
      className="object-contain"
    />
  );
}
