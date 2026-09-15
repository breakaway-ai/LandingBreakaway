import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/config/products";
import { SERVICES } from "@/config/services";
import {
  PUBLIC_PATHS,
  SEO_LOCALES,
  SITE_URL,
  absoluteUrl,
  type PublicPath,
  type SeoLocale,
} from "@/config/site";

const LOCALIZED_PATHS = [
  "/services",
  ...SERVICES.map((service) => `/services/${service.slug}`),
  "/products",
  ...PRODUCTS.map((product) => `/products/${product.slug}`),
] as const;

function localizedPathUrl(path: string, locale: SeoLocale): string {
  return `${SITE_URL}/${locale}${path}`;
}

function sitemapEntry({
  url,
  path,
}: {
  url: string;
  path: string;
}): MetadataRoute.Sitemap[number] {
  return {
    url,
    changeFrequency:
      path === "/" ? "weekly" : path === "/privacy" ? "yearly" : "monthly",
    priority: path === "/" ? 1 : path === "/privacy" ? 0.3 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        SEO_LOCALES.map((lng) => [
          lng,
          LOCALIZED_PATHS.includes(path as (typeof LOCALIZED_PATHS)[number])
            ? localizedPathUrl(path, lng)
            : absoluteUrl(path as PublicPath, lng),
        ]),
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PUBLIC_PATHS) {
    for (const locale of SEO_LOCALES) {
      entries.push(
        sitemapEntry({
          path,
          url: absoluteUrl(path, locale),
        }),
      );
    }
  }

  for (const path of LOCALIZED_PATHS) {
    for (const locale of SEO_LOCALES) {
      entries.push(
        sitemapEntry({
          path,
          url: localizedPathUrl(path, locale),
        }),
      );
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
