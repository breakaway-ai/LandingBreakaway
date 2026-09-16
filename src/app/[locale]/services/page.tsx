import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicesIndexPage from "@/components/pages/ServicesIndexPage";
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

function servicesUrl(locale: SeoLocale): string {
  return `${SITE_URL}/${locale}/services`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.services" });
  const pageUrl = servicesUrl(locale as SeoLocale);

  const languages = Object.fromEntries(
    SEO_LOCALES.map((lng) => [lng, servicesUrl(lng)]),
  );
  languages["x-default"] = servicesUrl("es");

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
  return <ServicesIndexPage />;
}
