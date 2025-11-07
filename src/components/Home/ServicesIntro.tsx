"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ServicesIntro: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section className="services-intro-area pt-100 pb-30" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}>
      <div className="container">
        <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
          <span className="sub-title section-divider" style={{ display: 'block', width: '60px', height: '4px', background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', borderRadius: '2px', margin: '0 auto 20px 0' }}></span>
          <span style={{ color: '#0A4D8C', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <i className="bx bx-cog"></i>
            {t.home.services_overview.title}
          </span>
          <h2 className="gradient-text" style={{ fontSize: '38px', fontWeight: '700', marginBottom: '15px' }}>
            {t.home.services_overview.title}
          </h2>
          <p style={{ fontSize: '17px', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7', color: '#666', fontWeight: '500' }}>
            {t.home.services_overview.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesIntro;
