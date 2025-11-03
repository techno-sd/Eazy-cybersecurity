import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import CoreValues from "@/components/About/CoreValues/CoreValues";
import { cookies } from "next/headers";
import { getMessages } from "@/i18n";

export default function Page() {
  const cookieLang = cookies().get("lang")?.value === "ar" ? "ar" : "en";
  const t = getMessages(cookieLang);
  return (
    <>
      <Navbar />
      <PageBanner
        pageTitle={t.about["Core Values"]}
        homePageUrl="/"
        homePageText={t.menu["Home"]}
        activePageText={t.about["Core Values"]}
      />

      <CoreValues 
        lang={cookieLang}
        coreValuesTitle={t.about["Core Values"]}
        coreValues={t.about["core_values"]}
      />

      <Footer />
    </>
  );
}
