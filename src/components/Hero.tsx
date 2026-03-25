import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { ArrowRight, Bot, Cpu, Network, Database, Workflow } from 'lucide-react';

interface AgentCardProps {
  icon: typeof Bot;
  label: string;
  x: string;
  y: string;
  delay: number;
  size?: 'sm' | 'md' | 'lg';
  floatDuration?: number;
  floatDistance?: number;
}

function AgentCard({ icon: Icon, label, x, y, delay, size = 'md', floatDuration = 5, floatDistance = 8 }: AgentCardProps) {
  const sizes = {
    sm: { card: 'w-11 h-11 sm:w-12 sm:h-12', icon: 14, text: 'text-[8px] sm:text-[9px]' },
    md: { card: 'w-12 h-12 sm:w-14 sm:h-14', icon: 18, text: 'text-[9px] sm:text-[10px]' },
    lg: { card: 'w-14 h-14 sm:w-[72px] sm:h-[72px]', icon: 22, text: 'text-[10px] sm:text-xs' },
  };
  const s = sizes[size];

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 120, damping: 18 }}
    >
      <motion.div
        animate={{ y: [-floatDistance / 2, floatDistance / 2, -floatDistance / 2] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`${s.card} rounded-2xl glass-card flex items-center justify-center shadow-glow/30`}>
          <Icon className="text-primary" size={s.icon} />
        </div>
      </motion.div>
      <span className={`${s.text} text-text-muted font-medium whitespace-nowrap`}>{label}</span>
    </motion.div>
  );
}

function Particle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary hidden sm:block"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 3 + delay, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(138,79,255,0.4) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(138,79,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Text Content - always first on mobile */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-primary-light">{t('hero.badge')}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-5 sm:mb-6"
          >
            <Trans i18nKey="hero.title">
              Empodera tu Negocio con
              <span className="gradient-text"> Agentes Inteligentes</span>
            </Trans>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-text-dim max-w-lg mx-auto lg:mx-0 mb-7 sm:mb-8 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 justify-center lg:justify-start"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full shadow-glow transition-colors text-sm sm:text-base"
            >
              {t('hero.cta')}
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/5 transition-colors text-sm sm:text-base"
            >
              {t('hero.secondary')}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 sm:gap-8 justify-center lg:justify-start"
          >
            {[
              { value: '15+', label: t('hero.stat1') },
              { value: '100%', label: t('hero.stat2') },
              { value: '80%', label: t('hero.stat3') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-text-dim mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Illustration - Floating Agent Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[260px] sm:h-[350px] lg:h-[500px] hidden sm:block"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-primary/15 rounded-full blur-[80px]" />
          <div className="absolute top-1/3 left-1/3 w-24 sm:w-32 h-24 sm:h-32 bg-accent/10 rounded-full blur-[60px]" />

          <Particle x="20%" y="15%" size={4} delay={0} />
          <Particle x="75%" y="10%" size={3} delay={0.5} />
          <Particle x="85%" y="45%" size={5} delay={1} />
          <Particle x="10%" y="70%" size={3} delay={1.5} />
          <Particle x="65%" y="80%" size={4} delay={0.8} />
          <Particle x="40%" y="5%" size={3} delay={2} />
          <Particle x="90%" y="75%" size={3} delay={1.2} />

          <AgentCard icon={Network} label={t('hero.nodeMain')} x="50%" y="45%" delay={0.5} size="lg" floatDuration={6} floatDistance={6} />
          <AgentCard icon={Bot} label={t('hero.nodeAgent1')} x="20%" y="18%" delay={0.7} size="md" floatDuration={5} floatDistance={10} />
          <AgentCard icon={Cpu} label={t('hero.nodeAgent2')} x="78%" y="15%" delay={0.85} size="md" floatDuration={4.5} floatDistance={9} />
          <AgentCard icon={Database} label={t('hero.nodeAgent3')} x="15%" y="70%" delay={1.0} size="md" floatDuration={5.5} floatDistance={8} />
          <AgentCard icon={Workflow} label={t('hero.nodeAgent4')} x="82%" y="65%" delay={1.15} size="md" floatDuration={4.8} floatDistance={11} />
          <AgentCard icon={Bot} label={t('hero.nodeAgent5')} x="48%" y="85%" delay={1.3} size="sm" floatDuration={5.2} floatDistance={7} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
