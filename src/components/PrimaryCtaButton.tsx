"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import PrimaryCtaLink from "./PrimaryCtaLink";

export const primaryCtaClassName =
  "inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-primary px-5 py-1.5 text-[13px] font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright";

export const primaryCtaMobileClassName =
  "flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-center text-sm font-semibold text-white shadow-glow-primary";

export const primaryCtaHeroClassName =
  "cta-hero-gradient relative z-10 inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 sm:min-h-[3.25rem] sm:px-9 sm:text-base motion-reduce:transform-none";

type PrimaryCtaButtonProps = {
  variant?: "nav" | "navMobile" | "hero" | "inline";
  className?: string;
  onClick?: () => void;
};

export default function PrimaryCtaButton({
  variant = "inline",
  className,
  onClick,
}: PrimaryCtaButtonProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const onHome = pathname === "/";

  if (variant === "hero") {
    return (
      <span className="relative inline-flex">
        <PrimaryCtaLink
          onHome={onHome}
          onClick={onClick}
          markSize={20}
          className={
            className
              ? `${primaryCtaHeroClassName} ${className}`
              : primaryCtaHeroClassName
          }
        >
          {t("nav.cta")}
        </PrimaryCtaLink>
      </span>
    );
  }

  const variantClassName =
    variant === "nav"
      ? `hidden sm:inline-flex ${primaryCtaClassName}`
      : variant === "navMobile"
        ? primaryCtaMobileClassName
        : primaryCtaClassName;

  return (
    <PrimaryCtaLink
      onHome={onHome}
      onClick={onClick}
      className={className ? `${variantClassName} ${className}` : variantClassName}
    >
      {t("nav.cta")}
    </PrimaryCtaLink>
  );
}
