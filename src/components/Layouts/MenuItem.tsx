"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

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

  if (submenu) {
    return (
      <li className={`nav-item ${isActive ? "active" : ""}`} key={label}>
        <Link
          href={link}
          className="nav-link"
          onClick={(e) => e.preventDefault()}
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
            const isActive = current === subTarget || current.startsWith(subTarget);
            const subLabel = translate(subItem.label);
            return (
              <li className={`nav-item ${isActive ? "active" : ""}`} key={subItem.label}>
                <Link
                  href={subItem.link}
                  className={`nav-link ${isActive ? "active" : ""}`}
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
      <Link href={link} className={`nav-link ${isActive ? "active" : ""}`}>
        {tLabel}
      </Link>
    </li>
  );
};

export default MenuItem;
