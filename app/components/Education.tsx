'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

interface EducationItem {
  degree: { tr: string; en: string };
  institution: string;
  period: { tr: string; en: string };
  location: { tr: string; en: string };
  details: { tr: string[]; en: string[] };
  type: 'university' | 'certification';
}

const education: EducationItem[] = [
  {
    degree: { tr: 'Yazılım Mühendisliği Lisans', en: 'B.S. Software Engineering' },
    institution: 'Kocaeli Üniversitesi',
    period: { tr: '2022 – Devam Ediyor', en: '2022 – Present' },
    location: { tr: 'Kocaeli, Türkiye', en: 'Kocaeli, Turkey' },
    type: 'university',
    details: {
      tr: [
        '3. sınıf öğrencisi; yapay zeka, makine öğrenmesi ve veri odaklı yazılım geliştirme alanlarına odaklanıyorum',
        'İlgili dersler: Veri Yapıları, Algoritmalar, Nesne Yönelimli Programlama, Veritabanı Sistemleri, Yapay Zeka',
        'TÜBİTAK 2209-A destekli Dijital Gebelik Takibi projesinde akademik araştırma deneyimi',
      ],
      en: [
        'Third-year student focused on artificial intelligence, machine learning, and data-driven software development',
        'Relevant coursework: Data Structures, Algorithms, OOP, Database Systems, Artificial Intelligence',
        'Academic research experience on the TÜBİTAK 2209-A funded Digital Pregnancy Tracking project',
      ],
    },
  },
];

const labels = {
  tr: {
    kicker: 'Akademik',
    title: 'Eğitim',
    university: 'Üniversite',
    certification: 'Sertifika',
  },
  en: {
    kicker: 'Academic',
    title: 'Education',
    university: 'University',
    certification: 'Certification',
  },
};

const typeStyles = {
  university: 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/40',
  certification: 'bg-[#A855F7]/20 text-[#C084FC] border-[#A855F7]/40',
};

export default function Education() {
  const { language } = useLanguage();
  const t = labels[language];

  return (
    <section id="education" className="section-shell section-theme-education">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="font-heading section-title">{t.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#22D3EE] via-[#60A5FA] to-[#A855F7]/30" />

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-2.5 md:left-4 top-6 w-3 h-3 rounded-full bg-gradient-to-br from-[#22D3EE] to-[#60A5FA] border-2 border-[#090B13] shadow-md shadow-[#22D3EE]/30" />

                <div className="glass-card p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-heading text-lg md:text-xl font-bold text-[#F5F7FF]">
                        {edu.degree[language]}
                      </h3>
                      <p className="text-[#8EF4FF] text-sm md:text-base mt-0.5">{edu.institution}</p>
                      <p className="text-xs text-[#E6EEFF]/50 mt-1">{edu.location[language]}</p>
                    </div>
                    <div className="shrink-0">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs rounded-full border font-medium ${typeStyles[edu.type]}`}
                      >
                        {t[edu.type]}
                      </span>
                      <p className="text-xs text-[#E6EEFF]/50 mt-2">{edu.period[language]}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {edu.details[language].map((item, i) => (
                      <li key={i} className="text-sm text-[#E6EEFF]/75 flex items-start gap-2">
                        <span className="text-[#22D3EE] mt-1 shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
