import { routing, type AppLocale } from "@/i18n/routing";

export const SITE_URL = "https://breakaway.work";
export const SITE_NAME = "Breakaway";

export const WHATSAPP_PHONE = "524422041843";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`;

export const CONTACT_EMAIL = "general@breakaway.work";
export const CONTACT_PHONE = WHATSAPP_PHONE;
export const CONTACT_PHONE_DISPLAY = "+52 442 204 1843";
export const LINKEDIN_URL = "https://www.linkedin.com/company/breakawayai";
export const CONTACT_ADDRESS = [
  "Paseo del Cantil 125",
  "Real de Juriquilla, C.P. 76226",
  "Querétaro, México",
] as const;

export const SEO_LOCALES = routing.locales;
export type SeoLocale = AppLocale;

export const OG_LOCALE_MAP: Record<SeoLocale, string> = {
  es: "es_MX",
  en: "en_US",
};

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description:
    "Agentes de IA, automatización de procesos e integraciones CRM, ERP y WhatsApp para firmas de servicios profesionales en México.",
  email: CONTACT_EMAIL,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_ADDRESS[0],
    addressLocality: "Querétaro",
    addressRegion: "Querétaro",
    postalCode: "76226",
    addressCountry: "MX",
  },
  areaServed: {
    "@type": "Country",
    name: "Mexico",
  },
  knowsAbout: [
    "AI agents",
    "Process automation",
    "CRM integrations",
    "ERP integrations",
    "WhatsApp business automation",
    "Professional services operations",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT_PHONE_DISPLAY,
    email: CONTACT_EMAIL,
    contactType: "customer service",
    areaServed: "MX",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [LINKEDIN_URL],
} as const;

export const PUBLIC_PATHS = ["/", "/about", "/privacy", "/products"] as const;
export type PublicPath = (typeof PUBLIC_PATHS)[number];

export function localizedPath(
  path: PublicPath | "/thank-you",
  locale: SeoLocale,
): string {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function localizedDynamicPath(path: string, locale: SeoLocale): string {
  return `/${locale}${path}`;
}

export function absoluteUrl(
  path: PublicPath | "/thank-you",
  locale: SeoLocale,
): string {
  return `${SITE_URL}${localizedPath(path, locale)}`;
}

export function absoluteDynamicUrl(path: string, locale: SeoLocale): string {
  return `${SITE_URL}${localizedDynamicPath(path, locale)}`;
}
