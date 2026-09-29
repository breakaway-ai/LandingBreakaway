import { notFound } from "next/navigation";

// Corman / next client: uncomment the imports + return, and remove notFound().
// import type { Metadata } from "next";
// import { Suspense } from "react";
// import WhatsAppOnboard from "@/components/WhatsAppOnboard";
//
// export const metadata: Metadata = {
//   title: "Conectar WhatsApp Business",
//   robots: { index: false, follow: false },
// };

export default function WhatsAppOnboardPage() {
  notFound();

  // return (
  //   <Suspense fallback={<main className="px-5 pt-28">Cargando…</main>}>
  //     <WhatsAppOnboard />
  //   </Suspense>
  // );
}
