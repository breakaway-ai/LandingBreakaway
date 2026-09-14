'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const talks = [
  {
    photo: '/images/panel-agentic.webp',
    width: 1200,
    height: 900,
    altKey: 'talk1Alt',
    metaKey: 'talk1Meta',
    titleKey: 'talk1Title',
    descKey: 'talk1Desc',
    span: 'lg:col-span-3',
  },
  {
    photo: '/images/panel-descubrete.webp',
    width: 1200,
    height: 900,
    altKey: 'talk2Alt',
    metaKey: 'talk2Meta',
    titleKey: 'talk2Title',
    descKey: 'talk2Desc',
    span: 'lg:col-span-2',
  },
];

export default function AboutTalks() {
  const t = useTranslations('aboutPage');

  return (
    <section className="relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-white/[0.06] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label text-white/60">{t('talksLabel')}</span>
          <h2 className="mt-5 max-w-sm text-[1.75rem] leading-[1.15] text-white sm:text-4xl">
            {t('talksHeadline')}
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
              <Image
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
