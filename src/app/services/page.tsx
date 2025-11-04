import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import ServicesPage from "@/components/Services/ServicesPage";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";

  return {
    title: cookieLang === "ar"
      ? "Eazy Cyber Agent | خدماتنا – الذكاء الاصطناعي، الأمن السيبراني، البيانات الضخمة، والحوسبة السحابية"
      : "Eazy Cyber Agent | Services – AI, Cybersecurity, Big Data & Cloud",
    description: cookieLang === "ar"
      ? "استكشف خدمات Eazy Cyber Agent الشاملة في الذكاء الاصطناعي، الأمن السيبراني، تحليلات البيانات الضخمة، الاستضافة السحابية، ودعم الشركات الصغيرة والمتوسطة – متوافقة مع رؤية السعودية 2030."
      : "Explore Eazy Cyber Agent's comprehensive digital services in AI, cybersecurity, big data analytics, cloud hosting, and SME support — all aligned with Saudi Vision 2030.",
    keywords: cookieLang === "ar"
      ? "الأمن السيبراني السعودية, حلول الذكاء الاصطناعي, تحليل البيانات, الحوسبة السحابية, برنامج SME, رؤية 2030"
      : "cybersecurity Saudi Arabia, AI solutions, data analytics, cloud computing, SME program, Vision 2030",
  };
}

export default function Page() {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);

  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={t.services.page_title}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.services.page_title}
      />

      <ServicesPage
        lang={cookieLang}
        t={t}
      />

      <Footer />
    </>
  );
}
