'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function AboutStance() {
  const t = useTranslations('aboutPage');

  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label text-primary">{t('stanceLabel')}</span>
          <h2 className="mt-5 max-w-sm text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t('stanceHeadline')}
          </h2>
        </motion.div>

        <div className="mt-12 border-t border-ink/10 sm:mt-14">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-3 border-b border-ink/10 py-9 sm:gap-4 sm:py-10 lg:grid-cols-[64px_1fr] lg:gap-8"
          >
            <span className="label text-primary">01</span>
            <div>
              <h3 className="max-w-xs font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                {t('stance1Title')}
              </h3>
              <p className="prose-mono mt-4 max-w-md">
                {t.rich('stance1Desc', {
                  highlight: (chunks) => <span className="mark">{chunks}</span>,
                })}
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-3 border-b border-ink/10 py-9 sm:gap-4 sm:py-10 lg:grid-cols-[64px_1fr] lg:gap-8"
          >
            <span className="label text-primary">02</span>
            <div>
              <h3 className="max-w-xs font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                {t('stance2Title')}
              </h3>
              <p className="prose-mono mt-4 max-w-md">
                {t.rich('stance2Desc', {
                  highlight: (chunks) => <span className="mark">{chunks}</span>,
                })}
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-3 border-b border-ink/10 py-9 sm:gap-4 sm:py-10 lg:grid-cols-[64px_1fr] lg:gap-8"
          >
            <span className="label text-primary">03</span>
            <div>
              <h3 className="max-w-xs font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                {t('stance3Title')}
              </h3>
              <p className="prose-mono mt-4 max-w-md">
                {t.rich('stance3Desc', {
                  highlight: (chunks) => <span className="mark">{chunks}</span>,
                })}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
