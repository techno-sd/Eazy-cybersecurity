"use client";
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Vision2030Content from "@/components/About/Vision2030/Vision2030Content";
import { getMessages } from "@/i18n";

export default function Page() {
  const lang = "ar";
  const t = getMessages(lang);
  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle="رؤيتنا 2030"
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText="رؤيتنا 2030"
      />
      <Vision2030Content lang={lang} />
      <Footer />
    </>
  );
}
