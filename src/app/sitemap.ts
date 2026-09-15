import type { MetadataRoute } from "next";
import { SERVICES } from "@/config/services";
import {
  PUBLIC_PATHS,
  SEO_LOCALES,
  SITE_URL,
  absoluteUrl,
  type PublicPath,
  type SeoLocale,
} from "@/config/site";

const SERVICE_PATHS = [
  "/services",
  ...SERVICES.map((service) => `/services/${service.slug}`),
] as const;

function localizedServiceUrl(path: string, locale: SeoLocale): string {
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
          path.startsWith("/services")
            ? localizedServiceUrl(path, lng)
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

  for (const path of SERVICE_PATHS) {
    for (const locale of SEO_LOCALES) {
      entries.push(
        sitemapEntry({
          path,
          url: localizedServiceUrl(path, locale),
        }),
      );
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
