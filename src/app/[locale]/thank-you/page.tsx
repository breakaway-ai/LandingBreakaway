import { setRequestLocale } from "next-intl/server";
import SuccessPage from "@/components/pages/SuccessPage";
import { buildPageMetadata } from "@/lib/metadata";
import type { AppLocale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as AppLocale,
    page: "thankYou",
    noindex: true,
  });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SuccessPage />;
}
