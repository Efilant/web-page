'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProjectItem } from '@/lib/projectStore';
import { useLanguage } from '@/app/components/LanguageProvider';

const uiText = {
  tr: {
    back: 'Projelere Dön',
    year: 'Yıl',
    role: 'Rol',
    technologies: 'Teknolojiler',
    languages: 'Diller',
    plugins: 'Eklentiler / Araçlar',
    highlights: 'Öne Çıkanlar',
    links: 'Bağlantılar',
    images: 'Proje Görselleri',
  },
  en: {
    back: 'Back to Projects',
    year: 'Year',
    role: 'Role',
    technologies: 'Technologies',
    languages: 'Languages',
    plugins: 'Plugins / Tools',
    highlights: 'Highlights',
    links: 'Links',
    images: 'Project Images',
  },
};

export default function ProjectDetailView({ project }: { project: ProjectItem }) {
  const { language } = useLanguage();
  const t = uiText[language];

  return (
    <main className="min-h-screen lg:pl-72 section-shell section-theme-projects">
      <div className="max-w-5xl mx-auto section-panel p-6 md:p-10">
        <div className="mb-8">
          <Link href="/#projects" className="text-[#8EF4FF] hover:text-[#C084FC] text-sm">
            ← {t.back}
          </Link>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-[#F5F7FF] mt-4">
            {project.title[language]}
          </h1>
          <p className="text-[#E6EEFF]/80 mt-3">{project.description[language]}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="glass-card p-4">
            <p className="text-xs text-[#8EF4FF] uppercase tracking-wide mb-1">{t.year}</p>
            <p className="text-[#F5F7FF]">{project.year}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-[#8EF4FF] uppercase tracking-wide mb-1">{t.role}</p>
            <p className="text-[#F5F7FF]">{project.role[language]}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="glass-card p-5">
            <h2 className="font-heading text-xl text-[#C084FC] mb-3">{t.technologies}</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((item) => (
                <span key={item} className="px-3 py-1 text-xs neo-chip">{item}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="font-heading text-xl text-[#C084FC] mb-3">{t.languages}</h2>
            <div className="flex flex-wrap gap-2">
              {project.languages.map((item) => (
                <span key={item} className="px-3 py-1 text-xs neo-chip">{item}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="font-heading text-xl text-[#C084FC] mb-3">{t.plugins}</h2>
            <div className="flex flex-wrap gap-2">
              {project.plugins.map((item) => (
                <span key={item} className="px-3 py-1 text-xs neo-chip">{item}</span>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <h2 className="font-heading text-xl text-[#C084FC] mb-3">{t.links}</h2>
            <div className="flex flex-col gap-2">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8EF4FF] hover:text-[#C084FC] text-sm"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-5 mb-8">
          <h2 className="font-heading text-xl text-[#C084FC] mb-3">{t.highlights}</h2>
          <ul className="space-y-2">
            {project.highlights.map((item, idx) => (
              <li key={`${project.id}-h-${idx}`} className="text-[#E6EEFF]/80 flex items-start">
                <span className="text-[#8EF4FF] mr-2">•</span>
                <span>{item[language]}</span>
              </li>
            ))}
          </ul>
        </div>

        {project.images.length > 0 && (
          <div className="space-y-4">
            <h2 className="font-heading text-2xl text-[#F5F7FF]">{t.images}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.images.map((image) => (
                <div key={image.url} className="glass-card overflow-hidden">
                  <Image src={image.url} alt={image.alt} width={1200} height={700} className="w-full h-56 object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
