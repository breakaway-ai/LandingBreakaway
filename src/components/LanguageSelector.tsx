'use client';

import { useLocale } from 'next-intl';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';

const languages = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
] as const;

export default function LanguageSelector() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-full border border-ink/10 bg-ink/[0.025] p-0.5 shadow-inner"
    >
      <Globe aria-hidden="true" className="mx-1 h-4 w-4 text-ink-soft" />
      {languages.map((lang) => {
        const isActive = lang.code === locale;

        return (
          <button
            key={lang.code}
            type="button"
            aria-label={`Switch to ${lang.name}`}
            aria-current={isActive ? 'true' : undefined}
            disabled={isActive}
            onClick={() => {
              if (routing.locales.includes(lang.code)) {
                router.replace(pathname, { locale: lang.code });
              }
            }}
            className={`min-w-10 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              isActive
                ? 'bg-surface text-ink shadow-pill'
                : 'text-ink-soft hover:bg-surface/60 hover:text-ink'
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
