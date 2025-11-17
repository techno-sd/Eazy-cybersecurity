"use client";

import { useEffect, useState, useCallback } from "react";

export type AdminLang = 'en' | 'ar';

export function useAdminLang() {
  const [lang, setLang] = useState<AdminLang>('en');

  // Initialize from localStorage and subscribe to both storage and custom events
  useEffect(() => {
    try {
      const saved = (localStorage.getItem('admin_lang') as AdminLang) || 'en';
      setLang(saved);
    } catch {
      // ignore
    }

    // Listen for storage events (cross-tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'admin_lang' && (e.newValue === 'en' || e.newValue === 'ar')) {
        setLang(e.newValue);
      }
    };

    // Listen for custom event (same-tab immediate update)
    const onLangChange = (e: CustomEvent<AdminLang>) => {
      setLang(e.detail);
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('admin_lang_change' as any, onLangChange as any);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('admin_lang_change' as any, onLangChange as any);
    };
  }, []);

  const setLanguage = useCallback((next: AdminLang) => {
    setLang(next);
    try {
      localStorage.setItem('admin_lang', next);
      // Dispatch custom event for immediate same-tab update
      window.dispatchEvent(new CustomEvent('admin_lang_change', { detail: next }));
    } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === 'en' ? 'ar' : 'en');
  }, [lang, setLanguage]);

  return { lang, isArabic: lang === 'ar', toggleLanguage, setLanguage } as const;
}
