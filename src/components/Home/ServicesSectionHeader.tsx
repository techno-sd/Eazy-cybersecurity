"use client";

import React from "react";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ServicesSectionHeader: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section 
      className="security-area pb-70 pt-100" 
      style={{ 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)', 
        direction: isArabic ? 'rtl' : 'ltr',
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
        <div
          className="section-title"
          style={{
            direction: isArabic ? 'rtl' : 'ltr',
            textAlign: isArabic ? 'right' : 'left',
            marginBottom: '0',
            animation: 'fadeInUp 0.8s ease',
            maxWidth: '900px',
            margin: '0 auto'
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
            {isArabic ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p style={{
            fontSize: '17px',
            lineHeight: '1.9',
            marginBottom: '25px',
            color: '#555',
            fontWeight: '500'
          }}>
            {isArabic
              ? 'نقدّم مجموعة من الحلول التقنية المتطورة التي تمكّن المؤسسات من النمو والابتكار بثقة. من الذكاء الاصطناعي إلى الأمن السيبراني والحوسبة السحابية، نوفّر خدمات متكاملة تدعم التحوّل الرقمي وتُعزّز كفاءة الأعمال.'
              : 'We offer a suite of advanced technical solutions that empower organizations to grow and innovate with confidence. From artificial intelligence to cybersecurity and cloud computing, we provide integrated services that support digital transformation and enhance business efficiency.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSectionHeader;
