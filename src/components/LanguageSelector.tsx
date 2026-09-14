'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇦🇺' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
] as const;

export default function LanguageSelector() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
        className="flex items-center rounded-full p-2 text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
      >
        <Globe className="h-[18px] w-[18px]" />
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-2 min-w-[150px] overflow-hidden rounded-2xl bg-surface shadow-pill transition-all duration-200 ${
          isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              if (routing.locales.includes(lang.code)) {
                router.replace(pathname, { locale: lang.code });
              }
              setIsOpen(false);
            }}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors ${
              lang.code === locale
                ? 'bg-primary-wash font-semibold text-primary'
                : 'text-ink-soft hover:bg-ink/[0.04]'
            }`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
