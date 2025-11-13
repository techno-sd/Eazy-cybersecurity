"use client";
  
import React from "react"; 
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const Features: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isAR = lang === 'ar';

  return (
    <>
      <div className="container pt-70 pb-70" style={{ position: 'relative', zIndex: 3 }}>
        <div className="row g-4">
          <div className="col-lg-6 col-sm-6">
            <div className="single-features reveal-animation" style={{
              background: 'transparent',
              padding: '40px 35px',
              borderRadius: '20px',
              border: '1px solid rgba(63, 160, 255, 0.3)',
              boxShadow: '0 10px 40px rgba(10, 77, 140, 0.4), 0 0 20px rgba(63, 160, 255, 0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              animationDelay: '0.3s'
            }}>
              {/* Animated gradient overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(63, 160, 255, 0.15) 0%, transparent 50%)',
                pointerEvents: 'none',
                animation: 'pulse 3s ease-in-out infinite'
              }}></div>

              {/* Glowing corner accents */}
              <div style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                width: '40px',
                height: '40px',
                borderTop: '2px solid rgba(63, 160, 255, 0.6)',
                borderLeft: '2px solid rgba(63, 160, 255, 0.6)',
                borderRadius: '20px 0 0 0',
                animation: 'shimmer 2s ease-in-out infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '40px',
                height: '40px',
                borderBottom: '2px solid rgba(63, 160, 255, 0.6)',
                borderRight: '2px solid rgba(63, 160, 255, 0.6)',
                borderRadius: '0 0 20px 0',
                animation: 'shimmer 2s ease-in-out infinite 1s'
              }}></div>

              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, rgba(63, 160, 255, 0.2), rgba(96, 126, 172, 0.15))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 0 20px rgba(63, 160, 255, 0.3)',
                animation: 'float 4s ease-in-out infinite'
              }}>
                <i className="bx bx-show" style={{
                  color: '#3fa0ff',
                  fontSize: '36px',
                  filter: 'drop-shadow(0 0 8px rgba(63, 160, 255, 0.8))'
                }}></i>
              </div>
              <h3 style={{
                color: '#fff',
                fontSize: '26px',
                fontWeight: '700',
                marginBottom: '15px',
                position: 'relative',
                zIndex: 2,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}>
                {isAR ? 'الرؤية' : 'Vision'}
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '16px',
                lineHeight: '1.8',
                marginBottom: 0,
                position: 'relative',
                zIndex: 2
              }}>
                {t.hero?.vision}
              </p>
              <span className="bx bx-show" style={{
                opacity: 0.05,
                fontSize: '120px',
                position: 'absolute',
                bottom: '20px',
                right: isAR ? 'auto' : '20px',
                left: isAR ? '20px' : 'auto',
                color: '#3fa0ff',
                filter: 'blur(2px)'
              }}></span>
            </div>
          </div>

          <div className="col-lg-6 col-sm-6">
            <div className="single-features reveal-animation" style={{
              background: 'transparent',
              padding: '40px 35px',
              borderRadius: '20px',
              border: '1px solid rgba(63, 160, 255, 0.3)',
              boxShadow: '0 10px 40px rgba(10, 77, 140, 0.4), 0 0 20px rgba(63, 160, 255, 0.1)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              animationDelay: '0.5s'
            }}>
              {/* Animated gradient overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(63, 160, 255, 0.15) 0%, transparent 50%)',
                pointerEvents: 'none',
                animation: 'pulse 3s ease-in-out infinite 1.5s'
              }}></div>

              {/* Glowing corner accents */}
              <div style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                width: '40px',
                height: '40px',
                borderTop: '2px solid rgba(63, 160, 255, 0.6)',
                borderLeft: '2px solid rgba(63, 160, 255, 0.6)',
                borderRadius: '20px 0 0 0',
                animation: 'shimmer 2s ease-in-out infinite 0.5s'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                width: '40px',
                height: '40px',
                borderBottom: '2px solid rgba(63, 160, 255, 0.6)',
                borderRight: '2px solid rgba(63, 160, 255, 0.6)',
                borderRadius: '0 0 20px 0',
                animation: 'shimmer 2s ease-in-out infinite 1.5s'
              }}></div>

              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, rgba(63, 160, 255, 0.2), rgba(96, 126, 172, 0.15))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 0 20px rgba(63, 160, 255, 0.3)',
                animation: 'float 4s ease-in-out infinite 0.5s'
              }}>
                <i className="bx bx-target-lock" style={{
                  color: '#3fa0ff',
                  fontSize: '36px',
                  filter: 'drop-shadow(0 0 8px rgba(63, 160, 255, 0.8))'
                }}></i>
              </div>
              <h3 style={{
                color: '#fff',
                fontSize: '26px',
                fontWeight: '700',
                marginBottom: '15px',
                position: 'relative',
                zIndex: 2,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}>
                {isAR ? 'الرسالة' : 'Mission'}
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '16px',
                lineHeight: '1.8',
                marginBottom: 0,
                position: 'relative',
                zIndex: 2
              }}>
                {t.hero?.mission}
              </p>
              <span className="bx bx-target-lock" style={{
                opacity: 0.05,
                fontSize: '120px',
                position: 'absolute',
                bottom: '20px',
                right: isAR ? 'auto' : '20px',
                left: isAR ? '20px' : 'auto',
                color: '#3fa0ff',
                filter: 'blur(2px)'
              }}></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
