import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Vision from "@/components/About/Vision/Vision";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";

export default function Page() {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);
  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={t.about["Vision"]}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.about["Vision"]}
      />

      <Vision 
        lang={cookieLang}
        visionTitle={t.about["Vision"]}
        visionContent={t.about["vision_content"]}
      />

      <Footer />
    </>
  );
}
