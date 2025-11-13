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
      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.06) 0%, rgba(96, 126, 172, 0.04) 50%, rgba(10, 77, 140, 0.05) 100%)',
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
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(10, 77, 140, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(96, 126, 172, 0.06) 0%, transparent 50%)',
        opacity: '0.7'
      }}></div>

      {/* Animated decorative elements */}
      <div style={{
        position: 'absolute',
        top: '100px',
        right: '50px',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(10, 77, 140, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="section-title reveal-animation" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
              <span className="sub-title" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '15px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '20px'
              }}>
                <i className="bx bx-phone-call" style={{ fontSize: '22px' }}></i>
                {isArabic ? 'ابدأ رحلتك الرقمية الآمنة' : 'Start Your Secure Digital Journey'}
              </span>
              <h2 style={{
                marginBottom: '25px',
                fontSize: '48px',
                fontWeight: '800',
                lineHeight: '1.2',
                letterSpacing: '-0.5px'
              }}>
                {t.home.contact_cta.title}
              </h2>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.9',
                marginBottom: '0',
                maxWidth: '750px',
                margin: '0 auto 50px',
                color: '#555',
                fontWeight: '500'
              }}>
                {t.home.contact_cta.content}
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="row g-4" style={{ direction: isArabic ? 'rtl' : 'ltr', marginBottom: '50px' }}>
              {benefits.map((benefit, index) => (
                <div key={index} className="col-lg-4 col-md-4 col-sm-12">
                  <div className="hover-lift reveal-animation" style={{
                    textAlign: 'center',
                    padding: '40px 25px',
                    background: '#fff',
                    borderRadius: '16px',
                    border: '1px solid rgba(10, 77, 140, 0.12)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    animationDelay: `${index * 0.1}s`
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      margin: '0 auto 20px',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.08))',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.4s ease'
                    }}>
                      <i className={benefit.icon} style={{
                        fontSize: '40px',
                        color: '#0A4D8C',
                        transition: 'all 0.3s ease'
                      }}></i>
                    </div>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '12px',
                      color: '#0e0129'
                    }}>
                      {(t.home.contact_cta as any)[benefit.titleKey]}
                    </h4>
                    <p style={{
                      fontSize: '15px',
                      marginBottom: '0',
                      color: '#666',
                      lineHeight: '1.7'
                    }}>
                      {(t.home.contact_cta as any)[benefit.descKey]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ textAlign: 'center' }}>
              <Link href="/contact" className="btn-gradient" style={{
                marginRight: isArabic ? '0' : '15px',
                marginLeft: isArabic ? '15px' : '0',
                display: 'inline-flex',
                marginBottom: '15px',
                padding: '16px 38px',
                fontSize: '17px',
                fontWeight: '700',
                borderRadius: '50px'
              }}>
                {t.home.contact_cta.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>

              <Link href="/services" className="default-btn" style={{
                backgroundColor: 'transparent',
                color: '#0A4D8C',
                border: '2px solid #0A4D8C',
                display: 'inline-flex',
                marginBottom: '15px',
                padding: '16px 38px',
                fontSize: '17px',
                fontWeight: '700',
                borderRadius: '50px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {isArabic ? 'استكشف خدماتنا' : 'Explore Our Services'} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>

              {/* Trust Indicators */}
              <div className="reveal-animation" style={{ marginTop: '50px', paddingTop: '35px', borderTop: '2px solid rgba(10, 77, 140, 0.15)', animationDelay: '0.5s' }}>
                <p style={{ fontSize: '15px', color: '#555', marginBottom: '20px', fontWeight: '600' }}>
                  {isArabic ? 'موثوق به من قبل المؤسسات الرائدة في المملكة' : 'Trusted by Leading Organizations Across Saudi Arabia'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '40px', color: '#666' }}>
                  <span style={{
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 20px',
                    background: 'rgba(10, 77, 140, 0.05)',
                    borderRadius: '30px',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="bx bx-check-shield" style={{ fontSize: '22px', color: '#0A4D8C' }}></i>
                    <span style={{ fontWeight: '600', color: '#0A4D8C' }}>
                      {isArabic ? 'متوافق مع NCA' : 'NCA Compliant'}
                    </span>
                  </span>
                  <span style={{
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 20px',
                    background: 'rgba(10, 77, 140, 0.05)',
                    borderRadius: '30px',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="bx bx-certification" style={{ fontSize: '22px', color: '#0A4D8C' }}></i>
                    <span style={{ fontWeight: '600', color: '#0A4D8C' }}>
                      {isArabic ? 'معتمد ISO 27001' : 'ISO 27001 Certified'}
                    </span>
                  </span>
                  <span style={{
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 20px',
                    background: 'rgba(10, 77, 140, 0.05)',
                    borderRadius: '30px',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="bx bx-support" style={{ fontSize: '22px', color: '#0A4D8C' }}></i>
                    <span style={{ fontWeight: '600', color: '#0A4D8C' }}>
                      {isArabic ? 'دعم 24/7' : '24/7 Support'}
                    </span>
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
