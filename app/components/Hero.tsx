'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 pt-32 relative z-10">
      <div className="max-w-5xl w-full text-center">
        <div className="mb-12">
          <h1 
            className={`font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#E0E0E0] transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            <span className="inline-block">
              <span className="underline-animate inline-block">Merhaba, Ben Elif Altun.</span>
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <div 
              className={`h-1 w-16 bg-gradient-to-r from-transparent via-[#EC4899] to-transparent transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transitionDelay: '0.2s' }}
            />
            <div 
              className={`h-1 w-8 bg-[#EC4899] transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transitionDelay: '0.25s' }}
            />
            <div 
              className={`h-1 w-16 bg-gradient-to-r from-transparent via-[#EC4899] to-transparent transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{ transitionDelay: '0.3s' }}
            />
          </div>
          
          <h2 
            className={`text-xl md:text-2xl lg:text-3xl text-[#E0E0E0]/80 mb-8 font-medium transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <span className="inline-block">
              Yazılım Mühendisliği Öğrencisi
            </span>
            <span className="mx-3 text-[#EC4899]">|</span>
            <span className="inline-block">
              Kurucu Mentor
            </span>
            <span className="mx-3 text-[#EC4899]">|</span>
            <span className="inline-block">
              Sosyal Etki Odaklı Geliştirici
            </span>
          </h2>
          
          <p 
            className={`text-base md:text-lg text-[#E0E0E0]/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.6s' }}
          >
            Teknik becerilerimi güçlü liderlik ve organizasyon yeteneklerimle birleştirerek projeler üretiyorum. 
            TÜBİTAK destekli mobil uygulamadan uluslararası robotik yarışmalara kadar, etki yaratan her alanda 
            bulunmaktan heyecan duyuyorum.
          </p>
        </div>

        <div 
          className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-[#EC4899] text-white rounded-lg hover:bg-[#F9A8D4] transition-all duration-300 font-medium overflow-hidden"
          >
            <span className="relative z-10">Öne Çıkan Projelerimi İnceleyin</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#F9A8D4] to-[#EC4899] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 scale-0 group-hover:scale-100 bg-white/10 rounded-lg transition-transform duration-300"></span>
          </a>
          <a
            href="/Elif_Altun_CV.pdf"
            download
            className="group relative px-8 py-3 border-2 border-[#EC4899] text-[#EC4899] rounded-lg hover:bg-[#EC4899] hover:text-white transition-all duration-300 font-medium overflow-hidden"
          >
            <span className="relative z-10">CV'mi İndir (PDF)</span>
            <span className="absolute inset-0 bg-[#EC4899] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
