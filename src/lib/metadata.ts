import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getProductBySlug } from "@/config/products";
import {
  OG_LOCALE_MAP,
  SEO_LOCALES,
  SITE_NAME,
  absoluteDynamicUrl,
  absoluteUrl,
  type PublicPath,
  type SeoLocale,
} from "@/config/site";

type SeoPage =
  "home" | "about" | "contact" | "privacy" | "thankYou" | "products";

const PAGE_PATHS: Record<SeoPage, PublicPath | "/thank-you"> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  thankYou: "/thank-you",
  products: "/products",
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

export async function buildProductMetadata({
  locale,
  slug,
}: {
  locale: SeoLocale;
  slug: string;
}): Promise<Metadata> {
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const path = `/products/${slug}`;
  const t = await getTranslations({
    locale,
    namespace: `seo.products.${slug}`,
  });
  const pageUrl = absoluteDynamicUrl(path, locale);

  const languages = Object.fromEntries(
    SEO_LOCALES.map((lng) => [lng, absoluteDynamicUrl(path, lng)]),
  );
  languages["x-default"] = absoluteDynamicUrl(path, routingDefaultLocale());

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
  };
}

function routingDefaultLocale(): SeoLocale {
  return "es";
}
