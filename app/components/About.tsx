'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

const content = {
  tr: {
    kicker: 'Profil',
    title: 'Ben Kimim?',
    paragraphs: [
      "Kocaeli Üniversitesi Yazılım Mühendisliği 3. sınıf öğrencisiyim (2022 – devam). Yapay Zeka, Makine Öğrenmesi ve AI tabanlı yazılım geliştirme alanlarında derinleşiyorum.",
      'Python (Pandas, NumPy, Scikit-learn), C# ve modern web teknolojilerini kullanarak SaaS ürünleri, hava kalitesi analizleri ve sağlık uygulamaları gibi gerçek dünya problemlerini çözen projeler geliştiriyorum.',
      'KOU SAVTEK, Team Sirius, HYDROB ve Atatürk Robotics gibi robotik takımlarının ve teknoloji topluluklarının kurucusu/mentörü olarak 60\'tan fazla öğrenciye birebir mentorluk yaptım. Liderlik ve çevik proje yönetimi yeteneklerimi teknik becerilerimle birleştirerek yenilikçi AI projelerinde değer yaratmayı hedefliyorum.',
    ],
    highlights: [
      { label: 'Mentorluk', value: '60+ öğrenci' },
      { label: 'Odak', value: 'AI & ML' },
      { label: 'Araştırma', value: 'TÜBİTAK 2209-A' },
    ],
  },
  en: {
    kicker: 'Profile',
    title: 'Who Am I?',
    paragraphs: [
      "I'm a third-year Software Engineering student at Kocaeli University (2022 – present). I specialize in Artificial Intelligence, Machine Learning, and AI-powered software development.",
      'Using Python (Pandas, NumPy, Scikit-learn), C#, and modern web technologies, I build data-driven projects that solve real-world problems — including SaaS products, air quality analytics, and health applications.',
      'As founder and mentor of robotics teams and tech communities like KOU SAVTEK, Team Sirius, HYDROB, and Atatürk Robotics, I have mentored over 60 students one-on-one. I aim to combine leadership and agile project management with technical skills to create value in innovative AI projects.',
    ],
    highlights: [
      { label: 'Mentorship', value: '60+ students' },
      { label: 'Focus', value: 'AI & ML' },
      { label: 'Research', value: 'TÜBİTAK 2209-A' },
    ],
  },
};

export default function About() {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <section id="about" className="section-shell section-theme-about">
      <div className="max-w-5xl mx-auto section-panel p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="font-heading section-title">{t.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
          <div className="space-y-5 text-[#E6EEFF]/80 leading-relaxed">
            {t.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-base md:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex lg:flex-col gap-4"
          >
            {t.highlights.map((item) => (
              <div
                key={item.label}
                className="glass-card px-5 py-4 text-center min-w-[120px]"
              >
                <p className="text-2xl font-bold bg-gradient-to-r from-[#A855F7] to-[#22D3EE] bg-clip-text text-transparent">
                  {item.value}
                </p>
                <p className="text-xs text-[#E6EEFF]/50 mt-1 uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
