import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ClientsCarousel from './ClientsCarousel';

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.testimonial1.name'),
      position: t('testimonials.testimonial1.position'),
      company: t('testimonials.testimonial1.company'),
      image: "👩‍💼",
      quote: t('testimonials.testimonial1.quote'),
      rating: 5,
      results: t('testimonials.testimonial1.results', { returnObjects: true }) as string[]
    },
    {
      id: 2,
      name: t('testimonials.testimonial2.name'),
      position: t('testimonials.testimonial2.position'),
      company: t('testimonials.testimonial2.company'),
      image: "👨‍💼",
      quote: t('testimonials.testimonial2.quote'),
      rating: 5,
      results: t('testimonials.testimonial2.results', { returnObjects: true }) as string[]
    },
    {
      id: 3,
      name: t('testimonials.testimonial3.name'),
      position: t('testimonials.testimonial3.position'),
      company: t('testimonials.testimonial3.company'),
      image: "👩‍💼",
      quote: t('testimonials.testimonial3.quote'),
      rating: 5,
      results: t('testimonials.testimonial3.results', { returnObjects: true }) as string[]
    },
    {
      id: 4,
      name: t('testimonials.testimonial4.name'),
      position: t('testimonials.testimonial4.position'),
      company: t('testimonials.testimonial4.company'),
      image: "👨‍💼",
      quote: t('testimonials.testimonial4.quote'),
      rating: 5,
      results: t('testimonials.testimonial4.results', { returnObjects: true }) as string[]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80
      }
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1F] via-[#1A0B3E] to-[#0B0F1F]" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
            <span className="text-sm sm:text-base text-purple-300 font-medium">{t('testimonials.badge')}</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 font-['Inter']">
            {t('testimonials.title')}
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-cyan-500/5" />
                
                {/* Quote */}
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl lg:text-6xl text-purple-400 mb-4 sm:mb-6 opacity-50">"</div>
                  <p className="text-lg sm:text-xl lg:text-2xl text-white mb-6 sm:mb-8 leading-relaxed font-light italic">
                    {currentTestimonial.quote}
                  </p>
                  
                  {/* Client Info */}
                  <div className="flex items-center justify-center mb-6 sm:mb-8">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mr-3 sm:mr-4">{currentTestimonial.image}</div>
                    <div className="text-left">
                      <h4 className="text-lg sm:text-xl font-bold text-white">{currentTestimonial.name}</h4>
                      <p className="text-sm sm:text-base text-purple-300">{currentTestimonial.position}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{currentTestimonial.company}</p>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex justify-center mb-8">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-2xl text-yellow-400">⭐</span>
                    ))}
                  </div>
                  
                  {/* Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {currentTestimonial.results.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-purple-600/10 rounded-xl p-3 sm:p-4 border border-purple-500/20"
                      >
                        <div className="text-sm sm:text-base lg:text-lg font-semibold text-purple-300">{result}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <motion.button
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center text-white hover:bg-purple-600/30 transition-all duration-300"
              >
                ←
              </motion.button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-purple-500 scale-125' 
                        : 'bg-purple-500/30 hover:bg-purple-500/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              
              <motion.button
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center text-white hover:bg-purple-600/30 transition-all duration-300"
              >
                →
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Clients Carousel */}
        <ClientsCarousel />

        {/* Stats Section */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          {/* Mobile - Simplified Stats */}
          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { number: t('testimonials.stats.projects.value'), label: t('testimonials.stats.projects.label'), icon: "🚀" },
                { number: t('testimonials.stats.retention.value'), label: t('testimonials.stats.retention.label'), icon: "❤️" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
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
              { number: t('testimonials.stats.projects.value'), label: t('testimonials.stats.projects.label'), icon: "🚀" },
              { number: t('testimonials.stats.retention.value'), label: t('testimonials.stats.retention.label'), icon: "❤️" },
              { number: t('testimonials.stats.savings.value'), label: t('testimonials.stats.savings.label'), icon: "💰" },
              { number: t('testimonials.stats.support.value'), label: t('testimonials.stats.support.label'), icon: "🛡️" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group p-6 lg:p-8 bg-black/20 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="text-3xl lg:text-4xl mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
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

export default Testimonials; 