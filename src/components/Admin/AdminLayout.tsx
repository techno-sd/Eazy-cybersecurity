"use client";

import React, { useState, useMemo, memo, useCallback, useTransition } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";
import AdminLanguageSelector from "./AdminLanguageSelector";
import { ToastProvider } from "./Toast";
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
      profile: "Profile",
      welcomeBack: "Welcome back",
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
      profile: "الملف الشخصي",
      welcomeBack: "مرحباً بعودتك",
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

  // Minimalist color palette
  const colors = {
    sidebar: "#1e293b",
    sidebarHover: "#334155",
    sidebarActive: "#0f172a",
    accent: "#3b82f6",
    accentLight: "rgba(59, 130, 246, 0.1)",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    border: "rgba(255, 255, 255, 0.08)",
    danger: "#ef4444",
  };

  return (
    <ToastProvider>
    <div className={`admin-layout ${isMobile ? 'mobile' : ''}`} style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        style={{
          width: isMobile
            ? "260px"
            : isTablet
              ? (sidebarOpen ? "260px" : "72px")
              : (sidebarOpen ? "280px" : "72px"),
          color: colors.text,
          transition: "all 0.25s ease",
          position: "fixed",
          height: "100vh",
          background: colors.sidebar,
          zIndex: 1000,
          [isArabic ? 'right' : 'left']: (isMobile || isTablet) ? (sidebarOpen ? 0 : '-100%') : 0,
          borderRight: isArabic ? undefined : `1px solid ${colors.border}`,
          borderLeft: isArabic ? `1px solid ${colors.border}` : undefined,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "space-between" : "center",
            direction: isArabic ? 'rtl' : 'ltr',
            minHeight: "72px",
          }}
        >
          {sidebarOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: colors.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>E</span>
              </div>
              <span style={{
                fontSize: "18px",
                fontWeight: "600",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                letterSpacing: "-0.02em",
              }}>
                {t.adminPanel}
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            style={{
              background: "transparent",
              border: "none",
              color: colors.textMuted,
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.sidebarHover;
              e.currentTarget.style.color = colors.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = colors.textMuted;
            }}
          >
            <i className={`bx ${sidebarOpen ? (isArabic ? "bx-chevron-right" : "bx-chevron-left") : "bx-menu"}`}></i>
          </button>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "12px 0", display: "flex", flexDirection: "column", height: "calc(100vh - 72px)" }}>
          <div style={{ flex: 1, padding: "0 8px" }}>
            {/* Menu Label */}
            {sidebarOpen && (
              <div style={{
                padding: "8px 12px",
                fontSize: "11px",
                fontWeight: "600",
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Menu
              </div>
            )}

            {menuItems.map((item, index) => {
              if (user?.menu_access && item.menuKey) {
                if (!user.menu_access[item.menuKey]) {
                  return null;
                }
              }
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={index}
                  href={item.path}
                  prefetch={true}
                  onClick={() => {
                    if (isMobile || isTablet) setSidebarOpen(false);
                  }}
                  title={!sidebarOpen ? item.title : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: sidebarOpen ? "10px 12px" : "10px",
                    margin: "2px 0",
                    borderRadius: "8px",
                    color: active ? colors.text : colors.textMuted,
                    textDecoration: "none",
                    background: active ? colors.accentLight : "transparent",
                    transition: "all 0.15s ease",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    position: "relative",
                    gap: "12px",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = colors.sidebarHover;
                      e.currentTarget.style.color = colors.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = colors.textMuted;
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid ${colors.accent}`;
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                >
                  {/* Active indicator */}
                  {active && (
                    <div style={{
                      position: "absolute",
                      [isArabic ? 'right' : 'left']: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "3px",
                      height: "20px",
                      background: colors.accent,
                      borderRadius: isArabic ? "3px 0 0 3px" : "0 3px 3px 0",
                    }} />
                  )}
                  <i
                    className={item.icon}
                    style={{
                      fontSize: "20px",
                      color: active ? colors.accent : "inherit",
                      flexShrink: 0,
                    }}
                  ></i>
                  {sidebarOpen && (
                    <span style={{
                      fontSize: "14px",
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      fontWeight: active ? 500 : 400,
                    }}>
                      {item.title}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Administration Section */}
            {sidebarOpen && (
              <div style={{
                padding: "16px 12px 8px",
                fontSize: "11px",
                fontWeight: "600",
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                {t.administration}
              </div>
            )}

            {/* Administration Toggle (collapsed sidebar) */}
            {!sidebarOpen && (
              <div
                onClick={() => setAdministrationOpen(!administrationOpen)}
                title={t.administration}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  margin: "2px 0",
                  borderRadius: "8px",
                  color: (pathname?.startsWith('/admin/users') || pathname?.startsWith('/admin/roles')) ? colors.accent : colors.textMuted,
                  cursor: "pointer",
                  background: (pathname?.startsWith('/admin/users') || pathname?.startsWith('/admin/roles')) ? colors.accentLight : "transparent",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!pathname?.startsWith('/admin/users') && !pathname?.startsWith('/admin/roles')) {
                    e.currentTarget.style.background = colors.sidebarHover;
                    e.currentTarget.style.color = colors.text;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!pathname?.startsWith('/admin/users') && !pathname?.startsWith('/admin/roles')) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = colors.textMuted;
                  }
                }}
              >
                <i className="bx bx-cog" style={{ fontSize: "20px" }}></i>
              </div>
            )}

            {/* Administration Items */}
            {sidebarOpen && administrationItems.map((subItem, subIndex) => {
              if (user?.menu_access && subItem.menuKey) {
                if (!user.menu_access[subItem.menuKey]) {
                  return null;
                }
              }
              const active = isActive(subItem.path);
              return (
                <Link
                  key={subIndex}
                  href={subItem.path}
                  prefetch={true}
                  onClick={() => {
                    if (isMobile || isTablet) setSidebarOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 12px",
                    margin: "2px 0",
                    borderRadius: "8px",
                    color: active ? colors.text : colors.textMuted,
                    textDecoration: "none",
                    background: active ? colors.accentLight : "transparent",
                    transition: "all 0.15s ease",
                    gap: "12px",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = colors.sidebarHover;
                      e.currentTarget.style.color = colors.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = colors.textMuted;
                    }
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid ${colors.accent}`;
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "none";
                  }}
                >
                  {active && (
                    <div style={{
                      position: "absolute",
                      [isArabic ? 'right' : 'left']: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "3px",
                      height: "20px",
                      background: colors.accent,
                      borderRadius: isArabic ? "3px 0 0 3px" : "0 3px 3px 0",
                    }} />
                  )}
                  <i
                    className={subItem.icon}
                    style={{
                      fontSize: "20px",
                      color: active ? colors.accent : "inherit",
                      flexShrink: 0,
                    }}
                  ></i>
                  <span style={{
                    fontSize: "14px",
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    fontWeight: active ? 500 : 400,
                  }}>
                    {subItem.title}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* User Profile Section */}
          <div style={{
            borderTop: `1px solid ${colors.border}`,
            padding: "12px 8px",
            marginTop: "auto",
          }}>
            {user && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: sidebarOpen ? "10px 12px" : "10px",
                  borderRadius: "8px",
                  gap: sidebarOpen ? "12px" : "0",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  transition: "all 0.2s ease",
                }}
                title={!sidebarOpen ? `${user.full_name}\n${user.email}` : undefined}
              >
                {/* Avatar */}
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#fff",
                  textTransform: "uppercase",
                  flexShrink: 0,
                }}>
                  {user.full_name?.charAt(0) || "A"}
                </div>

                {sidebarOpen && (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: colors.text,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    }}>
                      {user.full_name}
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: colors.textMuted,
                      textTransform: "capitalize",
                    }}>
                      {user.role}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title={!sidebarOpen ? t.logout : undefined}
              aria-label={t.logout}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: sidebarOpen ? "10px 12px" : "10px",
                background: "transparent",
                border: "none",
                borderRadius: "8px",
                color: colors.textMuted,
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                gap: "12px",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: "400",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                e.currentTarget.style.color = colors.danger;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = colors.textMuted;
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${colors.danger}`;
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              <i className="bx bx-log-out" style={{ fontSize: "20px" }}></i>
              {sidebarOpen && <span>{t.logout}</span>}
            </button>
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
              : (sidebarOpen ? "280px" : "72px"),
          flex: 1,
          transition: "all 0.25s ease",
          minHeight: "100vh",
        }}
      >
        {/* Top Bar */}
        <header
          style={{
            background: "#fff",
            padding: isMobile ? "12px 16px" : "0 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: isMobile ? "12px" : "16px",
            position: "sticky",
            top: 0,
            zIndex: 100,
            direction: isArabic ? 'rtl' : 'ltr',
            minHeight: isMobile ? "auto" : "64px",
          }}
        >
          {/* Left Section - Title & Breadcrumb */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flex: isMobile ? "1 1 100%" : "1",
            minWidth: 0,
          }}>
            {/* Breadcrumb */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#94a3b8",
            }}>
              <Link
                href="/admin"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}
              >
                <i className="bx bx-home-alt" style={{ fontSize: "14px" }}></i>
              </Link>
              {pathname !== "/admin" && (
                <>
                  <i className={`bx ${isArabic ? 'bx-chevron-left' : 'bx-chevron-right'}`} style={{ fontSize: "14px" }}></i>
                  <span style={{ fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {pathname?.startsWith("/admin/blog") && t.blogManagement}
                    {pathname?.startsWith("/admin/consultations") && t.consultations}
                    {pathname?.startsWith("/admin/users") && t.userManagement}
                    {pathname?.startsWith("/admin/roles") && t.rolesManagement}
                  </span>
                </>
              )}
            </div>

            {/* Page Title */}
            <h1 style={{
              margin: 0,
              fontSize: isMobile ? "18px" : "22px",
              color: "#0f172a",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              fontWeight: "600",
              letterSpacing: "-0.025em",
              lineHeight: "1.2",
            }}>
              {pathname === "/admin" && t.dashboard}
              {pathname?.startsWith("/admin/blog") && t.blogManagement}
              {pathname?.startsWith("/admin/consultations") && t.consultations}
              {pathname?.startsWith("/admin/users") && t.userManagement}
              {pathname?.startsWith("/admin/roles") && t.rolesManagement}
            </h1>
          </div>

          {/* Right Section - Actions */}
          <div style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexShrink: 0,
          }}>
            {/* View Site Button */}
            <Link
              href="/"
              target="_blank"
              title={t.viewSite}
              aria-label={t.viewSite}
              style={{
                padding: "8px",
                background: "transparent",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                textDecoration: "none",
                color: "#64748b",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease",
                width: "36px",
                height: "36px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.color = "#3b82f6";
                e.currentTarget.style.background = "rgba(59, 130, 246, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <i className="bx bx-link-external"></i>
            </Link>

            {/* Language Selector */}
            <AdminLanguageSelector />

            {/* Divider - desktop only */}
            {!isMobile && !isTablet && (
              <div style={{
                width: "1px",
                height: "24px",
                background: "#e2e8f0",
                margin: "0 4px",
              }} />
            )}

            {/* User Profile - desktop only */}
            {!isMobile && !isTablet && user && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f1f5f9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.accent} 0%, #1d4ed8 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#fff",
                  textTransform: "uppercase",
                }}>
                  {user.full_name?.charAt(0) || "A"}
                </div>
                <div style={{ textAlign: isArabic ? 'right' : 'left' }}>
                  <div style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#1e293b",
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    lineHeight: "1.2",
                  }}>
                    {user.full_name}
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#64748b",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                    }} />
                    <span style={{ textTransform: "capitalize" }}>{user.role}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div style={{
          padding: isMobile ? "16px" : "24px",
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
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          style={{
            display: "flex",
            position: "fixed",
            top: "16px",
            [isArabic ? 'right' : 'left']: "16px",
            zIndex: 1001,
            background: colors.sidebar,
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            color: "#fff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.sidebarHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.sidebar;
          }}
        >
          <i className={sidebarOpen ? "bx bx-x" : "bx bx-menu"} style={{ fontSize: "20px" }}></i>
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
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
    </ToastProvider>
  );
};

export default memo(AdminLayout);
