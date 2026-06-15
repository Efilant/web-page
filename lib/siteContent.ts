import { promises as fs } from 'fs';
import path from 'path';

export interface LocalizedText {
  tr: string;
  en: string;
}

export interface HighlightItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  featured: boolean;
}

export interface SiteContent {
  heroTitle: LocalizedText;
  heroRoles: { tr: string[]; en: string[] };
  heroDescription: LocalizedText;
  primaryCtaText: LocalizedText;
  primaryCtaHref: string;
  secondaryCtaText: LocalizedText;
  secondaryCtaHref: string;
  highlights: HighlightItem[];
}

const contentFilePath = path.join(process.cwd(), 'data', 'site-content.json');

const defaultContent: SiteContent = {
  heroTitle: { tr: 'Merhaba, Ben Elif Altun.', en: "Hello, I'm Elif Altun." },
  heroRoles: {
    tr: ['Yazılım Mühendisliği Öğrencisi', 'Kurucu Mentor', 'Sosyal Etki Odaklı Geliştirici'],
    en: ['Software Engineering Student', 'Founder Mentor', 'Social Impact Developer'],
  },
  heroDescription: {
    tr: 'Teknik becerilerimi güçlü liderlik ve organizasyon yeteneklerimle birleştirerek projeler üretiyorum.',
    en: 'I build projects by combining technical skills with strong leadership and organizational abilities.',
  },
  primaryCtaText: { tr: 'Öne Çıkan Projelerimi İnceleyin', en: 'View My Projects' },
  primaryCtaHref: '#projects',
  secondaryCtaText: { tr: "CV'mi İndir (PDF)", en: 'Download CV (PDF)' },
  secondaryCtaHref: '/Elif_Altun_CV.pdf',
  highlights: [],
};

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const file = await fs.readFile(contentFilePath, 'utf8');
    return JSON.parse(file) as SiteContent;
  } catch {
    return defaultContent;
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(path.dirname(contentFilePath), { recursive: true });
  await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2), 'utf8');
}
