import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  OG_LOCALE_MAP,
  SEO_LOCALES,
  SITE_NAME,
  absoluteUrl,
  type PublicPath,
  type SeoLocale,
} from "@/config/site";

type SeoPage = "home" | "about" | "privacy" | "thankYou";

const PAGE_PATHS: Record<SeoPage, PublicPath | "/thank-you"> = {
  home: "/",
  about: "/about",
  privacy: "/privacy",
  thankYou: "/thank-you",
};

export async function buildPageMetadata({
  locale,
  page,
  noindex = false,
}: {
  locale: SeoLocale;
  page: SeoPage;
  noindex?: boolean;
}): Promise<Metadata> {
  const path = PAGE_PATHS[page];
  const t = await getTranslations({ locale, namespace: `seo.${page}` });
  const pageUrl = absoluteUrl(path, locale);

  const languages = Object.fromEntries(
    SEO_LOCALES.map((lng) => [lng, absoluteUrl(path, lng)]),
  );
  languages["x-default"] = absoluteUrl(path, routingDefaultLocale());

  const metadata: Metadata = {
    title: t("title"),
    description: t("description"),
    alternates: noindex
      ? undefined
      : {
          canonical: pageUrl,
          languages,
        },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      locale: OG_LOCALE_MAP[locale],
      alternateLocale: SEO_LOCALES.filter((lng) => lng !== locale).map(
        (lng) => OG_LOCALE_MAP[lng],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };

  return metadata;
}

function routingDefaultLocale(): SeoLocale {
  return "es";
}
