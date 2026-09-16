import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/config/site";
import type { ProductSlug } from "@/config/products";

type ProductSoftwareJsonLdProps = {
  locale: string;
  slug: ProductSlug;
};

export default async function ProductSoftwareJsonLd({
  locale,
  slug,
}: ProductSoftwareJsonLdProps) {
  const t = await getTranslations({
    locale,
    namespace: `products.${slug}`,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t("title"),
    description: t("description"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/${locale}/products/${slug}`,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/OnlineOnly",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
