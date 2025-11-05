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
          backgroundImage: `url(/img/home-one/home1-banner.jpg)`
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9">
              <div className="banner-text" style={{ direction: isAR ? 'rtl' : 'ltr', textAlign: isAR ? 'right' : 'left' }}>
                <h1>{t.hero.title}</h1>
                <p>{t.hero.welcome}</p>

                <div
                  className="banner-btn"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    alignItems: isAR ? 'flex-start' : 'flex-start',
                  }}
                >
                  <Link
                    href="/contact"
                    className="default-btn"
                    style={{
                      margin: 0,
                      width: '100%',
                      maxWidth: '250px',
                    }}
                  >
                    {t.buttons.contact}
                  </Link>

                  <Link
                    href="/about"
                    className="default-btn active"
                    style={{
                      margin: 0,
                      width: '100%',
                      maxWidth: '250px',
                    }}
                  >
                    {t.buttons.about}
                  </Link>
                </div>
              </div>
            </div>

            {/* Video icon/button removed as requested */}
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
