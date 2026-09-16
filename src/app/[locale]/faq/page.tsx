import FaqPage from "@/components/pages/FaqPage";
import { buildPageMetadata } from "@/lib/metadata";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as AppLocale,
    page: "faq",
  });
}

export default async function Page({ params }: PageProps) {
  await params;
  return <FaqPage />;
}
