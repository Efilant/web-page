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
    <section id="clubs" className="section-shell section-theme-clubs">
      <div className="max-w-7xl mx-auto section-panel p-6 md:p-10">
        <div className="mb-16">
          <span className="section-kicker">Community</span>
          <h2 className="font-heading section-title">
            Kulüpler & Takımlar
          </h2>
          <div className="section-divider"></div>
        </div>

        {/* Üniversite Kulüpleri */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#8EF4FF] mb-8">
            Üniversite Kulüpleri
          </h3>
          <div className="space-y-6">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="glass-card p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h4 className="font-heading text-xl md:text-2xl font-bold text-[#F5F7FF] mb-2">
                      {club.name}
                    </h4>
                    <p className="text-lg text-[#C084FC] mb-2">
                      {club.role}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {club.description.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-[#E6EEFF]/80 flex items-start text-sm md:text-base">
                          <span className="text-[#8EF4FF] mr-3 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <span className="inline-block px-3 py-1 text-xs bg-[#22D3EE]/15 text-[#8EF4FF] border border-[#22D3EE]/40 rounded">
                      Kulüp
                    </span>
                    <p className="text-sm text-[#E6EEFF]/65 mt-2">
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
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#C084FC] mb-8">
            Robotik Takımları
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roboticsTeams.map((team, index) => (
              <div
                key={index}
                className="glass-card p-6"
              >
                <h4 className="font-heading text-xl font-bold text-[#C084FC] mb-2">
                  {team.name}
                </h4>
                <p className="text-[#8EF4FF] mb-4 text-sm">
                  {team.role}
                </p>
                <ul className="space-y-2">
                  {team.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="text-[#E6EEFF]/80 text-sm flex items-start">
                      <span className="text-[#C084FC] mr-2">•</span>
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

