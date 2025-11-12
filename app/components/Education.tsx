'use client';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  description?: string;
}

const education: EducationItem[] = [
  {
    degree: 'Yazılım Mühendisliği',
    institution: 'Kocaeli Üniversitesi',
    period: '2022 - Devam Ediyor',
    location: 'Kocaeli, Türkiye',
    description: '2. sınıf öğrencisi',
  },
];

export default function Education() {
  return (
    <section id="education" className="px-4 py-20 pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            Eğitim
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#F9A8D4]/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h4 className="font-heading text-xl md:text-2xl font-bold text-[#E0E0E0] mb-2">
                    {edu.degree}
                  </h4>
                  <p className="text-lg text-[#EC4899] mb-2">
                    {edu.institution}
                  </p>
                  {edu.location && (
                    <p className="text-sm text-[#E0E0E0]/60 mb-2">
                      📍 {edu.location}
                    </p>
                  )}
                  {edu.description && (
                    <p className="text-sm text-[#E0E0E0]/70 mt-2">
                      {edu.description}
                    </p>
                  )}
                </div>
                <div className="mt-4 md:mt-0 md:ml-4">
                  <span className="inline-block px-3 py-1 text-xs bg-[#F9A8D4]/20 text-[#F9A8D4] border border-[#F9A8D4]/30 rounded">
                    Eğitim
                  </span>
                  <p className="text-sm text-[#E0E0E0]/60 mt-2">
                    {edu.period}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

