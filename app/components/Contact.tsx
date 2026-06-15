'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Globe, Linkedin, Mail, Phone } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/elifaltun-', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/Efilant', icon: Github },
  { label: 'Website', href: 'https://www.elifaltun.dev', icon: Globe },
  { label: 'E-posta', href: 'mailto:efilant01@gmail.com', icon: Mail },
  { label: 'Telefon', href: 'tel:+905432145228', icon: Phone },
];

const content = {
  tr: {
    kicker: 'Bağlantı',
    title: 'İletişim',
    subtitle: 'Yeni projeler, işbirlikleri veya soruların için bana ulaş.',
    ready: 'Yenilikçi AI ve veri odaklı projelerde değer yaratmaya hazırım. İzmit / Kocaeli.',
    formTitle: 'Mesaj Gönder',
    name: 'Ad Soyad',
    email: 'E-posta',
    message: 'Mesajın',
    send: 'Gönder',
    sent: 'Mesajın kaydedildi! En kısa sürede dönüş yapacağım.',
    error: 'Mesaj gönderilemedi. Lütfen tekrar dene.',
    sending: 'Gönderiliyor...',
    social: 'Sosyal Medya',
  },
  en: {
    kicker: 'Connect',
    title: 'Contact',
    subtitle: 'Reach out for new projects, collaborations, or questions.',
    ready: 'Ready to create value in innovative AI and data-driven projects. Based in Izmit / Kocaeli.',
    formTitle: 'Send a Message',
    name: 'Full Name',
    email: 'Email',
    message: 'Your Message',
    send: 'Send',
    sent: 'Your message was saved! I will get back to you soon.',
    error: 'Could not send your message. Please try again.',
    sending: 'Sending...',
    social: 'Social Media',
  },
};

export default function Contact() {
  const { language } = useLanguage();
  const t = content[language];
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;

    setSending(true);
    setSent(false);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('submit-failed');
      }

      setSent(true);
      form.reset();
    } catch {
      setError(t.error);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="section-shell section-theme-contact">
      <div className="max-w-5xl mx-auto section-panel p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="section-kicker">{t.kicker}</span>
          <h2 className="font-heading section-title">{t.title}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-[#E6EEFF]/80 leading-relaxed text-lg">{t.subtitle}</p>
            <p className="text-[#C084FC] font-medium">{t.ready}</p>

            <div className="glass-card p-5">
              <h3 className="font-heading text-sm font-semibold text-[#F5F7FF] mb-4">{t.social}</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  const isExternal = !link.href.startsWith('mailto') && !link.href.startsWith('tel');
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={link.label}
                      title={link.label}
                      className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#11172A] border border-[#27304A] text-[#E6EEFF]/70 hover:border-[#A855F7] hover:text-[#C084FC] hover:shadow-lg hover:shadow-[#A855F7]/15 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="font-heading text-base font-bold text-[#F5F7FF] mb-5">{t.formTitle}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                required
                placeholder={t.name}
                className="w-full bg-[#090B13]/60 border border-[#27304A] rounded-xl px-4 py-3 text-[#F5F7FF] placeholder:text-[#E6EEFF]/35 outline-none focus:border-[#A855F7] transition-colors text-sm"
              />
              <input
                name="email"
                type="email"
                required
                placeholder={t.email}
                className="w-full bg-[#090B13]/60 border border-[#27304A] rounded-xl px-4 py-3 text-[#F5F7FF] placeholder:text-[#E6EEFF]/35 outline-none focus:border-[#A855F7] transition-colors text-sm"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder={t.message}
                className="w-full bg-[#090B13]/60 border border-[#27304A] rounded-xl px-4 py-3 text-[#F5F7FF] placeholder:text-[#E6EEFF]/35 outline-none focus:border-[#A855F7] transition-colors resize-none text-sm"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-[#A855F7] to-[#22D3EE] text-white rounded-xl font-medium hover:brightness-110 transition-all text-sm disabled:opacity-60"
              >
                {sending ? t.sending : t.send}
              </button>
              {sent && <p className="text-sm text-emerald-400 text-center">{t.sent}</p>}
              {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
