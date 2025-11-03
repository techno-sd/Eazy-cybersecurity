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
  title: "Pisa - Cyber Security Services Company React Next Template",
  description: "Cyber Security Services Company React Next Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${barlow_condensed.variable}`}>
        {children}
      </body>
    </html>
  );
}
