"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface IndustriesListProps {
  lang: string;
  t: any;
}

// Custom hook for scroll-triggered animations
const useInView = (threshold = 0.2) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
};

const IndustriesList: React.FC<IndustriesListProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  // Scroll reveal for sections
  const heroSection = useInView(0.1);
  const listSection = useInView(0.1);
  const ctaSection = useInView(0.2);

  // Hover state for industry cards
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);

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
        ref={heroSection.ref}
        className="industries-hero-section"
        style={{
          background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(10, 77, 140, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite 2s'
        }}></div>

        <div className="container" style={{ direction: isArabic ? "rtl" : "ltr" }}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="text-center"
                style={{
                  opacity: heroSection.isInView ? 1 : 0,
                  transform: heroSection.isInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
              >
                {/* Main Title */}
                <h2 style={{
                  fontSize: 'clamp(36px, 7vw, 56px)',
                  fontWeight: '800',
                  lineHeight: '1.2',
                  marginBottom: 'clamp(20px, 3vw, 30px)',
                  background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none'
                }}>
                  {isArabic ? 'القطاعات التي نخدمها' : 'Industries We Serve'}
                </h2>

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
      <section
        ref={listSection.ref}
        className="industries-list-section"
        style={{ padding: '100px 0', background: '#ffffff' }}
      >
        <div className="container">
          <div className="row g-5" style={{ direction: isArabic ? "rtl" : "ltr" }}>
            {t.industries.industries_list.map((industry: any, index: number) => {
              const industryData = industries[index];
              const isEven = index % 2 === 0;
              const isHovered = hoveredIndustry === index;

              return (
                <div
                  key={index}
                  id={industryData?.id}
                  className="col-12"
                  style={{
                    opacity: listSection.isInView ? 1 : 0,
                    transform: listSection.isInView ? 'translateY(0)' : 'translateY(50px)',
                    transition: `all 0.7s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.15}s`
                  }}
                >
                  <div
                    className="industry-card-enhanced"
                    style={{
                      background: '#fff',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: isHovered
                        ? '0 30px 60px rgba(10, 77, 140, 0.15)'
                        : '0 10px 40px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      transform: isHovered ? 'translateY(-10px) scale(1.01)' : 'translateY(0) scale(1)',
                    }}
                    onMouseEnter={() => setHoveredIndustry(index)}
                    onMouseLeave={() => setHoveredIndustry(null)}
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
        ref={ctaSection.ref}
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
        }}
      >
        <div className="container">
          <div style={{ direction: isArabic ? "rtl" : "ltr", textAlign: 'center' }}>
            <div className="row justify-content-center">
              <div
                className="col-lg-8"
                style={{
                  opacity: ctaSection.isInView ? 1 : 0,
                  transform: ctaSection.isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                  transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
              >
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
    </>
  );
};

export default IndustriesList;
