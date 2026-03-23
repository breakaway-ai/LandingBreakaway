import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
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
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Globe className="w-5 h-5 text-white" />
      </button>

      <div
        className={`absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden min-w-[140px] z-50 transition-all duration-200 ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              i18n.changeLanguage(lang.code);
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors ${
              lang.code === i18n.language
                ? 'bg-primary/20 text-white'
                : 'text-white/80 hover:bg-white/10'
            }`}
          >
            <span className="text-base">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
