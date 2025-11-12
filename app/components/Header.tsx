'use client';

import { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Briefcase, 
  User, 
  Code, 
  Award, 
  GraduationCap, 
  Mail,
  Download,
  Users
} from 'lucide-react';

const menuItems = [
  { id: 'about', label: 'Hakkımda', icon: User, href: '#about' },
  { id: 'education', label: 'Eğitim', icon: GraduationCap, href: '#education' },
  { id: 'experience', label: 'Deneyim', icon: Briefcase, href: '#experience' },
  { id: 'clubs', label: 'Kulüpler', icon: Users, href: '#clubs' },
  { id: 'projects', label: 'Projeler', icon: FolderKanban, href: '#projects' },
  { id: 'awards', label: 'Ödüller & Tanınmalar', icon: Award, href: '#awards' },
  { id: 'skills', label: 'Beceriler', icon: Code, href: '#skills' },
  { id: 'contact', label: 'İletişim', icon: Mail, href: '#contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.id);
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-72 bg-[#1E1E1E] backdrop-blur-sm border-r border-[#2A2A2A] z-50 flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EC4899] to-[#F9A8D4] flex items-center justify-center text-white font-bold text-lg">
              EA
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-[#E0E0E0]">
                Elif Altun
              </h1>
              <p className="text-xs text-[#E0E0E0]/60">
                Yazılım Mühendisi
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`group w-full text-left px-4 py-3 rounded-lg transition-all duration-300 relative ${
                      isActive
                        ? 'text-[#EC4899] bg-[#EC4899]/10'
                        : 'text-[#E0E0E0]/70 hover:text-[#EC4899] hover:bg-[#EC4899]/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Active Indicator Line */}
                      <div className={`w-1 h-6 rounded-full transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#EC4899] opacity-100' 
                          : 'bg-transparent opacity-0 group-hover:bg-[#EC4899]/30'
                      }`} />
                      
                      {/* Icon */}
                      <IconComponent 
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive ? 'text-[#EC4899]' : 'text-[#E0E0E0]/60 group-hover:text-[#EC4899]'
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      
                      {/* Label */}
                      <span className={`font-medium text-sm ${
                        isActive ? 'text-[#EC4899]' : 'text-[#E0E0E0]/80 group-hover:text-[#EC4899]'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer - CV Download Button */}
        <div className="p-4 border-t border-[#2A2A2A]">
          <a
            href="/Elif_Altun_CV.pdf"
            download
            className="group w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#EC4899] text-white rounded-lg hover:bg-[#F9A8D4] transition-all duration-300 font-medium shadow-lg shadow-[#EC4899]/20 hover:shadow-[#EC4899]/40 hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" strokeWidth={2.5} />
            <span>CV İndir</span>
          </a>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1E1E1E]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <nav className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EC4899] to-[#F9A8D4] flex items-center justify-center text-white font-bold text-sm">
                EA
              </div>
              <div className="font-heading text-lg font-bold text-[#E0E0E0]">
                Elif Altun
              </div>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#E0E0E0] hover:text-[#EC4899] transition-colors"
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-[#1E1E1E] border-t border-[#2A2A2A] max-h-[calc(100vh-80px)] overflow-y-auto animate-slideDown">
            <nav className="p-4">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                          isActive
                            ? 'bg-[#EC4899]/10 text-[#EC4899]'
                            : 'text-[#E0E0E0]/70 hover:text-[#EC4899] hover:bg-[#EC4899]/5'
                        }`}
                      >
                        <div className={`w-1 h-6 rounded-full ${
                          isActive ? 'bg-[#EC4899]' : 'bg-transparent'
                        }`} />
                        <IconComponent 
                          className={`w-5 h-5 ${
                            isActive ? 'text-[#EC4899]' : 'text-[#E0E0E0]/60'
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                        <span className={`font-medium text-sm ${
                          isActive ? 'text-[#EC4899]' : 'text-[#E0E0E0]/80'
                        }`}>
                          {item.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                <a
                  href="/Elif_Altun_CV.pdf"
                  download
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#EC4899] text-white rounded-lg hover:bg-[#F9A8D4] transition-all duration-300 text-center font-medium"
                >
                  <Download className="w-4 h-4" strokeWidth={2.5} />
                  <span>CV İndir</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
