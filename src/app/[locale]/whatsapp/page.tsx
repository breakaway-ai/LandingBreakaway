import type { Metadata } from "next";
import WhatsAppOnboard from "@/components/WhatsAppOnboard";

export const metadata: Metadata = {
  title: "Conectar WhatsApp Business",
  robots: { index: false, follow: false },
};

export default function WhatsAppOnboardPage() {
  return <WhatsAppOnboard />;
}
