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
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Enhanced overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.45) 0%, rgba(20, 20, 30, 0.5) 100%)',
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

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-9">
              <div className="banner-text" style={{
                direction: isAR ? 'rtl' : 'ltr',
                textAlign: isAR ? 'right' : 'left'
              }}>
                <h1 style={{
                  fontWeight: '800',
                  color: '#fff',
                  lineHeight: '1.2',
                  marginBottom: '25px',
                  fontSize: '52px',
                  letterSpacing: '-1px',
                  textShadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
                }}>
                  {t.hero.title}
                </h1>
                <p style={{
                  color: '#f5f5f5',
                  marginBottom: '35px',
                  lineHeight: '1.9',
                  fontSize: '18px',
                  maxWidth: '650px',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                }}>
                  {t.hero.welcome}
                </p>

                {/* Vision & Mission moved to FeaturedSection below hero */}

                <div className="banner-btn" dir={isAR ? 'rtl' : 'ltr'}>
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
                      boxShadow: '0 8px 30px rgba(10, 77, 140, 0.3)',
                      marginRight: isAR ? '0' : '15px',
                      marginLeft: isAR ? '15px' : '0',
                      marginBottom: '15px'
                    }}
                  >
                    <i className={`bx bx-shield-quarter`} style={{ fontSize: '20px' }}></i>
                    {t.buttons.contact}
                    <i className={`bx ${isAR ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
                  </Link>

                  <Link
                    href="/about"
                    className="default-btn"
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '16px 38px',
                      fontSize: '17px',
                      fontWeight: '700',
                      borderRadius: '50px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      border: '2px solid rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      marginBottom: '15px'
                    }}
                  >
                    {t.buttons.about}
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
