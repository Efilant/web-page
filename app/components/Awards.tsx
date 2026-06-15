'use client';

interface AwardItem {
  title: string;
  organization: string;
  year: string;
  description?: string;
  location?: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
}

const awards: AwardItem[] = [
  {
    title: 'Entrepreneurship Award',
    organization: 'FRC 2020 Bosphorus Regional',
    year: '2020',
    location: 'Türkiye',
  },
  {
    title: 'Jury Special Award & Dance Award',
    organization: 'Robotex Turkey 2022',
    year: '2022',
    location: 'Türkiye',
  },
  {
    title: 'Finalist Award',
    organization: 'FRC 2023',
    year: '2023',
    location: 'Türkiye',
  },
  {
    title: 'Rookie Design Award',
    organization: 'FRC 2021',
    year: '2021',
    location: 'Türkiye',
  },
  {
    title: 'Rookie Changer Award',
    organization: 'FRC 2021',
    year: '2021',
    location: 'Türkiye',
  },
];

const certifications: CertificationItem[] = [
  {
    name: 'CyberStart Sertifikası',
    issuer: 'IBM ile Kodluyoruz',
    year: '2023',
  },
  {
    name: 'FRC Mentor Sertifikası',
    issuer: 'FIRST Robotics Competition',
    year: '2023',
  },
  {
    name: 'FRC Volunteer Sertifikası',
    issuer: 'FIRST Robotics Competition',
    year: '2023',
  },
];

export default function Awards() {
  return (
    <section id="awards" className="section-shell section-theme-awards">
      <div className="max-w-7xl mx-auto section-panel p-6 md:p-10">
        <div className="mb-16">
          <span className="section-kicker">Recognition</span>
          <h2 className="font-heading section-title">
            Ödüller ve Tanınmalar
          </h2>
          <div className="section-divider"></div>
        </div>

        {/* Ödüller */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#8EF4FF] mb-8">
            Ödüller
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="glass-card p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-xl font-bold text-[#F5F7FF] flex-1">
                    {award.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-[#22D3EE]/20 text-[#8EF4FF] border border-[#22D3EE]/35 rounded">
                    {award.year}
                  </span>
                </div>
                
                <p className="text-[#C084FC] mb-2 text-sm">
                  {award.organization}
                </p>
                
                {award.location && (
                  <p className="text-[#E6EEFF]/60 text-xs mb-2">
                    📍 {award.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sertifikalar */}
        <div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#C084FC] mb-8">
            Sertifikalar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="glass-card p-6"
              >
                <h4 className="font-heading text-lg font-bold text-[#F5F7FF] mb-2">
                  {cert.name}
                </h4>
                <p className="text-[#8EF4FF] mb-2 text-sm">
                  {cert.issuer}
                </p>
                <p className="text-[#E6EEFF]/60 text-xs">
                  {cert.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

