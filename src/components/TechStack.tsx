import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TechStack: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const technologies = [
    {
      category: t('techStack.categories.ai.title'),
      icon: "🧠",
      gradient: "from-purple-600 to-pink-600",
      techs: t('techStack.categories.ai.techs', { returnObjects: true }) as Array<{name: string, icon: string}>
    },
    {
      category: t('techStack.categories.backend.title'),
      icon: "⚙️",
      gradient: "from-cyan-500 to-blue-600",
      techs: t('techStack.categories.backend.techs', { returnObjects: true }) as Array<{name: string, icon: string}>
    },
    {
      category: t('techStack.categories.frontend.title'),
      icon: "🎨",
      gradient: "from-purple-500 to-cyan-500",
      techs: t('techStack.categories.frontend.techs', { returnObjects: true }) as Array<{name: string, icon: string}>
    },
    {
      category: t('techStack.categories.cloud.title'),
      icon: "☁️",
      gradient: "from-blue-500 to-purple-600",
      techs: t('techStack.categories.cloud.techs', { returnObjects: true }) as Array<{name: string, icon: string}>
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80
      }
    }
  };

  const techVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="tech" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1F] via-[#1A0B3E] to-[#0B0F1F]" />
      
      {/* Floating gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-full border border-purple-500/30 mb-4 sm:mb-6"
          >
            <span className="text-sm sm:text-base text-purple-300 font-medium">{t('techStack.badge')}</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 font-['Inter']">
            {t('techStack.title')}
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('techStack.subtitle')}
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
        >
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={categoryVariants}
              className="group relative"
            >
              {/* Category Card */}
              <div className="relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-purple-500/40 hover:scale-[1.02]">
                {/* Background gradient */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center mb-6 sm:mb-8">
                    <div className="text-3xl sm:text-4xl mr-3 sm:mr-4 transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {category.category}
                    </h3>
                  </div>
                  
                  {/* Technologies Grid */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {category.techs.map((tech, techIndex) => (
                                              <motion.div
                          key={techIndex}
                          variants={techVariants}
                          whileHover={{ 
                            scale: 1.1,
                            boxShadow: "0 10px 25px rgba(168, 85, 247, 0.3)"
                          }}
                          className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group/tech"
                        >
                          <span className="text-lg sm:text-xl group-hover/tech:scale-125 transition-transform duration-300">
                            {tech.icon}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover/tech:text-white transition-colors duration-300">
                            {tech.name}
                          </span>
                        </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Glow effect */}
                <div 
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          {/* Mobile - Simplified Stats */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { number: t('techStack.stats.technologies.value'), label: t('techStack.stats.technologies.label'), icon: "🚀" },
                { number: t('techStack.stats.uptime.value'), label: t('techStack.stats.uptime.label'), icon: "⚡" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="group p-4 bg-black/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-400 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop - Full Stats */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { number: t('techStack.stats.technologies.value'), label: t('techStack.stats.technologies.label'), icon: "🚀" },
              { number: t('techStack.stats.uptime.value'), label: t('techStack.stats.uptime.label'), icon: "⚡" },
              { number: t('techStack.stats.monitoring.value'), label: t('techStack.stats.monitoring.label'), icon: "🛡️" },
              { number: t('techStack.stats.quality.value'), label: t('techStack.stats.quality.label'), icon: "✨" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group p-6 lg:p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="text-3xl lg:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 group-hover:text-purple-300 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack; 