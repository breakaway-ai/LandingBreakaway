import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Bot, TrendingDown, Rocket,
  Brain, Settings, Workflow,
} from 'lucide-react';

const benefits = [
  { icon: Bot, titleKey: 'benefits.benefit1Title', descKey: 'benefits.benefit1Description' },
  { icon: TrendingDown, titleKey: 'benefits.benefit2Title', descKey: 'benefits.benefit2Description' },
  { icon: Rocket, titleKey: 'benefits.benefit3Title', descKey: 'benefits.benefit3Description' },
  { icon: Brain, titleKey: 'benefits.benefit4Title', descKey: 'benefits.benefit4Description' },
  { icon: Settings, titleKey: 'benefits.benefit5Title', descKey: 'benefits.benefit5Description' },
  { icon: Workflow, titleKey: 'benefits.benefit6Title', descKey: 'benefits.benefit6Description' },
];

export default function Benefits() {
  const { t } = useTranslation();

  return (
    <section id="benefits" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-surface" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('benefits.sectionTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-dim text-base sm:text-lg"
          >
            {t('benefits.sectionSubtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 sm:p-7 group hover:bg-surface/60 transition-all duration-300 gradient-border"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{t(benefit.titleKey)}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{t(benefit.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
