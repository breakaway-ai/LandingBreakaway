"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageContainer from "./PageContainer";

const MARQUEE_MS = { normal: 70_000, slow: 140_000 };

function setMarqueeSpeed(track: HTMLDivElement | null, slow: boolean) {
  if (!track) return;

  const anim = track.getAnimations()[0];
  if (!anim?.effect) return;

  const currentDuration = anim.effect.getTiming().duration as number;
  const targetDuration = slow ? MARQUEE_MS.slow : MARQUEE_MS.normal;
  if (currentDuration === targetDuration) return;

  const progress = currentDuration
    ? Number(anim.currentTime ?? 0) / currentDuration
    : 0;

  anim.effect.updateTiming({ duration: targetDuration });
  anim.currentTime = progress * targetDuration;
}

const clients = [
  {
    name: "Grupo GPI",
    logo: "/images/logos/gpi.png",
    width: 160,
    height: 52,
  },
  {
    name: "Seguros Aura",
    logo: "/images/logos/aura.png",
    width: 217,
    height: 80,
  },
  {
    name: "Yonex México",
    logo: "/images/logos/yonex.png",
    width: 160,
    height: 160,
  },
  {
    name: "Orienta PAE",
    logo: "/images/logos/orienta.png",
    width: 160,
    height: 160,
  },
  {
    name: "Corman Sports",
    logo: "/images/logos/corman.webp",
    width: 160,
    height: 160,
  },
  {
    name: "Factor ADN",
    logo: "/images/logos/factoradn.png",
    width: 131,
    height: 100,
  },
  {
    name: "Inexvision",
    logo: "/images/logos/inexvision.png",
    width: 185,
    height: 45,
  },
  {
    name: "Descúbrete+",
    logo: "/images/logos/descubrete.png",
    width: 160,
    height: 48,
  },
];

const track = [...clients, ...clients];
const logoClass =
  "max-h-full max-w-full object-contain grayscale transition-[filter] duration-300 group-hover/logo:grayscale-0";

export default function Clients() {
  const t = useTranslations();
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMarqueeEnter = useCallback(() => {
    setMarqueeSpeed(trackRef.current, true);
  }, []);

  const handleMarqueeLeave = useCallback(() => {
    setMarqueeSpeed(trackRef.current, false);
  }, []);

  return (
    <section className="py-4">
      <PageContainer>
        <p className="label mb-8 text-center text-muted">
          {t("clients.label")}
        </p>
      </PageContainer>

      <div
        className="mask-fade-x overflow-hidden"
        onMouseEnter={handleMarqueeEnter}
        onMouseLeave={handleMarqueeLeave}
      >
        <div
          ref={trackRef}
          className="flex w-max animate-marquee items-center gap-12 motion-reduce:animate-none"
        >
          {track.map((client, i) => (
            <span
              key={`${client.name}-${i}`}
              className="group/logo flex h-10 w-40 shrink-0 items-center justify-center"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={client.width}
                height={client.height}
                className={logoClass}
                sizes="160px"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
