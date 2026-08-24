import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import Wordmark from './Wordmark';

const navLinks = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.process', href: '#process' },
  { key: 'nav.benefits', href: '#benefits' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="fixed inset-x-0 top-3 z-50 px-4 sm:top-4 sm:px-6">
        <motion.nav
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-surface/90 py-2 pl-5 pr-2 backdrop-blur-md transition-shadow duration-300 ${
            scrolled ? 'shadow-pill' : 'shadow-card'
          }`}
        >
          <a href="#" aria-label={t('header.logoAlt')} className="shrink-0">
            <Wordmark />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <LanguageSelector />
            <a
              href="#contact"
              className="hidden rounded-full bg-primary px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright sm:inline-flex"
            >
              {t('nav.cta')}
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={t('nav.menu')}
              className="rounded-full p-2 text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Wordmark />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={t('nav.close')}
                className="rounded-full p-2 text-ink transition-colors hover:bg-ink/5"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-ink/10 py-4 font-display text-2xl font-bold text-ink"
                >
                  {t(link.key)}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                onClick={() => setMobileOpen(false)}
                className="mt-8 rounded-full bg-primary px-6 py-4 text-center text-sm font-semibold text-white shadow-glow-primary"
              >
                {t('nav.cta')}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
