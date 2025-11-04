"use client";

import React from "react";

interface VisionProps {
  lang: string;
  t: any;
}

const Vision: React.FC<VisionProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  return (
    <>
      {/* Vision Section */}
      <section className="security-area pb-70 pt-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-bullseye"></i>
              {t.about.vision_heading}
            </span>
            <h2>{t.about.vision_heading}</h2>
            <p>
              {t.about.vision_content}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-rocket"></i>
              {t.about.mission_heading}
            </span>
            <h2>{t.about.mission_heading}</h2>
            <p>
              {t.about.mission_content}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="security-area pb-70">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <span className="sub-title">
              <i className="bx bx-star"></i>
              {t.about.core_values_heading}
            </span>
            <h2>{t.about.core_values_heading}</h2>
            <p>
              {isArabic
                ? 'نؤمن بأربع قيم أساسية تشكل جوهر عملنا وتوجه علاقاتنا مع عملائنا وشركائنا.'
                : 'We believe in four core values that form the essence of our work and guide our relationships with clients and partners.'}
            </p>
          </div>

          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.about.core_values.map((value: any, index: number) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <i className={
                    index === 0 ? 'bx bx-shield-quarter' :
                    index === 1 ? 'bx bx-bulb' :
                    index === 2 ? 'bx bx-lock-alt' :
                    'bx bx-user-check'
                  }></i>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Vision;
