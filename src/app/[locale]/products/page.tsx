import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProductsIndexPage from "@/components/pages/ProductsIndexPage";
import {
  OG_LOCALE_MAP,
  SEO_LOCALES,
  SITE_NAME,
  SITE_URL,
  type SeoLocale,
} from "@/config/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function productsUrl(locale: SeoLocale): string {
  return `${SITE_URL}/${locale}/products`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.products" });
  const pageUrl = productsUrl(locale as SeoLocale);

  const languages = Object.fromEntries(
    SEO_LOCALES.map((lng) => [lng, productsUrl(lng)]),
  );
  languages["x-default"] = productsUrl("es");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pageUrl,
      languages,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      locale: OG_LOCALE_MAP[locale as SeoLocale],
      alternateLocale: SEO_LOCALES.filter((lng) => lng !== locale).map(
        (lng) => OG_LOCALE_MAP[lng],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function Page({ params }: PageProps) {
  await params;
  return <ProductsIndexPage />;
}
