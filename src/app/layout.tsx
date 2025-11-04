import "../../styles/bootstrap.min.css";
import "../../styles/animate.css";
import "../../styles/boxicons.min.css";
import "../../styles/flaticon.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "swiper/css";
import "swiper/css/bundle";

// Global Style
import "../../styles/style.css";
import "../../styles/responsive.css";

import type { Metadata } from "next";
import Providers from "./providers";
import { cookies } from "next/headers";
import { Rubik, Barlow_Condensed } from "next/font/google";

// For all body text font
const rubik = Rubik({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
});

// For all heading font
const barlow_condensed = Barlow_Condensed({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eazy Cyber Agent - Cybersecurity & Digital Transformation Solutions",
  description: "Eazy Cyber Agent - Leading Saudi cybersecurity company providing AI solutions, big data analytics, cloud computing, and digital transformation services aligned with Vision 2030",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const lang = cookieLang === "ar" ? "ar" : "en";
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={`${rubik.variable} ${barlow_condensed.variable}`}>
        <Providers initialLang={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
