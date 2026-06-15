import { promises as fs } from 'fs';
import path from 'path';

export type Locale = 'tr' | 'en';

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type: 'demo' | 'github' | 'website' | 'other';
}

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  description: LocalizedText;
  role: LocalizedText;
  year: string;
  category: 'software' | 'social';
  featured: boolean;
  technologies: string[];
  languages: string[];
  plugins: string[];
  highlights: LocalizedText[];
  images: ProjectImage[];
  links: ProjectLink[];
}

interface ProjectDb {
  projects: ProjectItem[];
}

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');

const emptyDb: ProjectDb = { projects: [] };

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const file = await fs.readFile(projectsFilePath, 'utf8');
    const parsed = JSON.parse(file) as ProjectDb;
    return parsed.projects ?? [];
  } catch {
    return emptyDb.projects;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function saveProjects(projects: ProjectItem[]): Promise<void> {
  await fs.mkdir(path.dirname(projectsFilePath), { recursive: true });
  await fs.writeFile(projectsFilePath, JSON.stringify({ projects }, null, 2), 'utf8');
}
