import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import { PRODUCTS, getProductBySlug } from "@/config/products";
import {
  OG_LOCALE_MAP,
  SEO_LOCALES,
  SITE_NAME,
  SITE_URL,
  type SeoLocale,
} from "@/config/site";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function productUrl(locale: SeoLocale, slug: string): string {
  return `${SITE_URL}/${locale}/products/${slug}`;
}

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
  const detail = await getTranslations({
    locale,
    namespace: `productDetail.${product.detailKey}`,
  });
  const pageUrl = productUrl(locale as SeoLocale, slug);
  const title = `${t(product.titleKey)} · ${SITE_NAME}`;

  const languages = Object.fromEntries(
    SEO_LOCALES.map((lng) => [lng, productUrl(lng, slug)]),
  );
  languages["x-default"] = productUrl("es", slug);

  return {
    title,
    description: detail("metaDescription"),
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: SITE_NAME,
      title,
      description: detail("metaDescription"),
      locale: OG_LOCALE_MAP[locale as SeoLocale],
      alternateLocale: SEO_LOCALES.filter((lng) => lng !== locale).map(
        (lng) => OG_LOCALE_MAP[lng],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: detail("metaDescription"),
    },
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
