import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import Mission from "@/components/About/Mission/Mission";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";

export default function Page() {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);
  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={t.about["Mission"]}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.about["Mission"]}
      />

      <Mission 
        lang={cookieLang}
        missionTitle={t.about["Mission"]}
        missionContent={t.about["mission_content"]}
      />

      <Footer />
    </>
  );
}
