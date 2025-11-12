'use client';

interface VolunteeringItem {
  organization: string;
  role: string;
  period: string;
  description: string[];
}

const volunteering: VolunteeringItem[] = [
  {
    organization: 'Fikret Yüksel Vakfı',
    role: 'Gönüllü Aktif Üye',
    period: '2023 - Devam Ediyor',
    description: [
      'Sosyal sorumluluk projelerinde aktif rol alma',
      'Toplumsal fayda odaklı organizasyonlar',
      'Eğitim ve gelişim programlarına katılım',
    ],
  },
];

export default function Volunteering() {
  return (
    <section id="volunteering" className="min-h-screen px-4 py-20 pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            Gönüllülük
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        <div className="space-y-6">
          {volunteering.map((item, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#F9A8D4]/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-[#E0E0E0] mb-2">
                    {item.organization}
                  </h3>
                  <p className="text-lg text-[#EC4899] mb-4">
                    {item.role}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className="text-[#E0E0E0]/80 flex items-start text-sm md:text-base">
                        <span className="text-[#F9A8D4] mr-3 mt-1">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <span className="inline-block px-3 py-1 text-xs bg-[#F9A8D4]/20 text-[#F9A8D4] border border-[#F9A8D4]/30 rounded">
                    Gönüllülük
                  </span>
                  <p className="text-sm text-[#E0E0E0]/60 mt-2">
                    {item.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6">
          <p className="text-[#E0E0E0]/70 text-center">
            Gönüllülük faaliyetlerim, toplumsal sorumluluk bilinciyle 
            sosyal fayda yaratmayı hedefleyen projelerde aktif rol almamı sağlamaktadır.
          </p>
        </div>
      </div>
    </section>
  );
}

