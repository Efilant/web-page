'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/lib/projectStore';

interface LanguageContextValue {
  language: Locale;
  setLanguage: (language: Locale) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Locale>('tr');

  useEffect(() => {
    const saved = window.localStorage.getItem('site-language');
    if (saved === 'tr' || saved === 'en') {
      setLanguage(saved);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: (next) => {
        setLanguage(next);
        window.localStorage.setItem('site-language', next);
      },
      toggleLanguage: () => {
        const next = language === 'tr' ? 'en' : 'tr';
        setLanguage(next);
        window.localStorage.setItem('site-language', next);
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
