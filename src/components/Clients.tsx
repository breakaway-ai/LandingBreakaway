"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

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

export default function Clients() {
  const t = useTranslations();

  return (
    <div className="relative w-full overflow-hidden mb-14">
      <p className="label mb-8 text-center text-muted">{t("clients.label")}</p>
      <div className="flex items-center w-max animate-marquee">
        {track.map((client, i) => (
          <Image
            key={`${client.name}-${i}`}
            src={client.logo}
            alt={client.name}
            width={client.width}
            height={client.height}
            sizes="160px"
            className="h-8 w-auto shrink-0 mx-6 opacity-30 grayscale transition-[filter,opacity] duration-300 hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}
