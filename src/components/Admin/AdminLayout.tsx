"use client";

import React, { useState, useMemo, memo, useCallback } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";
import AdminLanguageSelector from "./AdminLanguageSelector";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
  user?: {
    full_name: string;
    email: string;
    role: string;
    menu_access?: {
      [key: string]: boolean;
    };
  };
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { lang, isArabic, toggleLanguage } = useAdminLang();
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const translations = useMemo(() => ({
    en: {
      adminPanel: "Admin Panel",
      dashboard: "Dashboard",
      blogPosts: "Blog Posts",
      allPosts: "All Posts",
      addNew: "Add New",
      consultations: "Consultations",
      users: "Users",
      roles: "Roles & Permissions",
      logout: "Logout",
      viewSite: "View Site",
      blogManagement: "Blog Management",
      userManagement: "User Management",
      rolesManagement: "Roles & Permissions",
    },
    ar: {
      adminPanel: "لوحة الإدارة",
      dashboard: "لوحة التحكم",
      blogPosts: "المقالات",
      allPosts: "كل المقالات",
      addNew: "إضافة جديد",
      consultations: "الاستشارات",
      users: "المستخدمين",
      roles: "الأدوار والصلاحيات",
      logout: "تسجيل الخروج",
      viewSite: "عرض الموقع",
      blogManagement: "إدارة المقالات",
      userManagement: "إدارة المستخدمين",
      rolesManagement: "الأدوار والصلاحيات",
    }
  }), []);

  const t = translations[lang];

  const menuItems = useMemo(() => [
    {
      title: t.dashboard,
      icon: "bx bx-home-alt",
      path: "/admin",
      exact: true,
      menuKey: "dashboard",
    },
    {
      title: t.blogPosts,
      icon: "bx bx-news",
      path: "/admin/blog",
      menuKey: "blog",
    },
    {
      title: t.consultations,
      icon: "bx bx-message-dots",
      path: "/admin/consultations",
      menuKey: "consultations",
    },
    {
      title: t.users,
      icon: "bx bx-user",
      path: "/admin/users",
      menuKey: "users",
    },
    {
      title: t.roles,
      icon: "bx bx-shield-quarter",
      path: "/admin/roles",
      menuKey: "roles",
    },
  ], [t]);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/sign-in");
  }, [router]);

  const isActive = useCallback((path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  }, [pathname]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4f8 100%)", direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "300px" : "80px",
          color: "#ffffff",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
          position: "fixed",
          height: "100vh",
          background: "linear-gradient(180deg, #0A4D8C 0%, #073D6C 50%, #052A4F 100%)",
          zIndex: 1000,
          [isArabic ? 'right' : 'left']: 0,
          boxShadow: "0 25px 50px -12px rgba(10,77,140,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset",
          borderRight: isArabic ? undefined : "1px solid rgba(255,255,255,0.08)",
          borderLeft: isArabic ? "1px solid rgba(255,255,255,0.08)" : undefined,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "28px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center",
            direction: isArabic ? 'rtl' : 'ltr',
            background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
          }}
        >
          {sidebarOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(10,77,140,0.2)",
              }}>
                <span style={{ color: "#0A4D8C", fontWeight: 800, fontSize: "20px" }}>E</span>
              </div>
              <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', color: "#fff" }}>
                {t.adminPanel}
              </h2>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
              backdropFilter: "blur(4px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <i className={`bx ${sidebarOpen ? (isArabic ? "bx-menu-alt-right" : "bx-menu-alt-left") : "bx-menu"}`}></i>
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "24px 0" }}>
          {menuItems.map((item, index) => {
            // Check menu access from role permissions
            if (user?.menu_access && item.menuKey) {
              // If menu_access exists, check if user has permission for this menu
              if (!user.menu_access[item.menuKey]) {
                return null;
              }
            }
            return (
              <div key={index}>
                <Link
                  href={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: sidebarOpen ? "16px 24px" : "16px",
                    margin: "6px 16px",
                    borderRadius: "14px",
                    color: "#fff",
                    textDecoration: "none",
                    background: isActive(item.path, item.exact)
                      ? "linear-gradient(135deg, rgba(10,77,140,0.2) 0%, rgba(7,61,108,0.15) 100%)"
                      : "transparent",
                    transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    direction: isArabic ? 'rtl' : 'ltr',
                    boxShadow: isActive(item.path, item.exact) ? "0 8px 25px rgba(10,77,140,0.2)" : "none",
                    border: isActive(item.path, item.exact) ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path, item.exact)) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.transform = "translateX(4px)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(10,77,140,0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path, item.exact)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: isActive(item.path, item.exact)
                        ? "rgba(10,77,140,0.25)"
                        : "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      [isArabic ? 'marginLeft' : 'marginRight']: sidebarOpen ? "14px" : "0",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{
                        fontSize: "20px",
                        color: isActive(item.path, item.exact) ? "#fff" : "rgba(255,255,255,0.8)",
                      }}
                    ></i>
                  </div>
                  {sidebarOpen && <span style={{ fontSize: "15px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', fontWeight: 500 }}>{item.title}</span>}
                </Link>
              </div>
            );
          })}
        </nav>


      </aside>

      {/* Main Content */}
      <main
        style={{
          [isArabic ? 'marginRight' : 'marginLeft']: sidebarOpen ? "300px" : "80px",
          flex: 1,
          transition: "all 0.3s ease",
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            padding: "20px 30px",
            borderBottom: "1px solid rgba(148,163,184,0.1)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 100,
            direction: isArabic ? 'rtl' : 'ltr',
          }}
        >
          <h1 style={{ margin: 0, fontSize: "24px", color: "#0A4D8C", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', fontWeight: "700" }}>
            {pathname === "/admin" && t.dashboard}
            {pathname?.startsWith("/admin/blog") && t.blogManagement}
            {pathname?.startsWith("/admin/consultations") && t.consultations}
            {pathname?.startsWith("/admin/users") && t.userManagement}
            {pathname?.startsWith("/admin/roles") && t.rolesManagement}
          </h1>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <AdminLanguageSelector />

            <Link
              href="/"
              target="_blank"
              style={{
                padding: "10px 20px",
                background: "transparent",
                border: "1px solid rgba(10,77,140,0.25)",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#0A4D8C",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: "600",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(10,77,140,0.08)";
                e.currentTarget.style.borderColor = "rgba(10,77,140,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(10,77,140,0.25)";
              }}
            >
              <i className="bx bx-external-link"></i>
              {t.viewSite}
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                border: "1px solid rgba(220, 38, 38, 0.3)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(220, 38, 38, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.2)";
              }}
            >
              <i className="bx bx-log-out"></i>
              {t.logout}
            </button>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: "30px" }}>{children}</div>
      </main>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          display: isMobile ? "block" : "none",
          position: "fixed",
          top: "20px",
          [isArabic ? 'left' : 'right']: "20px",
          zIndex: 1001,
          background: "linear-gradient(135deg, rgba(10,77,140,0.9) 0%, rgba(7,61,108,0.9) 50%, rgba(5,42,79,0.9) 100%)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "12px",
          padding: "12px",
          color: "#fff",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
        }}
      >
        <i className={sidebarOpen ? "bx bx-x" : "bx bx-menu"} style={{ fontSize: "20px" }}></i>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 999,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default memo(AdminLayout);
