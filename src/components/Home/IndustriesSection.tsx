"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const IndustriesSection: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  // Industry data with icons, images, and platform brand colors
  const industries = [
    {
      id: "government",
      icon: "bx bx-buildings",
      image: "/img/industries/gov.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
    },
    {
      id: "banking",
      icon: "bx bx-dollar-circle",
      image: "/img/industries/bank.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
    },
    {
      id: "energy",
      icon: "bx bx-plug",
      image: "/img/industries/telecom.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
    },
  ];

  return (
    <section className="pt-100 pb-70" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)", direction: isArabic ? "rtl" : "ltr" }}>
      <div className="container">
        {/* Section Title */}
        <div
          className="section-title"
          style={{
            direction: isArabic ? "rtl" : "ltr",
            textAlign: "center",
            marginBottom: "60px",
            animation: "fadeInUp 0.8s ease"
          }}
        >
          <span style={{ display: 'block', width: '60px', height: '4px', background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', borderRadius: '2px', margin: '0 auto 20px 0' }}></span>
          <span className="sub-title" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#0A4D8C',
            fontWeight: '600',
            fontSize: '16px',
            marginBottom: '12px'
          }}>
            <i className="bx bx-briefcase"></i>
            {t.home.industries_preview.title}
          </span>
          <h2 className="gradient-text" style={{ 
            fontSize: "42px", 
            fontWeight: "700", 
            marginBottom: "20px"
          }}>
            {t.home.industries_preview.title}
          </h2>
          <p
            style={{
              fontSize: "18px",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
              color: "#666",
            }}
          >
            {t.home.industries_preview.tagline}
          </p>
        </div>

        {/* Industries Cards - Show top 3 */}
        <div className="row g-4" style={{ direction: isArabic ? "rtl" : "ltr" }}>
          {industries.map((industryData, index) => {
            const industry = t.industries.industries_list[index];
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="col-12 reveal-animation" data-aos="fade-up" data-aos-delay={index * 100} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="industry-card-horizontal hover-lift">
                  <div className="row g-0 align-items-center">
                    {/* Image Section */}
                    <div
                      className={`col-lg-5 ${
                        isArabic
                          ? isEven
                            ? "order-lg-2"
                            : "order-lg-1"
                          : isEven
                          ? "order-lg-1"
                          : "order-lg-2"
                      }`}
                    >
                      <div className="industry-image-wrapper">
                        <Image
                          src={industryData.image}
                          alt={industry.title}
                          width={600}
                          height={400}
                          className="industry-image"
                          style={{ objectFit: "cover" }}
                        />
                        <div
                          className="industry-gradient-overlay"
                          style={{ background: industryData.gradient }}
                        />
                        <div
                          className="industry-icon-badge-horizontal icon-circle"
                          style={{
                            background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                            color: '#fff',
                          }}
                        >
                          <i className={industryData.icon}></i>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div
                      className={`col-lg-7 ${
                        isArabic
                          ? isEven
                            ? "order-lg-1"
                            : "order-lg-2"
                          : isEven
                          ? "order-lg-2"
                          : "order-lg-1"
                      }`}
                    >
                      <div
                        className="industry-content-horizontal"
                        style={{ textAlign: isArabic ? "right" : "left" }}
                      >
                        <span
                          className="industry-number"
                          style={{
                            background: industryData.iconBg,
                            color: industryData.iconColor,
                          }}
                        >
                          {(index + 1).toString().padStart(2, "0")}
                        </span>

                        <h3 className="industry-title-horizontal">{industry.title}</h3>
                        <p className="industry-description-horizontal">
                          {industry.description}
                        </p>

                        <div className="industry-tags">
                          <span
                            className="industry-tag"
                            style={{ borderColor: industryData.iconColor }}
                          >
                            <i
                              className="bx bx-check-circle"
                              style={{ color: industryData.iconColor }}
                            ></i>
                            {isArabic ? "حماية متقدمة" : "Advanced Security"}
                          </span>
                          <span
                            className="industry-tag"
                            style={{ borderColor: industryData.iconColor }}
                          >
                            <i
                              className="bx bx-check-circle"
                              style={{ color: industryData.iconColor }}
                            ></i>
                            {isArabic ? "ذكاء اصطناعي" : "AI Solutions"}
                          </span>
                          <span
                            className="industry-tag"
                            style={{ borderColor: industryData.iconColor }}
                          >
                            <i
                              className="bx bx-check-circle"
                              style={{ color: industryData.iconColor }}
                            ></i>
                            {isArabic ? "امتثال كامل" : "Full Compliance"}
                          </span>
                        </div>

                        <Link
                          href={`/industries#${industryData.id}`}
                          className="industry-btn"
                          style={{
                            background: industryData.gradient,
                            borderColor: industryData.iconColor,
                          }}
                        >
                          {isArabic ? "معرفة المزيد" : "Learn More"}
                          <i
                            className={`bx ${
                              isArabic ? "bx-left-arrow-alt" : "bx-right-arrow-alt"
                            }`}
                          ></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Link href="/industries" className="default-btn" style={{ padding: "16px 35px" }}>
            {t.home.industries_preview.button}{" "}
            <i
              className={`bx ${isArabic ? "bx-left-arrow-alt" : "bx-right-arrow-alt"}`}
            ></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
