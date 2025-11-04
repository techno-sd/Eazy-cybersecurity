"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const IndustriesPreview: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  const industries = [
    {
      icon: "bx bx-buildings",
      titleKey: "government",
      link: "/industries#government"
    },
    {
      icon: "bx bx-dollar-circle",
      titleKey: "finance",
      link: "/industries#finance"
    },
    {
      icon: "bx bx-plug",
      titleKey: "energy",
      link: "/industries#energy"
    },
    {
      icon: "bx bx-plus-medical",
      titleKey: "healthcare",
      link: "/industries#healthcare"
    },
    {
      icon: "bx bx-book-open",
      titleKey: "education",
      link: "/industries#education"
    },
    {
      icon: "bx bx-rocket",
      titleKey: "smes",
      link: "/industries#sme"
    }
  ];

  return (
    <section className="security-area pt-100 pb-70">
      <div className="container">
        <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
          <span className="sub-title">
            <i className="bx bx-briefcase"></i>
            {t.home.industries_preview.title}
          </span>
          <h2>{t.home.industries_preview.title}</h2>
          <p style={{ fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>
            {t.home.industries_preview.tagline}
          </p>
        </div>

        <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {industries.map((industry, index) => (
            <div key={index} className="col-lg-2 col-sm-4 col-6">
              <Link href={industry.link}>
                <div className="single-security" style={{ textAlign: 'center', padding: '30px 15px', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  <i className={industry.icon} style={{ fontSize: '50px', marginBottom: '15px' }}></i>
                  <h4 style={{ fontSize: '16px', marginBottom: '0' }}>
                    {(t.home.industries_preview as any)[industry.titleKey]}
                  </h4>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/industries" className="default-btn">
            {t.home.industries_preview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustriesPreview;
