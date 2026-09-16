import { ORGANIZATION_JSON_LD, SITE_NAME, SITE_URL } from "@/config/site";

export type JsonLdObject = Record<string, unknown>;

export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data);
}

export function organizationJsonLd(): JsonLdObject {
  return { ...ORGANIZATION_JSON_LD };
}

type WebSiteJsonLdParams = {
  locale: string;
};

export function websiteJsonLd({ locale }: WebSiteJsonLdParams): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

type ServiceJsonLdParams = {
  name: string;
  description: string;
  url: string;
};

export function serviceJsonLd({
  name,
  description,
  url,
}: ServiceJsonLdParams): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },
  };
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function breadcrumbListJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
