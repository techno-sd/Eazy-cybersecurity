import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import ContactInfo from "../../components/Contact/ContactInfo";
import ContactForm from "../../components/Contact/ContactForm";
import Footer from "../../components/Layouts/Footer";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";

  return {
    title: cookieLang === "ar"
      ? "Eazy Cyber Agent | اتصل بنا – نحن هنا لمساعدتك"
      : "Eazy Cyber Agent | Contact Us – We're Here to Help",
    description: cookieLang === "ar"
      ? "تواصل مع فريق خبراء Eazy Cyber Agent للحصول على استشارات الأمن السيبراني وحلول الذكاء الاصطناعي والبيانات الضخمة. نحن موجودون في ينبع، المملكة العربية السعودية."
      : "Get in touch with Eazy Cyber Agent's expert team for cybersecurity consulting, AI solutions, and big data analytics. Based in Yanbu, Saudi Arabia.",
    keywords: cookieLang === "ar"
      ? "اتصل بنا, الأمن السيبراني, استشارات, ينبع, السعودية, دعم تقني"
      : "contact us, cybersecurity, consulting, Yanbu, Saudi Arabia, technical support",
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
        pageTitle={cookieLang === "ar" ? "اتصل بنا" : "Contact Us"}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={cookieLang === "ar" ? "اتصل بنا" : "Contact Us"}
      />

      <ContactInfo />

      <ContactForm />

      <Footer />
    </>
  );
}
