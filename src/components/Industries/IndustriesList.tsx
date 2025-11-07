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

  // Industry data with platform brand colors and enhanced styling
  const industries = [
    {
      id: "government",
      icon: "bx bx-buildings",
      image: "/img/industries/gov.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
      accentColor: "#0A4D8C",
    },
    {
      id: "banking",
      icon: "bx bx-dollar-circle",
      image: "/img/industries/bank.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
      accentColor: "#0A4D8C",
    },
    {
      id: "energy",
      icon: "bx bx-plug",
      image: "/img/industries/telecom.jpg",
      gradient: "linear-gradient(135deg, #607EAC 0%, #4A6390 100%)",
      iconBg: "rgba(96, 126, 172, 0.1)",
      iconColor: "#607EAC",
      accentColor: "#607EAC",
    },
    {
      id: "healthcare",
      icon: "bx bx-plus-medical",
      image: "/img/industries/med.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
      accentColor: "#0A4D8C",
    },
    {
      id: "education",
      icon: "bx bx-book-open",
      image: "/img/industries/edu.jpg",
      gradient: "linear-gradient(135deg, #607EAC 0%, #4A6390 100%)",
      iconBg: "rgba(96, 126, 172, 0.1)",
      iconColor: "#607EAC",
      accentColor: "#607EAC",
    },
    {
      id: "smes",
      icon: "bx bx-rocket",
      image: "/img/industries/smes.jpg",
      gradient: "linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)",
      iconBg: "rgba(10, 77, 140, 0.1)",
      iconColor: "#0A4D8C",
      accentColor: "#0A4D8C",
    },
  ];

  return (
    <>
      {/* Enhanced Hero Section */}
      <section 
        className="industries-hero-section" 
        style={{
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ direction: isArabic ? "rtl" : "ltr" }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center" data-aos="fade-up">
                {/* Decorative Badge */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.1))',
                    borderRadius: '50px',
                    color: '#0A4D8C',
                    fontWeight: '600',
                    fontSize: '14px',
                    marginBottom: '25px',
                    border: '2px solid rgba(10, 77, 140, 0.2)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  <i className="bx bx-briefcase" style={{ fontSize: '18px' }}></i>
                  {isArabic ? 'القطاعات التي نخدمها' : 'Industries We Serve'}
                </span>

                {/* Subtitle */}
                <p
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.8',
                    color: '#555',
                    maxWidth: '850px',
                    margin: '0 auto',
                    fontWeight: 400,
                  }}
                >
                  {t.industries.hero_subtitle}
                </p>

                {/* Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05), rgba(96, 126, 172, 0.05))',
                  borderRadius: '50%',
                  zIndex: 0
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  width: '150px',
                  height: '150px',
                  background: 'linear-gradient(135deg, rgba(96, 126, 172, 0.05), rgba(10, 77, 140, 0.05))',
                  borderRadius: '50%',
                  zIndex: 0
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Industries List Section */}
      <section className="industries-list-section" style={{ padding: '100px 0', background: '#ffffff' }}>
        <div className="container">
          <div className="row g-5" style={{ direction: isArabic ? "rtl" : "ltr" }}>
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
                  <div 
                    className="industry-card-enhanced"
                    style={{
                      background: '#fff',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <div className="row g-0 align-items-center">
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
                        <div style={{ position: 'relative', height: '450px', overflow: 'hidden' }}>
                          {/* Image */}
                          <Image
                            src={industryData.image}
                            alt={industry.title}
                            fill
                            className="industry-image-enhanced"
                            style={{ objectFit: "cover", transition: 'transform 0.6s ease' }}
                          />

                          {/* Gradient Overlay */}
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: `linear-gradient(135deg, ${industryData.accentColor}40 0%, ${industryData.accentColor}10 100%)`,
                              opacity: 0.6,
                              transition: 'opacity 0.4s ease'
                            }}
                            className="industry-overlay"
                          />

                          {/* Floating Icon Badge */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '30px',
                              [isArabic ? 'right' : 'left']: '30px',
                              width: '70px',
                              height: '70px',
                              background: 'rgba(255, 255, 255, 0.95)',
                              backdropFilter: 'blur(10px)',
                              borderRadius: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '32px',
                              color: industryData.accentColor,
                              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                              transition: 'all 0.4s ease'
                            }}
                            className="industry-icon-float"
                          >
                            <i className={industryData.icon}></i>
                          </div>

                          {/* Number Badge */}
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '30px',
                              [isArabic ? 'left' : 'right']: '30px',
                              width: '60px',
                              height: '60px',
                              background: industryData.gradient,
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '24px',
                              fontWeight: '800',
                              color: '#fff',
                              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                            }}
                          >
                            {(index + 1).toString().padStart(2, "0")}
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
                          style={{
                            padding: '60px 50px',
                            textAlign: isArabic ? "right" : "left"
                          }}
                        >
                          {/* Title */}
                          <h3 
                            style={{
                              fontSize: '32px',
                              fontWeight: '700',
                              marginBottom: '20px',
                              lineHeight: '1.3',
                              background: industryData.gradient,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            {industry.title}
                          </h3>

                          {/* Description */}
                          <p 
                            style={{
                              fontSize: '16px',
                              lineHeight: '1.8',
                              color: '#666',
                              marginBottom: '30px'
                            }}
                          >
                            {industry.description}
                          </p>

                          {/* Feature Tags */}
                          <div 
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '12px',
                              marginBottom: '35px',
                              direction: isArabic ? 'rtl' : 'ltr'
                            }}
                          >
                            <span 
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                background: `${industryData.iconBg}`,
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: industryData.accentColor,
                                border: `2px solid ${industryData.accentColor}20`,
                                transition: 'all 0.3s ease'
                              }}
                              className="feature-tag"
                            >
                              <i className="bx bx-shield-alt-2" style={{ fontSize: '16px' }}></i>
                              {isArabic ? "حماية متقدمة" : "Advanced Security"}
                            </span>
                            <span 
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                background: `${industryData.iconBg}`,
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: industryData.accentColor,
                                border: `2px solid ${industryData.accentColor}20`,
                                transition: 'all 0.3s ease'
                              }}
                              className="feature-tag"
                            >
                              <i className="bx bx-brain" style={{ fontSize: '16px' }}></i>
                              {isArabic ? "ذكاء اصطناعي" : "AI-Powered"}
                            </span>
                            <span 
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                background: `${industryData.iconBg}`,
                                borderRadius: '50px',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: industryData.accentColor,
                                border: `2px solid ${industryData.accentColor}20`,
                                transition: 'all 0.3s ease'
                              }}
                              className="feature-tag"
                            >
                              <i className="bx bx-check-shield" style={{ fontSize: '16px' }}></i>
                              {isArabic ? "امتثال كامل" : "Full Compliance"}
                            </span>
                          </div>
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

      {/* Consultation CTA Section */}
      <section 
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        }}
      >
        <div className="container">
          <div style={{ direction: isArabic ? "rtl" : "ltr", textAlign: 'center' }}>
            <div className="row justify-content-center">
              <div className="col-lg-8" data-aos="fade-up">
                <div style={{
                  padding: '60px 40px',
                  background: 'linear-gradient(135deg, #0A4D8C 0%, #073D6C 100%)',
                  borderRadius: '20px',
                  boxShadow: '0 20px 60px rgba(10, 77, 140, 0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.1) 1px, transparent 0)',
                    backgroundSize: '30px 30px',
                    opacity: 0.4
                  }}></div>

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <i className="bx bx-phone-call" style={{
                      fontSize: '48px',
                      color: '#fff',
                      marginBottom: '20px',
                      display: 'block'
                    }}></i>
                    
                    <h2 style={{
                      fontSize: '32px',
                      fontWeight: '700',
                      color: '#fff',
                      marginBottom: '15px',
                      lineHeight: '1.3'
                    }}>
                      {isArabic 
                        ? "هل أنت مستعد لتأمين مؤسستك؟" 
                        : "Ready to Secure Your Organization?"}
                    </h2>
                    
                    <p style={{
                      fontSize: '17px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: '30px',
                      lineHeight: '1.8'
                    }}>
                      {isArabic
                        ? "احصل على استشارة من خبرائنا واكتشف كيف يمكننا حماية مؤسستك"
                        : "Get a consultation from our experts and discover how we can protect your organization"}
                    </p>

                    <Link
                      href="/contact"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '18px 40px',
                        background: '#fff',
                        color: '#0A4D8C',
                        borderRadius: '12px',
                        fontWeight: '700',
                        fontSize: '16px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 10px 35px rgba(0, 0, 0, 0.2)',
                      }}
                      className="consultation-cta-btn"
                    >
                      {isArabic ? "اطلب استشارة" : "Request Consultation"}
                      <i
                        className={`bx ${
                          isArabic ? "bx-left-arrow-alt" : "bx-right-arrow-alt"
                        }`}
                        style={{ fontSize: '20px' }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Vision 2030 CTA Section */}
      <section 
        className="industries-vision-section" 
        style={{
          padding: '100px 0',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div style={{ direction: isArabic ? "rtl" : "ltr" }}>
            <div className="row align-items-center g-5">
              <div className="col-lg-6" data-aos="fade-up">
                <div style={{ textAlign: isArabic ? "right" : "left" }}>
                  {/* Decorative Line */}
                  <span style={{ 
                    display: 'block', 
                    width: '60px', 
                    height: '4px', 
                    background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', 
                    borderRadius: '2px', 
                    marginBottom: '20px',
                    [isArabic ? 'marginLeft' : 'marginRight']: 'auto' 
                  }}></span>

                  {/* Badge */}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#0A4D8C',
                      fontWeight: '600',
                      fontSize: '14px',
                      marginBottom: '15px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}
                  >
                    <i className="bx bx-flag" style={{ fontSize: '18px' }}></i>
                    {isArabic ? 'رؤية 2030' : 'Vision 2030'}
                  </span>

                  {/* Heading */}
                  <h2 
                    className="gradient-text"
                    style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      marginBottom: '20px',
                      lineHeight: '1.3'
                    }}
                  >
                    {t.industries.vision2030_heading}
                  </h2>

                  {/* Description */}
                  <p 
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.8',
                      color: '#666',
                      marginBottom: '30px'
                    }}
                  >
                    {t.industries.vision2030_content}
                  </p>

                  {/* CTA Button */}
                  <Link 
                    href="/vision-2030"
                    className="btn-gradient"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '14px 32px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    {t.industries.vision2030_button}
                    <i
                      className={`bx ${
                        isArabic ? "bx-left-arrow-alt" : "bx-right-arrow-alt"
                      }`}
                    ></i>
                  </Link>
                </div>
              </div>

              <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                <div 
                  className="modern-card"
                  style={{ 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    boxShadow: '0 8px 32px rgba(10, 77, 140, 0.15)' 
                  }}
                >
                  <Image
                    src="/img/vision-2020.jpg"
                    alt="Saudi Vision 2030"
                    width={600}
                    height={400}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      transition: 'transform 0.4s ease' 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IndustriesList;
