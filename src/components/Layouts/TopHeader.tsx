"use client";
  
import React from "react";
import { useLang } from "@/context/LangContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TopHeader: React.FC = () => {
  const { lang, setLang } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectLang = (val: 'ar' | 'en') => {
    setLang(val);
    // Compute locale-prefixed path and navigate, preserving query and hash
    let base = (pathname || '/').replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
    // Ensure trailing slash per next.config
    if (!base.endsWith('/')) base = base + '/';
    let next = `/${val}${base}`;
    const query = searchParams?.toString();
    if (query) next += `?${query}`;
    if (typeof window !== 'undefined' && window.location.hash) {
      next += window.location.hash;
    }
    router.push(next, { scroll: false });
  };

  return (
    <>
      <div className="top-header-area" style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e8e8e8'
      }}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-8">
              <ul className="header-content-left" style={{ color: '#666' }}>
                <li style={{ color: '#666' }}>
                  <a href="mailto:support@eazycyber.sa" style={{ color: '#666' }}>
                    <i className="bx bx-envelope" style={{ color: '#607EAC' }}></i>
                    Email: support@eazycyber.sa
                  </a>
                </li>

                <li style={{ color: '#666' }}>
                  <i className="bx bx-location-plus" style={{ color: '#607EAC' }}></i>
                  KSA , Riyadh
                </li>
              </ul>
            </div>

            <div className="col-lg-6 col-sm-4">
              <ul
                className="header-content-right"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  justifyContent: lang === 'ar' ? 'flex-start' : 'flex-end',
                  float: lang === 'ar' ? 'left' : 'right',
                }}
              >
                <li>
                  <a href="https://www.facebook.com/" target="_blank" style={{ color: '#666' }}>
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/" target="_blank" style={{ color: '#666' }}>
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank" style={{ color: '#666' }}>
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/" target="_blank" style={{ color: '#666' }}>
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
