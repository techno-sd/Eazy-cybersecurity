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

  const closeMenu = () => {
    setMenu(true);
  };

  // Define section IDs for services, industries, about, and contact pages
  const serviceSectionIds = ["ai", "cybersecurity", "bigdata", "cloud", "sme"];
  const industrySectionIds = ["government", "banking", "energy", "healthcare", "education", "smes"];
  const aboutSectionIds = ["vision-mission", "values", "team", "why-us"];
  const contactSectionIds = ["location"];

  // Enable scroll spy on services, industries, about, and contact pages
  const normalize = (p: string) => (p || "/").replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const currentPath = normalize(pathname || "/");
  const isServicesPage = currentPath === "/services" || currentPath === "/services/";
  const isIndustriesPage = currentPath === "/industries" || currentPath === "/industries/";
  const isAboutPage = currentPath === "/about" || currentPath === "/about/";
  const isContactPage = currentPath === "/contact" || currentPath === "/contact/";

  // Determine which section IDs to use
  let sectionIds: string[] = [];
  if (isServicesPage) {
    sectionIds = serviceSectionIds;
  } else if (isIndustriesPage) {
    sectionIds = industrySectionIds;
  } else if (isAboutPage) {
    sectionIds = aboutSectionIds;
  } else if (isContactPage) {
    sectionIds = contactSectionIds;
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
                    gap: '8px',
                    position: 'relative',
                    padding: '10px 0',
                  }}
                  className="d-md-none">
                    {/* Left side - Menu Icon + Logo */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: lang === 'en' ? '8px' : '10px',
                      flex: 1,
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
                          padding: '6px',
                          paddingLeft: lang === 'en' ? '0' : '6px',
                          paddingRight: lang === 'ar' ? '0' : '6px',
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
                        padding: '0',
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

                    {/* Right side - Quote Button */}
                    <Link
                      href="/contact#consultation"
                      className="navbar-quote-btn"
                      style={{
                        flexShrink: 0,
                        marginLeft: lang === 'en' ? '0' : 'auto',
                        marginRight: lang === 'ar' ? '0' : 'auto',
                      }}
                    >
                      {t.buttons.quote}
                    </Link>
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
                        <MenuItem key={menuItem.label} {...menuItem} onNavigate={closeMenu} />
                      ))}
                    </ul>
                  </div>

                  {/* Desktop Quote Button */}
                  <div className="d-none d-md-flex" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginLeft: 'auto',
                  }}>
                    <Link
                      href="/contact#consultation"
                      className="navbar-quote-btn desktop"
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
                        <MenuItem key={menuItem.label} {...menuItem} onNavigate={closeMenu} />
                      ))}
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
