import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/logo.png';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.process'), href: '#process' },
    { label: t('nav.benefits'), href: '#benefits' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 glass shadow-lg'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <img src={logoImage} alt={t('header.logoAlt')} className="h-8 lg:h-10" />
            <span className="font-display text-xl lg:text-2xl font-bold text-white">
              BREAK<span className="text-primary">AWAY</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-full transition-all shadow-glow"
            >
              {t('nav.cta')}
            </motion.a>
            <LanguageSelector />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSelector />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 p-2 text-white"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-display font-semibold text-white hover:text-primary transition-colors"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-primary text-white font-semibold rounded-full shadow-glow"
            >
              {t('nav.cta')}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
