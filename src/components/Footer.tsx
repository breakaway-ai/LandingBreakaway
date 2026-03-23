import { Trans } from 'react-i18next';
import logoImage from '../assets/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-surface/50 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="Breakaway" className="h-7" />
            <span className="font-display text-lg font-bold text-white">
              BREAK<span className="text-primary">AWAY</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/company/breakawayai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-dim hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </div>

          <p className="text-text-dim text-sm">
            <Trans i18nKey="footer.copyright" values={{ currentYear }}>
              &copy; {{ currentYear }} Breakaway. Todos los derechos reservados.
            </Trans>
          </p>
        </div>
      </div>
    </footer>
  );
}
