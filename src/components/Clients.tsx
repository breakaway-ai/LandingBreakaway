'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

/** Logos arrive with clashing backgrounds (white, black, full-bleed colour), so each one
 *  sits in a uniform white chip instead of directly on the lavender section. */
const clients = [
  { name: 'Grupo GPI', logo: '/logos/gpi.webp', width: 160, height: 52 },
  { name: 'Seguros Aura', logo: '/logos/aura.webp', width: 160, height: 160 },
  { name: 'Yonex México', logo: '/logos/yonex.webp', width: 160, height: 160 },
  { name: 'Orienta PAE', logo: '/logos/orienta.webp', width: 160, height: 160 },
  { name: 'Corman Sports', logo: '/logos/corman.webp', width: 160, height: 160 },
];

const half = [...clients, ...clients];
const track = [...half, ...half];

export default function Clients() {
  const t = useTranslations();

  return (
    <section className="border-y border-ink/[0.07] py-12 sm:py-14">
      <p className="label mb-8 text-center text-ink-dim">{t('clients.label')}</p>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-4 sm:gap-5 motion-reduce:animate-none">
          {track.map((client, i) => (
            <span
              key={`${client.name}-${i}`}
              className="flex h-16 w-[168px] shrink-0 items-center justify-center rounded-2xl bg-surface px-6 shadow-card sm:h-[68px] sm:w-[184px]"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.width}
                height={client.height}
                loading="lazy"
                className="max-h-8 w-auto max-w-full rounded-md object-contain sm:max-h-9"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
