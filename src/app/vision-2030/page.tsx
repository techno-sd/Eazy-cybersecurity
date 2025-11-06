import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Vision2030Content from "@/components/About/Vision2030/Vision2030Content";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eazy Cyber Agent | Vision 2030 Alignment",
  description: "Eazy Cyber Agent's commitment to Saudi Vision 2030. Learn how our cybersecurity and digital solutions support the Kingdom's digital transformation and national infrastructure protection.",
  keywords: ["Vision 2030", "Cybersecurity", "Digital Transformation", "Saudi Arabia", "National Infrastructure", "Digital Innovation"],
  openGraph: {
    title: "Vision 2030 Alignment | Eazy Cyber Agent",
    description: "Building a secure digital future aligned with Saudi Vision 2030.",
    type: "website",
  },
};

export default async function Page() {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);

  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={cookieLang === "ar" ? "رؤيتنا 2030" : "Vision 2030"}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={cookieLang === "ar" ? "رؤيتنا 2030" : "Vision 2030 Alignment"}
      />

      <Vision2030Content lang={cookieLang} />

      <Footer />
    </>
  );
}
