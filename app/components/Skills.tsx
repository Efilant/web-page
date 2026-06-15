'use client';

import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

const skillCategories = {
  tr: [
    {
      title: 'Programlama Dilleri',
      skills: ['Python', 'SQL', 'C#', 'JavaScript', 'Java', 'C', 'C++', 'Dart'],
      gradient: 'from-[#A855F7] to-[#8B5CF6]',
    },
    {
      title: 'Araçlar & Teknolojiler',
      skills: [
        'Django', 'Streamlit', 'Pandas', 'NumPy', 'Scikit-learn',
        'Matplotlib', 'Seaborn', 'Git', 'GitHub', 'MySQL', 'PostgreSQL',
        'SQLite', 'MongoDB', 'Redis', 'Celery', 'HTML/CSS', 'Flutter',
      ],
      gradient: 'from-[#8B5CF6] to-[#22D3EE]',
    },
    {
      title: 'Yöntemler',
      skills: [
        'Regresyon', 'Sınıflandırma', 'Kümeleme', 'Model Geliştirme',
        'Prompt Engineering', 'RESTful API', 'ETL', 'EDA',
      ],
      gradient: 'from-[#22D3EE] to-[#EC4899]',
    },
    {
      title: 'Kişisel Yetkinlikler',
      skills: ['Liderlik', 'Mentörlük', 'Çevik Proje Yönetimi', 'İngilizce (B1+)'],
      gradient: 'from-[#EC4899] to-[#A855F7]',
    },
  ],
  en: [
    {
      title: 'Programming Languages',
      skills: ['Python', 'SQL', 'C#', 'JavaScript', 'Java', 'C', 'C++', 'Dart'],
      gradient: 'from-[#A855F7] to-[#8B5CF6]',
    },
    {
      title: 'Tools & Technologies',
      skills: [
        'Django', 'Streamlit', 'Pandas', 'NumPy', 'Scikit-learn',
        'Matplotlib', 'Seaborn', 'Git', 'GitHub', 'MySQL', 'PostgreSQL',
        'SQLite', 'MongoDB', 'Redis', 'Celery', 'HTML/CSS', 'Flutter',
      ],
      gradient: 'from-[#8B5CF6] to-[#22D3EE]',
    },
    {
      title: 'Methods',
      skills: [
        'Regression', 'Classification', 'Clustering', 'Model Development',
        'Prompt Engineering', 'RESTful API', 'ETL', 'EDA',
      ],
      gradient: 'from-[#22D3EE] to-[#EC4899]',
    },
    {
      title: 'Soft Skills',
      skills: ['Leadership', 'Mentorship', 'Agile Project Management', 'English (B1+)'],
      gradient: 'from-[#EC4899] to-[#A855F7]',
    },
  ],
};

const labels = {
  tr: { kicker: 'Yetkinlikler', title: 'Beceriler' },
  en: { kicker: 'Capabilities', title: 'Skills' },
};

export default function Skills() {
  const { language } = useLanguage();
  const categories = skillCategories[language];
  const t = labels[language];

  return (
    <section id="skills" className="section-shell section-theme-skills">
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

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card p-6 relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient}`}
              />
              <h3 className="font-heading text-base font-bold text-[#F5F7FF] mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs neo-chip hover:border-[#A855F7]/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
