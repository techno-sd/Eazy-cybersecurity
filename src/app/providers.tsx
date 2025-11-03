"use client";

import React from "react";
import { LangProvider } from "../context/LangContext";

export default function Providers({ children, initialLang }: { children: React.ReactNode, initialLang?: "ar" | "en" }) {
  return <LangProvider initialLang={initialLang}>{children}</LangProvider>;
}
