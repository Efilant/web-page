'use client';

export default function About() {
  return (
    <section id="about" className="min-h-screen px-4 py-20 pt-32 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#E0E0E0] mb-4">
            Ben Kimim?
          </h2>
          <div className="h-1 w-24 bg-[#EC4899]"></div>
        </div>

        <div className="space-y-12">
          {/* Metin Bölümü */}
          <div className="space-y-6 text-[#E0E0E0]/80 leading-relaxed">
            <p className="text-lg md:text-xl">
              Kocaeli Üniversitesi Yazılım Mühendisliği <span className="text-[#EC4899] font-semibold">3. sınıf öğrencisi</span> olarak, 
              kariyerimi <span className="text-[#EC4899] font-semibold">Yapay Zeka Mühendisliği</span> ve 
              <span className="text-[#EC4899] font-semibold"> veri odaklı sistemler kurma</span> üzerine inşa etmeyi hedefliyorum.
            </p>
            
            <p className="text-base md:text-lg">
              Güçlü kodlama becerilerimi <span className="text-[#F9A8D4] font-semibold">liderlik</span>, 
              <span className="text-[#F9A8D4] font-semibold"> ekip kurma</span> ve 
              <span className="text-[#F9A8D4] font-semibold"> proje yönetimi</span> yeteneklerimle birleştirerek, 
              projelerin sadece geliştirilmesini değil, aynı zamanda başarıyla sonuçlanmasını sağlıyorum. 
              <span className="text-[#F9A8D4] font-semibold">Atatürk Robotics</span> ve 
              <span className="text-[#F9A8D4] font-semibold"> Team Sirius</span> gibi ekiplerin kuruculuğunu ve 
              mentorluğunu üstlenerek, <span className="text-[#EC4899] font-semibold">100'ün üzerinde öğrenciye</span> rehberlik ettim. 
              Bu süreçte <span className="text-[#EC4899] font-semibold">analitik düşünme</span> ve 
              <span className="text-[#EC4899] font-semibold"> problem çözme</span> yeteneğimi pekiştirerek, 
              teknik ekipleri yönetme tecrübesi edindim.
            </p>

            <p className="text-base md:text-lg">
              Ayrıca, somut bir teknik uygulama olarak <span className="text-[#F9A8D4] font-semibold">TÜBİTAK 2209-A</span> tarafından 
              desteklenen <span className="text-[#F9A8D4] font-semibold">Dijital Gebelik Takibi Uygulaması</span> gibi projelere liderlik ediyor. 
              <span className="text-[#F9A8D4] font-semibold">Fikret Yüksel Vakfı</span>'nın Türkiye FRC ve FTC Planlama Komitesinde 
              Gönüllü Koordinatörleri Ekibi'nde aktif rol alarak yazılımın sosyal etki potansiyelini keşfediyorum.
            </p>

            <p className="text-base md:text-lg font-medium text-[#EC4899]">
              Liderlik tecrübem, güçlü teknik altyapım ve organizasyon yeteneğimle yeni ve heyecan verici projelere katkı sağlamaya hazırım.
            </p>
          </div>

          {/* Anahtar Yetkinlikler - Genişletilmiş */}
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6">
            <h3 className="font-heading text-xl font-bold text-[#EC4899] mb-4">
              Anahtar Yetkinlikler
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Python ve Veri Odaklı Geliştirme',
                'Java',
                'React (Frontend Geliştirme)',
                'Analitik Düşünme ve Problem Çözme',
                'Çevik Proje Yönetimi ve Uygulama',
                'Stratejik Liderlik ve Mentorluk'
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/30 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mentorluk & Liderlik */}
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-6">
            <h3 className="font-heading text-xl font-bold text-[#F9A8D4] mb-4">
              Mentorluk & Liderlik
            </h3>
            <p className="text-[#E0E0E0]/70 text-sm md:text-base leading-relaxed">
              43'ten fazla öğrenciye teknik ve halkla ilişkiler alanlarında mentorluk yaparak ekiplere 
              rehberlik ettim. İki başarılı FRC robotik takımının kuruculuğunu üstlenerek liderlik ve 
              organizasyon becerilerimi geliştirdim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

