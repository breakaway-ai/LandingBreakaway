'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getPrimaryCtaHref, isExternalBookingUrl } from '@/config/booking';

const heroPhoto = '/images/founders-agentic.webp';

const founders = [
  { roleKey: 'founder1Role', nameKey: 'founder1Name' },
  { roleKey: 'founder2Role', nameKey: 'founder2Name' },
  { roleKey: 'founder3Role', nameKey: 'founder3Name' },
];

export default function AboutHero() {
  const t = useTranslations('aboutPage');
  const primaryCtaHref = getPrimaryCtaHref('/#contact');
  const primaryCtaExternal = isExternalBookingUrl(primaryCtaHref);

  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-6 h-[440px] w-[440px] rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 sm:gap-6"
        >
          <span className="label shrink-0 text-primary">{t('heroLabel')}</span>
          <span className="h-px flex-1 bg-ink/10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-9 max-w-4xl text-[2.5rem] leading-[1.03] text-ink sm:text-5xl lg:text-[4.25rem]"
        >
          {t.rich('heroHeadline', {
            highlight: (chunks) => (
              <span className="text-primary-bright">{chunks}</span>
            ),
          })}
        </motion.h1>

        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mt-12 overflow-hidden rounded-[26px] shadow-console sm:mt-14"
        >
          <Image
            src={heroPhoto}
            alt={t('heroPhotoAlt')}
            width={1600}
            height={592}
            className="block w-full object-cover"
            priority
          />

          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-night via-night/70 to-transparent" />

          <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 p-5 sm:p-7">
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {founders.map((founder) => (
                <div key={founder.roleKey}>
                  <div className="label text-white/45">{t(founder.roleKey)}</div>
                  <div className="mt-1.5 text-[13px] font-semibold text-white sm:text-sm">
                    {t(founder.nameKey)}
                  </div>
                </div>
              ))}
            </div>

            <span className="label hidden text-white/40 sm:block">{t('heroCaption')}</span>
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid gap-8 sm:mt-14 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16"
        >
          <p className="prose-mono max-w-xl">{t('introText')}</p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={primaryCtaHref}
              {...(primaryCtaExternal
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright"
            >
              {t('introCtaPrimary')}
              <ArrowRight size={16} />
            </a>
            <a
              href="#founders"
              className="inline-flex items-center justify-center rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-ink shadow-card transition-shadow hover:shadow-pill"
            >
              {t('introCtaSecondary')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
