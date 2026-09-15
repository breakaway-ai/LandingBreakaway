"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  LINKEDIN_URL,
} from "@/config/site";
import Wordmark from "./Wordmark";

type NavLink = { key: string; id: string } | { key: string; href: "/about" };

const navLinks: NavLink[] = [
  { key: "nav.services", id: "services" },
  { key: "nav.process", id: "process" },
  { key: "nav.testimonials", id: "testimonials" },
  { key: "nav.about", href: "/about" },
];

const serviceLinks = [
  { key: "services.agentsTitle", id: "services" },
  { key: "services.automationsTitle", id: "services" },
  { key: "services.integrationsTitle", id: "services" },
  { key: "services.consultingTitle", id: "services" },
];

const linkClass =
  "font-mono text-[11px] text-ink-dim transition-colors hover:text-ink focus-visible:outline-none focus-visible:text-ink";

const headingClass = "label mb-4 text-ink/45";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const onHome = pathname === "/";

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <footer>
      <div className="mx-auto max-w-[1400px]  px-6 py-12 md:px-10 md:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
          {/* Col 1 — Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-[200px] font-display text-sm font-medium leading-snug text-ink-soft">
              {t("footer.slogan")}
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className={headingClass}>{t("footer.navTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={"href" in link ? link.href : sectionHref(link.id)}
                    className={linkClass}
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className={headingClass}>{t("footer.servicesTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link href={sectionHref(link.id)} className={linkClass}>
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className={headingClass}>{t("footer.contactTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`tel:+${CONTACT_PHONE}`} className={linkClass}>
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t("footer.linkedin")}
                </a>
              </li>
              <li>
                <address className="not-italic font-mono text-[11px] leading-relaxed text-ink-dim">
                  {CONTACT_ADDRESS.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          {/* Col 5 — Legal */}
          <div>
            <p className={headingClass}>{t("footer.legalTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/privacy" className={linkClass}>
                  {t("footer.policy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <p className="font-mono text-[11px] text-ink/40">
            {t("footer.copyright", { currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
