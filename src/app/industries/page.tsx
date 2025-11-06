import React from "react";
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import IndustriesList from "@/components/Industries/IndustriesList";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";

  return {
    title: cookieLang === "ar"
      ? "Eazy Cyber Agent | القطاعات المستهدفة – حلول أمنية متخصصة لكل قطاع"
      : "Eazy Cyber Agent | Industries We Serve – Specialized Security Solutions",
    description: cookieLang === "ar"
      ? "نقدم حلول الأمن السيبراني والذكاء الاصطناعي المتخصصة للقطاع الحكومي، البنوك، الطاقة، الرعاية الصحية، التعليم، والشركات الصغيرة والمتوسطة متوافقة مع رؤية 2030."
      : "Specialized cybersecurity and AI solutions for government, banking, energy, healthcare, education, and SMEs, aligned with Saudi Vision 2030.",
    keywords: cookieLang === "ar"
      ? "القطاعات المستهدفة, الأمن السيبراني السعودية, الذكاء الاصطناعي, القطاع الحكومي, البنوك, الطاقة, الرعاية الصحية, التعليم, رؤية 2030"
      : "industries we serve, cybersecurity Saudi Arabia, AI solutions, government sector, banking, energy, healthcare, education, Vision 2030",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);

  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={t.industries.page_title}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.industries.page_title}
      />

      <IndustriesList
        lang={cookieLang}
        t={t}
      />

      <Footer />
    </>
  );
}
