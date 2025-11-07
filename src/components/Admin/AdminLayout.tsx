"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: {
    full_name: string;
    email: string;
    role: string;
  };
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const isArabic = lang === 'ar';

  // Load language preference from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('admin_lang') as 'en' | 'ar' || 'en';
    setLang(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    localStorage.setItem('admin_lang', newLang);
  };

  const translations = {
    en: {
      adminPanel: "Admin Panel",
      dashboard: "Dashboard",
      blogPosts: "Blog Posts",
      allPosts: "All Posts",
      addNew: "Add New",
      categories: "Categories",
      consultations: "Consultations",
      contacts: "Contacts",
      users: "Users",
      settings: "Settings",
      logout: "Logout",
      viewSite: "View Site",
      blogManagement: "Blog Management",
      contactMessages: "Contact Messages",
      userManagement: "User Management",
    },
    ar: {
      adminPanel: "لوحة الإدارة",
      dashboard: "لوحة التحكم",
      blogPosts: "المقالات",
      allPosts: "كل المقالات",
      addNew: "إضافة جديد",
      categories: "التصنيفات",
      consultations: "الاستشارات",
      contacts: "الرسائل",
      users: "المستخدمين",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      viewSite: "عرض الموقع",
      blogManagement: "إدارة المقالات",
      contactMessages: "رسائل الاتصال",
      userManagement: "إدارة المستخدمين",
    }
  };

  const t = translations[lang];

  const menuItems = [
    {
      title: t.dashboard,
      icon: "bx bx-home-alt",
      path: "/admin",
      exact: true,
    },
    {
      title: t.blogPosts,
      icon: "bx bx-news",
      path: "/admin/blog",
      submenu: [
        { title: t.allPosts, path: "/admin/blog" },
        { title: t.addNew, path: "/admin/blog/new" },
        { title: t.categories, path: "/admin/blog/categories" },
      ],
    },
    {
      title: t.consultations,
      icon: "bx bx-message-dots",
      path: "/admin/consultations",
    },
    {
      title: t.contacts,
      icon: "bx bx-envelope",
      path: "/admin/contacts",
    },
    {
      title: t.users,
      icon: "bx bx-user",
      path: "/admin/users",
      adminOnly: true,
    },
    {
      title: t.settings,
      icon: "bx bx-cog",
      path: "/admin/settings",
      adminOnly: true,
    },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/sign-in");
  };

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fa", direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "280px" : "80px",
          background: "linear-gradient(180deg, #0A4D8C 0%, #073D6C 100%)",
          color: "#fff",
          transition: "all 0.3s ease",
          position: "fixed",
          height: "100vh",
          overflowY: "auto",
          zIndex: 1000,
          [isArabic ? 'right' : 'left']: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center",
            direction: isArabic ? 'rtl' : 'ltr',
          }}
        >
          {sidebarOpen && (
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              {t.adminPanel}
            </h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "#fff",
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            <i className={`bx ${sidebarOpen ? (isArabic ? "bx-menu-alt-right" : "bx-menu-alt-left") : "bx-menu"}`}></i>
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "20px 0" }}>
          {menuItems.map((item, index) => {
            if (item.adminOnly && user?.role !== "admin") return null;

            return (
              <div key={index}>
                <Link
                  href={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: sidebarOpen ? "14px 20px" : "14px",
                    margin: "4px 12px",
                    borderRadius: "10px",
                    color: "#fff",
                    textDecoration: "none",
                    background: isActive(item.path, item.exact)
                      ? "rgba(255,255,255,0.15)"
                      : "transparent",
                    transition: "all 0.2s ease",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    direction: isArabic ? 'rtl' : 'ltr',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path, item.exact)) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path, item.exact)) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <i
                    className={item.icon}
                    style={{
                      fontSize: "22px",
                      [isArabic ? 'marginLeft' : 'marginRight']: sidebarOpen ? "12px" : "0",
                    }}
                  ></i>
                  {sidebarOpen && <span style={{ fontSize: "15px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{item.title}</span>}
                </Link>

                {/* Submenu */}
                {item.submenu && sidebarOpen && isActive(item.path) && (
                  <div style={{ [isArabic ? 'marginRight' : 'marginLeft']: "20px" }}>
                    {item.submenu.map((subitem, subindex) => (
                      <Link
                        key={subindex}
                        href={subitem.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 20px",
                          margin: "2px 12px",
                          borderRadius: "8px",
                          color: "rgba(255,255,255,0.8)",
                          textDecoration: "none",
                          fontSize: "14px",
                          background: pathname === subitem.path
                            ? "rgba(255,255,255,0.1)"
                            : "transparent",
                          direction: isArabic ? 'rtl' : 'ltr',
                        }}
                      >
                        <i className={isArabic ? "bx bx-chevron-left" : "bx bx-chevron-right"} style={{ [isArabic ? 'marginLeft' : 'marginRight']: "8px" }}></i>
                        <span style={{ fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{subitem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Info */}
        {sidebarOpen && user && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: isArabic ? 'auto' : 0,
              right: isArabic ? 0 : 'auto',
              width: "280px",
              padding: "20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(0,0,0,0.2)",
              direction: isArabic ? 'rtl' : 'ltr',
            }}
          >
            <div style={{ marginBottom: "12px", textAlign: isArabic ? 'right' : 'left' }}>
              <div style={{ fontSize: "14px", fontWeight: "600", marginBottom: "4px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                {user.full_name}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.7, direction: 'ltr', textAlign: isArabic ? 'right' : 'left' }}>{user.email}</div>
              <div
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  padding: "4px 10px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: "12px",
                  display: "inline-block",
                  textTransform: "uppercase",
                }}
              >
                {user.role}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "10px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              }}
            >
              <i className="bx bx-log-out"></i>
              {t.logout}
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        style={{
          [isArabic ? 'marginRight' : 'marginLeft']: sidebarOpen ? "280px" : "80px",
          flex: 1,
          transition: "all 0.3s ease",
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            background: "#fff",
            padding: "20px 30px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 100,
            direction: isArabic ? 'rtl' : 'ltr',
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px", color: "#1a1a1a", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
            {pathname === "/admin" && t.dashboard}
            {pathname?.startsWith("/admin/blog") && t.blogManagement}
            {pathname?.startsWith("/admin/consultations") && t.consultations}
            {pathname?.startsWith("/admin/contacts") && t.contactMessages}
            {pathname?.startsWith("/admin/users") && t.userManagement}
            {pathname?.startsWith("/admin/settings") && t.settings}
          </h1>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              style={{
                padding: "10px 20px",
                background: "#0A4D8C",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#073D6C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0A4D8C";
              }}
            >
              <i className="bx bx-globe"></i>
              {lang === 'en' ? 'العربية' : 'English'}
            </button>

            <Link
              href="/"
              target="_blank"
              style={{
                padding: "10px 20px",
                background: "#f3f4f6",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#374151",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: "600",
              }}
            >
              <i className="bx bx-external-link"></i>
              {t.viewSite}
            </Link>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: "30px" }}>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
