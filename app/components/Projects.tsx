'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '@/lib/projectStore';
import { useLanguage } from './LanguageProvider';

const text = {
  tr: {
    kicker: 'Çalışmalarım',
    title: 'Projeler',
    liveProject: 'Canlı Proje',
    details: 'Detayları Gör',
    loading: 'Projeler yükleniyor...',
  },
  en: {
    kicker: 'My Work',
    title: 'Projects',
    liveProject: 'Live Project',
    details: 'View Details',
    loading: 'Loading projects...',
  },
};

function getTitlePlaceholder(title: string) {
  const words = title.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  return {
    label: words.join(' '),
    initials: words.map((word) => word.charAt(0).toLocaleUpperCase('tr-TR')).join(''),
  };
}

function ProjectTitlePlaceholder({ title }: { title: string }) {
  const { label, initials } = getTitlePlaceholder(title);

  return (
    <div
      className="project-visual-placeholder relative w-full max-w-md mx-auto aspect-[16/10] rounded-2xl overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#11172A]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/30 via-[#151b2e] to-[#22D3EE]/25" />
      <div className="absolute -inset-4 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.35),transparent_55%)]" />
      <div className="absolute -inset-4 bg-[radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.25),transparent_50%)]" />

      <p className="absolute inset-0 flex items-center justify-center px-8 text-center font-heading text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.18em] text-[#C084FC]/40 project-visual-placeholder-words">
        {label}
      </p>

      <p className="absolute inset-0 flex items-center justify-center font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-[#F5F7FF]/35 project-visual-placeholder-initials">
        {initials}
      </p>
    </div>
  );
}

function ProjectVisuals({
  project,
  language,
}: {
  project: ProjectItem;
  language: 'tr' | 'en';
}) {
  const [primary, secondary] = project.images;
  const title = project.title[language];

  if (!primary) {
    return <ProjectTitlePlaceholder title={title} />;
  }

  if (!secondary) {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
        <Image
          src={primary.url}
          alt={primary.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 420px"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto h-52 sm:h-60 md:h-64">
      <div className="absolute left-0 top-0 w-[88%] h-[78%] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 z-10">
        <Image
          src={primary.url}
          alt={primary.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 90vw, 380px"
        />
      </div>
      <div className="absolute right-0 bottom-0 w-[58%] h-[72%] rounded-xl overflow-hidden shadow-2xl shadow-black/60 border border-white/15 z-20">
        <Image
          src={secondary.url}
          alt={secondary.alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 55vw, 240px"
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const { language } = useLanguage();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const t = text[language];

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch('/api/projects', { cache: 'no-store' });
        const payload = (await response.json()) as { projects: ProjectItem[] };
        setProjects(payload.projects ?? []);
      } finally {
        setLoading(false);
      }
    }
    void loadProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="section-shell section-theme-projects">
        <div className="max-w-6xl mx-auto section-panel p-8">
          <p className="text-[#E6EEFF]/60 text-center">{t.loading}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-shell section-theme-projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="font-heading section-title">{t.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="space-y-10">
          {projects.map((project, index) => {
            const demoLink = project.links.find((l) => l.type === 'demo') ?? project.links[0];
            const reversed = index % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="project-showcase-panel rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12"
              >
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                  <div className={`space-y-5 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F7FF] uppercase tracking-tight leading-tight">
                      {project.title[language]}
                    </h3>
                    <p className="text-[#E6EEFF]/75 leading-relaxed text-sm md:text-base">
                      {project.description[language]}
                    </p>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-[#22D3EE] hover:text-[#C084FC] transition-colors"
                    >
                      {t.details}
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div
                    className={`flex flex-col items-center gap-5 ${
                      reversed ? 'lg:order-1 lg:items-start' : 'lg:order-2 lg:items-end'
                    }`}
                  >
                    <ProjectVisuals project={project} language={language} />

                    {demoLink && (
                      <a
                        href={demoLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-7 py-2.5 rounded-full bg-[#F5F7FF] text-[#090B13] text-sm font-semibold hover:bg-[#C084FC] hover:text-white transition-colors shadow-lg"
                      >
                        {demoLink.label || t.liveProject}
                      </a>
                    )}

                    <div className="flex flex-wrap justify-center lg:justify-end gap-2 max-w-md">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="project-tech-tag px-3 py-1.5 text-[0.65rem] font-semibold tracking-widest uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
