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
  const [isSticky, setIsSticky] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { lang } = useLang();
  const t = getMessages(lang);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(true);
  };

  // Entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Scroll handler for sticky state
  useEffect(() => {
    const handleScroll = () => {
      const elementId = document.getElementById("navbar");
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky");
        setIsSticky(true);
      } else {
        elementId?.classList.remove("is-sticky");
        setIsSticky(false);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  const classOne = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <ScrollSpyProvider activeSection={activeSection}>
      <header
        className="header-area fixed-top"
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {/* TopHeader */}
        <TopHeader />

        <div className="nav-area">
          <div id="navbar" className="navbar-area" style={{
            backgroundColor: isSticky ? 'rgba(255, 255, 255, 0.95)' : '#ffffff',
            backdropFilter: isSticky ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: isSticky ? 'blur(20px)' : 'none',
            borderBottom: isSticky ? '1px solid rgba(10, 77, 140, 0.1)' : '1px solid #e8e8e8',
            boxShadow: isSticky ? '0 4px 30px rgba(10, 77, 140, 0.1)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          }}>
            <div className="main-nav" style={{
              backgroundColor: 'transparent',
              borderBottom: 'none'
            }}>
              <div className="container" style={{ maxWidth: '1320px' }}>
                <nav className="navbar navbar-expand-md navbar-light" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                  {/* Mobile Layout */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '8px',
                    position: 'relative',
                    padding: '8px 0',
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
                          padding: '8px',
                          paddingLeft: lang === 'en' ? '0' : '8px',
                          paddingRight: lang === 'ar' ? '0' : '8px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                          transform: !menu ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}
                      >
                        <span className="icon-bar top-bar" style={{
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                          transform: !menu ? 'rotate(45deg) translateY(6px)' : 'none',
                          backgroundColor: !menu ? '#0A4D8C' : undefined,
                        }}></span>
                        <span className="icon-bar middle-bar" style={{
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                          opacity: !menu ? 0 : 1,
                          transform: !menu ? 'scaleX(0)' : 'scaleX(1)',
                        }}></span>
                        <span className="icon-bar bottom-bar" style={{
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                          transform: !menu ? 'rotate(-45deg) translateY(-6px)' : 'none',
                          backgroundColor: !menu ? '#0A4D8C' : undefined,
                        }}></span>
                      </button>

                      <Link href="/" className="navbar-brand" style={{
                        margin: '0',
                        padding: '0',
                        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                      }}>
                        <Image
                          src="/img/logo.png"
                          alt="logo"
                          width={85}
                          height={33}
                          style={{
                            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                          }}
                          className="navbar-logo-hover"
                        />
                      </Link>
                    </div>

                    {/* Right side - Quote Button */}
                    <Link
                      href="/contact#consultation"
                      className="navbar-quote-btn animated-quote-btn"
                      style={{
                        flexShrink: 0,
                        marginLeft: lang === 'en' ? '0' : 'auto',
                        marginRight: lang === 'ar' ? '0' : 'auto',
                        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <span style={{ position: 'relative', zIndex: 1 }}>{t.buttons.quote}</span>
                    </Link>
                  </div>

                  {/* Desktop Layout */}
                  <Link
                    href="/"
                    className="navbar-brand d-none d-md-inline-block"
                    style={{
                      transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                  >
                    <Image
                      src="/img/logo.png"
                      alt="logo"
                      width={85}
                      height={33}
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                      className="navbar-logo-hover"
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
                      {menus.map((menuItem, index) => (
                        <div
                          key={menuItem.label}
                          style={{
                            opacity: isLoaded ? 1 : 0,
                            transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
                            transition: `all 0.5s cubic-bezier(0.23, 1, 0.32, 1) ${0.1 + index * 0.05}s`,
                          }}
                        >
                          <MenuItem {...menuItem} onNavigate={closeMenu} />
                        </div>
                      ))}
                    </ul>
                  </div>

                  {/* Desktop Quote Button */}
                  <div className="d-none d-md-flex" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginLeft: 'auto',
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.4s',
                  }}>
                    <Link
                      href="/contact#consultation"
                      className="navbar-quote-btn desktop animated-quote-btn"
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <span style={{ position: 'relative', zIndex: 1 }}>{t.buttons.quote}</span>
                    </Link>
                  </div>

                  {/* Mobile Collapsible Menu */}
                  <div
                    className={`d-md-none w-100 ${menu ? '' : 'show'}`}
                    id="navbarSupportedContent"
                    style={{
                      marginTop: '0',
                      borderTop: menu ? 'none' : '1px solid rgba(10, 77, 140, 0.1)',
                      paddingTop: '0',
                      paddingBottom: '0',
                      display: menu ? 'none' : 'block',
                      maxHeight: menu ? '0' : '80vh',
                      overflow: 'auto',
                      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.98)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      boxShadow: menu ? 'none' : '0 10px 40px rgba(10, 77, 140, 0.1)',
                    }}
                  >
                    <ul className="navbar-nav w-100" style={{
                      padding: '20px 0',
                    }}>
                      {menus.map((menuItem, index) => (
                        <div
                          key={menuItem.label}
                          style={{
                            opacity: menu ? 0 : 1,
                            transform: menu ? 'translateX(-20px)' : 'translateX(0)',
                            transition: `all 0.4s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.05}s`,
                          }}
                        >
                          <MenuItem {...menuItem} onNavigate={closeMenu} />
                        </div>
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
