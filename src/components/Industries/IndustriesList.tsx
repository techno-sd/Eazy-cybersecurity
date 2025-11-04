"use client";

import React from "react";

interface IndustriesListProps {
  lang: string;
  t: any;
}

const IndustriesList: React.FC<IndustriesListProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  const icons = [
    "flaticon-profile",
    "flaticon-payment-method",
    "flaticon-speed",
    "flaticon-heartbeat",
    "flaticon-graduation",
    "flaticon-startup"
  ];

  return (
    <>
      <section className="security-area pb-70 pt-100">
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
            <h2>{t.industries.section_title}</h2>
          </div>

          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {t.industries.industries_list.map((industry: any, index: number) => (
              <div key={index} className="col-lg-4 col-sm-6">
                <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <i className={icons[index] || "flaticon-profile"}></i>
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustriesList;
