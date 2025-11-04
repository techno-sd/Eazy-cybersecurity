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
      ? "Eazy Cyber Agent | من نحن – الرؤية والرسالة والفريق"
      : "Eazy Cyber Agent | About Us – Vision, Mission & Team",
    description: cookieLang === "ar"
      ? "تعرف على رؤية Eazy Cyber Agent ورسالتها وقيمها وفريق الخبراء الذي يقود الابتكار في الأمن السيبراني والذكاء الاصطناعي في المملكة العربية السعودية."
      : "Learn about Eazy Cyber Agent's vision, mission, values, and expert team driving innovation in cybersecurity and AI across Saudi Arabia.",
    keywords: cookieLang === "ar"
      ? "Eazy Cyber Agent, شركة أمن سيبراني السعودية, الذكاء الاصطناعي, رؤية 2030, التحول الرقمي"
      : "Eazy Cyber Agent, cybersecurity company Saudi Arabia, AI, Vision 2030, digital transformation",
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
