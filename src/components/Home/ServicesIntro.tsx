"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ServicesIntro: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="pt-100 pb-70" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
          <span className="sub-title">
            <i className="bx bx-cog"></i>
            {t.home.services_overview.title}
          </span>
          <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px' }}>
            {t.home.services_overview.title}
          </h2>
          <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', color: '#666' }}>
            {t.home.services_overview.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntro;
