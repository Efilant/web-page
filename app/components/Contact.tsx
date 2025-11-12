'use client';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen px-4 py-20 pt-32 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            İletişim
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#EC4899]/50 transition-all duration-300">
            <h3 className="font-heading text-xl font-bold text-[#EC4899] mb-4">
              Sosyal Medya
            </h3>
            <div className="space-y-4">
              <a
                href="https://linkedin.com/in/elifaltun"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#E0E0E0]/80 hover:text-[#EC4899] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/elifaltun"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#E0E0E0]/80 hover:text-[#EC4899] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#F9A8D4]/50 transition-all duration-300">
            <h3 className="font-heading text-xl font-bold text-[#F9A8D4] mb-4">
              E-posta
            </h3>
            <a
              href="mailto:elifaltun@example.com"
              className="block text-[#E0E0E0]/80 hover:text-[#F9A8D4] transition-colors"
            >
              elifaltun@example.com
            </a>
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-8">
          <p className="text-[#E0E0E0]/80 text-lg leading-relaxed mb-4">
            Yeni projeler, işbirlikleri veya sorularınız için benimle iletişime geçmekten 
            çekinmeyin. Yazılım ve robotik alanındaki projelerde birlikte çalışmak için 
            her zaman açığım!
          </p>
          <p className="text-[#EC4899] font-medium">
            Şu anda yeni projelere katkı sağlamaya hazırım.
          </p>
        </div>
      </div>
    </section>
  );
}

