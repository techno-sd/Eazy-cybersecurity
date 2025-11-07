import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import SignInForm from "../../components/Auth/SignInForm";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("NEXT_LOCALE")?.value || 'en') as 'ar' | 'en';
  const messages = await getMessages(lang);

  return {
    title: lang === "ar"
      ? "تسجيل الدخول"
      : "Sign In",
    description: lang === "ar"
      ? "تسجيل الدخول إلى حسابك للوصول إلى خدمات الأمن السيبراني والذكاء الاصطناعي المتقدمة"
      : "Sign in to your account to access advanced cybersecurity and AI services",
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("NEXT_LOCALE")?.value || 'en';

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={cookieLang === "ar" ? "تسجيل الدخول" : "Sign In"}
        homePageUrl="/"
        homePageText={cookieLang === "ar" ? "الرئيسية" : "Home"}
        activePageText={cookieLang === "ar" ? "تسجيل الدخول" : "Sign In"}
      />

      <SignInForm lang={cookieLang} />

      <Footer />
    </>
  );
}
