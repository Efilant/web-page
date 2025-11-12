'use client';

import { useState, useEffect } from 'react';

const menuItems = [
  { id: 'hero', label: 'Ana Sayfa', icon: '>' },
  { id: 'about', label: 'Hakkımda', icon: '>' },
  { id: 'skills', label: 'Beceriler', icon: '>' },
  { id: 'education', label: 'Eğitimler', icon: '>' },
  { id: 'experience', label: 'İş Deneyimi', icon: '>' },
  { id: 'clubs', label: 'Kulüpler', icon: '>' },
  { id: 'volunteering', label: 'Gönüllülük', icon: '>' },
  { id: 'awards', label: 'Ödüller', icon: '>' },
  { id: 'projects', label: 'Projeler', icon: '>' },
  { id: 'contact', label: 'İletişim', icon: '>' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map(item => item.id);
      const scrollPosition = window.scrollY + 200; // Offset for better detection

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false); // Close mobile menu after click
    }
  };

  const MenuContent = () => (
    <>
      {menuItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full text-left px-4 py-3 rounded transition-all duration-300 flex items-center gap-3 group ${
              isActive
                ? 'bg-[#EC4899]/20 border-l-4 border-[#EC4899] text-[#EC4899] text-lg font-bold scale-105'
                : 'text-[#E0E0E0]/70 hover:text-[#EC4899] hover:bg-[#EC4899]/10 border-l-4 border-transparent'
            }`}
          >
            <span className={`${isActive ? 'text-[#EC4899]' : 'text-gray-600 group-hover:text-[#EC4899]'}`}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-64 z-50 bg-black/90 backdrop-blur-sm border-r border-[#EC4899]/20 hidden lg:block">
        <div className="flex flex-col h-full py-8 px-6">
          <div className="mb-12">
            <div className="text-2xl font-bold text-[#EC4899] mb-2">
              &gt; elifaltun
            </div>
            <div className="text-xs text-[#E0E0E0]/60">
              portfolio.exe
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <MenuContent />
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="text-xs text-[#E0E0E0]/60">
              <div className="mb-2">Built with:</div>
              <div className="text-[#EC4899]">Next.js + Tailwind</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-black/90 border-2 border-[#EC4899] p-3 rounded text-[#EC4899] hover:bg-[#EC4899]/20 transition-all"
        aria-label="Menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
          <span className={`block h-0.5 bg-[#EC4899] transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block h-0.5 bg-[#EC4899] transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 bg-[#EC4899] transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Sidebar */}
      <nav className={`fixed left-0 top-0 h-full w-64 z-40 bg-black/95 backdrop-blur-sm border-r border-[#EC4899]/20 lg:hidden transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full py-8 px-6 pt-20">
          <div className="mb-8">
            <div className="text-xl font-bold text-[#EC4899] mb-2">
              &gt; elifaltun
            </div>
            <div className="text-xs text-[#E0E0E0]/60">
              portfolio.exe
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <MenuContent />
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

