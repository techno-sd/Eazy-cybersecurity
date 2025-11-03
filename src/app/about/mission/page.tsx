import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
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

      <div className="container ptb-100">
        <h2 style={{ textAlign: cookieLang === 'ar' ? 'right' : 'left', direction: cookieLang === 'ar' ? 'rtl' : 'ltr' }}>{t.about["Mission"]}</h2>
        <p style={{ textAlign: cookieLang === 'ar' ? 'right' : 'left', direction: cookieLang === 'ar' ? 'rtl' : 'ltr' }}>
          {/* Placeholder content */}
        </p>
      </div>

      <Footer />
    </>
  );
}
