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
          direction: isAR ? 'rtl' : 'ltr'
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9">
              <div className="banner-text" style={{ 
                direction: isAR ? 'rtl' : 'ltr', 
                textAlign: isAR ? 'right' : 'left',
                animation: 'fadeInUp 0.8s ease 0.2s forwards'
              }}>
                <h1 style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: 'bold', 
                  color: '#fff',
                  lineHeight: '1.2',
                  marginBottom: '20px'
                }}>
                  {t.hero.title}
                </h1>
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: '#f0f0f0',
                  marginBottom: '30px',
                  lineHeight: '1.8'
                }}>
                  {t.hero.welcome}
                </p>

                <div
                  className="banner-btn"
                  style={{
                    display: 'flex',
                    flexDirection: isAR ? 'row-reverse' : 'row',
                    gap: '15px',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}
                >
                  <Link
                    href="/contact"
                    className="btn-gradient"
                    style={{
                      padding: '14px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '0',
                      background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '8px'
                    }}
                  >
                    {t.buttons.contact}
                  </Link>

                  <Link
                    href="/about"
                    className="btn-modern"
                    style={{
                      padding: '14px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginBottom: '0',
                      background: '#fff',
                      color: '#0A4D8C',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      border: '2px solid #fff'
                    }}
                  >
                    {t.buttons.about}
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
