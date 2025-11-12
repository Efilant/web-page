'use client';

const skillCategories = [
  {
    title: 'Programlama & Çatılar',
    skills: ['Java', 'Python', 'C', 'HTML', 'CSS', 'JavaScript', 'React', 'Django', 'Tailwind CSS'],
  },
  {
    title: 'Tasarım & Dijital İçerik',
    skills: ['Canva (Grafik Tasarım)', 'CapCut (Sosyal Medya Görseli)', 'Wix Site Düzenleme', 'Yapay Zeka Araçları Kullanımı'],
  },
  {
    title: 'Proje & Liderlik',
    skills: ['Takım Liderliği', 'Etkinlik Proje Planlama', 'Mentorluk (43+ Öğrenci)', 'Halkla İlişkiler (PR)', 'Organizasyon'],
  },
  {
    title: 'Pazarlama & Strateji',
    skills: ['Sosyal Medya Pazarlaması', 'SEO Çalışmaları', 'Hedef Kitle Analizi'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen px-4 py-20 pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            Beceriler
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#EC4899]/50 transition-all duration-300"
            >
              <h3 className="font-heading text-lg font-bold text-[#EC4899] mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 text-sm bg-[#2A2A2A] text-[#E0E0E0]/80 border border-[#2A2A2A] rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

