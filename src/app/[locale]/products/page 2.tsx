import ProductsPage from "@/components/pages/ProductsPage";
import { buildPageMetadata } from "@/lib/metadata";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as AppLocale,
    page: "products",
  });
}

export default async function Page({ params }: PageProps) {
  await params;
  return <ProductsPage />;
}
