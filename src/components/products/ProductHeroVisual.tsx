"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import AvaluosHeroAnimation from "@/components/products/avaluos/AvaluosHeroAnimation";
import { getAvaluosAnimationLabels } from "@/components/products/avaluos/avaluosAnimationLabels";
import EcommerceHeroAnimation from "@/components/products/ecommerce/EcommerceHeroAnimation";
import { getEcommerceAnimationLabels } from "@/components/products/ecommerce/ecommerceAnimationLabels";
import EscritosSatHeroAnimation from "@/components/products/escritos-sat/EscritosSatHeroAnimation";
import { getEscritosSatAnimationLabels } from "@/components/products/escritos-sat/escritosSatAnimationLabels";
import MultiCotizadorHeroAnimation from "@/components/products/multicotizador/MultiCotizadorHeroAnimation";
import { getMultiCotizadorAnimationLabels } from "@/components/products/multicotizador/multicotizadorAnimationLabels";
import type { ProductAnimationId, ProductSlug } from "@/config/products";

type ProductHeroVisualProps = {
  slug: ProductSlug;
  heroSvg: string;
  heroAnimation?: ProductAnimationId;
};

export default function ProductHeroVisual({
  slug,
  heroSvg,
  heroAnimation,
}: ProductHeroVisualProps) {
  const t = useTranslations(`products.${slug}`);

  if (heroAnimation === "avaluos") {
    return <AvaluosHeroAnimation labels={getAvaluosAnimationLabels(t)} />;
  }

  if (heroAnimation === "multicotizador") {
    return <MultiCotizadorHeroAnimation labels={getMultiCotizadorAnimationLabels(t)} />;
  }

  if (heroAnimation === "escritos-sat") {
    return <EscritosSatHeroAnimation labels={getEscritosSatAnimationLabels(t)} />;
  }

  if (heroAnimation === "ecommerce") {
    return <EcommerceHeroAnimation labels={getEcommerceAnimationLabels(t)} />;
  }

  return (
    <Image
      src={heroSvg}
      alt={t("title")}
      fill
      priority
      sizes="(max-width: 1024px) 100vw, 45vw"
      className="object-contain"
    />
  );
}
