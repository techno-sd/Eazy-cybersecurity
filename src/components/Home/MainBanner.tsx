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
                  fontWeight: 'bold',
                  color: '#fff',
                  lineHeight: '1.2',
                  marginBottom: '20px'
                }}>
                  {t.hero.title}
                </h1>
                <p style={{
                  color: '#f0f0f0',
                  marginBottom: '30px',
                  lineHeight: '1.8'
                }}>
                  {t.hero.welcome}
                </p>

                {/* Vision & Mission moved to FeaturedSection below hero */}

                <div className="banner-btn" dir={isAR ? 'rtl' : 'ltr'}>
                  <Link
                    href="/contact"
                    className="btn-gradient"
                  >
                    {t.buttons.contact}
                  </Link>

                  <Link
                    href="/about"
                    className="btn-modern"
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
