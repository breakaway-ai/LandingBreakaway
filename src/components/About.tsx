import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Network, Brain, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function About() {
  const { t } = useTranslation();

  const features = [
    { icon: Network, titleKey: 'about.feature1Title', descKey: 'about.feature1Description' },
    { icon: Brain, titleKey: 'about.feature2Title', descKey: 'about.feature2Description' },
    { icon: Zap, titleKey: 'about.feature3Title', descKey: 'about.feature3Description' },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('about.mainTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-dim text-base sm:text-lg"
          >
            {t('about.mainSubtitle')}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Large card - Company Description */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 glass-card p-6 sm:p-8 lg:p-10 group hover:bg-surface/60 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Network className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{t('about.visualTitle')}</h3>
            </div>
            <p className="text-text-dim leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">{t('about.description1')}</p>
            <p className="text-text-dim leading-relaxed text-sm sm:text-base">{t('about.description2')}</p>
          </motion.div>

          {/* Stats card */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 flex flex-col justify-center items-center text-center gradient-border"
          >
            <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">15+</div>
            <div className="text-text-dim text-sm">{t('hero.stat1')}</div>
            <div className="w-12 h-px bg-gradient-primary my-3 sm:my-4" />
            <div className="text-4xl sm:text-5xl font-black gradient-text mb-2">100%</div>
            <div className="text-text-dim text-sm">{t('hero.stat2')}</div>
          </motion.div>

          {/* Feature cards */}
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-7 group hover:bg-surface/60 transition-colors gradient-border"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/25 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{t(feat.titleKey)}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{t(feat.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
