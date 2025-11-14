"use client";

import React from "react";
import { LangProvider } from "../context/LangContext";
import ScrollProgress from "../components/Common/ScrollProgress";

export default function Providers({ children, initialLang }: { children: React.ReactNode, initialLang?: "ar" | "en" }) {
  return (
    <LangProvider initialLang={initialLang}>
      <ScrollProgress />
      {children}
    </LangProvider>
  );
}
