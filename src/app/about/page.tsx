import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Vision from "@/components/About/Vision/Vision";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";

  return {
    title: cookieLang === "ar"
      ? "Eazy Cyber Agent | من نحن – خبراء الأمن السيبراني والذكاء الاصطناعي في المملكة"
      : "Eazy Cyber Agent | About Us – Saudi Cybersecurity & AI Experts",
    description: cookieLang === "ar"
      ? "تعرف على رؤية Eazy Cyber Agent ورسالتها وقيمها كشركة سعودية رائدة في الأمن السيبراني والذكاء الاصطناعي وابتكار البيانات، متوافقة مع رؤية 2030."
      : "Learn about Eazy Cyber Agent's vision, mission, and core values as a Saudi leader in cybersecurity, AI, and data innovation, aligned with Vision 2030.",
    keywords: cookieLang === "ar"
      ? "من نحن Eazy Cyber Agent, الأمن السيبراني السعودية, الذكاء الاصطناعي, رؤية 2030, التحول الرقمي"
      : "About Eazy Cyber Agent, cybersecurity Saudi Arabia, AI, Vision 2030, digital transformation",
  };
}

export default function Page() {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);

  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={t.about.page_title}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.about.page_title}
      />

      <Vision
        lang={cookieLang}
        t={t}
      />

      <Footer />
    </>
  );
}
