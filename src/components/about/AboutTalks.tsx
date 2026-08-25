import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import panelPhoto from '../../assets/imgs/panel-agentic.webp';
import summitPhoto from '../../assets/imgs/summit-descubrete.webp';

const talks = [
  {
    photo: panelPhoto,
    width: 1200,
    height: 900,
    altKey: 'aboutPage.talk1Alt',
    metaKey: 'aboutPage.talk1Meta',
    titleKey: 'aboutPage.talk1Title',
    descKey: 'aboutPage.talk1Desc',
    span: 'lg:col-span-3',
  },
  {
    photo: summitPhoto,
    width: 640,
    height: 427,
    altKey: 'aboutPage.talk2Alt',
    metaKey: 'aboutPage.talk2Meta',
    titleKey: 'aboutPage.talk2Title',
    descKey: 'aboutPage.talk2Desc',
    span: 'lg:col-span-2',
  },
];

export default function AboutTalks() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label text-white/60">{t('aboutPage.talksLabel')}</span>
          <h2 className="mt-5 max-w-sm text-[1.75rem] leading-[1.15] text-white sm:text-4xl">
            {t('aboutPage.talksHeadline')}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-5">
          {talks.map((talk, i) => (
            <motion.article
              key={talk.titleKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
              whileHover={{ y: -8, transition: { duration: 0.28, ease: 'easeOut' } }}
              viewport={{ once: true }}
              className={`overflow-hidden rounded-[22px] bg-night shadow-console ${talk.span}`}
            >
              <img
                src={talk.photo}
                alt={t(talk.altKey)}
                width={talk.width}
                height={talk.height}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />

              <div className="p-6 sm:p-7">
                <span className="label text-white/35">{t(talk.metaKey)}</span>
                <h3 className="mt-4 text-[15px] text-white sm:text-base">{t(talk.titleKey)}</h3>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-white/50">
                  {t(talk.descKey)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
