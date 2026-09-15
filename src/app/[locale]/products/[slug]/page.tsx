import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { PRODUCTS, getProductBySlug } from "@/config/products";
import { SITE_NAME } from "@/config/site";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCTS.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const t = await getTranslations({ locale });

  return {
    title: `${t(product.titleKey)} · ${SITE_NAME}`,
    description: t(product.descKey),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
