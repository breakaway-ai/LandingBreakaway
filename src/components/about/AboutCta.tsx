'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { getPrimaryCtaHref, isExternalBookingUrl } from '@/config/booking';

const boothPhoto = '/images/stage-booth.webp';

export default function AboutCta() {
  const t = useTranslations('aboutPage');
  const primaryCtaHref = getPrimaryCtaHref('/#contact');
  const primaryCtaExternal = isExternalBookingUrl(primaryCtaHref);

  return (
    <section className="relative overflow-hidden bg-night py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="max-w-md text-[1.75rem] leading-[1.15] text-white sm:text-4xl">
              {t('ctaHeadline')}
            </h2>

            <p className="mt-6 max-w-md font-mono text-xs leading-relaxed text-white/55 sm:text-[12.5px]">
              {t('ctaText')}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={primaryCtaHref}
                {...(primaryCtaExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
              >
                {t('ctaButton')}
              </a>

              <a
                href="mailto:general@breakaway.work"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white/[0.06] px-6 py-3.5 font-mono text-[11px] text-white/70 ring-1 ring-white/[0.08] transition-colors hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                general@breakaway.work
              </a>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="overflow-hidden rounded-[22px] shadow-console"
          >
            <Image
              src={boothPhoto}
              alt={t('ctaPhotoAlt')}
              width={640}
              height={427}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
