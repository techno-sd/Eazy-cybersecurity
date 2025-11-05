"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface IndustriesListProps {
  lang: string;
  t: any;
}

const IndustriesList: React.FC<IndustriesListProps> = ({ lang, t }) => {
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
    {
      id: "healthcare",
      icon: "bx bx-plus-medical",
      image: "/img/industries/healthcare.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
    },
    {
      id: "education",
      icon: "bx bx-book-open",
      image: "/img/industries/education.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
    },
    {
      id: "smes",
      icon: "bx bx-rocket",
      image: "/img/industries/smes.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
    },
  ];

  return (
    <>
      {/* Hero Subtitle Section */}
      <section className="industries-hero-section py-5">
        <div className="container">
          <div
            className="row align-items-center"
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            <div className="col-lg-12">
              <div className="industries-hero-content text-center">
                <p
                  className="hero-subtitle"
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.8",
                    color: "#666",
                    maxWidth: "900px",
                    margin: "0 auto 60px",
                    fontWeight: 500,
                  }}
                >
                  {t.industries.hero_subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries List Section - One Per Row */}
      <section className="industries-list-section pb-100">
        <div className="container">
          <div className="row g-4" style={{ direction: isArabic ? "rtl" : "ltr" }}>
            {t.industries.industries_list.map((industry: any, index: number) => {
              const industryData = industries[index];
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  id={industryData.id}
                  className="col-12"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="industry-card-horizontal">
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
                          {/* Next.js Image Component */}
                          <Image
                            src={industryData.image}
                            alt={industry.title}
                            width={600}
                            height={400}
                            className="industry-image"
                            style={{ objectFit: "cover" }}
                          />

                          {/* Gradient Overlay */}
                          <div
                            className="industry-gradient-overlay"
                            style={{ background: industryData.gradient }}
                          />

                          {/* Icon Badge */}
                          <div
                            className="industry-icon-badge-horizontal"
                            style={{
                              background: industryData.iconBg,
                              color: industryData.iconColor,
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
                          {/* Number Badge */}
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

                          {/* Key Features/Tags */}
                          <div className="industry-tags">
                            <span className="industry-tag" style={{ borderColor: industryData.iconColor }}>
                              <i className="bx bx-check-circle" style={{ color: industryData.iconColor }}></i>
                              {isArabic ? "حماية متقدمة" : "Advanced Security"}
                            </span>
                            <span className="industry-tag" style={{ borderColor: industryData.iconColor }}>
                              <i className="bx bx-check-circle" style={{ color: industryData.iconColor }}></i>
                              {isArabic ? "ذكاء اصطناعي" : "AI Solutions"}
                            </span>
                            <span className="industry-tag" style={{ borderColor: industryData.iconColor }}>
                              <i className="bx bx-check-circle" style={{ color: industryData.iconColor }}></i>
                              {isArabic ? "امتثال كامل" : "Full Compliance"}
                            </span>
                          </div>

                          {/* CTA Button */}
                          <Link
                            href={`/contact`}
                            className="industry-btn"
                            style={{
                              background: industryData.gradient,
                              borderColor: industryData.iconColor,
                            }}
                          >
                            {isArabic ? "اطلب استشارة" : "Request Consultation"}
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
        </div>
      </section>

      {/* Vision 2030 CTA Section */}
      <section className="industries-vision-section py-100">
        <div className="container">
          <div
            className="vision-cta-wrapper"
            style={{ direction: isArabic ? "rtl" : "ltr" }}
          >
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div
                  className="vision-content"
                  style={{ textAlign: isArabic ? "right" : "left" }}
                >
                  <span className="vision-badge">
                    <i className="bx bx-flag"></i>
                    {t.industries.vision2030_heading}
                  </span>
                  <h2 className="vision-heading">{t.industries.vision2030_heading}</h2>
                  <p className="vision-text">{t.industries.vision2030_content}</p>
                </div>
              </div>
              <div className="col-lg-4 text-center text-lg-end">
                <Link href="/vision-2030" className="default-btn vision-btn">
                  {t.industries.vision2030_button}
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
      </section>
    </>
  );
};

export default IndustriesList;
