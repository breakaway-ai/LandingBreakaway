import type { MetadataRoute } from 'next';
import { PUBLIC_PATHS, SEO_LOCALES, absoluteUrl } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PUBLIC_PATHS) {
    for (const locale of SEO_LOCALES) {
      entries.push({
        url: absoluteUrl(path, locale),
        changeFrequency: path === '/' ? 'weekly' : path === '/privacy' ? 'yearly' : 'monthly',
        priority: path === '/' ? 1 : path === '/privacy' ? 0.3 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            SEO_LOCALES.map((lng) => [lng, absoluteUrl(path, lng)]),
          ),
        },
      });
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
