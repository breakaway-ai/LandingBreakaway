import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { SERVICES, getServiceBySlug } from "@/config/services";
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

function serviceUrl(locale: SeoLocale, slug: string): string {
  return `${SITE_URL}/${locale}/services/${slug}`;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICES.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const t = await getTranslations({ locale });
  const detail = await getTranslations({
    locale,
    namespace: `serviceDetail.${service.detailKey}`,
  });
  const pageUrl = serviceUrl(locale as SeoLocale, slug);
  const title = `${t(service.titleKey)} · ${SITE_NAME}`;

  const languages = Object.fromEntries(
    SEO_LOCALES.map((lng) => [lng, serviceUrl(lng, slug)]),
  );
  languages["x-default"] = serviceUrl("es", slug);

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
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
