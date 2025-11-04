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
        pageTitle={t.about.page_title}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.about.vision_heading}
      />

      <Vision
        lang={cookieLang}
        t={t}
      />

      <Footer />
    </>
  );
}
