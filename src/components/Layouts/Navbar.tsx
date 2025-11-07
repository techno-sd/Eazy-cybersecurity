"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopHeader from "./TopHeader";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { menus } from "../../../libs/menus";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";
import { ScrollSpyProvider } from "@/context/ScrollSpyContext";
import { useScrollSpy as useScrollSpyHook } from "@/hooks/useScrollSpy";

const Navbar: React.FC = () => {
  const [menu, setMenu] = useState(true);
  const { lang } = useLang();
  const t = getMessages(lang);
  const pathname = usePathname();
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  // Define section IDs for services and industries pages
  const serviceSectionIds = ["ai", "cybersecurity", "bigdata", "cloud", "sme"];
  const industrySectionIds = ["government", "banking", "energy", "healthcare", "education", "smes"];

  // Enable scroll spy on services and industries pages
  const normalize = (p: string) => (p || "/").replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const currentPath = normalize(pathname || "/");
  const isServicesPage = currentPath === "/services" || currentPath === "/services/";
  const isIndustriesPage = currentPath === "/industries" || currentPath === "/industries/";

  // Determine which section IDs to use
  let sectionIds: string[] = [];
  if (isServicesPage) {
    sectionIds = serviceSectionIds;
  } else if (isIndustriesPage) {
    sectionIds = industrySectionIds;
  }

  // Use scroll spy hook
  const activeSection = useScrollSpyHook({
    sectionIds,
    offset: 200,
    throttleMs: 100,
  });

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky");
      } else {
        elementId?.classList.remove("is-sticky");
      }
    });
  });

  const classOne = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <ScrollSpyProvider activeSection={activeSection}>
      <header className="header-area fixed-top">
        {/* TopHeader */}
        <TopHeader />

        <div className="nav-area">
          <div id="navbar" className="navbar-area" style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e8e8e8'
          }}>
            <div className="main-nav" style={{
              backgroundColor: '#ffffff',
              borderBottom: 'none'
            }}>
              <div className="container-fluid">
                <nav className="navbar navbar-expand-md navbar-light" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  {/* Mobile Layout */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '10px',
                    position: 'relative',
                    padding: '12px 0',
                  }}
                  className="d-md-none">
                    {/* Left side - Menu Icon + Logo */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <button
                        onClick={toggleNavbar}
                        className={classTwo}
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded={!menu}
                        aria-label="Toggle navigation"
                        style={{ 
                          margin: '0',
                          padding: '8px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <span className="icon-bar top-bar" style={{ transition: 'all 0.3s ease' }}></span>
                        <span className="icon-bar middle-bar" style={{ transition: 'all 0.3s ease' }}></span>
                        <span className="icon-bar bottom-bar" style={{ transition: 'all 0.3s ease' }}></span>
                      </button>
                      
                      <Link href="/" className="navbar-brand" style={{ 
                        margin: '0',
                        transition: 'all 0.3s ease',
                      }}>
                        <Image
                          src="/img/logo.png"
                          alt="logo"
                          width={100}
                          height={39}
                        />
                      </Link>
                    </div>

                    {/* Right side - Login & Quote Buttons */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <Link
                        href="/sign-in"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'rgba(10, 77, 140, 0.1)',
                          color: '#0A4D8C',
                          transition: 'all 0.3s ease',
                          border: '2px solid transparent',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#0A4D8C';
                          e.currentTarget.style.color = '#fff';
                          e.currentTarget.style.borderColor = '#0A4D8C';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(10, 77, 140, 0.1)';
                          e.currentTarget.style.color = '#0A4D8C';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                        title={lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
                      >
                        <i className="bx bx-user" style={{ fontSize: '18px' }}></i>
                      </Link>
                      <Link
                        href="/contact"
                        className="default-btn"
                        style={{
                          padding: '10px 16px',
                          fontSize: '12px',
                          minWidth: 'auto',
                          whiteSpace: 'nowrap',
                          fontWeight: '600',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 8px rgba(10, 77, 140, 0.15)',
                        }}
                      >
                        {t.buttons.quote}
                      </Link>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <Link href="/" className="navbar-brand d-none d-md-inline-block">
                    <Image
                      src="/img/logo.png"
                      alt="logo"
                      width={100}
                      height={39}
                    />
                  </Link>

                  <div
                    className="collapse navbar-collapse d-none d-md-flex"
                    id="navbarSupportedContent"
                    style={{
                      marginLeft: lang === 'ar' ? '0' : 'auto',
                      marginRight: lang === 'ar' ? 'auto' : '0',
                    }}
                  >
                    <ul className="navbar-nav" style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: lang === 'en' ? '100%' : 'auto',
                      justifyContent: lang === 'en' ? 'flex-start' : 'flex-start',
                    }}>
                      {menus.map((menuItem) => (
                        <MenuItem key={menuItem.label} {...menuItem} />
                      ))}
                    </ul>
                  </div>

                  {/* Desktop Login & Quote Buttons */}
                  <div className="d-none d-md-flex" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginLeft: 'auto',
                  }}>
                    <Link
                      href="/sign-in"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        background: 'rgba(10, 77, 140, 0.08)',
                        color: '#0A4D8C',
                        transition: 'all 0.3s ease',
                        border: '2px solid rgba(10, 77, 140, 0.2)',
                        fontWeight: '600',
                        fontSize: '14px',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#0A4D8C';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#0A4D8C';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 77, 140, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(10, 77, 140, 0.08)';
                        e.currentTarget.style.color = '#0A4D8C';
                        e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <i className="bx bx-user" style={{ fontSize: '18px' }}></i>
                      <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="default-btn"
                    >
                      {t.buttons.quote}
                    </Link>
                  </div>

                  {/* Mobile Collapsible Menu */}
                  <div
                    className={`d-md-none w-100 ${menu ? '' : 'show'}`}
                    id="navbarSupportedContent"
                    style={{
                      marginTop: '0',
                      borderTop: '1px solid #e8e8e8',
                      paddingTop: '0',
                      paddingBottom: '0',
                      display: menu ? 'none' : 'block',
                      maxHeight: menu ? '0' : '100vh',
                      overflow: 'hidden',
                      transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: '#ffffff',
                      boxShadow: menu ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.08)',
                    }}
                  >
                    <ul className="navbar-nav w-100" style={{
                      padding: '15px 0',
                    }}>
                      {menus.map((menuItem) => (
                        <MenuItem key={menuItem.label} {...menuItem} />
                      ))}
                      <li className="nav-item" style={{
                        borderTop: '1px solid #e8e8e8',
                        marginTop: '10px',
                        paddingTop: '10px',
                      }}>
                        <Link
                          href="/sign-in"
                          className="nav-link"
                          onClick={toggleNavbar}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 20px',
                            color: '#0A4D8C',
                            fontWeight: '600',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <i className="bx bx-user" style={{ fontSize: '20px' }}></i>
                          <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </ScrollSpyProvider>
  );
};

export default Navbar;
