"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";
import { useScrollSpy } from "@/context/ScrollSpyContext";

interface MenuItemProps {
  label: string;
  link: string;
  submenu?: { label: string; link: string }[];
  onNavigate?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, link, submenu, onNavigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [hoveredSubItem, setHoveredSubItem] = useState<number | null>(null);
  const pathname = usePathname();
  const normalize = (p: string) => (p || "/").replace(/^\/(en|ar)(?=\/|$)/, "") || "/";
  const current = normalize(pathname || "/");
  const target = normalize(link);
  // Special handling for home page: only exact match
  // For other pages: exact match OR starts with (for sub-pages)
  const isActive = target === "/"
    ? current === "/"
    : (current === target || (target !== "#" && target !== "/" && current.startsWith(target)));
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

      // Close mobile menu when navigating
      if (onNavigate) {
        onNavigate();
      }

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
    } else {
      // Close mobile menu for regular links too
      if (onNavigate) {
        onNavigate();
      }
    }
  };

  if (submenu) {
    // Show submenu on mobile when expanded, or on desktop when hovered
    const showSubmenu = isExpanded || isHovered;

    return (
      <li
        className={`nav-item ${isActive ? "active" : ""} ${isExpanded ? "expanded" : ""}`}
        key={label}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Link
            href={link}
            className="nav-link"
            style={{
              color: isActive || isLinkHovered ? '#0A4D8C' : '#333',
              flex: 1,
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              position: 'relative',
            }}
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
            onClick={(e) => {
              if (link === "#") {
                e.preventDefault();
              }
            }}
          >
            {tLabel}
            <span style={{
              position: 'absolute',
              bottom: '0',
              left: isAR ? 'auto' : '0',
              right: isAR ? '0' : 'auto',
              width: isLinkHovered || isActive ? '100%' : '0%',
              height: '2px',
              background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
              transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              borderRadius: '2px',
            }}></span>
          </Link>
          <button
            type="button"
            className="expand-toggle d-md-none"
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isActive ? '#0A4D8C' : '#666',
              fontSize: '18px',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            aria-expanded={isExpanded}
            title={isExpanded ? "Collapse" : "Expand"}
          >
            <i className="bx bx-chevron-down"></i>
          </button>
        </div>

        <ul
          className={`dropdown-menu${isAR ? ' rtl' : ''}`}
          dir={isAR ? 'rtl' : 'ltr'}
          style={{
            textAlign: isAR ? 'right' : undefined,
            maxHeight: showSubmenu ? '500px' : '0',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            opacity: showSubmenu ? 1 : 0,
            visibility: showSubmenu ? 'visible' : 'hidden',
            transform: showSubmenu ? 'translateY(0)' : 'translateY(-10px)',
            boxShadow: showSubmenu ? '0 10px 40px rgba(10, 77, 140, 0.12)' : 'none',
            border: showSubmenu ? '1px solid rgba(10, 77, 140, 0.08)' : 'none',
            borderRadius: '12px',
          }}
        >
          {submenu.map((subItem, index) => {
            const subTarget = normalize(subItem.link);
            const hash = extractHash(subItem.link);

            // Check if this submenu item is active based on:
            // 1. URL path match OR
            // 2. Scroll spy detection (hash matches activeSection)
            const isPathActive = current === subTarget || current.startsWith(subTarget);
            const isScrollActive = hash && activeSection === hash;
            const isSubActive = isPathActive || isScrollActive;
            const isSubHovered = hoveredSubItem === index;

            const subLabel = translate(subItem.label);
            return (
              <li
                className={`nav-item ${isSubActive ? "active" : ""}`}
                key={subItem.label}
                style={{
                  opacity: showSubmenu ? 1 : 0,
                  transform: showSubmenu ? 'translateX(0)' : `translateX(${isAR ? '10px' : '-10px'})`,
                  transition: `all 0.4s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.05}s`,
                }}
              >
                <Link
                  href={subItem.link}
                  className={`nav-link ${isSubActive ? "active" : ""}`}
                  style={{
                    color: isSubActive || isSubHovered ? '#0A4D8C' : '#333',
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                    background: isSubHovered ? 'rgba(10, 77, 140, 0.05)' : 'transparent',
                    borderRadius: '8px',
                    paddingLeft: isSubHovered && !isAR ? '20px' : undefined,
                    paddingRight: isSubHovered && isAR ? '20px' : undefined,
                  }}
                  onMouseEnter={() => setHoveredSubItem(index)}
                  onMouseLeave={() => setHoveredSubItem(null)}
                  onClick={(e) => {
                    handleClick(e, subItem.link);
                  }}
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
        style={{
          color: isActive || isLinkHovered ? '#0A4D8C' : '#333',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          position: 'relative',
        }}
        onMouseEnter={() => setIsLinkHovered(true)}
        onMouseLeave={() => setIsLinkHovered(false)}
        onClick={(e) => handleClick(e, link)}
      >
        {tLabel}
        <span style={{
          position: 'absolute',
          bottom: '0',
          left: isAR ? 'auto' : '0',
          right: isAR ? '0' : 'auto',
          width: isLinkHovered || isActive ? '100%' : '0%',
          height: '2px',
          background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
          transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          borderRadius: '2px',
        }}></span>
      </Link>
    </li>
  );
};

export default MenuItem;
