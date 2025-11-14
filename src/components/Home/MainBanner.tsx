"use client";
  
import React, { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";
import FsLightbox from "fslightbox-react";
import Link from "next/link";
import Features from "./Features";

const MainBanner: React.FC = () => {
  const [toggler, setToggler] = useState(false);
  const { lang } = useLang();
  const isAR = lang === 'ar';
  const t = getMessages(lang);
  
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={["https://www.youtube.com/embed/bk7McNUjWgw"]}
      />

      <div
        className="banner-area"
        style={{
          backgroundImage: `url(/img/home-one/home1-banner.jpg)`,
          direction: isAR ? 'rtl' : 'ltr',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflow: 'hidden'
        }}
      >
        {/* Light overlay for text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(20, 20, 30, 0.3) 100%)',
          zIndex: 1
        }}></div>

        {/* Subtle animated gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(10, 77, 140, 0.15) 0%, transparent 50%)',
          animation: 'float 15s ease-in-out infinite',
          zIndex: 1
        }}></div>

        {/* Animated Cyber Grid Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(63, 160, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(63, 160, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
          zIndex: 1
        }}></div>

        {/* Circuit-like connections */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '2px',
          height: '150px',
          background: 'linear-gradient(180deg, transparent, rgba(63, 160, 255, 0.4), transparent)',
          animation: 'pulse 4s ease-in-out infinite',
          zIndex: 1
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '25%',
          width: '2px',
          height: '100px',
          background: 'linear-gradient(180deg, transparent, rgba(63, 160, 255, 0.3), transparent)',
          animation: 'pulse 5s ease-in-out infinite 1s',
          zIndex: 1
        }}></div>

        {/* Floating Digital Particles */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 2 === 0 ? '4px' : '3px',
            height: i % 2 === 0 ? '4px' : '3px',
            background: i % 3 === 0 ? 'rgba(63, 160, 255, 0.8)' : 'rgba(96, 126, 172, 0.7)',
            borderRadius: '50%',
            boxShadow: `0 0 ${10 + i}px rgba(63, 160, 255, 0.6)`,
            left: `${10 + i * 12}%`,
            bottom: 0,
            animation: `particleFloat ${12 + i * 2}s linear infinite ${i * 0.5}s`,
            zIndex: 1
          }}></div>
        ))}

        {/* Scan Line Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(63, 160, 255, 0.6), transparent)',
          boxShadow: '0 0 10px rgba(63, 160, 255, 0.5)',
          animation: 'scanLine 8s linear infinite',
          zIndex: 2
        }}></div>

        {/* Glowing Orbs */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(63, 160, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 18s ease-in-out infinite',
          zIndex: 1
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(96, 126, 172, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 22s ease-in-out infinite 2s',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-9">
              <div className="banner-text reveal-animation" style={{
                direction: isAR ? 'rtl' : 'ltr',
                textAlign: isAR ? 'right' : 'left',
                animationDelay: '0.2s'
              }}>
                <h1 className="reveal-animation" style={{
                  fontWeight: '800',
                  color: '#fff',
                  lineHeight: '1.2',
                  marginBottom: '25px',
                  fontSize: '52px',
                  letterSpacing: '-1px',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(63, 160, 255, 0.3)',
                  animationDelay: '0.3s'
                }}>
                  {t.hero.title}
                </h1>
                <p className="reveal-animation" style={{
                  color: '#f5f5f5',
                  marginBottom: '35px',
                  lineHeight: '1.9',
                  fontSize: '18px',
                  maxWidth: '650px',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  animationDelay: '0.4s'
                }}>
                  {t.hero.welcome}
                </p>

                {/* Vision & Mission moved to FeaturedSection below hero */}

                <div className="banner-btn reveal-animation" dir={isAR ? 'rtl' : 'ltr'} style={{
                  animationDelay: '0.5s',
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  <Link
                    href="/contact"
                    className="btn-gradient"
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '16px 38px',
                      fontSize: '17px',
                      fontWeight: '700',
                      borderRadius: '50px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 8px 30px rgba(10, 77, 140, 0.4), 0 0 20px rgba(63, 160, 255, 0.3)'
                    }}
                  >
                    <i className={`bx bx-shield-quarter`} style={{ fontSize: '20px' }}></i>
                    {t.buttons.contact}
                    <i className={`bx ${isAR ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <Features />

        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </>
  );
};

export default MainBanner;
