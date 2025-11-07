import React from "react";
import { cookies } from 'next/headers';
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import ForgotPasswordForm from "../../components/Auth/ForgotPasswordForm";
import { getMessages } from '@/i18n';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('NEXT_LOCALE')?.value || 'en') as 'ar' | 'en';
  const messages = await getMessages(lang);

  return {
    title: lang === 'ar' ? 'نسيت كلمة المرور' : 'Forgot Password',
    description: lang === 'ar' 
      ? 'قم بإعادة تعيين كلمة المرور الخاصة بك للوصول إلى حسابك'
      : 'Reset your password to access your account',
  };
}

export default async function Page() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get('NEXT_LOCALE')?.value || 'en';

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={cookieLang === 'ar' ? "نسيت كلمة المرور" : "Forgot Password"}
        homePageUrl="/"
        homePageText={cookieLang === 'ar' ? "الرئيسية" : "Home"}
        activePageText={cookieLang === 'ar' ? "نسيت كلمة المرور" : "Forgot Password"}
      />

      <ForgotPasswordForm lang={cookieLang} />

      <Footer />
    </>
  );
}
