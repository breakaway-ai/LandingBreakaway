import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";
import { SERVICES, getServiceBySlug } from "@/config/services";
import { SITE_NAME } from "@/config/site";
import { routing } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SERVICES.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "services" });

  return {
    title: `${t(service.titleKey)} · ${SITE_NAME}`,
    description: t(service.descKey),
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}
