import { routing, type AppLocale } from '@/i18n/routing';

export const SITE_URL = 'https://breakaway.work';
export const SITE_NAME = 'Breakaway';

export const SEO_LOCALES = routing.locales;
export type SeoLocale = AppLocale;

export const OG_LOCALE_MAP: Record<SeoLocale, string> = {
  es: 'es_MX',
  en: 'en_US',
};

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  email: 'general@breakaway.work',
  sameAs: ['https://www.linkedin.com/company/breakawayai'],
} as const;

export const PUBLIC_PATHS = ['/', '/about', '/privacy'] as const;
export type PublicPath = (typeof PUBLIC_PATHS)[number];

export function localizedPath(path: PublicPath | '/thank-you', locale: SeoLocale): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function absoluteUrl(path: PublicPath | '/thank-you', locale: SeoLocale): string {
  return `${SITE_URL}${localizedPath(path, locale)}`;
}
