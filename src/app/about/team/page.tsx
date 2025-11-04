import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";

  return {
    title: cookieLang === "ar"
      ? "Eazy Cyber Agent | لماذا نحن – الخبرة والامتثال والتميز"
      : "Eazy Cyber Agent | Why Choose Us – Expertise, Compliance & Excellence",
    description: cookieLang === "ar"
      ? "اكتشف لماذا Eazy Cyber Agent هو الخيار الأمثل للأمن السيبراني في المملكة: محترفون معتمدون، امتثال كامل للوائح NCA وساما، ودعم على مدار الساعة."
      : "Discover why Eazy Cyber Agent is the ideal choice for cybersecurity in Saudi Arabia: certified professionals, full NCA & SAMA compliance, and 24/7 support.",
    keywords: cookieLang === "ar"
      ? "Eazy Cyber Agent, لماذا نحن, أمن سيبراني السعودية, NCA-ECC, SAMA, ISO 27001, CISSP, CEH"
      : "Eazy Cyber Agent, why choose us, cybersecurity Saudi Arabia, NCA-ECC, SAMA, ISO 27001, CISSP, CEH",
  };
}

export default function Page() {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);

  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={t.whyChooseUs.page_title}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.whyChooseUs.page_title}
      />

      <WhyChooseUs
        lang={cookieLang}
        t={t}
      />

      <Footer />
    </>
  );
}
