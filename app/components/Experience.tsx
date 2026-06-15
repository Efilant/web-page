'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

interface ExperienceItem {
  title: { tr: string; en: string };
  company: string;
  period: { tr: string; en: string };
  location?: { tr: string; en: string };
  description: { tr: string[]; en: string[] };
  type: 'work' | 'leadership' | 'volunteer';
}

const experiences: ExperienceItem[] = [
  {
    title: { tr: 'Dijital İçerik ve LMS Sistem Yöneticisi', en: 'Digital Content & LMS System Administrator' },
    company: 'New York Studio of Languages',
    period: { tr: '2024 – Günümüz', en: '2024 – Present' },
    location: { tr: 'Uzaktan', en: 'Remote' },
    type: 'work',
    description: {
      tr: [
        'Moodle tabanlı TOEFL hazırlık platformunun uçtan uca sunucu kurulumu, veri tabanı yapılandırması ve AI destekli altsistem entegrasyonları',
        'Wix Velo / JavaScript ile web sitesi düzenlemeleri ve etkileşimli bileşenler; UX/UI optimizasyonları ile satış dönüşümlerini artırma',
        'AI araçları entegrasyonu ve SEO stratejileriyle organik görünürlüğü maksimize etme',
      ],
      en: [
        'End-to-end server setup, database configuration, and AI-powered subsystem integrations for a Moodle-based TOEFL prep platform',
        'Website edits and interactive components with Wix Velo/JavaScript; UX/UI optimizations to increase sales conversions',
        'AI tool integration and SEO strategies to maximize organic visibility',
      ],
    },
  },
  {
    title: { tr: 'Gönüllü Veri Bilimi Stajyeri', en: 'Volunteer Data Science Intern' },
    company: 'Lotus AI',
    period: { tr: 'Ocak 2025 – Mart 2025', en: 'January 2025 – March 2025' },
    location: { tr: 'Uzaktan', en: 'Remote' },
    type: 'work',
    description: {
      tr: [
        'Python ve KNIME ile veri ön işleme (ETL) süreçlerine destek',
        'Anomali tespiti ve makine öğrenmesi (regresyon, sınıflandırma) modelleme',
      ],
      en: [
        'Supported data preprocessing (ETL) with Python and KNIME',
        'Anomaly detection and machine learning modeling (regression, classification)',
      ],
    },
  },
  {
    title: { tr: 'Kurucu Ekip, Sayman ve Organizasyon Lideri', en: 'Founding Member, Treasurer & Organization Lead' },
    company: 'KOU SAVTEK',
    period: { tr: 'Kasım 2025 – Günümüz', en: 'November 2025 – Present' },
    type: 'leadership',
    description: {
      tr: ['Etkinlik yönetimi ve teknoloji ortaklıklarının kurulması'],
      en: ['Event management and establishing technology partnerships'],
    },
  },
  {
    title: { tr: 'Komite Üyesi & Gönüllü Koordinatörü', en: 'Committee Member & Volunteer Coordinator' },
    company: 'Fikret Yüksel Vakfı (FIRST/FTC Türkiye Planlama Komitesi)',
    period: { tr: '2023 – Günümüz', en: '2023 – Present' },
    type: 'volunteer',
    description: {
      tr: ["Türkiye'deki FRC/FTC yarışmalarının lojistik ve operasyon planlaması"],
      en: ['Logistics and operations planning for FRC/FTC competitions in Turkey'],
    },
  },
  {
    title: { tr: 'Kurucu ve Mentor', en: 'Founder & Mentor' },
    company: 'Team Sirius (FRC)',
    period: { tr: 'Haziran 2023 – Nisan 2026', en: 'June 2023 – April 2026' },
    type: 'leadership',
    description: {
      tr: [
        "60'tan fazla öğrenciye birebir mentörlük",
        'Uluslararası FRC yarışması koordinasyonu',
      ],
      en: [
        'One-on-one mentorship for over 60 students',
        'International FRC competition coordination',
      ],
    },
  },
  {
    title: { tr: 'Kurucu ve Mentor', en: 'Founder & Mentor' },
    company: 'HYDROB (FRC)',
    period: { tr: '2024 – 2025', en: '2024 – 2025' },
    type: 'leadership',
    description: {
      tr: ['30 öğrenciye teknik eğitim ve takım organizasyon kurulumu'],
      en: ['Technical training and team organization setup for 30 students'],
    },
  },
  {
    title: { tr: 'Kurucu, Yazılım Kaptanı ve Mentor', en: 'Founder, Software Captain & Mentor' },
    company: 'Atatürk Robotics (FRC)',
    period: { tr: '2019 – 2023', en: '2019 – 2023' },
    type: 'leadership',
    description: {
      tr: [
        'FRC, Robotex (Jüri Özel Ödülü) ve Teknofest yarışmalarında takım yönetimi',
        'STEAM eğitim atölyeleri düzenleme',
      ],
      en: [
        'Team management in FRC, Robotex (Jury Special Award), and Teknofest competitions',
        'Organizing STEAM education workshops',
      ],
    },
  },
];

const labels = {
  tr: {
    kicker: 'Yolculuk',
    title: 'Deneyim',
    work: 'İş Deneyimi',
    leadership: 'Liderlik',
    volunteer: 'Gönüllülük',
  },
  en: {
    kicker: 'Journey',
    title: 'Experience',
    work: 'Work',
    leadership: 'Leadership',
    volunteer: 'Volunteer',
  },
};

const typeStyles = {
  work: 'bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/40',
  leadership: 'bg-[#A855F7]/20 text-[#C084FC] border-[#A855F7]/40',
  volunteer: 'bg-[#334155]/35 text-[#CBD5E1] border-[#475569]/45',
};

export default function Experience() {
  const { language } = useLanguage();
  const t = labels[language];

  return (
    <section id="experience" className="section-shell section-theme-experience">
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
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[#A855F7] via-[#8B5CF6] to-[#22D3EE]/30" />

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-2.5 md:left-4 top-6 w-3 h-3 rounded-full bg-gradient-to-br from-[#A855F7] to-[#22D3EE] border-2 border-[#090B13] shadow-md shadow-[#A855F7]/30" />

                <div className="glass-card p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-heading text-lg md:text-xl font-bold text-[#F5F7FF]">
                        {exp.title[language]}
                      </h3>
                      <p className="text-[#C084FC] text-sm md:text-base mt-0.5">{exp.company}</p>
                      {exp.location && (
                        <p className="text-xs text-[#E6EEFF]/50 mt-1">{exp.location[language]}</p>
                      )}
                    </div>
                    <div className="shrink-0">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-xs rounded-full border font-medium ${typeStyles[exp.type]}`}
                      >
                        {t[exp.type]}
                      </span>
                      <p className="text-xs text-[#E6EEFF]/50 mt-2">{exp.period[language]}</p>
                    </div>
                  </div>

                  <ul className="space-y-1.5">
                    {exp.description[language].map((item, i) => (
                      <li key={i} className="text-sm text-[#E6EEFF]/75 flex items-start gap-2">
                        <span className="text-[#A855F7] mt-1 shrink-0">•</span>
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
