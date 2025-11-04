"use client";

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const ContactCTA: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";

  const benefits = [
    {
      icon: "bx bx-shield-quarter",
      titleKey: "benefit1_title",
      descKey: "benefit1_desc"
    },
    {
      icon: "bx bx-time-five",
      titleKey: "benefit2_title",
      descKey: "benefit2_desc"
    },
    {
      icon: "bx bx-check-circle",
      titleKey: "benefit3_title",
      descKey: "benefit3_desc"
    }
  ];

  return (
    <section className="security-area pt-100 pb-100" style={{
      background: 'linear-gradient(135deg, rgba(216, 6, 80, 0.06) 0%, rgba(0, 0, 0, 0.03) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Pattern */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(216, 6, 80, 0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(216, 6, 80, 0.03) 0%, transparent 50%)',
        opacity: '0.7'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '50px' }}>
              <span className="sub-title">
                <i className="bx bx-phone-call"></i>
                {isArabic ? 'ابدأ رحلتك الرقمية الآمنة' : 'Start Your Secure Digital Journey'}
              </span>
              <h2 style={{ marginBottom: '20px', fontSize: '42px', fontWeight: '700' }}>
                {t.home.contact_cta.title}
              </h2>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '0', maxWidth: '700px', margin: '0 auto 40px' }}>
                {t.home.contact_cta.content}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr', marginBottom: '40px' }}>
              {benefits.map((benefit, index) => (
                <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                  <div style={{
                    textAlign: 'center',
                    padding: '30px 20px',
                    background: '#fff',
                    borderRadius: '10px',
                    border: '1px solid rgba(216, 6, 80, 0.1)',
                    marginBottom: '20px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
                  }}>
                    <i className={benefit.icon} style={{ fontSize: '40px', color: '#607EAC', marginBottom: '15px', display: 'block' }}></i>
                    <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px', color: '#222' }}>
                      {(t.home.contact_cta as any)[benefit.titleKey]}
                    </h4>
                    <p style={{ fontSize: '14px', marginBottom: '0', color: '#666', lineHeight: '1.6' }}>
                      {(t.home.contact_cta as any)[benefit.descKey]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ textAlign: 'center' }}>
              <Link href="/contact" className="default-btn" style={{
                marginRight: isArabic ? '0' : '15px',
                marginLeft: isArabic ? '15px' : '0',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                {t.home.contact_cta.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>

              <Link href="/services" className="default-btn" style={{
                backgroundColor: 'transparent',
                color: '#607EAC',
                border: '2px solid #607EAC',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                {isArabic ? 'استكشف خدماتنا' : 'Explore Our Services'} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>

              {/* Trust Indicators */}
              <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(216, 6, 80, 0.15)' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
                  {isArabic ? 'موثوق به من قبل المؤسسات الرائدة في المملكة' : 'Trusted by Leading Organizations Across Saudi Arabia'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '30px', color: '#666' }}>
                  <span style={{ fontSize: '14px' }}>
                    <i className="bx bx-check-shield" style={{ fontSize: '18px', marginRight: isArabic ? '0' : '8px', marginLeft: isArabic ? '8px' : '0', color: '#607EAC' }}></i>
                    {isArabic ? 'متوافق مع NCA' : 'NCA Compliant'}
                  </span>
                  <span style={{ fontSize: '14px' }}>
                    <i className="bx bx-certification" style={{ fontSize: '18px', marginRight: isArabic ? '0' : '8px', marginLeft: isArabic ? '8px' : '0', color: '#607EAC' }}></i>
                    {isArabic ? 'معتمد ISO 27001' : 'ISO 27001 Certified'}
                  </span>
                  <span style={{ fontSize: '14px' }}>
                    <i className="bx bx-support" style={{ fontSize: '18px', marginRight: isArabic ? '0' : '8px', marginLeft: isArabic ? '8px' : '0', color: '#607EAC' }}></i>
                    {isArabic ? 'دعم 24/7' : '24/7 Support'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
