'use client';

interface ClubItem {
  name: string;
  role: string;
  period: string;
  description: string[];
}

const clubs: ClubItem[] = [
  {
    name: 'KOU YAZILIM KULÜBÜ',
    role: 'Aktif Üye',
    period: '2022 - Devam Ediyor',
    description: [
      'Yazılım etkinlikleri ve workshop organizasyonları',
      'Teknik bilgi paylaşımı ve mentorluk',
      'Kulüp içi proje geliştirme ve işbirlikleri',
    ],
  },
];

const roboticsTeams = [
  {
    name: 'Atatürk Robotics',
    role: 'Kurucu & Mentor',
    achievements: ['FRC yarışmaları', 'Takım liderliği'],
  },
  {
    name: 'Team Sirius',
    role: 'Kurucu & Mentor',
    achievements: ['Robotex yarışmaları', '50+ öğrenciye mentorluk'],
  },
  {
    name: 'HYDROB',
    role: 'Kurucu & Mentor',
    achievements: ['Teknofest yarışmaları', 'Türkiye ve Estonya ödülleri'],
  },
];

export default function Clubs() {
  return (
    <section id="clubs" className="min-h-screen px-4 py-20 pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            Kulüpler & Takımlar
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        {/* Üniversite Kulüpleri */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#F9A8D4] mb-8">
            Üniversite Kulüpleri
          </h3>
          <div className="space-y-6">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#F9A8D4]/50 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h4 className="font-heading text-xl md:text-2xl font-bold text-[#E0E0E0] mb-2">
                      {club.name}
                    </h4>
                    <p className="text-lg text-[#EC4899] mb-2">
                      {club.role}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {club.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-[#E0E0E0]/80 flex items-start text-sm md:text-base">
                          <span className="text-[#F9A8D4] mr-3 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <span className="inline-block px-3 py-1 text-xs bg-[#F9A8D4]/20 text-[#F9A8D4] border border-[#F9A8D4]/30 rounded">
                      Kulüp
                    </span>
                    <p className="text-sm text-[#E0E0E0]/60 mt-2">
                      {club.period}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Robotik Takımları */}
        <div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#EC4899] mb-8">
            Robotik Takımları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roboticsTeams.map((team, index) => (
              <div
                key={index}
                className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#EC4899]/50 hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="font-heading text-xl font-bold text-[#EC4899] mb-2">
                  {team.name}
                </h4>
                <p className="text-[#F9A8D4] mb-4 text-sm">
                  {team.role}
                </p>
                <ul className="space-y-2">
                  {team.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="text-[#E0E0E0]/80 text-sm flex items-start">
                      <span className="text-[#EC4899] mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

