import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const benefits = [
  { titleKey: 'benefits.benefit1Title', descKey: 'benefits.benefit1Description' },
  { titleKey: 'benefits.benefit2Title', descKey: 'benefits.benefit2Description' },
  { titleKey: 'benefits.benefit3Title', descKey: 'benefits.benefit3Description' },
  { titleKey: 'benefits.benefit4Title', descKey: 'benefits.benefit4Description' },
  { titleKey: 'benefits.benefit5Title', descKey: 'benefits.benefit5Description' },
  { titleKey: 'benefits.benefit6Title', descKey: 'benefits.benefit6Description' },
];

export default function Benefits() {
  const { t } = useTranslation();

  return (
    <section id="benefits" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="label text-primary">{t('benefits.label')}</span>
          <h2 className="mx-auto mt-5 max-w-2xl text-[1.75rem] leading-[1.15] text-ink sm:text-4xl lg:text-[2.6rem]">
            {t('benefits.headline')}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: (i % 3) * 0.08 } }}
              whileHover={{ y: -8, transition: { duration: 0.28, ease: 'easeOut' } }}
              viewport={{ once: true }}
              className="card card-float p-6 sm:p-7"
            >
              <span className="font-display text-xl font-bold text-primary-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-[15px] text-ink sm:text-base">{t(benefit.titleKey)}</h3>
              <p className="prose-mono mt-3">{t(benefit.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
