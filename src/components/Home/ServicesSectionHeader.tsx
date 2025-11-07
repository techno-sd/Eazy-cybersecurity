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
            textAlign: 'center', 
            marginBottom: '0',
            animation: 'fadeInUp 0.8s ease'
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
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '30px', 
            color: '#0e0129',
            background: 'linear-gradient(135deg, #0A4D8C 0%, #0e0129 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>
            {isArabic ? 'خدماتنا' : 'Our Services'}
          </h2>

          {/* Description */}
          <p style={{ 
            fontSize: '17px', 
            lineHeight: '1.85', 
            color: '#555',
            maxWidth: '900px', 
            marginLeft: 'auto', 
            marginRight: 'auto',
            fontWeight: '500',
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }}>
            {isArabic 
              ? 'نقدّم مجموعة من الحلول التقنية المتطورة التي تمكّن المؤسسات من النمو والابتكار بثقة. من الذكاء الاصطناعي إلى الأمن السيبراني والحوسبة السحابية، نوفّر خدمات متكاملة تدعم التحوّل الرقمي وتُعزّز كفاءة الأعمال.'
              : 'We offer a suite of advanced technical solutions that empower organizations to grow and innovate with confidence. From artificial intelligence to cybersecurity and cloud computing, we provide integrated services that support digital transformation and enhance business efficiency.'}
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
      </div>
    </section>
  );
};

export default ServicesSectionHeader;
