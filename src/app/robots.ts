import type { MetadataRoute } from "next";
import { SEO_LOCALES, SITE_URL } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const disallow = SEO_LOCALES.flatMap((locale) => [`/${locale}/thank-you`]);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow,
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
