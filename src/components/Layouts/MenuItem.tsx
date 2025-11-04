"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";
import { useScrollSpy } from "@/context/ScrollSpyContext";

interface MenuItemProps {
  label: string;
  link: string;
  submenu?: { label: string; link: string }[];
}

const MenuItem: React.FC<MenuItemProps> = ({ label, link, submenu }) => {
  const pathname = usePathname();
  const normalize = (p: string) => (p || "/").replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const current = normalize(pathname || "/");
  const target = normalize(link);
  const isActive = current === target || (target !== "#" && current.startsWith(target));
  const { lang } = useLang();
  const t = getMessages(lang);
  const translate = (k: string) => (t.menu as any)[k] ?? (t as any).about?.[k] ?? k;
  const tLabel = translate(label);
  const isAR = lang === 'ar';
  const { activeSection } = useScrollSpy();

  // Extract hash from link (e.g., "/services#ai" -> "ai")
  const extractHash = (url: string): string => {
    const hashIndex = url.indexOf("#");
    return hashIndex !== -1 ? url.substring(hashIndex + 1) : "";
  };

  // Handle smooth scroll for anchor links
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = extractHash(href);
    if (hash) {
      const targetPath = href.split("#")[0];
      const currentPath = normalize(pathname || "/");

      // Only handle smooth scroll if we're on the same page
      if (currentPath === normalize(targetPath)) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          const offsetTop = element.offsetTop - 100; // Offset for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
          // Update URL hash without scrolling
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  if (submenu) {
    return (
      <li className={`nav-item ${isActive ? "active" : ""}`} key={label}>
        <Link
          href={link}
          className="nav-link"
          style={{ color: isActive ? '#0A4D8C' : '#333' }}
          onClick={(e) => {
            if (link === "#") {
              e.preventDefault();
            }
          }}
        >
          {tLabel} <i className="bx bx-chevron-down"></i>
        </Link>

        <ul
          className={`dropdown-menu${isAR ? ' rtl' : ''}`}
          dir={isAR ? 'rtl' : 'ltr'}
          style={{ textAlign: isAR ? 'right' : undefined }}
        >
          {submenu.map((subItem) => {
            const subTarget = normalize(subItem.link);
            const hash = extractHash(subItem.link);

            // Check if this submenu item is active based on:
            // 1. URL path match OR
            // 2. Scroll spy detection (hash matches activeSection)
            const isPathActive = current === subTarget || current.startsWith(subTarget);
            const isScrollActive = hash && activeSection === hash;
            const isSubActive = isPathActive || isScrollActive;

            const subLabel = translate(subItem.label);
            return (
              <li className={`nav-item ${isSubActive ? "active" : ""}`} key={subItem.label}>
                <Link
                  href={subItem.link}
                  className={`nav-link ${isSubActive ? "active" : ""}`}
                  style={{ color: isSubActive ? '#0A4D8C' : '#333' }}
                  onClick={(e) => handleClick(e, subItem.link)}
                >
                  {subLabel}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  return (
    <li className="nav-item" key={label}>
      <Link
        href={link}
        className={`nav-link ${isActive ? "active" : ""}`}
        style={{ color: isActive ? '#0A4D8C' : '#333' }}
        onClick={(e) => handleClick(e, link)}
      >
        {tLabel}
      </Link>
    </li>
  );
};

export default MenuItem;
