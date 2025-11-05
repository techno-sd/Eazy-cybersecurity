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

  // Define section IDs for services page
  const serviceSectionIds = ["ai", "cybersecurity", "bigdata", "cloud", "sme"];

  // Only enable scroll spy on services page
  const normalize = (p: string) => (p || "/").replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const currentPath = normalize(pathname || "/");
  const isServicesPage = currentPath === "/services" || currentPath === "/services/";

  // Use scroll spy hook only on services page
  const activeSection = useScrollSpyHook({
    sectionIds: isServicesPage ? serviceSectionIds : [],
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
                  <Link href="/" className="navbar-brand">
                    <Image
                      src="/img/logo.png"
                      alt="logo"
                      width={100}
                      height={39}
                    />
                  </Link>

                  {/* Mobile: Button + Menu Icon Container */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    order: lang === 'ar' ? 3 : 0,
                  }}>
                    {/* Mobile Quote Button */}
                    <Link
                      href="/contact"
                      className="default-btn d-md-none"
                      style={{
                        padding: '8px 16px',
                        fontSize: '14px',
                        minWidth: 'auto',
                      }}
                    >
                      {t.buttons.quote}
                    </Link>

                    {/* Hamburger Menu Icon */}
                    <button
                      onClick={toggleNavbar}
                      className={classTwo}
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="icon-bar top-bar"></span>
                      <span className="icon-bar middle-bar"></span>
                      <span className="icon-bar bottom-bar"></span>
                    </button>
                  </div>

                  <div className={classOne} id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                      {menus.map((menuItem) => (
                        <MenuItem key={menuItem.label} {...menuItem} />
                      ))}
                    </ul>
                  </div>

                  {/* Desktop Quote Button */}
                  <div className="others-option d-none d-md-block">
                    <div className="get-quote">
                      <Link href="/contact" className="default-btn">
                        {t.buttons.quote}
                      </Link>
                    </div>
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
