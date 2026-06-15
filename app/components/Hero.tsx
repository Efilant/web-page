'use client';

import { motion } from 'framer-motion';
import type { SiteContent } from '@/lib/siteContent';
import { useLanguage } from './LanguageProvider';

interface HeroProps {
  content: SiteContent;
}

const labels = {
  tr: { featured: 'Öne Çıkan' },
  en: { featured: 'Featured' },
};

export default function Hero({ content }: HeroProps) {
  const { language } = useLanguage();
  const t = labels[language];
  const featuredHighlights = content.highlights.filter((item) => item.featured);

  return (
    <section
      id="home"
      className="section-shell section-theme-hero min-h-screen flex items-center justify-center pt-16 lg:pt-0"
    >
      <div className="max-w-5xl w-full">
        <div className="section-panel p-8 md:p-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 w-full"
          >
            <video
              className="w-full max-w-4xl mx-auto aspect-video rounded-2xl object-cover object-center"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-label={language === 'tr' ? 'Elif Altun tanıtım videosu' : 'Elif Altun intro video'}
            >
              <source src="/hero-intro.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-[#F5F7FF] via-[#C084FC] to-[#22D3EE] bg-clip-text text-transparent">
              {content.heroTitle[language]}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#A855F7]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#EC4899]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-[#C084FC] font-medium mb-6"
          >
            {content.heroRoles[language].join(' · ')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-[#E6EEFF]/75 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {content.heroDescription[language]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href={content.primaryCtaHref}
              className="px-7 py-3 bg-gradient-to-r from-[#A855F7] to-[#22D3EE] text-white rounded-xl font-medium hover:brightness-110 transition-all shadow-lg shadow-[#A855F7]/25"
            >
              {content.primaryCtaText[language]}
            </a>
            <a
              href={content.secondaryCtaHref}
              download
              className="px-7 py-3 border border-[#A855F7]/60 text-[#C084FC] rounded-xl font-medium hover:bg-[#A855F7]/10 transition-all"
            >
              {content.secondaryCtaText[language]}
            </a>
          </motion.div>

          {featuredHighlights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="grid md:grid-cols-2 gap-4 mt-10 text-left"
            >
              {featuredHighlights.map((item) => (
                <article key={item.id} className="glass-card p-5">
                  <p className="text-xs text-[#22D3EE] uppercase tracking-wider mb-2 font-semibold">
                    {t.featured}
                  </p>
                  <h3 className="font-heading text-base font-bold text-[#F5F7FF] mb-1">
                    {item.title[language]}
                  </h3>
                  <p className="text-sm text-[#E6EEFF]/65">{item.description[language]}</p>
                </article>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
