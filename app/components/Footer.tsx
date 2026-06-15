'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[#27304A] bg-[#090B13]/80 py-10 px-6 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#E6EEFF]/50">
          © {new Date().getFullYear()} Elif Altun
        </p>
        <p className="text-xs text-[#E6EEFF]/30">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
