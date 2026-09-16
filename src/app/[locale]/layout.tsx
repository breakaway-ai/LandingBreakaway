import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NavigationScroll from "@/components/NavigationScroll";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { SITE_URL } from "@/config/site";
import { routing } from "@/i18n/routing";
import "@/index.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Optional analytics env vars:
// NEXT_PUBLIC_GA_MEASUREMENT_ID — GA4 property (e.g. G-XXXXXXXXXX)
// NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION — Search Console verification token
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const GOOGLE_ADS_ID = "AW-18407437332";
const GTAG_SCRIPT_ID =
  GA_MEASUREMENT_ID ?? GOOGLE_ADS_ID;

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        {GOOGLE_SITE_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={GOOGLE_SITE_VERIFICATION}
          />
        ) : null}
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <NavigationScroll />
          {children}
          <WhatsAppWidget />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_SCRIPT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');${
              GA_MEASUREMENT_ID
                ? `\n            gtag('config', '${GA_MEASUREMENT_ID}');`
                : ""
            }
          `}
        </Script>
      </body>
    </html>
  );
}
