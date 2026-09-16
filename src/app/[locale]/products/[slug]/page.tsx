import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import ProductSoftwareJsonLd from "@/components/products/ProductSoftwareJsonLd";
import {
  PRODUCTS,
  getProductBySlug,
  isLandingProduct,
} from "@/config/products";
import { buildProductMetadata } from "@/lib/metadata";
import { routing, type AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCTS.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  return buildProductMetadata({
    locale: locale as AppLocale,
    slug,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || !isLandingProduct(product)) {
    notFound();
  }

  return (
    <>
      <ProductSoftwareJsonLd locale={locale} slug={product.slug} />
      <ProductDetailPage product={product} />
    </>
  );
}
