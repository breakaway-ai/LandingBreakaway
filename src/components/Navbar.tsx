"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSelector from "./LanguageSelector";
import PrimaryCtaButton from "./PrimaryCtaButton";
import { LAYOUT_MAX } from "@/lib/layout";
import Wordmark from "./Wordmark";

const sectionLinks = [
  { key: "nav.services", id: "services" },
  { key: "nav.process", id: "process" },
  { key: "nav.benefits", id: "benefits" },
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
        className="fixed inset-x-0 top-3.5 z-50 flex justify-center"
      >
        <motion.nav
          initial={false}
          transition={morph}
          animate={{
            width: scrolled ? fullWidth : islandWidth,
            borderRadius: scrolled ? 0 : ISLAND_RADIUS,
          }}
          className={`grid grid-cols-[1fr_auto_1fr] items-center bg-surface/90 py-2 backdrop-blur-md ${
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

          <div className="col-start-2 hidden items-center gap-7 justify-self-center md:flex">
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
              {sectionLinks.map((link, i) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
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
                transition={{ delay: 0.05 * sectionLinks.length }}
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
