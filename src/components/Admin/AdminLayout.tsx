"use client";

import React, { useState, useMemo, memo, useCallback, useTransition } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lang, isArabic, toggleLanguage } = useAdminLang();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [administrationOpen, setAdministrationOpen] = useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width <= 768;
      const tablet = width > 768 && width <= 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);

      // Auto-open sidebar on desktop (>1024px), close on mobile/tablet
      if (width > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

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
      administration: "Administration",
      settings: "Settings",
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
      administration: "الإدارة",
      settings: "الإعدادات",
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
  ], [t]);

  const administrationItems = useMemo(() => [
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

  // Auto-expand Administration menu if on users or roles page
  React.useEffect(() => {
    if (pathname?.startsWith('/admin/users') || pathname?.startsWith('/admin/roles')) {
      setAdministrationOpen(true);
    }
  }, [pathname]);

  return (
    <div className={`admin-layout ${isMobile ? 'mobile' : ''}`} style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4f8 100%)", direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        style={{
          width: isMobile
            ? "280px"
            : isTablet
              ? (sidebarOpen ? "280px" : "70px")
              : (sidebarOpen ? "300px" : "80px"),
          color: "#ffffff",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
          position: "fixed",
          height: "100vh",
          background: "linear-gradient(180deg, #0A4D8C 0%, #073D6C 50%, #052A4F 100%)",
          zIndex: 1000,
          [isArabic ? 'right' : 'left']: (isMobile || isTablet) ? (sidebarOpen ? 0 : '-100%') : 0,
          boxShadow: "0 25px 50px -12px rgba(10,77,140,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset",
          borderRight: isArabic ? undefined : "1px solid rgba(255,255,255,0.08)",
          borderLeft: isArabic ? "1px solid rgba(255,255,255,0.08)" : undefined,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: isMobile ? "20px 16px" : "28px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center",
            direction: isArabic ? 'rtl' : 'ltr',
            background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)",
          }}
        >
          {sidebarOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px" }}>
              <div style={{
                width: isMobile ? "36px" : "40px",
                height: isMobile ? "36px" : "40px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(10,77,140,0.2)",
              }}>
                <span style={{ color: "#0A4D8C", fontWeight: 800, fontSize: isMobile ? "18px" : "20px" }}>E</span>
              </div>
              <h2 style={{ margin: 0, fontSize: isMobile ? "18px" : isTablet ? "20px" : "22px", fontWeight: "800", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', color: "#fff" }}>
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
              width: isMobile ? "36px" : "40px",
              height: isMobile ? "36px" : "40px",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? "18px" : "20px",
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
        <nav style={{ padding: isMobile ? "16px 0" : "24px 0" }}>
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
                  prefetch={true}
                  onClick={() => {
                    if (isMobile || isTablet) setSidebarOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: sidebarOpen
                      ? (isMobile ? "12px 16px" : "16px 24px")
                      : (isMobile ? "12px" : "16px"),
                    margin: isMobile ? "4px 12px" : "6px 16px",
                    borderRadius: isMobile ? "12px" : "14px",
                    color: "#fff",
                    textDecoration: "none",
                    background: isActive(item.path, item.exact)
                      ? "linear-gradient(135deg, rgba(10,77,140,0.2) 0%, rgba(7,61,108,0.15) 100%)"
                      : "transparent",
                    transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
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
                      width: isMobile ? "36px" : "40px",
                      height: isMobile ? "36px" : "40px",
                      borderRadius: "10px",
                      background: isActive(item.path, item.exact)
                        ? "rgba(10,77,140,0.25)"
                        : "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      [isArabic ? 'marginLeft' : 'marginRight']: sidebarOpen ? (isMobile ? "10px" : "14px") : "0",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{
                        fontSize: isMobile ? "18px" : "20px",
                        color: isActive(item.path, item.exact) ? "#fff" : "rgba(255,255,255,0.8)",
                      }}
                    ></i>
                  </div>
                  {sidebarOpen && <span style={{ fontSize: isMobile ? "14px" : "15px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', fontWeight: 500 }}>{item.title}</span>}
                </Link>
              </div>
            );
          })}

          {/* Administration Submenu */}
          <div>
            <div
              onClick={() => setAdministrationOpen(!administrationOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: sidebarOpen ? "16px 24px" : "16px",
                margin: "6px 16px",
                borderRadius: "14px",
                color: "#fff",
                cursor: "pointer",
                background: (pathname?.startsWith('/admin/users') || pathname?.startsWith('/admin/roles'))
                  ? "linear-gradient(135deg, rgba(10,77,140,0.2) 0%, rgba(7,61,108,0.15) 100%)"
                  : "transparent",
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
                justifyContent: sidebarOpen ? "space-between" : "center",
                border: (pathname?.startsWith('/admin/users') || pathname?.startsWith('/admin/roles')) ? "1px solid rgba(255,255,255,0.2)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!pathname?.startsWith('/admin/users') && !pathname?.startsWith('/admin/roles')) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                }
              }}
              onMouseLeave={(e) => {
                if (!pathname?.startsWith('/admin/users') && !pathname?.startsWith('/admin/roles')) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
              }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: (pathname?.startsWith('/admin/users') || pathname?.startsWith('/admin/roles'))
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
                    className="bx bx-cog"
                    style={{
                      fontSize: "20px",
                      color: (pathname?.startsWith('/admin/users') || pathname?.startsWith('/admin/roles')) ? "#fff" : "rgba(255,255,255,0.8)",
                    }}
                  ></i>
                </div>
                {sidebarOpen && (
                  <span style={{ fontSize: "15px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', fontWeight: 500 }}>
                    {t.administration}
                  </span>
                )}
              </div>
              {sidebarOpen && (
                <i
                  className={`bx ${administrationOpen ? 'bx-chevron-up' : 'bx-chevron-down'}`}
                  style={{
                    fontSize: "20px",
                    color: "rgba(255,255,255,0.8)",
                    transition: "transform 0.3s ease",
                  }}
                ></i>
              )}
            </div>

            {/* Submenu Items */}
            {sidebarOpen && (
              <div
                style={{
                  maxHeight: administrationOpen ? "500px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {administrationItems.map((subItem, subIndex) => {
                  // Check menu access for submenu items
                  if (user?.menu_access && subItem.menuKey) {
                    if (!user.menu_access[subItem.menuKey]) {
                      return null;
                    }
                  }
                  return (
                    <Link
                      key={subIndex}
                      href={subItem.path}
                      prefetch={true}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 20px",
                        margin: "4px 16px",
                        borderRadius: "10px",
                        color: "#fff",
                        textDecoration: "none",
                        background: isActive(subItem.path)
                          ? "rgba(10,77,140,0.15)"
                          : "transparent",
                        transition: "all 0.2s ease",
                        [isArabic ? 'borderRight' : 'borderLeft']: isActive(subItem.path) ? "3px solid rgba(255,255,255,0.5)" : "3px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive(subItem.path)) {
                          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                          if (isArabic) {
                            e.currentTarget.style.borderRight = "3px solid rgba(255,255,255,0.3)";
                          } else {
                            e.currentTarget.style.borderLeft = "3px solid rgba(255,255,255,0.3)";
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive(subItem.path)) {
                          e.currentTarget.style.background = "transparent";
                          if (isArabic) {
                            e.currentTarget.style.borderRight = "3px solid transparent";
                          } else {
                            e.currentTarget.style.borderLeft = "3px solid transparent";
                          }
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: isActive(subItem.path)
                            ? "rgba(10,77,140,0.2)"
                            : "rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          [isArabic ? 'marginLeft' : 'marginRight']: "12px",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <i
                          className={subItem.icon}
                          style={{
                            fontSize: "16px",
                            color: isActive(subItem.path) ? "#fff" : "rgba(255,255,255,0.7)",
                          }}
                        ></i>
                      </div>
                      <span style={{ fontSize: "14px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', fontWeight: 400 }}>
                        {subItem.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>


      </aside>

      {/* Main Content */}
      <main
        className="admin-content"
        style={{
          [isArabic ? 'marginRight' : 'marginLeft']:
            (isMobile || isTablet)
              ? "0"
              : (sidebarOpen ? "300px" : "80px"),
          flex: 1,
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
          minHeight: "100vh",
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            padding: isMobile ? "12px 16px" : isTablet ? "16px 24px" : "20px 30px",
            borderBottom: "1px solid rgba(148,163,184,0.1)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? "10px" : isTablet ? "12px" : "16px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            direction: isArabic ? 'rtl' : 'ltr',
          }}
        >
          <h1 style={{
            margin: 0,
            fontSize: isMobile ? "16px" : isTablet ? "20px" : "24px",
            color: "#0A4D8C",
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            fontWeight: "700",
            flex: isMobile ? "1 1 100%" : "0 1 auto",
            lineHeight: "1.2"
          }}>
            {pathname === "/admin" && t.dashboard}
            {pathname?.startsWith("/admin/blog") && t.blogManagement}
            {pathname?.startsWith("/admin/consultations") && t.consultations}
            {pathname?.startsWith("/admin/users") && t.userManagement}
            {pathname?.startsWith("/admin/roles") && t.rolesManagement}
          </h1>

          <div style={{ display: "flex", gap: isMobile ? "6px" : "12px", alignItems: "center", flexWrap: "wrap" }}>
            <AdminLanguageSelector />

            <Link
              href="/"
              target="_blank"
              title={t.viewSite}
              style={{
                padding: isMobile ? "8px" : "10px 20px",
                background: "transparent",
                border: "1px solid rgba(10,77,140,0.25)",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#0A4D8C",
                fontSize: isMobile ? "16px" : "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: "600",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                minWidth: isMobile ? "36px" : "auto",
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
              {!isMobile && <span>{t.viewSite}</span>}
            </Link>

            <button
              onClick={handleLogout}
              title={t.logout}
              style={{
                padding: isMobile ? "8px" : "10px 20px",
                background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                border: "1px solid rgba(220, 38, 38, 0.3)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: isMobile ? "16px" : "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(220, 38, 38, 0.2)",
                whiteSpace: "nowrap",
                minWidth: isMobile ? "36px" : "auto",
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
              {!isMobile && <span>{t.logout}</span>}
            </button>
          </div>
        </header>

        {/* Content */}
        <div style={{
          padding: isMobile ? "12px" : isTablet ? "20px" : "30px",
          maxWidth: "100%",
          overflowX: "auto"
        }}>
          {children}
        </div>
      </main>

      {/* Mobile/Tablet Menu Toggle */}
      {(isMobile || isTablet) && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            display: "flex",
            position: "fixed",
            top: isMobile ? "16px" : "20px",
            [isArabic ? 'right' : 'left']: isMobile ? "16px" : "20px",
            zIndex: 1001,
            background: "linear-gradient(135deg, rgba(10,77,140,0.95) 0%, rgba(7,61,108,0.95) 50%, rgba(5,42,79,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "12px",
            padding: isMobile ? "10px" : "12px",
            color: "#fff",
            cursor: "pointer",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? "40px" : "44px",
            height: isMobile ? "40px" : "44px",
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
          <i className={sidebarOpen ? "bx bx-x" : "bx bx-menu"} style={{ fontSize: isMobile ? "18px" : "20px" }}></i>
        </button>
      )}

      {/* Mobile/Tablet Overlay */}
      {sidebarOpen && (isMobile || isTablet) && (
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
