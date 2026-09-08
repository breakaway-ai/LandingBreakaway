import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import {
  absoluteUrl,
  OG_IMAGE_URL,
  OG_LOCALE_MAP,
  ORGANIZATION_JSON_LD,
  SEO_LOCALES,
  type SeoLocale,
} from '../config/site';

type SeoPage = 'home' | 'about' | 'privacy' | 'thankYou';

type SeoHeadProps = {
  page: SeoPage;
  path: string;
  noindex?: boolean;
  includeOrganizationSchema?: boolean;
};

function resolveSeoLocale(language: string): SeoLocale {
  return language.startsWith('es') ? 'es' : 'en';
}

export default function SeoHead({
  page,
  path,
  noindex = false,
  includeOrganizationSchema = false,
}: SeoHeadProps) {
  const { t, i18n } = useTranslation();
  const locale = resolveSeoLocale(i18n.language);
  const title = t(`seo.${page}.title`);
  const description = t(`seo.${page}.description`);
  const canonicalUrl = absoluteUrl(path);
  const pageUrl = absoluteUrl(path, locale);
  const ogLocale = OG_LOCALE_MAP[locale];
  const alternateLocale = locale === 'es' ? 'en' : 'es';

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          {SEO_LOCALES.map((lng) => (
            <link
              key={lng}
              rel="alternate"
              hrefLang={lng}
              href={absoluteUrl(path, lng)}
            />
          ))}
          <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        </>
      )}

      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Breakaway" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={OG_LOCALE_MAP[alternateLocale]} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />

      {includeOrganizationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(ORGANIZATION_JSON_LD)}
        </script>
      )}
    </Helmet>
  );
}
