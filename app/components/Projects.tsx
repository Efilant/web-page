'use client';

interface Project {
  title: string;
  description: string;
  role: string;
  technologies: string[];
  year: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  category: 'software' | 'social';
}

const softwareProjects: Project[] = [
  {
    title: "Dijital Gebelik Takibi Uygulaması",
    description: "Hamilelik sürecindeki bireylerin sağlık ve psikolojik zorluklarını hafifletmeyi amaçlayan, TÜBİTAK tarafından desteklenmeye hak kazanmış mobil uygulama projesi.",
    role: "Proje Yöneticisi, Geliştirici",
    technologies: ["React Native", "Django", "Python"],
    year: "2024",
    featured: true,
    category: 'software',
  },
];

const socialProjects: Project[] = [
  {
    title: "Speak Sirius & Ata Talk Etkinlikleri",
    description: "Sektör liderleri, akademisyenler ve uzman konuşmacılarla online konferanslar ve toplantılar organize ederek gençlerin teknoloji ve kariyer gelişimine katkı sağlayan etkinlik serileri.",
    role: "Etkinlik Planlama ve Moderasyon, Organizasyon Lideri",
    technologies: ["Organizasyon", "Liderlik", "Etkinlik Yönetimi"],
    year: "2023",
    category: 'social',
  },
  {
    title: "AtaRob Kardeş Okul Projesi",
    description: "Lise öğrencileri arasında kültür, sanat, bilim ve teknoloji alanlarında işbirliği ve sosyalleşmeyi teşvik eden sosyal sorumluluk projesi.",
    role: "Proje Yönetimi, Ekip Liderliği ve Mentorluk",
    technologies: ["Proje Yönetimi", "Mentorluk", "Sosyal Etki"],
    year: "2023",
    category: 'social',
  },
  {
    title: "STEAM WARS",
    description: "İlkokul, ortaokul ve liselerde STEAM (Bilim, Teknoloji, Mühendislik, Sanat ve Matematik) etkinlikleri, seminerler ve konferanslar düzenlenmesi.",
    role: "Organizasyon, Topluluk Önünde Konuşma ve Sunum",
    technologies: ["Organizasyon", "Eğitim", "STEAM"],
    year: "2023",
    category: 'social',
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div
    className={`group bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#EC4899] hover:-translate-y-1 transition-all duration-300 ${
      project.featured ? 'md:col-span-2 lg:col-span-2' : ''
    }`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className={`font-heading text-xl font-bold mb-2 ${
          project.featured ? 'text-[#EC4899]' : 'text-[#E0E0E0]'
        }`}>
          {project.title}
        </h3>
        {project.featured && (
          <span className="inline-block px-2 py-1 text-xs bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/30 rounded mb-2">
            TÜBİTAK 2209-A
          </span>
        )}
        <p className="text-sm text-[#F9A8D4] mb-2">
          {project.role}
        </p>
      </div>
      <span className="text-sm text-[#E0E0E0]/60">{project.year}</span>
    </div>
    
    <p className="text-[#E0E0E0]/70 mb-4 leading-relaxed text-sm md:text-base">
      {project.description}
    </p>
    
    <div className="flex flex-wrap gap-2 mb-4">
      {project.technologies.map((tech, techIndex) => (
        <span
          key={techIndex}
          className="px-3 py-1 text-xs bg-[#2A2A2A] text-[#E0E0E0]/70 border border-[#2A2A2A] rounded group-hover:border-[#EC4899]/30 transition-colors"
        >
          {tech}
        </span>
      ))}
    </div>
    
    {(project.github || project.demo) && (
      <div className="flex gap-4 pt-4 border-t border-[#2A2A2A]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EC4899] hover:text-[#F9A8D4] transition-colors text-sm font-medium"
          >
            GitHub →
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EC4899] hover:text-[#F9A8D4] transition-colors text-sm font-medium"
          >
            Demo →
          </a>
        )}
      </div>
    )}
  </div>
);

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen px-4 py-20 pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            Projeler
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        {/* Yazılım Projeleri */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#EC4899] mb-8">
            Yazılım Projeleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>

        {/* Sosyal Projeler */}
        <div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#F9A8D4] mb-8">
            Sosyal Sorumluluk Projeleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

