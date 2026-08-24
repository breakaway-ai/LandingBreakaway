import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Home,
  Mail,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import logoImage from '../assets/logo.png';
import LanguageSelector from '../components/LanguageSelector';
import Footer from '../components/Footer';

const steps = [
  { icon: MessageSquare, titleKey: 'step1Title', descKey: 'step1Desc', delay: 0.3 },
  { icon: Clock, titleKey: 'step2Title', descKey: 'step2Desc', delay: 0.45 },
  { icon: Sparkles, titleKey: 'step3Title', descKey: 'step3Desc', delay: 0.6 },
] as const;

export default function SuccessPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface/40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <header className="relative z-10 py-5 px-5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoImage} alt={t('header.logoAlt')} className="h-8 lg:h-10" />
            <span className="font-display text-xl lg:text-2xl font-bold text-white">
              BREAK<span className="text-primary">AWAY</span>
            </span>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-5 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative flex justify-center mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl scale-150" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {t('successPage.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-text-dim text-base sm:text-lg max-w-xl mx-auto mb-10 sm:mb-12"
          >
            {t('successPage.subtitle')}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
            {steps.map(({ icon: Icon, titleKey, descKey, delay }) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay }}
                className="glass-card p-5 sm:p-6 text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
                  {t(`successPage.${titleKey}`)}
                </h3>
                <p className="text-text-dim text-xs sm:text-sm leading-relaxed">
                  {t(`successPage.${descKey}`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="glass-card px-5 py-4 sm:px-6 sm:py-5 mb-8 sm:mb-10 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm text-text-dim"
          >
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>{t('successPage.responseTime')}</span>
            <span className="hidden sm:inline text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              {t('successPage.emailNote')}
              <a
                href="mailto:general@breakaway.work"
                className="text-primary-light hover:text-white transition-colors inline-flex items-center gap-1 font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                general@breakaway.work
              </a>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-glow transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Home className="w-4 h-4" />
              {t('successPage.ctaHome')}
            </Link>
            <Link
              to="/#services"
              className="w-full sm:w-auto px-6 py-3.5 glass hover:bg-white/10 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {t('successPage.ctaServices')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
