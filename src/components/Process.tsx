import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const steps = [
  { titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Description' },
  { titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Description' },
  { titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Description' },
  { titleKey: 'howItWorks.step4Title', descKey: 'howItWorks.step4Description' },
  { titleKey: 'howItWorks.step5Title', descKey: 'howItWorks.step5Description' },
];

export default function Process() {
  const { t } = useTranslation();

  return (
    <section id="process" className="relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="label text-white/60">{t('process.label')}</span>
          <h2 className="mx-auto mt-5 max-w-2xl text-[1.75rem] leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
            {t('howItWorks.sectionTitle')}
          </h2>
        </motion.div>

        <div className="relative mt-14 sm:mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-[6px] hidden h-0.5 rounded-full bg-white/15 lg:block">
            <div className="line-trace absolute -inset-y-2 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-md motion-reduce:hidden" />
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="line-trace absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent motion-reduce:hidden" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                <span className="mb-6 hidden h-3.5 w-3.5 rounded-full bg-white ring-4 ring-white/25 lg:block" />

                <div className="font-display text-2xl font-bold text-primary-soft sm:text-[1.75rem]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-2 text-sm text-white sm:text-[15px]">{t(step.titleKey)}</h3>
                <p className="mt-2.5 font-mono text-[11px] leading-relaxed text-white/60">
                  {t(step.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
