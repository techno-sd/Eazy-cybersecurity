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
    <section id="services-cta" className="security-area pb-100 pt-100" style={{ background: 'linear-gradient(135deg, #0A4D8C 0%, #1a6fad 100%)', color: 'white' }}>
      <div className="container">
        <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px', color: 'white' }}>
            {isArabic ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            {isArabic 
              ? 'اتصل بنا اليوم لمناقشة احتياجات شركتك وكيف يمكننا مساعدتك في تحقيق أهدافك الرقمية.'
              : 'Contact us today to discuss your organization\'s needs and how we can help you achieve your digital goals.'}
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="default-btn" style={{ 
              background: 'white', 
              color: '#0A4D8C',
              border: 'none',
              padding: '12px 30px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              {isArabic ? 'طلب استشارة مجانية' : 'Request Free Consultation'}
            </Link>
            <Link href="/services" className="default-btn" style={{ 
              background: 'transparent', 
              color: 'white',
              border: '2px solid white',
              padding: '10px 28px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              {isArabic ? 'استكشف جميع الخدمات' : 'Explore All Services'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
