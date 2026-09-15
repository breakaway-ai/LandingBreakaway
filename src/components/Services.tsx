"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const services = [
  {
    titleKey: "services.agentsTitle",
    descKey: "services.agentsDesc",
    footerKey: "services.agentsFooter",
    svg: "/svgs/service-automation.svg",
  },
  {
    titleKey: "services.automationsTitle",
    descKey: "services.automationsDesc",
    footerKey: "services.automationsFooter",
    svg: "/svgs/service-devops.svg",
  },
  {
    titleKey: "services.integrationsTitle",
    descKey: "services.integrationsDesc",
    footerKey: "services.integrationsFooter",
    svg: "/svgs/service-integration.svg",
  },
  {
    titleKey: "services.webTitle",
    descKey: "services.webDesc",
    footerKey: "services.webFooter",
    svg: "/svgs/service-web.svg",
  },
  {
    titleKey: "services.appsTitle",
    descKey: "services.appsDesc",
    footerKey: "services.appsFooter",
    svg: "/svgs/service-mobile.svg",
  },
  {
    titleKey: "services.consultingTitle",
    descKey: "services.consultingDesc",
    footerKey: "services.consultingFooter",
    svg: "/svgs/service-consulting.svg",
  },
  {
    titleKey: "services.trainingTitle",
    descKey: "services.trainingDesc",
    footerKey: "services.trainingFooter",
    svg: "/svgs/service-training.svg",
  },
];

const track = [...services, ...services];

/** px per ~60fps frame — ~90s per full loop at 7 cards × 340px */
const SCROLL_SPEED = 0.55;

type Service = (typeof services)[number];

function ServiceCard({ service, t }: { service: Service; t: ReturnType<typeof useTranslations> }) {
  return (
    <article className="flex w-[min(340px,calc(100vw-3rem))] shrink-0 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-background shadow-card">
      <div className="flex aspect-[4/3] items-center justify-center bg-background-alt p-6 md:p-8">
        <div className="relative h-full w-full rounded-lg border border-dashed border-ink/15 p-4">
          <Image
            src={service.svg}
            alt=""
            aria-hidden="true"
            fill
            sizes="340px"
            className="object-contain p-2"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <h3 className="font-sans text-base font-semibold leading-snug text-ink">
          {t(service.titleKey)}
        </h3>
        <p className="flex-1 font-sans text-sm leading-relaxed text-muted">
          {t(service.descKey)}
        </p>
        <p className="font-sans text-xs leading-relaxed text-ink/45">
          {t(service.footerKey)}
        </p>
      </div>
    </article>
  );
}

export default function Services() {
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let rafId = 0;
    let lastTime = 0;

    const tick = (time: number) => {
      if (!pausedRef.current) {
        if (lastTime) {
          const delta = time - lastTime;
          el.scrollLeft += (delta / 16) * SCROLL_SPEED;

          const half = el.scrollWidth / 2;
          if (half > 0 && el.scrollLeft >= half) {
            el.scrollLeft -= half;
          }
        }
        lastTime = time;
      } else {
        lastTime = 0;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section id="services" className="bg-background-alt/60 py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-10 max-w-[1400px] mx-auto mb-10 md:mb-12"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-ink/55 sm:text-[11px]">
          {t("services.label")}
        </span>
        <h2 className="font-serif font-light text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.02em] leading-[1.1] mb-4 max-w-[920px]">
          {t("services.headline")}
        </h2>
        <p className="font-sans text-muted text-base leading-relaxed max-w-[680px]">
          {t("services.sectionSubtitle")}
        </p>
      </motion.div>

      <div className="relative mask-fade-x">
        <div
          ref={scrollRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          className="overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-stretch gap-4 px-6 md:gap-5 md:px-10">
            {track.map((service, i) => (
              <ServiceCard key={`${service.titleKey}-${i}`} service={service} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
