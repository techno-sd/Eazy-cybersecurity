"use client";

import React, { useState } from "react";
import { useLang } from "@/context/LangContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TopHeader: React.FC = () => {
  const { lang, setLang } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const selectLang = (val: 'ar' | 'en') => {
    setLang(val);
    setIsLangDropdownOpen(false);
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
        backgroundColor: '#0A4D8C',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '6px 0'
      }}>
        <div className="container-fluid">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'nowrap'
          }}>
            {/* Email & Address */}
            <ul className="header-content-left" style={{
              color: '#ffffff',
              margin: '0',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 2vw, 15px)',
              flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
              listStyle: 'none',
              flex: '1 1 auto',
              minWidth: 0,
              justifyContent: 'flex-start',
              order: lang === 'ar' ? 2 : 1
            }}>
              <li style={{
                display: 'none',
                alignItems: 'center',
                gap: '5px',
                fontSize: 'clamp(11px, 1.8vw, 13px)',
                whiteSpace: 'nowrap'
              }}
              className="d-none d-lg-flex">
                <i className="bx bx-envelope" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }}></i>
                <a href="mailto:info@eazycyber.sa" style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease'
                }}>
                  info@eazycyber.sa
                </a>
              </li>

              <li style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: 'clamp(11px, 1.8vw, 13px)',
                whiteSpace: 'nowrap'
              }}>
                <i className="bx bxs-map" style={{ fontSize: 'clamp(14px, 2.5vw, 16px)' }}></i>
                <span>KSA, Yanbu</span>
              </li>
            </ul>

            {/* Social & Language */}
            <ul
              className="header-content-right"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(10px, 2vw, 15px)',
                justifyContent: 'flex-end',
                margin: '0',
                padding: '0',
                flexDirection: lang === 'ar' ? 'row-reverse' : 'row',
                listStyle: 'none',
                flex: '0 0 auto',
                order: lang === 'ar' ? 1 : 2
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{
                  color: '#ffffff',
                  fontSize: 'clamp(16px, 2.5vw, 18px)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'opacity 0.3s ease'
                }}>
                  <i className="bx bxl-linkedin"></i>
                </a>
              </li>
              {/* Language Dropdown */}
              <li className="language-area" style={{ listStyle: 'none', position: 'relative' }}>
                  <div
                    className="language-item-top"
                    onMouseEnter={() => setIsLangDropdownOpen(true)}
                    onMouseLeave={() => setIsLangDropdownOpen(false)}
                  >
                    <div className="language-bar" style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: '#ffffff',
                      fontSize: 'clamp(12px, 2vw, 14px)',
                      fontWeight: '600',
                      gap: '3px'
                    }}>
                      <i className="bx bx-world" style={{ fontSize: 'clamp(16px, 2.5vw, 20px)' }}></i>
                      <span className="d-none d-sm-inline">{lang === 'ar' ? 'العربية' : 'English'}</span>
                      <i className="bx bx-chevron-down" style={{ fontSize: 'clamp(14px, 2.2vw, 18px)' }}></i>
                    </div>
                    <ul
                      className="language-item-bottom"
                      style={{
                        listStyle: 'none',
                        position: 'absolute',
                        top: isLangDropdownOpen ? '35px' : '50px',
                        padding: '15px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
                        backgroundColor: '#ffffff',
                        minWidth: '150px',
                        left: lang === 'ar' ? 'auto' : '0',
                        right: lang === 'ar' ? '0' : 'auto',
                        transition: 'all 0.3s ease-in-out',
                        visibility: isLangDropdownOpen ? 'visible' : 'hidden',
                        opacity: isLangDropdownOpen ? 1 : 0,
                        zIndex: 9999,
                        margin: 0,
                        textAlign: lang === 'ar' ? 'right' : 'left',
                        borderRadius: '8px'
                      }}
                    >
                      <li className="language-item" style={{ marginBottom: '10px' }}>
                        <button
                          onClick={() => selectLang('en')}
                          className="language-link"
                          style={{
                            color: lang === 'en' ? '#0A4D8C' : '#333',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '14px',
                            fontWeight: lang === 'en' ? '700' : '500',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '5px 0',
                            width: '100%',
                            textAlign: lang === 'ar' ? 'right' : 'left'
                          }}
                        >
                          <span style={{
                            width: '28px',
                            height: '20px',
                            marginRight: lang === 'ar' ? '0' : '10px',
                            marginLeft: lang === 'ar' ? '10px' : '0',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            display: 'inline-block',
                            fontSize: '18px'
                          }}>🇬🇧</span>
                          English
                        </button>
                      </li>
                      <li className="language-item">
                        <button
                          onClick={() => selectLang('ar')}
                          className="language-link"
                          style={{
                            color: lang === 'ar' ? '#0A4D8C' : '#333',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '14px',
                            fontWeight: lang === 'ar' ? '700' : '500',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '5px 0',
                            width: '100%',
                            textAlign: lang === 'ar' ? 'right' : 'left'
                          }}
                        >
                          <span style={{
                            width: '28px',
                            height: '20px',
                            marginRight: lang === 'ar' ? '0' : '10px',
                            marginLeft: lang === 'ar' ? '10px' : '0',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            display: 'inline-block',
                            fontSize: '18px'
                          }}>🇸🇦</span>
                          العربية
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
