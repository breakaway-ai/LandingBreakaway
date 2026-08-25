import { useTranslation } from 'react-i18next';
import auraLogo from '../assets/logos/aura.webp';
import cormanLogo from '../assets/logos/corman.webp';
import gpiLogo from '../assets/logos/gpi.webp';
import orientaLogo from '../assets/logos/orienta.webp';
import yonexLogo from '../assets/logos/yonex.webp';

/** Logos arrive with clashing backgrounds (white, black, full-bleed colour), so each one
 *  sits in a uniform white chip instead of directly on the lavender section. */
const clients = [
  { name: 'Grupo GPI', logo: gpiLogo },
  { name: 'Seguros Aura', logo: auraLogo },
  { name: 'Yonex México', logo: yonexLogo },
  { name: 'Orienta PAE', logo: orientaLogo },
  { name: 'Corman Sports', logo: cormanLogo },
];

const half = [...clients, ...clients];
const track = [...half, ...half];

export default function Clients() {
  const { t } = useTranslation();

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
              <img
                src={client.logo}
                alt={client.name}
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
