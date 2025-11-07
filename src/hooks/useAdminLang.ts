"use client";

import { useEffect, useState, useCallback } from "react";

export type AdminLang = 'en' | 'ar';

export function useAdminLang() {
  const [lang, setLang] = useState<AdminLang>('en');

  // Initialize from localStorage and subscribe to storage changes (no polling)
  useEffect(() => {
    try {
      const saved = (localStorage.getItem('admin_lang') as AdminLang) || 'en';
      setLang(saved);
    } catch {
      // ignore
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'admin_lang' && (e.newValue === 'en' || e.newValue === 'ar')) {
        setLang(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setLanguage = useCallback((next: AdminLang) => {
    setLang(next);
    try { localStorage.setItem('admin_lang', next); } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'en' ? 'ar' : 'en');
  }, [lang, setLanguage]);
  return { lang, isArabic: lang === 'ar', toggleLanguage, setLanguage } as const;
}
