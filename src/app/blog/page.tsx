"use client";
import React from "react";
import Navbar from "../../components/Layouts/Navbar";
import PageBanner from "../../components/Common/PageBanner";
import Footer from "../../components/Layouts/Footer";
import BlogGridFromDB from "../../components/Blog/BlogGridFromDB";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

export default function Page() {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === 'ar';
  
  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={isArabic ? 'المدونة' : 'Our Blog'}
        homePageUrl="/"
        homePageText={isArabic ? 'الرئيسية' : 'Home'}
        activePageText={isArabic ? 'المدونة' : 'Blog'}
      />

      <BlogGridFromDB />

      <Footer />
    </>
  );
}
