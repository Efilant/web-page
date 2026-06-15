'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Download, User, Code, FolderKanban, Mail, Home, Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const menuItems = [
  { id: 'home', label: { tr: 'Ana Sayfa', en: 'Home' }, icon: Home, href: '#home' },
  { id: 'about', label: { tr: 'Hakkımda', en: 'About' }, icon: User, href: '#about' },
  { id: 'education', label: { tr: 'Eğitim', en: 'Education' }, icon: GraduationCap, href: '#education' },
  { id: 'experience', label: { tr: 'Deneyim', en: 'Experience' }, icon: Briefcase, href: '#experience' },
  { id: 'skills', label: { tr: 'Beceriler', en: 'Skills' }, icon: Code, href: '#skills' },
  { id: 'projects', label: { tr: 'Projeler', en: 'Projects' }, icon: FolderKanban, href: '#projects' },
  { id: 'contact', label: { tr: 'İletişim', en: 'Contact' }, icon: Mail, href: '#contact' },
];

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (let i = menuItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(menuItems[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(menuItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-[#0F1424]/90 backdrop-blur-md border-r border-[#27304A] z-50 flex-col">
        <div className="p-6 border-b border-[#27304A]">
          <button onClick={() => scrollToSection('#home')} className="text-left w-full group">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpg"
                alt="Elif Altun"
                width={44}
                height={44}
                unoptimized
                className="w-11 h-11 rounded-xl object-cover shadow-lg shadow-[#A855F7]/25"
                priority
              />
              <div>
                <h1 className="font-heading text-lg font-bold text-[#F5F7FF] group-hover:text-[#C084FC] transition-colors">
                  Elif Altun
                </h1>
                <p className="text-xs text-[#E6EEFF]/50">
                  {language === 'tr' ? 'Yazılım Mühendisi' : 'Software Engineer'}
                </p>
              </div>
            </div>
          </button>
          <div className="flex gap-2">
            {(['tr', 'en'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  language === lang
                    ? 'border-[#A855F7] text-[#C084FC] bg-[#A855F7]/10'
                    : 'border-[#334155] text-[#94A3B8] hover:border-[#A855F7]/50'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`group w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#A855F7]/15 to-[#22D3EE]/10 text-[#C084FC]'
                        : 'text-[#E6EEFF]/70 hover:text-[#C084FC] hover:bg-[#A855F7]/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-1 h-5 rounded-full transition-all ${
                          isActive ? 'bg-gradient-to-b from-[#A855F7] to-[#22D3EE]' : 'bg-transparent'
                        }`}
                      />
                      <Icon
                        className={`w-4 h-4 ${isActive ? 'text-[#C084FC]' : 'text-[#E6EEFF]/50 group-hover:text-[#C084FC]'}`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      <span className="font-medium text-sm">{item.label[language]}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#27304A]">
          <a
            href="/Elif_Altun_CV.pdf"
            download
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#A855F7] to-[#22D3EE] text-white rounded-xl hover:brightness-110 transition-all font-medium text-sm shadow-lg shadow-[#A855F7]/20"
          >
            <Download className="w-4 h-4" />
            {language === 'tr' ? 'CV İndir' : 'Download CV'}
          </a>
        </div>
      </aside>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0F1424]/90 backdrop-blur-md border-b border-[#27304A]">
        <nav className="px-5 py-4 flex items-center justify-between">
          <button onClick={() => scrollToSection('#home')} className="flex items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt="Elif Altun"
              width={32}
              height={32}
              unoptimized
              className="w-8 h-8 rounded-lg object-cover"
              priority
            />
            <span className="font-heading font-bold text-[#F5F7FF]">Elif Altun</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="text-xs border border-[#334155] px-2 py-1 rounded text-[#C084FC]"
            >
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#F5F7FF] p-1"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="border-t border-[#27304A] bg-[#0F1424]/95 animate-slideDown">
            <ul className="p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#A855F7]/15 text-[#C084FC]'
                          : 'text-[#E6EEFF]/70 hover:text-[#C084FC]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label[language]}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
