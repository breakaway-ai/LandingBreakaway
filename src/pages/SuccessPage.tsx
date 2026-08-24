import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Clock, Home, Mail, MessageSquare, Sparkles } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import Wordmark from '../components/Wordmark';
import Footer from '../components/Footer';

const steps = [
  { icon: MessageSquare, titleKey: 'step1Title', descKey: 'step1Desc' },
  { icon: Clock, titleKey: 'step2Title', descKey: 'step2Desc' },
  { icon: Sparkles, titleKey: 'step3Title', descKey: 'step3Desc' },
] as const;

export default function SuccessPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 pt-3 sm:px-6 sm:pt-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full bg-surface/90 py-2 pl-5 pr-2 shadow-card backdrop-blur-md">
          <Link to="/" aria-label={t('header.logoAlt')}>
            <Wordmark />
          </Link>
          <LanguageSelector />
        </div>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden px-5 py-16 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

        <div className="relative mx-auto w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/25 sm:h-20 sm:w-20"
          >
            <Check className="h-7 w-7 text-emerald-500 sm:h-9 sm:w-9" strokeWidth={2.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="text-3xl text-ink sm:text-4xl lg:text-[2.75rem]"
          >
            {t('successPage.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-soft"
          >
            {t('successPage.subtitle')}
          </motion.p>

          <div className="mt-12 grid gap-4 text-left sm:grid-cols-3 sm:gap-5">
            {steps.map(({ icon: Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.1 }}
                className="card p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-wash">
                  <Icon className="h-4 w-4 text-primary" />
                </span>
                <h3 className="mt-4 text-[15px] text-ink">{t(`successPage.${titleKey}`)}</h3>
                <p className="prose-mono mt-2.5">{t(`successPage.${descKey}`)}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-2 font-mono text-[11px] text-ink-dim sm:flex-row sm:justify-center sm:gap-3"
          >
            <span>{t('successPage.responseTime')}</span>
            <span className="hidden text-ink/20 sm:inline">·</span>
            <span className="flex items-center gap-1.5">
              {t('successPage.emailNote')}
              <a
                href="mailto:general@breakaway.work"
                className="inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-bright"
              >
                <Mail className="h-3 w-3" />
                general@breakaway.work
              </a>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright sm:w-auto"
            >
              <Home className="h-4 w-4" />
              {t('successPage.ctaHome')}
            </Link>
            <Link
              to="/#services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-surface px-6 py-3.5 text-sm font-semibold text-ink shadow-card transition-shadow hover:shadow-pill sm:w-auto"
            >
              {t('successPage.ctaServices')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
