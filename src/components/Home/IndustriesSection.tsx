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
        background: "linear-gradient(135deg, #f8f9fa 0%, #e8f0f7 50%, #f0f5f9 100%)",
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
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(10, 77, 140, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 10s ease-in-out infinite'
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: isArabic ? 'auto' : '-80px',
        right: isArabic ? '-80px' : 'auto',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(96, 126, 172, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0,
        animation: 'float 12s ease-in-out infinite'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Title */}
        <div
          className="section-title"
          style={{
            direction: isArabic ? "rtl" : "ltr",
            textAlign: isArabic ? "right" : "left",
            marginBottom: "60px",
            animation: "fadeInUp 0.8s ease",
            maxWidth: "900px",
            margin: "0 auto 60px"
          }}
        >
          <span style={{
            display: 'block',
            width: '70px',
            height: '5px',
            background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
            borderRadius: '3px',
            marginBottom: '25px',
            [isArabic ? 'marginLeft' : 'marginRight']: 'auto',
            boxShadow: '0 2px 10px rgba(10, 77, 140, 0.3)'
          }}></span>
          <h2 className="gradient-text" style={{
            fontSize: '42px',
            fontWeight: '800',
            marginBottom: '20px',
            lineHeight: '1.2',
            letterSpacing: '-0.5px'
          }}>
            {t.home.industries_preview.title}
          </h2>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.9',
            marginBottom: '25px',
            color: '#555',
            fontWeight: '500'
          }}>
            {t.home.industries_preview.tagline}
          </p>
        </div>

        {/* Industries Cards - Show top 3 */}
        <div className="row" style={{ direction: isArabic ? "rtl" : "ltr", marginLeft: 0, marginRight: 0 }}>
          {industries.map((industryData, index) => {
            const industry = t.industries.industries_list[index];
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="col-12 reveal-animation" data-aos="fade-up" data-aos-delay={index * 100} style={{ animationDelay: `${index * 0.1}s`, paddingLeft: 0, paddingRight: 0 }}>
                <div className="industry-card-horizontal hover-lift">
                  <div className="row align-items-center">
                    {/* Image Section */}
                    <div
                      className={`col-lg-6 ${
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
                          width={800}
                          height={400}
                          className="industry-image"
                          style={{ objectFit: "cover", width: '100%', height: '100%', display: 'block' }}
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
                      className={`col-lg-6 ${
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
