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
  const isActive = pathname == link;
  const { lang } = useLang();
  const t = getMessages(lang);
  const tLabel = t.menu[label as keyof typeof t.menu] ?? label;

  if (submenu) {
    return (
      <li className="nav-item" key={label}>
        <Link
          href={link}
          className="nav-link"
          onClick={(e) => e.preventDefault()}
        >
          {tLabel} <i className="bx bx-chevron-down"></i>
        </Link>

        <ul className="dropdown-menu">
          {submenu.map((subItem) => {
            const isActive = pathname == subItem.link;
            const subLabel = t.menu[subItem.label as keyof typeof t.menu] ?? subItem.label;
            return (
              <li className="nav-item" key={subItem.label}>
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
