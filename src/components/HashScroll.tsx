'use client';

import { useEffect } from 'react';

type HashScrollProps = {
  scrollToTop?: boolean;
};

export default function HashScroll({ scrollToTop = false }: HashScrollProps) {
  useEffect(() => {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      if (scrollToTop) {
        window.scrollTo(0, 0);
      }
      return;
    }

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => window.clearTimeout(timer);
  }, [scrollToTop]);

  return null;
}
