"use client";
  
import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const LetsTalkArea: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === 'ar';

  return (
    <>
      <div 
        className="lats-talk-area ptb-100"
        style={{
          background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 50%, #0A4D8C 100%)',
          backgroundAttachment: 'fixed',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <div 
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
          }}
        ></div>
        <div 
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '250px',
            height: '250px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        ></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div 
            className="lats-talk-content"
            style={{
              textAlign: 'center',
              padding: '60px 40px',
            }}
          >
            <h2 
              style={{
                fontSize: 'clamp(28px, 5vw, 52px)',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '20px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                animation: 'slideInUp 0.8s ease 0.2s forwards',
                opacity: 0,
              }}
            >
              {isArabic ? 'لنضمن مستقبلك الرقمي' : "Let's Secure Your Digital Future"}
            </h2>

            <p
              style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '40px',
                maxWidth: '700px',
                margin: '0 auto 40px',
                lineHeight: '1.8',
                animation: 'slideInUp 0.8s ease 0.4s forwards',
                opacity: 0,
              }}
            >
              {isArabic 
                ? 'تواصل معنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكننا مساعدتك في حماية أصولك الرقمية والبقاء متقدماً في عالم التهديدات السيبرانية المتطورة باستمرار.'
                : "Contact us today to get a free consultation and discover how we can help you protect your digital assets and stay ahead in an ever-evolving cybersecurity landscape."}
            </p>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link 
                href="/contact" 
                className="default-btn six"
                style={{
                  background: '#fff',
                  color: '#0A4D8C',
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  textDecoration: 'none',
                  animation: 'slideInUp 0.8s ease 0.6s forwards',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                <i className="bx bx-mail-send" style={{ fontSize: '20px' }}></i>
                {isArabic ? 'تحدث معنا' : 'Get Started'}
              </Link>

              <Link 
                href="/services" 
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  padding: '16px 40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  animation: 'slideInUp 0.8s ease 0.8s forwards',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.25)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <i className="bx bx-book-open" style={{ fontSize: '20px' }}></i>
                {isArabic ? 'اكتشف الخدمات' : 'Learn More'}
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(20px); }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default LetsTalkArea;
