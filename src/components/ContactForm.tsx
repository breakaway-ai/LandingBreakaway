"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AlertCircle, Check } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";

const benefits = [
  "contactForm.benefit1",
  "contactForm.benefit2",
  "contactForm.benefit3",
] as const;

type FormData = {
  name: string;
  company: string;
  whatsapp: string;
  message: string;
};

const labelClassName =
  "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-dim/80";

type ContactFormProps = {
  /** Extra top padding when the form is the first content below the fixed navbar. */
  standalone?: boolean;
};

export default function ContactForm({ standalone = false }: ContactFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    whatsapp: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resetSubmittingState = () => setIsSubmitting(false);
    resetSubmittingState();
    window.addEventListener("pageshow", resetSubmittingState);
    return () => window.removeEventListener("pageshow", resetSubmittingState);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(30_000),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(t("contactForm.errorParse"));
      }

      if (!response.ok) {
        throw new Error(data.message || t("contactForm.errorSubmitFallback"));
      }

      setIsSubmitting(false);
      router.replace("/thank-you");
      return;
    } catch (err) {
      if (err instanceof DOMException && err.name === "TimeoutError") {
        setError(t("contactForm.errorSubmitFallback"));
      } else {
        setError(
          err instanceof Error
            ? err.message
            : t("contactForm.errorSubmitFallback"),
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={
        standalone
          ? "contact-grid-bg relative overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36"
          : "contact-grid-bg relative overflow-hidden py-20 sm:py-24 lg:py-28"
      }
    >
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-primary/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="max-w-lg text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-ink">
              {t("contactForm.titleLead")}{" "}
              <span className="text-primary">
                {t("contactForm.titleAccent")}
              </span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              {t("contactForm.subtitle")}
            </p>

            <ul className="mt-8 space-y-3.5">
              {benefits.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-wash">
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      className="text-primary"
                      aria-hidden
                    />
                  </span>
                  <span className="text-sm text-ink-soft">{t(key)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-[28px] bg-white px-6 py-8 shadow-card-lift ring-1 ring-ink/[0.06] sm:px-8 sm:py-9"
            >
              <div className="mb-7 text-center">
                <p className="text-lg font-semibold text-ink">
                  {t("contactForm.formCardTitle")}
                </p>
                <p className="mt-1 text-sm text-ink-dim">
                  {t("contactForm.formCardSubtitle")}
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClassName}>
                      {t("contactForm.labelName")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder={t("contactForm.placeholderName")}
                      className="field-minimal"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className={labelClassName}>
                      {t("contactForm.labelWhatsapp")}
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      autoComplete="tel"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder={t("contactForm.placeholderWhatsapp")}
                      className="field-minimal"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className={labelClassName}>
                    {t("contactForm.labelCompany")}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder={t("contactForm.placeholderCompany")}
                    className="field-minimal"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClassName}>
                    {t("contactForm.labelMessage")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    placeholder={t("contactForm.placeholderMessage")}
                    className="field-minimal resize-none"
                  />
                </div>
              </div>

              <div className="mt-7">
                <div className="relative">
                  {!isSubmitting && !prefersReducedMotion && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/35 blur-lg animate-cta-glow"
                    />
                  )}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={
                      !isSubmitting && !prefersReducedMotion
                        ? { y: -2, scale: 1.01 }
                        : undefined
                    }
                    whileTap={
                      !isSubmitting && !prefersReducedMotion
                        ? { y: 0, scale: 0.98 }
                        : undefined
                    }
                    animate={
                      isSubmitting && !prefersReducedMotion
                        ? { opacity: [1, 0.72, 1] }
                        : { opacity: 1 }
                    }
                    transition={
                      isSubmitting
                        ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                        : { type: "spring", stiffness: 420, damping: 28 }
                    }
                    className="relative w-full rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-white shadow-glow-primary transition-colors hover:bg-primary-bright disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? t("contactForm.buttonSubmitting")
                      : t("contactForm.buttonSubmit")}
                  </motion.button>
                </div>

                {error && (
                  <motion.div
                    role="alert"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 flex items-center gap-3 rounded-xl bg-red-50 p-3.5 text-xs text-red-700 ring-1 ring-red-200"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                  </motion.div>
                )}

                <p className="mt-4 text-center font-mono text-[10px] leading-relaxed text-ink-dim/70">
                  {t.rich("contactForm.privacyInfo", {
                    policy: (chunks) => (
                      <Link
                        href="/privacy"
                        className="underline decoration-ink/20 underline-offset-2 transition-colors hover:text-ink"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
