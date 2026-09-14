"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { LOCALE_SCROLL_KEY } from "@/lib/navigation-scroll";

function scrollToHash(hash: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView();
    });
  });
}

export default function NavigationScroll() {
  const pathname = usePathname();
  const locale = useLocale();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const saved = sessionStorage.getItem(LOCALE_SCROLL_KEY);
    if (saved === null) return;

    sessionStorage.removeItem(LOCALE_SCROLL_KEY);
    const y = Number(saved);
    if (Number.isNaN(y)) return;

    requestAnimationFrame(() => {
      window.scrollTo(0, y);
    });
  }, [locale]);

  useEffect(() => {
    if (prevPathname.current === pathname) return;

    prevPathname.current = pathname;

    if (sessionStorage.getItem(LOCALE_SCROLL_KEY) !== null) return;

    const hash = window.location.hash;
    if (hash) {
      scrollToHash(hash);
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
