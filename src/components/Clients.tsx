import { useTranslation } from 'react-i18next';

const clients = ['Grupo GPI', 'Seguros Aura', 'Yonex México', 'Orienta PAE'];

const half = [...clients, ...clients, ...clients];
const track = [...half, ...half];

export default function Clients() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-ink/[0.07] py-12 sm:py-14">
      <p className="label mb-7 text-center text-ink-dim">{t('clients.label')}</p>

      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
          {track.map((client, i) => (
            <span key={`${client}-${i}`} className="flex items-center">
              <span className="whitespace-nowrap font-display text-lg font-medium text-ink-soft sm:text-xl">
                {client}
              </span>
              <span className="mx-6 h-1 w-1 shrink-0 rounded-full bg-primary-soft sm:mx-8" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
