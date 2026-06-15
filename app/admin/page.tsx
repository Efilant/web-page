'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { SiteContent } from '@/lib/siteContent';
import type { ProjectItem } from '@/lib/projectStore';

interface VisitStat {
  country: string;
  count: number;
}

interface LatestVisit {
  id: string;
  timestamp: string;
  path: string;
  ip: string;
  country: string;
  city: string;
  region: string;
  userAgent: string;
}

interface StatsResponse {
  totalVisits: number;
  uniqueVisitors: number;
  topCountries: VisitStat[];
  latestVisits: LatestVisit[];
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const emptyContent: SiteContent = {
  heroTitle: { tr: '', en: '' },
  heroRoles: { tr: [], en: [] },
  heroDescription: { tr: '', en: '' },
  primaryCtaText: { tr: '', en: '' },
  primaryCtaHref: '',
  secondaryCtaText: { tr: '', en: '' },
  secondaryCtaHref: '',
  highlights: [],
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<SiteContent>(emptyContent);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [newHighlightTitleTr, setNewHighlightTitleTr] = useState('');
  const [newHighlightTitleEn, setNewHighlightTitleEn] = useState('');
  const [newHighlightDescriptionTr, setNewHighlightDescriptionTr] = useState('');
  const [newHighlightDescriptionEn, setNewHighlightDescriptionEn] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  const roleInputTr = useMemo(() => content.heroRoles.tr.join(', '), [content.heroRoles.tr]);
  const roleInputEn = useMemo(() => content.heroRoles.en.join(', '), [content.heroRoles.en]);

  async function loadAdminData(adminPassword: string) {
    setLoading(true);
    setErrorMessage('');

    const headers = { 'x-admin-password': adminPassword };
    const [contentRes, statsRes, projectsRes, messagesRes] = await Promise.all([
      fetch('/api/admin/content', { headers, cache: 'no-store' }),
      fetch('/api/admin/stats', { headers, cache: 'no-store' }),
      fetch('/api/admin/projects', { headers, cache: 'no-store' }),
      fetch('/api/admin/messages', { headers, cache: 'no-store' }),
    ]);

    if (!contentRes.ok || !statsRes.ok || !projectsRes.ok || !messagesRes.ok) {
      throw new Error('Admin panel sifresi hatali veya veri yuklenemedi.');
    }

    const [contentData, statsData, projectsData, messagesData] = (await Promise.all([
      contentRes.json(),
      statsRes.json(),
      projectsRes.json(),
      messagesRes.json(),
    ])) as [
      SiteContent,
      StatsResponse,
      { projects: ProjectItem[] },
      { messages: ContactMessage[] },
    ];

    setContent(contentData);
    setStats(statsData);
    setProjects(projectsData.projects ?? []);
    setContactMessages(messagesData.messages ?? []);
    if (projectsData.projects?.length && !selectedProjectId) {
      setSelectedProjectId(projectsData.projects[0].id);
    }
    setAuthorized(true);
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await loadAdminData(password);
      setMessage('Admin paneline giris yapildi.');
    } catch (error) {
      setAuthorized(false);
      setMessage('');
      setErrorMessage(error instanceof Error ? error.message : 'Giris basarisiz.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify(content),
      });
      const projectResponse = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ projects }),
      });

      if (!response.ok || !projectResponse.ok) {
        throw new Error('Icerik kaydedilemedi.');
      }

      await loadAdminData(password);
      setMessage('Icerik basariyla kaydedildi.');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Kayit basarisiz.');
    } finally {
      setSaving(false);
      setLoading(false);
    }
  }

  function addHighlight() {
    if (
      !newHighlightTitleTr.trim() ||
      !newHighlightTitleEn.trim() ||
      !newHighlightDescriptionTr.trim() ||
      !newHighlightDescriptionEn.trim()
    ) {
      return;
    }

    setContent((prev) => ({
      ...prev,
      highlights: [
        {
          id: crypto.randomUUID(),
          title: { tr: newHighlightTitleTr.trim(), en: newHighlightTitleEn.trim() },
          description: {
            tr: newHighlightDescriptionTr.trim(),
            en: newHighlightDescriptionEn.trim(),
          },
          featured: false,
        },
        ...prev.highlights,
      ],
    }));

    setNewHighlightTitleTr('');
    setNewHighlightTitleEn('');
    setNewHighlightDescriptionTr('');
    setNewHighlightDescriptionEn('');
  }

  function removeHighlight(id: string) {
    setContent((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((item) => item.id !== id),
    }));
  }

  function toggleFeatured(id: string) {
    setContent((prev) => ({
      ...prev,
      highlights: prev.highlights.map((item) =>
        item.id === id ? { ...item, featured: !item.featured } : item,
      ),
    }));
  }

  function addProject() {
    const id = crypto.randomUUID();
    const newProject: ProjectItem = {
      id,
      slug: `yeni-proje-${projects.length + 1}`,
      title: { tr: 'Yeni Proje', en: 'New Project' },
      summary: { tr: 'Kisa ozet', en: 'Short summary' },
      description: { tr: 'Proje aciklamasi', en: 'Project description' },
      role: { tr: 'Rol', en: 'Role' },
      year: String(new Date().getFullYear()),
      category: 'software',
      featured: false,
      technologies: [],
      languages: [],
      plugins: [],
      highlights: [],
      images: [],
      links: [],
    };
    setProjects((prev) => [newProject, ...prev]);
    setSelectedProjectId(id);
  }

  function removeProject(id: string) {
    const next = projects.filter((item) => item.id !== id);
    setProjects(next);
    setSelectedProjectId(next[0]?.id ?? '');
  }

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [projects, selectedProjectId],
  );

  function updateSelectedProject(update: (project: ProjectItem) => ProjectItem) {
    if (!selectedProjectId) {
      return;
    }
    setProjects((prev) =>
      prev.map((project) => (project.id === selectedProjectId ? update(project) : project)),
    );
  }

  async function markMessageRead(id: string) {
    const response = await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-password': password,
      },
      body: JSON.stringify({ id, action: 'read' }),
    });

    if (!response.ok) {
      setErrorMessage('Mesaj okundu olarak isaretlenemedi.');
      return;
    }

    setContactMessages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }

  async function deleteMessage(id: string) {
    const response = await fetch(`/api/admin/messages?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password },
    });

    if (!response.ok) {
      setErrorMessage('Mesaj silinemedi.');
      return;
    }

    setContactMessages((prev) => prev.filter((item) => item.id !== id));
  }

  const unreadMessageCount = useMemo(
    () => contactMessages.filter((item) => !item.read).length,
    [contactMessages],
  );

  if (!authorized) {
    return (
      <main className="min-h-screen bg-[#121212] text-[#E0E0E0] px-4 py-12 flex items-center justify-center">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="w-full max-w-md bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4"
        >
          <h1 className="font-heading text-2xl font-bold text-[#EC4899]">Admin Panel</h1>
          <p className="text-sm text-[#E0E0E0]/70">
            Bu panelden anasayfa metinlerini, one cikan alanlari ve ziyaretci istatistiklerini yonetebilirsin.
          </p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
            placeholder="Admin sifresi"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EC4899] text-white py-2 rounded-lg hover:bg-[#F9A8D4] transition-colors disabled:opacity-60"
          >
            {loading ? 'Yukleniyor...' : 'Giris Yap'}
          </button>
          {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
        </motion.form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] text-[#E0E0E0] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading text-3xl font-bold text-[#EC4899]">Yonetim Paneli</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#EC4899] text-white px-5 py-2 rounded-lg hover:bg-[#F9A8D4] transition-colors disabled:opacity-60"
          >
            {saving ? 'Kaydediliyor...' : 'Degisiklikleri Kaydet'}
          </button>
        </div>

        {message && <p className="text-sm text-emerald-400">{message}</p>}
        {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

        <section className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-xl text-[#F9A8D4] font-semibold">Hero Icerigi</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              value={content.heroTitle.tr}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  heroTitle: { ...prev.heroTitle, tr: event.target.value },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Ana baslik (TR)"
            />
            <input
              value={content.heroTitle.en}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  heroTitle: { ...prev.heroTitle, en: event.target.value },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Main title (EN)"
            />
            <input
              value={roleInputTr}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  heroRoles: {
                    ...prev.heroRoles,
                    tr: event.target.value
                      .split(',')
                      .map((item) => item.trim())
                      .filter(Boolean),
                  },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Roller TR (virgul ile ayir)"
            />
            <input
              value={roleInputEn}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  heroRoles: {
                    ...prev.heroRoles,
                    en: event.target.value
                      .split(',')
                      .map((item) => item.trim())
                      .filter(Boolean),
                  },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Roles EN (comma separated)"
            />
            <textarea
              value={content.heroDescription.tr}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  heroDescription: { ...prev.heroDescription, tr: event.target.value },
                }))
              }
              className="w-full min-h-24 bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Aciklama (TR)"
            />
            <textarea
              value={content.heroDescription.en}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  heroDescription: { ...prev.heroDescription, en: event.target.value },
                }))
              }
              className="w-full min-h-24 bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Description (EN)"
            />
          </div>
        </section>

        <section className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-xl text-[#F9A8D4] font-semibold">CTA Butonlari</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              value={content.primaryCtaText.tr}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  primaryCtaText: { ...prev.primaryCtaText, tr: event.target.value },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Birincil buton metni (TR)"
            />
            <input
              value={content.primaryCtaText.en}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  primaryCtaText: { ...prev.primaryCtaText, en: event.target.value },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Primary button text (EN)"
            />
            <input
              value={content.primaryCtaHref}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  primaryCtaHref: event.target.value,
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Birincil buton linki"
            />
            <input
              value={content.secondaryCtaText.tr}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  secondaryCtaText: { ...prev.secondaryCtaText, tr: event.target.value },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Ikincil buton metni (TR)"
            />
            <input
              value={content.secondaryCtaText.en}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  secondaryCtaText: { ...prev.secondaryCtaText, en: event.target.value },
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Secondary button text (EN)"
            />
            <input
              value={content.secondaryCtaHref}
              onChange={(event) =>
                setContent((prev) => ({
                  ...prev,
                  secondaryCtaHref: event.target.value,
                }))
              }
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Ikincil buton linki"
            />
          </div>
        </section>

        <section className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-xl text-[#F9A8D4] font-semibold">One Cikanlar</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <input
              value={newHighlightTitleTr}
              onChange={(event) => setNewHighlightTitleTr(event.target.value)}
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Baslik (TR)"
            />
            <input
              value={newHighlightTitleEn}
              onChange={(event) => setNewHighlightTitleEn(event.target.value)}
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Title (EN)"
            />
            <input
              value={newHighlightDescriptionTr}
              onChange={(event) => setNewHighlightDescriptionTr(event.target.value)}
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Aciklama (TR)"
            />
            <input
              value={newHighlightDescriptionEn}
              onChange={(event) => setNewHighlightDescriptionEn(event.target.value)}
              className="w-full bg-[#121212] border border-[#2A2A2A] rounded-lg px-4 py-2 outline-none focus:border-[#EC4899]"
              placeholder="Description (EN)"
            />
          </div>
          <button
            onClick={addHighlight}
            className="px-4 py-2 rounded-lg border border-[#EC4899] text-[#EC4899] hover:bg-[#EC4899] hover:text-white transition-colors"
          >
            Yeni Kart Ekle
          </button>

          <div className="space-y-3">
            {content.highlights.map((item) => (
              <div key={item.id} className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-4">
                <p className="font-medium text-[#E0E0E0]">{item.title.tr}</p>
                <p className="text-sm text-[#E0E0E0]/55">{item.title.en}</p>
                <p className="text-sm text-[#E0E0E0]/70 mt-1">{item.description.tr}</p>
                <p className="text-sm text-[#E0E0E0]/50">{item.description.en}</p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => toggleFeatured(item.id)}
                    className="px-3 py-1 text-xs rounded border border-[#EC4899] text-[#EC4899] hover:bg-[#EC4899] hover:text-white transition-colors"
                  >
                    {item.featured ? 'One Cikani Kaldir' : 'One Cikar'}
                  </button>
                  <button
                    onClick={() => removeHighlight(item.id)}
                    className="px-3 py-1 text-xs rounded border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-xl text-[#F9A8D4] font-semibold">Proje Detay Yonetimi</h2>
            <button
              onClick={addProject}
              className="px-4 py-2 rounded-lg border border-[#EC4899] text-[#EC4899] hover:bg-[#EC4899] hover:text-white transition-colors"
            >
              Yeni Proje Ekle
            </button>
          </div>

          {projects.length > 0 && (
            <div className="grid md:grid-cols-[240px_1fr] gap-4">
              <div className="space-y-2">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`w-full text-left rounded-lg px-3 py-2 border transition-colors ${
                      project.id === selectedProjectId
                        ? 'border-[#EC4899] bg-[#EC4899]/10 text-[#EC4899]'
                        : 'border-[#2A2A2A] bg-[#121212] text-[#E0E0E0]/80'
                    }`}
                  >
                    {project.title.tr}
                  </button>
                ))}
              </div>

              {selectedProject && (
                <div className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-4 space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      value={selectedProject.slug}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({ ...project, slug: event.target.value }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="slug"
                    />
                    <input
                      value={selectedProject.year}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({ ...project, year: event.target.value }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="yil"
                    />
                    <input
                      value={selectedProject.title.tr}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          title: { ...project.title, tr: event.target.value },
                        }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Baslik (TR)"
                    />
                    <input
                      value={selectedProject.title.en}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          title: { ...project.title, en: event.target.value },
                        }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Title (EN)"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <textarea
                      value={selectedProject.summary.tr}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          summary: { ...project.summary, tr: event.target.value },
                        }))
                      }
                      className="w-full min-h-20 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Kisa ozet (TR)"
                    />
                    <textarea
                      value={selectedProject.summary.en}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          summary: { ...project.summary, en: event.target.value },
                        }))
                      }
                      className="w-full min-h-20 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Short summary (EN)"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <textarea
                      value={selectedProject.description.tr}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          description: { ...project.description, tr: event.target.value },
                        }))
                      }
                      className="w-full min-h-24 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Detayli aciklama (TR)"
                    />
                    <textarea
                      value={selectedProject.description.en}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          description: { ...project.description, en: event.target.value },
                        }))
                      }
                      className="w-full min-h-24 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Detailed description (EN)"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      value={selectedProject.languages.join(', ')}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          languages: event.target.value.split(',').map((v) => v.trim()).filter(Boolean),
                        }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Diller (virgulle)"
                    />
                    <input
                      value={selectedProject.plugins.join(', ')}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          plugins: event.target.value.split(',').map((v) => v.trim()).filter(Boolean),
                        }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Eklentiler (virgulle)"
                    />
                    <input
                      value={selectedProject.technologies.join(', ')}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          technologies: event.target.value
                            .split(',')
                            .map((v) => v.trim())
                            .filter(Boolean),
                        }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Teknolojiler (virgulle)"
                    />
                    <input
                      value={selectedProject.role.tr}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          role: { ...project.role, tr: event.target.value },
                        }))
                      }
                      className="w-full bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Rol (TR)"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    <textarea
                      value={selectedProject.links.map((link) => `${link.label}|${link.url}|${link.type}`).join('\n')}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          links: event.target.value
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line) => {
                              const [label = '', url = '', type = 'other'] = line.split('|');
                              return {
                                label: label.trim(),
                                url: url.trim(),
                                type: (type.trim() || 'other') as 'demo' | 'github' | 'website' | 'other',
                              };
                            }),
                        }))
                      }
                      className="w-full min-h-24 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Linkler: label|url|type"
                    />
                    <textarea
                      value={selectedProject.images.map((image) => `${image.url}|${image.alt}`).join('\n')}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          images: event.target.value
                            .split('\n')
                            .map((line) => line.trim())
                            .filter(Boolean)
                            .map((line) => {
                              const [url = '', alt = 'Project image'] = line.split('|');
                              return { url: url.trim(), alt: alt.trim() };
                            }),
                        }))
                      }
                      className="w-full min-h-24 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                      placeholder="Gorseller: url|alt"
                    />
                  </div>

                  <textarea
                    value={selectedProject.highlights
                      .map((item) => `${item.tr}|${item.en}`)
                      .join('\n')}
                    onChange={(event) =>
                      updateSelectedProject((project) => ({
                        ...project,
                        highlights: event.target.value
                          .split('\n')
                          .map((line) => line.trim())
                          .filter(Boolean)
                          .map((line) => {
                            const [tr = '', en = ''] = line.split('|');
                            return { tr: tr.trim(), en: en.trim() };
                          }),
                      }))
                    }
                    className="w-full min-h-20 bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                    placeholder="One cikanlar: tr|en"
                  />

                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-[#E0E0E0]/80">
                      <input
                        type="checkbox"
                        checked={selectedProject.featured}
                        onChange={(event) =>
                          updateSelectedProject((project) => ({
                            ...project,
                            featured: event.target.checked,
                          }))
                        }
                      />
                      One cikar
                    </label>

                    <select
                      value={selectedProject.category}
                      onChange={(event) =>
                        updateSelectedProject((project) => ({
                          ...project,
                          category: event.target.value as 'software' | 'social',
                        }))
                      }
                      className="bg-[#0E0E0E] border border-[#2A2A2A] rounded px-3 py-2"
                    >
                      <option value="software">software</option>
                      <option value="social">social</option>
                    </select>

                    <button
                      onClick={() => removeProject(selectedProject.id)}
                      className="px-3 py-2 rounded border border-red-400 text-red-400 hover:bg-red-400 hover:text-white text-sm"
                    >
                      Projeyi Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <section className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-xl text-[#F9A8D4] font-semibold">Iletisim Mesajlari</h2>
            {unreadMessageCount > 0 && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#EC4899]/20 text-[#F9A8D4] border border-[#EC4899]/40">
                {unreadMessageCount} okunmamis
              </span>
            )}
          </div>

          {contactMessages.length === 0 ? (
            <p className="text-sm text-[#E0E0E0]/60">Henuz mesaj yok.</p>
          ) : (
            <div className="space-y-3 max-h-[28rem] overflow-auto">
              {contactMessages.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-lg border p-4 ${
                    item.read
                      ? 'bg-[#121212] border-[#2A2A2A]'
                      : 'bg-[#EC4899]/5 border-[#EC4899]/40'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-[#E0E0E0]">{item.name}</p>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-sm text-[#EC4899] hover:underline"
                      >
                        {item.email}
                      </a>
                    </div>
                    <p className="text-xs text-[#E0E0E0]/60">
                      {new Date(item.timestamp).toLocaleString('tr-TR')}
                    </p>
                  </div>
                  <p className="text-sm text-[#E0E0E0]/80 mt-3 whitespace-pre-wrap">{item.message}</p>
                  <div className="flex gap-2 mt-4">
                    {!item.read && (
                      <button
                        onClick={() => void markMessageRead(item.id)}
                        className="px-3 py-1 text-xs rounded border border-[#EC4899] text-[#EC4899] hover:bg-[#EC4899] hover:text-white transition-colors"
                      >
                        Okundu
                      </button>
                    )}
                    <button
                      onClick={() => void deleteMessage(item.id)}
                      className="px-3 py-1 text-xs rounded border border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
          <h2 className="font-heading text-xl text-[#F9A8D4] font-semibold">Ziyaretci Analitigi</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-sm text-[#E0E0E0]/70">Toplam Inceleme</p>
              <p className="text-2xl font-bold text-[#EC4899]">{stats?.totalVisits ?? 0}</p>
            </div>
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-4">
              <p className="text-sm text-[#E0E0E0]/70">Tekil Ziyaretci</p>
              <p className="text-2xl font-bold text-[#EC4899]">{stats?.uniqueVisitors ?? 0}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-4">
              <h3 className="font-semibold mb-3">Ulke Dagilimi</h3>
              <ul className="space-y-2">
                {(stats?.topCountries ?? []).map((country) => (
                  <li key={country.country} className="flex justify-between text-sm text-[#E0E0E0]/80">
                    <span>{country.country}</span>
                    <span>{country.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#121212] border border-[#2A2A2A] rounded-lg p-4">
              <h3 className="font-semibold mb-3">Son Ziyaretler</h3>
              <ul className="space-y-2 max-h-60 overflow-auto">
                {(stats?.latestVisits ?? []).map((visit) => (
                  <li key={visit.id} className="text-xs text-[#E0E0E0]/70 border-b border-[#2A2A2A] pb-2">
                    <p>
                      {visit.country} / {visit.city} - {visit.path}
                    </p>
                    <p>{new Date(visit.timestamp).toLocaleString('tr-TR')}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
