import React from "react";
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import IndustriesList from "@/components/Industries/IndustriesList";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";

export default function Page() {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";
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
