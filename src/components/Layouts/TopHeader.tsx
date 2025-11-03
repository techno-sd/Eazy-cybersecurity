"use client";
  
import React, { useEffect, useState } from "react";

const TopHeader: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('lang') as 'ar' | 'en') || 'en';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang);
    }
  }, [lang]);

  const selectLang = (val: 'ar' | 'en') => setLang(val);

  return (
    <>
      <div className="top-header-area">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-8">
              <ul className="header-content-left">
                <li>
                  <a href="mailto:hello@pisa.com">
                    <i className="bx bx-envelope"></i>
                    Email: hello@pisa.com
                  </a>
                </li>

                <li>
                  <i className="bx bx-location-plus"></i>
                  658 Lane Drive St. California
                </li>
              </ul>
            </div>

            <div className="col-lg-6 col-sm-4">
              <ul className="header-content-right" style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
                <li>
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/" target="_blank">
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank">
                    <i className="bx bxl-instagram"></i>
                  </a>
                </li>
                {/* Language Toggle */}
                <li className="lang-control" style={{ listStyle: 'none' }}>
                  <div className="lang-toggle" aria-label="Language switcher">
                    <button
                      type="button"
                      className={lang === 'ar' ? 'active' : ''}
                      onClick={() => selectLang('ar')}
                    >
                      AR
                    </button>
                    <button
                      type="button"
                      className={lang === 'en' ? 'active' : ''}
                      onClick={() => selectLang('en')}
                    >
                      EN
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
