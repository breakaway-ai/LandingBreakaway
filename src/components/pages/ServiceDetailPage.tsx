"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceInfo from "@/components/services/ServiceInfo";
import ServiceCta from "@/components/services/ServiceCta";
import type { Service } from "@/config/services";

type ServiceDetailPageProps = {
  service: Service;
};

export default function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  return (
    <>
      <Navbar />
      <main>
        <ServiceHero service={service} />
        <ServiceInfo service={service} />
        <ServiceCta service={service} />
      </main>
      <Footer />
    </>
  );
}
