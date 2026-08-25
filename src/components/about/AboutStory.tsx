import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import graduationPhoto from '../../assets/imgs/graduation.webp';

const stats = [
  { valueKey: 'aboutPage.storyStat1Value', labelKey: 'aboutPage.storyStat1Label' },
  { valueKey: 'aboutPage.storyStat2Value', labelKey: 'aboutPage.storyStat2Label' },
  { valueKey: 'aboutPage.storyStat3Value', labelKey: 'aboutPage.storyStat3Label' },
];

export default function AboutStory() {
  const { t } = useTranslation();

  return (
    <section className="relative mt-20 overflow-hidden bg-night py-20 sm:mt-24 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="label text-primary-soft">{t('aboutPage.storyLabel')}</span>

            <h2 className="mt-5 max-w-md text-[1.75rem] leading-[1.15] text-white sm:text-4xl">
              {t('aboutPage.storyHeadline')}
            </h2>

            <div className="mt-7 max-w-lg space-y-5 font-mono text-xs leading-relaxed text-white/55 sm:text-[12.5px]">
              <p>{t('aboutPage.storyText1')}</p>
              <p>{t('aboutPage.storyText2')}</p>
            </div>

            <dl className="mt-10 grid gap-8 border-t border-white/[0.08] pt-8 sm:grid-cols-3 sm:gap-6">
              {stats.map((stat) => (
                <div key={stat.labelKey}>
                  <dt className="font-display text-2xl font-bold text-primary-soft">
                    {t(stat.valueKey)}
                  </dt>
                  <dd className="mt-2 font-mono text-[10.5px] leading-relaxed text-white/40">
                    {t(stat.labelKey)}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-[22px] shadow-console"
          >
            <img
              src={graduationPhoto}
              alt={t('aboutPage.storyPhotoAlt')}
              width={900}
              height={1200}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-[center_30%] lg:aspect-square"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
