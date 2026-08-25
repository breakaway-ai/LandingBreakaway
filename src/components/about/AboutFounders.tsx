import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const founders = [
  {
    roleKey: 'aboutPage.founder1Role',
    nameKey: 'aboutPage.founder1Name',
    descKey: 'aboutPage.founder1Desc',
  },
  {
    roleKey: 'aboutPage.founder2Role',
    nameKey: 'aboutPage.founder2Name',
    descKey: 'aboutPage.founder2Desc',
  },
  {
    roleKey: 'aboutPage.founder3Role',
    nameKey: 'aboutPage.founder3Name',
    descKey: 'aboutPage.founder3Desc',
  },
];

export default function AboutFounders() {
  const { t } = useTranslation();

  return (
    <section id="founders" className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label text-primary">{t('aboutPage.foundersLabel')}</span>
          <h2 className="mt-5 max-w-sm text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t('aboutPage.foundersHeadline')}
          </h2>
          <p className="prose-mono mt-5 max-w-md">{t('aboutPage.foundersIntro')}</p>
        </motion.div>

        <div className="mt-12 border-t border-ink/10 sm:mt-14">
          {founders.map((founder, i) => (
            <motion.article
              key={founder.roleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid gap-4 border-b border-ink/10 py-8 sm:py-9 lg:grid-cols-[64px_1fr_1fr] lg:items-baseline lg:gap-8"
            >
              <span className="label text-primary">{t(founder.roleKey)}</span>

              <div>
                <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {t(founder.nameKey)}
                </h3>
                <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-ink-dim">
                  {t('aboutPage.foundersDegree')}
                </p>
              </div>

              <p className="prose-mono">{t(founder.descKey)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
