import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import AgentConsole from './AgentConsole';

const stats = [
  { value: '15+', key: 'hero.stat1' },
  { value: '100%', key: 'hero.stat2' },
  { value: '80%', key: 'hero.stat3' },
  { value: '70%', key: 'hero.stat4' },
];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-0 h-[440px] w-[440px] rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-accent/[0.07] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-bright" />
              <span className="label text-primary">{t('hero.label')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[2.5rem] leading-[1.04] text-ink sm:text-5xl lg:text-[3.6rem]"
            >
              <Trans i18nKey="hero.title">
                Transforma tu negocio con
                <span className="text-primary-bright"> agentes inteligentes</span>
              </Trans>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright"
              >
                {t('hero.cta')}
                <ArrowRight size={16} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-ink shadow-card transition-shadow hover:shadow-pill"
              >
                {t('hero.secondary')}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AgentConsole />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid grid-cols-2 gap-y-8 border-t border-ink/10 pt-8 sm:mt-16 sm:grid-cols-4 sm:pt-10"
        >
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="font-display text-3xl font-bold text-ink sm:text-[2rem]">{stat.value}</div>
              <div className="mt-1.5 font-mono text-[11px] text-ink-dim">{t(stat.key)}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
