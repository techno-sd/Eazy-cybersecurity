"use client";

import React from "react";
import Link from "next/link";

interface WhyChooseUsProps {
  lang: string;
  t: any;
}

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="security-area pb-70 pt-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <h2>{t.whyChooseUs.hero_title}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.whyChooseUs.hero_content}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section - What Sets Us Apart */}
      <section id="main-content" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-check-shield"></i>
              {t.whyChooseUs.main_section_title}
            </span>
            <h2>{t.whyChooseUs.main_section_title}</h2>
          </div>

          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.whyChooseUs.main_points.map((point: string, index: number) => (
              <div key={index} className="col-lg-6 col-sm-6">
                <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <i className="bx bx-check-circle"></i>
                  <p>{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Standards Section */}
      <section id="certifications" className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-badge-check"></i>
              {t.whyChooseUs.certifications_title}
            </span>
            <h2>{t.whyChooseUs.certifications_title}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.whyChooseUs.certifications_content}
            </p>
          </div>
        </div>
      </section>

      {/* Customer-Centric Commitment Section with CTA */}
      <section id="commitment" className="security-area pb-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
            <span className="sub-title">
              <i className="bx bx-heart"></i>
              {t.whyChooseUs.commitment_title}
            </span>
            <h2>{t.whyChooseUs.commitment_title}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {t.whyChooseUs.commitment_content}
            </p>

            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/services/ai" className="default-btn">
                {t.whyChooseUs.cta_services}
              </Link>
              <Link href="/contact" className="default-btn">
                {t.whyChooseUs.cta_contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
