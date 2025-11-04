"use client";

import React from "react";
import Link from "next/link";

interface IndustriesListProps {
  lang: string;
  t: any;
}

const IndustriesList: React.FC<IndustriesListProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  const icons = [
    "bx bx-buildings",
    "bx bx-dollar-circle",
    "bx bx-plug",
    "bx bx-plus-medical",
    "bx bx-book-open",
    "bx bx-rocket"
  ];

  const sectionIds = [
    "government",
    "finance",
    "energy",
    "healthcare",
    "education",
    "sme"
  ];

  return (
    <>
      {/* Hero Subtitle Section */}
      <section className="security-area pt-100 pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '50px' }}>
              {t.industries.hero_subtitle}
            </p>
          </div>

          {/* Industries Grid */}
          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.industries.industries_list.map((industry: any, index: number) => (
              <div key={index} id={sectionIds[index]} className="col-lg-4 col-sm-6">
                <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <i className={icons[index]}></i>
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision 2030 Section */}
      <section className="security-area pb-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
            <span className="sub-title">
              <i className="bx bx-flag"></i>
              {t.industries.vision2030_heading}
            </span>
            <h2>{t.industries.vision2030_heading}</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
              {t.industries.vision2030_content}
            </p>
            <div style={{ marginTop: '30px' }}>
              <Link href="/vision-2030" className="default-btn">
                {t.industries.vision2030_button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustriesList;
