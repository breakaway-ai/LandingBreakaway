"use client";

import type { ReactNode } from "react";
import { getScheduleHref } from "@/config/booking";

type ScheduleLinkProps = {
  className?: string;
  children: ReactNode;
};

export default function ScheduleLink({
  className,
  children,
}: ScheduleLinkProps) {
  const href = getScheduleHref();

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
