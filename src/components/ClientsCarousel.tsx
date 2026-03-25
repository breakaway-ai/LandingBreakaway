import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ClientsCarousel: React.FC = () => {
  const { t } = useTranslation();
  
  // Logos de clientes desde las traducciones
  const clientsData = t('clients.companies', { returnObjects: true }) as Array<{name: string, industry: string}>;
  
  const clients = [
    { ...clientsData[0], logo: "🏢" },
    { ...clientsData[1], logo: "🚀" },
    { ...clientsData[2], logo: "🌍" },
    { ...clientsData[3], logo: "⚡" },
    { ...clientsData[4], logo: "📊" },
    { ...clientsData[5], logo: "☁️" },
    { ...clientsData[6], logo: "🧠" },
    { ...clientsData[7], logo: "📈" },
    { ...clientsData[8], logo: "💎" },
    { ...clientsData[9], logo: "🔮" }
  ];

  // Duplicamos el array para hacer el carrusel infinito
  const duplicatedClients = [...clients, ...clients];

  return (
                    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
                  {/* Header */}
                  <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-full border border-purple-500/30 mb-4 sm:mb-6"
                    >
                      <span className="text-sm sm:text-base text-purple-300 font-medium">{t('clients.badge')}</span>
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
                    >
                      {t('clients.title')}
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto"
                    >
                      {t('clients.subtitle')}
                    </motion.p>
                  </div>

                        {/* Gradient Overlays */}
                  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-[#0B0F1F] to-transparent z-10" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-[#0B0F1F] to-transparent z-10" />

                  {/* Carrusel Infinito */}
                  <motion.div
                    className="flex space-x-4 sm:space-x-6 lg:space-x-8"
                    animate={{
                      x: [-50, -50 - (clients.length * 280)], // 280px = 256px width + 24px gap
                    }}
                    transition={{
                      x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: clients.length * 3, // 3 segundos por elemento
                        ease: "linear",
                      },
                    }}
                  >
                    {duplicatedClients.map((client, index) => (
                      <motion.div
                        key={`${client.name}-${index}`}
                        whileHover={{ 
                          scale: 1.05,
                          y: -5,
                          boxShadow: "0 25px 50px rgba(168, 85, 247, 0.3)"
                        }}
                        className="group min-w-[200px] sm:min-w-[240px] lg:min-w-[256px] h-24 sm:h-28 lg:h-32 bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden hover:border-purple-500/40 transition-all duration-500 cursor-pointer"
                      >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
                                    {/* Content */}
                        <div className="relative z-10 text-center">
                          {/* Logo */}
                          <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                            {client.logo}
                          </div>
                          
                          {/* Company Name */}
                          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                            {client.name}
                          </h3>
                          
                          {/* Industry */}
                          <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {client.industry}
                          </p>
                        </div>

            {/* Animated Border Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl" />
          </motion.div>
        ))}
      </motion.div>

                        {/* Mobile - Simplified Stats */}
                  <div className="md:hidden mt-8 sm:mt-12">
                    <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto px-4">
                      {[
                        { number: t('clients.stats.sectors.value'), label: t('clients.stats.sectors.label'), icon: "🏭" },
                        { number: t('clients.stats.activeClients.value'), label: t('clients.stats.activeClients.label'), icon: "🤝" }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="text-center group"
                        >
                          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                            {stat.icon}
                          </div>
                          <div className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
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
                  <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-16">
                    {[
                      { number: t('clients.stats.sectors.value'), label: t('clients.stats.sectors.label'), icon: "🏭" },
                      { number: t('clients.stats.activeClients.value'), label: t('clients.stats.activeClients.label'), icon: "🤝" },
                      { number: t('clients.stats.retentionRate.value'), label: t('clients.stats.retentionRate.label'), icon: "❤️" },
                      { number: t('clients.stats.globalSupport.value'), label: t('clients.stats.globalSupport.label'), icon: "🌐" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="text-center group"
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-400">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
    </div>
  );
};

export default ClientsCarousel; 