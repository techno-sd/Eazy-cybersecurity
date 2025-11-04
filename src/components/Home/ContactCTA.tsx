"use client";

import React from "react";
import Link from "next/link";

interface ContactCTAProps {
  lang: string;
  t: any;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  return (
    <section className="security-area pt-100 pb-100" style={{
      background: 'linear-gradient(135deg, #d80650 0%, #8b0032 100%)',
      position: 'relative',
      color: '#fff'
    }}>
      {/* Optional Vision 2030 Icon/Motif */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: isArabic ? 'auto' : '5%',
        left: isArabic ? '5%' : 'auto',
        transform: 'translateY(-50%)',
        opacity: '0.1',
        fontSize: '200px',
        lineHeight: '1'
      }}>
        <i className="bx bx-flag"></i>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
              <span className="sub-title" style={{ color: '#fff' }}>
                <i className="bx bx-phone-call"></i>
                {t.home.contact_cta.title}
              </span>
              <h2 style={{ color: '#fff', marginBottom: '20px' }}>{t.home.contact_cta.title}</h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '40px', color: 'rgba(255,255,255,0.95)' }}>
                {t.home.contact_cta.content}
              </p>

              <Link href="/contact" className="default-btn" style={{
                backgroundColor: '#fff',
                color: '#d80650',
                border: '2px solid #fff'
              }}>
                {t.home.contact_cta.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
