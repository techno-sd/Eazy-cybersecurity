"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ServicesOverview: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  const services = [
    {
      icon: "bx bx-brain",
      titleKey: "ai_title",
      descKey: "ai_desc",
      link: "/services#ai"
    },
    {
      icon: "bx bx-shield-quarter",
      titleKey: "cybersecurity_title",
      descKey: "cybersecurity_desc",
      link: "/services#cybersecurity"
    },
    {
      icon: "bx bx-data",
      titleKey: "bigdata_title",
      descKey: "bigdata_desc",
      link: "/services#bigdata"
    },
    {
      icon: "bx bx-cloud",
      titleKey: "cloud_title",
      descKey: "cloud_desc",
      link: "/services#cloud"
    }
  ];

  return (
    <section className="security-area pt-100 pb-70" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
          <span className="sub-title">
            <i className="bx bx-cog"></i>
            {t.home.services_overview.title}
          </span>
          <h2>{t.home.services_overview.title}</h2>
          <p style={{ fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>
            {t.home.services_overview.subtitle}
          </p>
        </div>

        <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-sm-6 col-md-6">
              <div className="single-security" style={{ textAlign: isArabic ? 'right' : 'left' }}>
                <i className={service.icon}></i>
                <h3>{(t.home.services_overview as any)[service.titleKey]}</h3>
                <p>{(t.home.services_overview as any)[service.descKey]}</p>
                <Link href={service.link} style={{ color: '#607EAC', fontWeight: '600' }}>
                  {t.home.about_preview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/services" className="default-btn">
            {t.home.services_overview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
