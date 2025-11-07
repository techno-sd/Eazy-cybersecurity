"use client";

import React from "react";
import Link from "next/link";

interface ServiceConsultationCTAProps {
  serviceType: string;
  lang: string;
}

const ServiceConsultationCTA: React.FC<ServiceConsultationCTAProps> = ({ serviceType, lang }) => {
  const isArabic = lang === "ar";

  const content = {
    en: {
      title: "Ready to Get Started?",
      subtitle: "Schedule a free consultation with our experts",
      button: "Request Consultation",
      features: [
        "Free initial consultation",
        "Customized solutions",
        "Expert guidance"
      ]
    },
    ar: {
      title: "هل أنت مستعد للبدء؟",
      subtitle: "احجز استشارة مع خبرائنا",
      button: "اطلب استشارة",
      features: [
  "استشارة أولية",
        "حلول مخصصة",
        "إرشاد من الخبراء"
      ]
    }
  };

  const t = isArabic ? content.ar : content.en;

  // Encode the service type for URL
  const encodedService = encodeURIComponent(serviceType);

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0A4D8C 0%, #073D6C 50%, #0EA5E9 100%)',
        borderRadius: '24px',
        padding: '50px',
        margin: '60px 0',
        boxShadow: '0 20px 60px rgba(10, 77, 140, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        direction: isArabic ? 'rtl' : 'ltr'
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          [isArabic ? 'left' : 'right']: 0,
          width: '40%',
          height: '100%',
          background: 'url("/img/patterns/dots.svg")',
          opacity: 0.1,
          pointerEvents: 'none'
        }}
      />

      <div className="row align-items-center" style={{ position: 'relative', zIndex: 1 }}>
        <div className="col-lg-8">
          <h3
            style={{
              color: '#fff',
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '15px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
            }}
          >
            {t.title}
          </h3>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '18px',
              marginBottom: '25px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
            }}
          >
            {t.subtitle}
          </p>

          {/* Features List */}
          <div
            style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}
          >
            {t.features.map((feature, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#fff'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <i className="bx bx-check" style={{ fontSize: '18px', color: '#fff' }}></i>
                </div>
                <span
                  style={{
                    fontSize: '16px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                  }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4" style={{ textAlign: isArabic ? 'left' : 'right' }}>
          <Link
            href={`/contact?service=${encodedService}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#fff',
              color: '#0A4D8C',
              padding: '18px 40px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            }}
          >
            {t.button}
            <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{ fontSize: '22px' }}></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceConsultationCTA;
