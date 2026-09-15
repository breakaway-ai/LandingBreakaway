"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Product } from "@/config/products";
import ServiceIllustration from "@/components/services/ServiceIllustration";

type ProductHeroProps = {
  product: Product;
};

export default function ProductHero({ product }: ProductHeroProps) {
  const t = useTranslations();
  const detail = useTranslations(`productDetail.${product.detailKey}`);

  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
      <div className="pointer-events-none absolute -left-40 top-6 h-[440px] w-[440px] rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/products"
            className="label inline-flex shrink-0 items-center gap-2 text-primary transition-colors hover:text-primary-bright"
          >
            <ArrowLeft size={14} />
            {t("productPage.allProducts")}
          </Link>
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        <div className="mt-9 grid gap-10 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:order-1">
            <span className="label text-primary">{t("productPage.label")}</span>

            <h1 className="mt-4 text-[2.25rem] leading-[1.05] text-ink sm:text-5xl lg:text-[3.25rem]">
              {detail.rich("heroHeadline", {
                highlight: (chunks) => (
                  <span className="text-primary-bright">{chunks}</span>
                ),
              })}
            </h1>

            <p className="prose-mono mt-6">{detail("heroSubtitle")}</p>

            <p className="mt-5 font-mono text-[11px] text-ink-dim">
              {t(product.footerKey)}
            </p>
          </div>

          <ServiceIllustration
            src={product.svg}
            className="aspect-[4/3] lg:order-2 lg:aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
