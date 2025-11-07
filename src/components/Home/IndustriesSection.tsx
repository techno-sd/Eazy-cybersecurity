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
    <section 
      className="pt-100 pb-70" 
      style={{ 
        background: "linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)", 
        direction: isArabic ? "rtl" : "ltr",
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: isArabic ? 'auto' : '-100px',
        left: isArabic ? '-100px' : 'auto',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(10, 77, 140, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
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
          {/* Accent line */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '25px',
            gap: '12px'
          }}>
            <span style={{ 
              display: 'block', 
              width: '40px', 
              height: '4px', 
              background: 'linear-gradient(90deg, transparent, #0A4D8C)', 
              borderRadius: '2px'
            }}></span>
            <span style={{ 
              display: 'block', 
              width: '60px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', 
              borderRadius: '2px'
            }}></span>
            <span style={{ 
              display: 'block', 
              width: '40px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #607EAC, transparent)', 
              borderRadius: '2px'
            }}></span>
          </div>

          {/* Main heading */}
          <h2 
            className="gradient-text" 
            style={{ 
              fontSize: "48px", 
              fontWeight: "800", 
              marginBottom: "30px",
              background: 'linear-gradient(135deg, #0A4D8C 0%, #0e0129 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
              lineHeight: '1.2'
            }}
          >
            {t.home.industries_preview.title}
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "17px",
              maxWidth: "900px",
              margin: "0 auto",
              lineHeight: "1.85",
              color: "#555",
              fontWeight: "500",
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            {t.home.industries_preview.tagline}
          </p>

          {/* Bottom accent */}
          <div style={{
            width: '80px',
            height: '4px',
            background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
            borderRadius: '2px',
            margin: '30px auto 0 auto'
          }}></div>
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
