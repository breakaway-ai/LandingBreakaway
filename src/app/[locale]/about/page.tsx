import { setRequestLocale } from 'next-intl/server';
import AboutPage from '@/components/pages/AboutPage';
import { buildPageMetadata } from '@/lib/metadata';
import type { AppLocale } from '@/i18n/routing';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return buildPageMetadata({
    locale: locale as AppLocale,
    page: 'about',
  });
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage />;
}
