"use client";

import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/config/site";
import { PRODUCTS } from "@/config/products";
import { SERVICES } from "@/config/services";
import Wordmark from "./Wordmark";

const companyLinks = [
  { key: "nav.about", href: "/about" as const },
  { key: "nav.process", id: "process" },
  { key: "nav.testimonials", id: "testimonials" },
  { key: "footer.faq", href: "/faq" as const },
  { key: "footer.policy", href: "/privacy" as const },
] as const;

const linkClass =
  "font-mono text-[11px] text-ink-dim transition-colors hover:text-ink focus-visible:outline-none focus-visible:text-ink";

const iconLinkClass =
  "inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-dim transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30";

const headingClass = "label mb-4 text-ink/45";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const onHome = pathname === "/";

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <footer>
      <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-[200px] font-display text-sm font-medium leading-snug text-ink-soft">
              {t("footer.slogan")}
            </p>
          </div>

          {/* Producto */}
          <div>
            <p className={headingClass}>{t("footer.productsTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/products" className={linkClass}>
                  {t("nav.allProducts")}
                </Link>
              </li>
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className={linkClass}
                  >
                    {t(product.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <p className={headingClass}>{t("footer.servicesTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/services" className={linkClass}>
                  {t("nav.allServices")}
                </Link>
              </li>
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={linkClass}
                  >
                    {t(service.titleKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <p className={headingClass}>{t("footer.companyTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
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

          {/* Contacto */}
          <div>
            <p className={headingClass}>{t("footer.contactTitle")}</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link href="/contact" className={linkClass}>
                  {t("nav.cta")}
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-1">
                  <a
                    href={`tel:+${CONTACT_PHONE}`}
                    aria-label={CONTACT_PHONE_DISPLAY}
                    className={iconLinkClass}
                  >
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label={CONTACT_EMAIL}
                    className={iconLinkClass}
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.linkedin")}
                    className={iconLinkClass}
                  >
                    <Linkedin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.instagram")}
                    className={iconLinkClass}
                  >
                    <Instagram className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.facebook")}
                    className={iconLinkClass}
                  >
                    <Facebook className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                </div>
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
