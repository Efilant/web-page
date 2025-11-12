'use client';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string[];
  type?: 'work' | 'leadership' | 'volunteer';
}

const experiences: ExperienceItem[] = [
  {
    title: 'Sponsorluk Ekip Üyesi',
    company: 'KOU Yazılım Kulübü',
    period: 'Ağustos 2025 – Günümüz',
    type: 'volunteer',
    description: [
      'Şirketlerle iletişim kurarak iş birlikleri geliştirme',
      'Kulüp etkinlikleri için finansman sağlama sorumlulukları',
      'Sponsorluk stratejileri ve anlaşmaları yönetme',
    ],
  },
  {
    title: 'Sosyal Medya Uzmanı',
    company: 'New York Studio Dil Okulları',
    period: 'Temmuz 2024 – Günümüz',
    location: 'İstanbul',
    type: 'work',
    description: [
      'Markanın dijital görünürlüğünü artırma',
      'Sosyal medya stratejileri geliştirme',
      'Wix üzerinden web sitesi düzenleme',
      'SEO çalışmaları ve içerik üretimi',
    ],
  },
  {
    title: 'Kurucu & Mentor',
    company: 'Team Sirius',
    period: 'Haziran 2023 – Günümüz',
    type: 'leadership',
    description: [
      'Şile Ayet Azer Aran Savunma Sanayi Lisesi\'nde yeni bir FRC ekibi kurma',
      '35 öğrenciye halkla ilişkiler ve teknik konularda mentorluk',
      'Takım liderliği ve organizasyon yönetimi',
    ],
  },
  {
    title: 'Satış',
    company: 'AIESEC Kocaeli',
    period: 'Ekim 2022 – Temmuz 2023',
    type: 'volunteer',
    description: [
      'İş geliştirme takımında 10 ay boyunca gönüllü faaliyetler',
      'Satış ve iş geliştirme stratejileri',
    ],
  },
  {
    title: 'Mentor & Yazılım Kaptanı',
    company: 'Atatürk Robotics',
    period: 'Şubat 2022 – Temmuz 2023',
    type: 'leadership',
    description: [
      'Takımın kapanış sürecine kadar liderlik ve rehberlik',
      'Ekip çalışması ve yazılım alanlarında mentorluk',
      'Yazılım kaptanlığı görevleri',
    ],
  },
  {
    title: 'Kurucu & PR Kaptanı',
    company: 'Atatürk Robotics',
    period: 'Eylül 2019 – Mart 2022',
    type: 'leadership',
    description: [
      'Takımın kuruluşunu gerçekleştirme',
      'PR ve Yazılım Kaptanlığı görevlerini üstlenme',
      'Takım organizasyonu ve yönetimi',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen px-4 py-20 pt-32 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            Deneyim
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-[#2A2A2A]"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-20 md:pl-32">
                {/* Milestone Dot */}
                <div className="absolute left-6 md:left-10 top-2 w-4 h-4 bg-[#EC4899] rounded-full border-4 border-[#121212]"></div>
                
                <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#EC4899]/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-[#E0E0E0] mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-[#EC4899] mb-2">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-sm text-[#E0E0E0]/60 mb-2">
                          📍 {exp.location}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 md:mt-0 md:ml-4">
                      <span className={`inline-block px-3 py-1 text-xs rounded ${
                        exp.type === 'work' 
                          ? 'bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/30'
                          : exp.type === 'leadership'
                          ? 'bg-[#F9A8D4]/20 text-[#F9A8D4] border border-[#F9A8D4]/30'
                          : 'bg-[#E0E0E0]/20 text-[#E0E0E0]/80 border border-[#E0E0E0]/30'
                      }`}>
                        {exp.type === 'work' ? 'İş Deneyimi' : exp.type === 'leadership' ? 'Liderlik' : 'Gönüllülük'}
                      </span>
                      <p className="text-sm text-[#E0E0E0]/60 mt-2">
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-[#E0E0E0]/80 flex items-start text-sm md:text-base">
                        <span className="text-[#EC4899] mr-3 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

