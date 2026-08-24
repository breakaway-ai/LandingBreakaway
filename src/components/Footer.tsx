import { useTranslation } from 'react-i18next';
import Wordmark from './Wordmark';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-night">
      <div className="mx-auto max-w-6xl border-t border-white/[0.08] px-5 py-7 sm:px-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-6">
          <Wordmark tone="dark" />

          <p className="order-3 font-mono text-[11px] text-white/40 sm:order-2">
            {t('contactForm.location')} · general@breakaway.work
          </p>

          <div className="order-2 flex items-center gap-4 sm:order-3">
            <a
              href="https://www.linkedin.com/company/breakawayai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
            <p className="font-mono text-[11px] text-white/40">
              {t('footer.short', { currentYear })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
