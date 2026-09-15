"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Service } from "@/config/services";

type ServiceDetailPageProps = {
  service: Service;
};

export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const t = useTranslations();

  return (
    <>
      <Navbar />
      <main className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <span className="label text-primary">{t("servicePage.label")}</span>
          <div className="mt-8 flex items-start gap-6">
            <div className="relative h-16 w-16 shrink-0">
              <Image
                src={service.svg}
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
                {t(service.titleKey)}
              </h1>
              <p className="prose-mono mt-4 max-w-2xl">{t(service.descKey)}</p>
              <p className="mt-4 font-mono text-[11px] text-ink-dim">
                {t(service.footerKey)}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
