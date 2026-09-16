"use client";

import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";

const items = [
  "whatWeDo",
  "whoFor",
  "agentsVsAutomation",
  "existingTools",
  "timeline",
  "engagement",
  "pricing",
  "security",
  "location",
  "gettingStarted",
] as const;

export default function FaqPage() {
  const t = useTranslations("faqPage");

  return (
    <>
      <Navbar />
      <main className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <span className="label text-primary">{t("label")}</span>
          <h1 className="mt-5 text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t("title")}
          </h1>
          <p className="prose-mono mt-6 max-w-2xl">{t("intro")}</p>

          <div className="mt-12 border-t border-ink/10">
            {items.map((id) => (
              <details
                key={id}
                className="group border-b border-ink/10 py-1"
              >
                <summary className="cursor-pointer list-none py-6 sm:py-7 [&::-webkit-details-marker]:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                      {t(`${id}Question`)}
                    </h2>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 font-mono text-sm text-ink/40 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </div>
                </summary>
                <p className="prose-mono pb-6 whitespace-pre-line sm:pb-7">
                  {t(`${id}Answer`)}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-10 font-mono text-xs text-ink-dim">
            {t("contact")}{" "}
            <Link
              href="/contact"
              className="font-medium text-primary transition-colors hover:text-primary-bright"
            >
              {t("contactLink")}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
