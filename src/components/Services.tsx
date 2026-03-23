import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Bot, Smartphone, Monitor, Server,
  Link, Wrench, Shield,
} from 'lucide-react';

const services = [
  { icon: Bot, titleKey: 'services.aiAgentsTitle', descKey: 'services.aiAgentsDesc', accent: 'from-primary to-accent', featured: true },
  { icon: Smartphone, titleKey: 'about.serviceMobileApps', descKey: 'services.mobileDesc', accent: 'from-primary to-primary-light' },
  { icon: Monitor, titleKey: 'about.serviceWebApps', descKey: 'services.webDesc', accent: 'from-accent to-primary' },
  { icon: Server, titleKey: 'about.serviceBackendSystems', descKey: 'services.backendDesc', accent: 'from-primary-light to-primary' },
  { icon: Link, titleKey: 'about.serviceApiIntegration', descKey: 'services.apiDesc', accent: 'from-primary to-accent' },
  { icon: Wrench, titleKey: 'about.serviceDevOps', descKey: 'services.devopsDesc', accent: 'from-accent to-primary-light' },
  { icon: Shield, titleKey: 'about.serviceSecurity', descKey: 'services.securityDesc', accent: 'from-primary to-primary-light' },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-surface" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('services.sectionTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-dim text-lg"
          >
            {t('services.sectionSubtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass-card p-7 group hover:bg-surface/60 transition-all duration-300 gradient-border ${
                  service.featured ? 'md:col-span-2 lg:col-span-1 lg:row-span-2' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} bg-opacity-20 flex items-center justify-center mb-5`}
                  style={{ background: `linear-gradient(135deg, rgba(138,79,255,0.15), rgba(0,229,255,0.15))` }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{t(service.titleKey)}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{t(service.descKey)}</p>

                {service.featured && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['NLP', 'RAG', 'Multi-Agent', 'LLM'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary-light border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
