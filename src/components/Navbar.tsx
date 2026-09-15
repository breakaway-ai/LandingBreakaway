"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSelector from "./LanguageSelector";
import PrimaryCtaButton from "./PrimaryCtaButton";
import { SERVICES } from "@/config/services";
import { LAYOUT_MAX } from "@/lib/layout";
import Wordmark from "./Wordmark";

const sectionLinks = [
  { key: "nav.process", id: "process" },
  { key: "nav.testimonials", id: "testimonials" },
];

const expandEase = [0.22, 1, 0.36, 1] as const;
const collapseEase = [0.7, 0, 0.84, 0] as const;
const expandTransition = {
  type: "tween" as const,
  duration: 0.85,
  ease: expandEase,
};
const collapseTransition = {
  type: "tween" as const,
  duration: 0.85,
  ease: collapseEase,
};
const ISLAND_RADIUS = 12;
interface SectionLinkProps {
  onHome: boolean;
  id: string;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}

function SectionLink({
  onHome,
  id,
  className,
  onClick,
  children,
}: SectionLinkProps) {
  return (
    <Link
      href={onHome ? `#${id}` : `/#${id}`}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function viewWidth() {
  return document.documentElement.clientWidth;
}

type ServicesNavMenuProps = {
  linkClass: string;
  onNavigate?: () => void;
  mobile?: boolean;
};

function ServicesNavMenu({
  linkClass,
  onNavigate,
  mobile = false,
}: ServicesNavMenuProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const triggerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const isActive = pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open || mobile) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 16,
        left: rect.left + rect.width / 2,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive: true });
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [open, mobile]);

  const openMenu = () => {
    window.clearTimeout(closeTimeoutRef.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => setOpen(false), 200);
  };

  const close = () => {
    window.clearTimeout(closeTimeoutRef.current);
    setOpen(false);
    onNavigate?.();
  };

  const isServiceActive = (slug: string) => pathname === `/services/${slug}`;
  const isAllServicesActive = pathname === "/services";

  if (mobile) {
    return (
      <div className="border-b border-ink/10">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full py-4 font-display text-2xl font-bold text-ink"
        >
          {t("nav.services")}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pb-2"
            >
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={() => close()}
                  className="group block rounded-lg py-3 pl-4 transition-colors hover:bg-primary-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <span
                    className={`block text-[15px] font-semibold leading-snug transition-colors group-hover:text-primary ${
                      isServiceActive(service.slug) ? "text-primary" : "text-ink"
                    }`}
                  >
                    {t(service.titleKey)}
                  </span>
                  <span className="mt-0.5 block text-[13px] font-normal leading-snug text-ink-dim">
                    {t(service.menuDescKey)}
                  </span>
                </Link>
              ))}
              <Link
                href="/services"
                onClick={() => close()}
                className="group block rounded-lg py-3 transition-colors hover:bg-primary-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <span
                  className={`block font-display text-xl font-bold transition-colors group-hover:text-primary ${
                    isAllServicesActive ? "text-primary" : "text-ink"
                  }`}
                >
                  {t("nav.allServices")}
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const desktopMenu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 6, x: "-50%" }}
            transition={{ duration: 0.15 }}
            style={{ top: menuPosition.top, left: menuPosition.left }}
            className="fixed z-[70] w-max min-w-[30rem] max-w-[calc(100vw-2rem)]"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-pill">
              <div className="grid grid-cols-2 gap-1 p-2">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => close()}
                    className="group flex flex-col gap-1 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    <span
                      className={`text-[13px] font-semibold leading-snug transition-colors group-hover:text-primary ${
                        isServiceActive(service.slug) ? "text-primary" : "text-ink"
                      }`}
                    >
                      {t(service.titleKey)}
                    </span>
                    <span className="text-[11px] font-normal leading-snug text-ink-dim">
                      {t(service.menuDescKey)}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/services"
                onClick={() => close()}
                className="group block border-t border-ink/10 px-3 py-2.5 text-center transition-colors hover:bg-primary-wash focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <span
                  className={`text-[13px] font-semibold transition-colors group-hover:text-primary ${
                    isAllServicesActive ? "text-primary" : "text-ink-soft"
                  }`}
                >
                  {t("nav.allServices")}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <div
        ref={triggerRef}
        className="relative flex h-full w-fit flex-col items-center justify-center"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <span
          className={`${linkClass} ${isActive ? "text-ink" : ""}`}
          aria-haspopup="true"
        >
          {t("nav.services")}
        </span>
      </div>
      {desktopMenu}
    </>
  );
}

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(1200);
  const reduceMotion = useReducedMotion();
  const gutter = fullWidth >= 640 ? 48 : 40;
  const islandWidth = Math.min(LAYOUT_MAX, fullWidth - gutter);

  const onHome = pathname === "/";
  const morph = reduceMotion
    ? { duration: 0 }
    : scrolled
      ? expandTransition
      : collapseTransition;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const measure = () => {
      const width = viewWidth();
      setFullWidth(width);
      if (width >= 768) setMobileOpen(false);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const linkClass =
    "whitespace-nowrap text-[13px] font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:text-ink";

  return (
    <>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1, top: scrolled ? 0 : 14 }}
        transition={{
          y: { type: "spring", stiffness: 120, damping: 20 },
          opacity: { type: "spring", stiffness: 120, damping: 20 },
          top: morph,
        }}
        className="fixed inset-x-0 top-3.5 z-50 flex justify-center overflow-visible"
      >
        <motion.nav
          initial={false}
          transition={morph}
          animate={{
            width: scrolled ? fullWidth : islandWidth,
            borderRadius: scrolled ? 0 : ISLAND_RADIUS,
          }}
          className={`grid grid-cols-[1fr_auto_1fr] items-center overflow-visible bg-surface/90 py-2 backdrop-blur-md ${
            scrolled
              ? "border-b border-ink/10 px-5 sm:px-8"
              : "border border-ink/10 px-5 shadow-pill"
          }`}
        >
          <div className="col-start-1 justify-self-start">
            <Link
              href="/"
              aria-label={t("header.logoAlt")}
              className="inline-flex min-h-9 items-center"
            >
              <Wordmark compact={scrolled} />
            </Link>
          </div>

          <div className="col-start-2 hidden items-center gap-7 justify-self-center overflow-visible md:flex">
            <div className="relative self-stretch overflow-visible">
              <ServicesNavMenu linkClass={linkClass} />
            </div>

            {sectionLinks.map((link) => (
              <SectionLink
                key={link.id}
                onHome={onHome}
                id={link.id}
                className={linkClass}
              >
                {t(link.key)}
              </SectionLink>
            ))}

            <Link
              href="/about"
              className={`${linkClass} ${onHome ? "" : "text-ink"}`}
            >
              {t("nav.about")}
            </Link>
          </div>

          <div className="col-start-3 flex items-center justify-end gap-1 justify-self-end">
            <LanguageSelector />
            <PrimaryCtaButton variant="nav" />
            <button
              onClick={() => setMobileOpen(true)}
              aria-label={t("nav.menu")}
              className="rounded-full p-2 text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Wordmark />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={t("nav.close")}
                className="rounded-full p-2 text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
              >
                <ServicesNavMenu
                  linkClass={linkClass}
                  mobile
                  onNavigate={() => setMobileOpen(false)}
                />
              </motion.div>

              {sectionLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (i + 1) }}
                >
                  <SectionLink
                    onHome={onHome}
                    id={link.id}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-ink/10 py-4 font-display text-2xl font-bold text-ink"
                  >
                    {t(link.key)}
                  </SectionLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * (sectionLinks.length + 1) }}
              >
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block border-b border-ink/10 py-4 font-display text-2xl font-bold text-ink"
                >
                  {t("nav.about")}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-8"
              >
                <PrimaryCtaButton
                  variant="navMobile"
                  onClick={() => setMobileOpen(false)}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
