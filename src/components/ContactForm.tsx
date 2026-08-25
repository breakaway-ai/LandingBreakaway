import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';

const fields = [
  { name: 'name', labelKey: 'contactForm.labelName', type: 'text', required: true },
  { name: 'email', labelKey: 'contactForm.labelEmail', type: 'email', required: true },
  { name: 'company', labelKey: 'contactForm.labelCompany', type: 'text', required: false },
  { name: 'phone', labelKey: 'contactForm.labelPhone', type: 'tel', required: false },
] as const;

export default function ContactForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resetSubmittingState = () => setIsSubmitting(false);
    resetSubmittingState();
    window.addEventListener('pageshow', resetSubmittingState);
    return () => window.removeEventListener('pageshow', resetSubmittingState);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: AbortSignal.timeout(30_000),
      });

      const text = await response.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(t('contactForm.errorParse'));
      }

      if (!response.ok) {
        throw new Error(data.message || t('contactForm.errorSubmitFallback'));
      }

      setIsSubmitting(false);
      navigate('/thank-you', { replace: true });
      return;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'TimeoutError') {
        setError(t('contactForm.errorSubmitFallback'));
      } else {
        setError(err instanceof Error ? err.message : t('contactForm.errorSubmitFallback'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-night py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="max-w-sm text-[1.75rem] leading-[1.15] text-white sm:text-4xl">
              {t('contactForm.title')}
            </h2>
            <p className="mt-5 max-w-md font-mono text-xs leading-relaxed text-white/50 sm:text-[12.5px]">
              {t('contactForm.subtitle')}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <a
                href="mailto:general@breakaway.work"
                className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] px-4 py-2.5 font-mono text-[11px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary-soft" />
                general@breakaway.work
              </a>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block font-mono text-[11px] text-white/50"
                >
                  {t(field.labelKey)}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  disabled={isSubmitting}
                  className="field"
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block font-mono text-[11px] text-white/50">
                {t('contactForm.labelMessage')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder={t('contactForm.placeholderMessage')}
                className="field resize-y"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t('contactForm.buttonSubmitting') : t('contactForm.buttonSubmit')}
              </button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-3 rounded-xl bg-red-500/10 p-3.5 text-xs text-red-300 ring-1 ring-red-500/20"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              <p className="mt-4 font-mono text-[10px] leading-relaxed text-white/35">
                {t('contactForm.privacyInfo')}
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
