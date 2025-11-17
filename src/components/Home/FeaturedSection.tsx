"use client";
import React from 'react';
import { useLang } from '../../context/LangContext';
import { getMessages } from '../../i18n';

const FeaturedSection: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isAR = lang === 'ar';

  return (
    <section
      id="featured"
      style={{
        background: 'linear-gradient(135deg, #0A4D8C 0%, #1B3355 100%)',
        padding: '80px 0',
        color: '#fff'
      }}
    >
      <div className="container" style={{ direction: isAR ? 'rtl' : 'ltr' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', margin: 0, fontWeight: 700 }}>
            {isAR ? 'مميزاتنا الإستراتيجية' : 'Our Strategic Pillars'}
          </h2>
          <p style={{
            maxWidth: '800px',
            margin: '20px auto 0',
            lineHeight: 1.7,
            fontSize: '1rem',
            color: '#d6e2f0'
          }}>
            {isAR
              ? 'نضع الرؤية والرسالة في صميم كل ما نقدمه لتعزيز الثقة والتحول الرقمي الآمن.'
              : 'We place our vision and mission at the core of every solution to enable secure digital transformation.'}
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}
        >
          {/* Vision Card */}
          <div
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '16px',
              padding: '30px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(14, 165, 233, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at top left, rgba(255,255,255,0.15), transparent 70%)'
            }} />
            <h3 style={{
              marginTop: 0,
              fontSize: '1.4rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isAR ? 'الرؤية' : 'Vision'}
            </h3>
            <p style={{ lineHeight: 1.7, fontSize: '0.95rem', color: '#e8f3ff' }}>
              {t.hero?.vision}
            </p>
          </div>
          {/* Mission Card */}
          <div
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '16px',
              padding: '30px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(14, 165, 233, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.5)';
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(14, 165, 233, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at top left, rgba(255,255,255,0.15), transparent 70%)'
            }} />
            <h3 style={{
              marginTop: 0,
              fontSize: '1.4rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isAR ? 'الرسالة' : 'Mission'}
            </h3>
            <p style={{ lineHeight: 1.7, fontSize: '0.95rem', color: '#e8f3ff' }}>
              {t.hero?.mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
