import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇦🇺' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = i18n.resolvedLanguage ?? i18n.language;

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
              i18n.changeLanguage(lang.code);
              setIsOpen(false);
            }}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors ${
              lang.code === current
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
