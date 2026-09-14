"use client";

import type { ReactNode } from "react";
import { getPrimaryCtaHref, isExternalBookingUrl } from "@/config/booking";
import { Link } from "@/i18n/navigation";

interface PrimaryCtaLinkProps {
  onHome: boolean;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function PrimaryCtaLink({
  onHome,
  className,
  onClick,
  children,
}: PrimaryCtaLinkProps) {
  const href = getPrimaryCtaHref("#contact");
  const external = isExternalBookingUrl(href);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (onHome) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href="/#contact" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
