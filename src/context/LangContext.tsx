"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "ar" | "en";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

function getInitialLang(): Lang {
  if (typeof document !== "undefined") {
    const dlang = (document.documentElement.lang || "").toLowerCase();
    if (dlang === "ar" || dlang === "en") return dlang as Lang;
  }
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|; )lang=([^;]+)/);
    if (match) {
      const v = decodeURIComponent(match[1]);
      if (v === "ar" || v === "en") return v as Lang;
    }
  }
  if (typeof window !== "undefined") {
    const ls = window.localStorage.getItem("lang");
    if (ls === "ar" || ls === "en") return ls as Lang;
  }
  return "ar";
}

export const LangProvider: React.FC<React.PropsWithChildren<{ initialLang?: Lang }>> = ({ children, initialLang }) => {
  const [lang, setLangState] = useState<Lang>(initialLang ?? getInitialLang);

  useEffect(() => {
    // Apply lang and dir to document
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
    // Persist to cookie and localStorage
    if (typeof document !== "undefined") {
      const maxAge = 60 * 60 * 24 * 365; // 1 year
      document.cookie = `lang=${encodeURIComponent(lang)}; path=/; max-age=${maxAge}`;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", lang);
      window.dispatchEvent(new Event("languagechange"));
    }
  }, [lang]);

  const value = useMemo<LangContextType>(() => ({
    lang,
    setLang: setLangState,
  }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

export function useLang(): LangContextType {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
