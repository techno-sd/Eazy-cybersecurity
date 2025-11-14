"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ServicesCTA: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  return (
    <section id="services-cta" className="security-area pb-100 pt-100" style={{
      background: 'linear-gradient(135deg, #0A4D8C 0%, #073D6C 50%, #1a6fad 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-120px',
        right: '-120px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-title reveal-animation" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: '600',
            fontSize: '14px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            marginBottom: '20px'
          }}>
            <i className="bx bx-rocket" style={{ fontSize: '22px' }}></i>
            {isArabic ? 'ابدأ الآن' : 'Get Started'}
          </span>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '25px',
            color: 'white',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            lineHeight: '1.2',
            letterSpacing: '-0.5px'
          }}>
            {isArabic ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.9',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '45px',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontWeight: '400'
          }}>
            {isArabic
              ? 'اتصل بنا اليوم لمناقشة احتياجات شركتك وكيف يمكننا مساعدتك في تحقيق أهدافك الرقمية.'
              : 'Contact us today to discuss your organization\'s needs and how we can help you achieve your digital goals.'}
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/contact"
              style={{
                background: 'white',
                color: '#0A4D8C',
                border: 'none',
                padding: '16px 38px',
                fontSize: '17px',
                fontWeight: '700',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'none',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                textTransform: 'capitalize'
              }}
            >
              {isArabic ? 'طلب استشارة مجانية' : 'Request Free Consultation'}
              <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
            </Link>
            <Link href="/services" className="default-btn" style={{
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              padding: '14px 36px',
              fontSize: '17px',
              fontWeight: '700',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              {isArabic ? 'استكشف جميع الخدمات' : 'Explore All Services'}
              <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
