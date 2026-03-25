import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      setIsSubmitted(true);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('contactForm.errorSubmitFallback'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 sm:py-3.5 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-white/25 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all text-sm';

  return (
    <section id="contact" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('contactForm.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-dim text-base sm:text-lg max-w-2xl mx-auto"
          >
            {t('contactForm.subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-5 sm:p-8 lg:p-10"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary-light mb-1.5 sm:mb-2">
                {t('contactForm.labelName')}
              </label>
              <input
                type="text" id="name" name="name"
                value={formData.name} onChange={handleChange}
                required disabled={isSubmitting}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-light mb-1.5 sm:mb-2">
                {t('contactForm.labelEmail')}
              </label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                required disabled={isSubmitting}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-primary-light mb-1.5 sm:mb-2">
                {t('contactForm.labelCompany')}
              </label>
              <input
                type="text" id="company" name="company"
                value={formData.company} onChange={handleChange}
                disabled={isSubmitting}
                className={inputClasses}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-primary-light mb-1.5 sm:mb-2">
                {t('contactForm.labelPhone')}
              </label>
              <input
                type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleChange}
                disabled={isSubmitting}
                className={inputClasses}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-primary-light mb-1.5 sm:mb-2">
                {t('contactForm.labelMessage')}
              </label>
              <textarea
                id="message" name="message" rows={4}
                value={formData.message} onChange={handleChange}
                required disabled={isSubmitting}
                placeholder={t('contactForm.placeholderMessage')}
                className={`${inputClasses} resize-y`}
              />
            </div>

            <div className="md:col-span-2">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 sm:py-4 bg-primary hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-glow transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isSubmitting ? t('contactForm.buttonSubmitting') : t('contactForm.buttonSubmit')}
                {!isSubmitting && <Send size={16} />}
              </motion.button>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3 text-sm"
                >
                  <CheckCircle size={18} className="shrink-0" />
                  {t('contactForm.messageSuccess')}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 text-sm"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </motion.div>
              )}

              <p className="text-text-dim text-xs mt-3 sm:mt-4 text-center">{t('contactForm.privacyInfo')}</p>
            </div>
          </form>
        </motion.div>

        {/* Contact details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-10 sm:mt-12"
        >
          <a
            href="mailto:general@breakaway.work"
            className="flex items-center gap-3 text-text-dim hover:text-white transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors shrink-0">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">general@breakaway.work</span>
          </a>

          <div className="flex items-center gap-3 text-text-dim">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium">{t('contactForm.location')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
