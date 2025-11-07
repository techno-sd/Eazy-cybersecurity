"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ServicesShowcase: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  const services = [
    {
      id: 1,
      icon: "bx bx-bot",
      title: isArabic ? "حلول الذكاء الاصطناعي" : "AI Solutions",
      desc: isArabic ? "أتمتة ذكية وتحليلات متقدمة" : "Smart automation and advanced analytics",
      color: "#FF6B6B"
    },
    {
      id: 2,
      icon: "bx bx-shield-alt-2",
      title: isArabic ? "خدمات الأمن السيبراني" : "Cybersecurity",
      desc: isArabic ? "حماية شاملة ضد التهديدات الرقمية" : "Complete protection against cyber threats",
      color: "#4ECDC4"
    },
    {
      id: 3,
      icon: "bx bx-data",
      title: isArabic ? "البيانات الضخمة والتحليلات" : "Big Data & Analytics",
      desc: isArabic ? "استخراج الذكاء من بياناتك" : "Extract intelligence from your data",
      color: "#45B7D1"
    },
    {
      id: 4,
      icon: "bx bx-server",
      title: isArabic ? "الحوسبة السحابية" : "Cloud Computing",
      desc: isArabic ? "استضافة آمنة وموثوقة" : "Secure and reliable hosting",
      color: "#96CEB4"
    },
    {
      id: 5,
      icon: "bx bx-package",
      title: isArabic ? "برنامج SME-EAZY" : "SME-EAZY Program",
      desc: isArabic ? "حلول مخصصة للمشاريع الصغيرة" : "Solutions for small businesses",
      color: "#FFEAA7"
    }
  ];

  return (
    <section 
      className="services-showcase-area py-100" 
      style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)',
        padding: '80px 0'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div 
          className="section-title" 
          style={{ 
            textAlign: 'center',
            marginBottom: '60px'
          }}
        >
          <h2 style={{ 
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '15px',
            background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {isArabic ? "خدماتنا الرئيسية" : "Our Services"}
          </h2>
          <p style={{ 
            fontSize: '18px',
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {isArabic 
              ? "حلول متكاملة لأمنك الرقمي وتطورك التكنولوجي"
              : "Comprehensive solutions for your digital security and technological advancement"}
          </p>
        </div>

        {/* Services Grid */}
        <div className="row" style={{ gap: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {services.map((service) => (
            <div 
              key={service.id} 
              className="col-lg-4 col-md-6"
              style={{ 
                flex: '0 0 calc(33.333% - 20px)',
                minHeight: '300px',
                maxWidth: 'calc(33.333% - 20px)'
              }}
            >
              <Link href="/services" style={{ textDecoration: 'none' }}>
                <div 
                  style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '40px 30px',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    border: '1px solid #e8e8e8',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-8px)';
                    el.style.boxShadow = '0 12px 30px rgba(10, 77, 140, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  {/* Background gradient accent */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: isArabic ? 'auto' : 0,
                      left: isArabic ? 0 : 'auto',
                      width: '4px',
                      height: '100%',
                      background: `linear-gradient(180deg, ${service.color} 0%, #0A4D8C 100%)`,
                      opacity: 0.3
                    }}
                  />

                  {/* Icon */}
                  <div 
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${service.color}20 0%, ${service.color}10 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                      marginLeft: isArabic ? 'auto' : 0,
                      marginRight: isArabic ? 0 : 'auto'
                    }}
                  >
                    <i 
                      className={service.icon}
                      style={{
                        fontSize: '28px',
                        color: service.color,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: isArabic ? 'right' : 'left' }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#0e0129',
                      marginBottom: '12px',
                      marginTop: '0'
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      marginBottom: '0'
                    }}>
                      {service.desc}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: service.color,
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}>
                    <span>{isArabic ? "اعرف المزيد" : "Learn More"}</span>
                    <i className="bx bx-chevron-right" style={{ fontSize: '18px' }} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <Link 
            href="/services"
            style={{
              display: 'inline-block',
              padding: '14px 40px',
              background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(10, 77, 140, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(10, 77, 140, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(10, 77, 140, 0.3)';
            }}
          >
            {isArabic ? "استكشف جميع الخدمات" : "Explore All Services"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
