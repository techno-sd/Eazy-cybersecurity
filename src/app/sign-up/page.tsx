import React from "react";
import { cookies } from 'next/headers';
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import SignUpForm from "../../components/Auth/SignUpForm";
import { getMessages } from '@/i18n';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'ar' | 'en';
  const messages = await getMessages(lang);

  return {
    title: lang === 'ar' ? 'إنشاء حساب' : 'Sign Up',
    description: lang === 'ar' 
      ? 'أنشئ حسابك للوصول إلى خدمات الأمن السيبراني والذكاء الاصطناعي المتقدمة'
      : 'Create your account to access our advanced cybersecurity and AI services',
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={cookieLang === 'ar' ? "إنشاء حساب" : "Sign Up"}
        homePageUrl="/"
        homePageText={cookieLang === 'ar' ? "الرئيسية" : "Home"}
        activePageText={cookieLang === 'ar' ? "إنشاء حساب" : "Sign Up"}
      />

      <SignUpForm lang={cookieLang} />

      <Footer />
    </>
  );
}
