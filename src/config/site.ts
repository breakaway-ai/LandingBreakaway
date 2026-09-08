export const SITE_URL = 'https://breakaway.work';
export const SITE_NAME = 'Breakaway';
export const OG_IMAGE_PATH = '/og-image.png';
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;

export const SEO_LOCALES = ['es', 'en'] as const;
export type SeoLocale = (typeof SEO_LOCALES)[number];

export const OG_LOCALE_MAP: Record<SeoLocale, string> = {
  es: 'es_MX',
  en: 'en_US',
};

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  email: 'general@breakaway.work',
  sameAs: ['https://www.linkedin.com/company/breakawayai'],
} as const;

export function absoluteUrl(path: string, locale?: SeoLocale): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;

  if (!locale) {
    return base || SITE_URL;
  }

  const separator = base.includes('?') ? '&' : '?';
  return `${base || SITE_URL}${separator}lng=${locale}`;
}
