import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Layers, Settings, GitBranch, TrendingUp } from 'lucide-react';

const steps = [
  { icon: Search, titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Description' },
  { icon: Layers, titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Description' },
  { icon: Settings, titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Description' },
  { icon: GitBranch, titleKey: 'howItWorks.step4Title', descKey: 'howItWorks.step4Description' },
  { icon: TrendingUp, titleKey: 'howItWorks.step5Title', descKey: 'howItWorks.step5Description' },
];

export default function Process() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="process" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6" ref={containerRef}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            {t('howItWorks.sectionTitle')}
          </motion.h2>
        </div>

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-white/5">
            <motion.div
              className="w-full bg-gradient-to-b from-primary to-accent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`relative flex items-start gap-6 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Step number circle */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-glow">
                      {i + 1}
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-16 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'lg:pr-0' : 'lg:pl-0'
                  }`}>
                    <div className="glass-card p-6 hover:bg-surface/60 transition-colors group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{t(step.titleKey)}</h3>
                      </div>
                      <p className="text-text-dim text-sm leading-relaxed">{t(step.descKey)}</p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden lg:block lg:w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
