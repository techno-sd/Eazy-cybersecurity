"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardProps {
  stats: {
    blog: number;
    consultations: number;
    newConsultations: number;
    contacts: number;
    users: number;
  };
  recentConsultations: any[];
  recentPosts: any[];
  user: any;
}

const AdminDashboard: React.FC<DashboardProps> = ({
  stats,
  recentConsultations,
  recentPosts,
  user,
}) => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const isArabic = lang === 'ar';

  // Load language preference from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('admin_lang') as 'en' | 'ar' || 'en';
    setLang(savedLang);

    // Listen for language changes
    const handleStorageChange = () => {
      const newLang = localStorage.getItem('admin_lang') as 'en' | 'ar' || 'en';
      setLang(newLang);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also check every 100ms for changes (for same-window updates)
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const translations = {
    en: {
      welcomeBack: "Welcome back",
      welcomeMessage: "Here's what's happening with your website today.",
      totalBlogPosts: "Total Blog Posts",
      newConsultations: "New Consultations",
      totalConsultations: "Total Consultations",
      contactMessages: "Contact Messages",
      totalUsers: "Total Users",
      recentConsultations: "Recent Consultations",
      recentBlogPosts: "Recent Blog Posts",
      viewAll: "View All",
      noConsultations: "No consultations yet",
      noBlogPosts: "No blog posts yet",
      quickActions: "Quick Actions",
      newBlogPost: "New Blog Post",
      viewConsultations: "View Consultations",
      viewMessages: "View Messages",
      views: "views",
      new: "NEW",
      // Status translations
      statusNew: "New",
      statusInProgress: "In Progress",
      statusCompleted: "Completed",
      statusCancelled: "Cancelled",
      statusDraft: "Draft",
      statusPublished: "Published",
      statusArchived: "Archived",
    },
    ar: {
      welcomeBack: "مرحباً بعودتك",
      welcomeMessage: "إليك ما يحدث مع موقعك اليوم.",
      totalBlogPosts: "إجمالي المقالات",
      newConsultations: "استشارات جديدة",
      totalConsultations: "إجمالي الاستشارات",
      contactMessages: "رسائل الاتصال",
      totalUsers: "إجمالي المستخدمين",
      recentConsultations: "الاستشارات الأخيرة",
      recentBlogPosts: "المقالات الأخيرة",
      viewAll: "عرض الكل",
      noConsultations: "لا توجد استشارات حتى الآن",
      noBlogPosts: "لا توجد مقالات حتى الآن",
      quickActions: "إجراءات سريعة",
      newBlogPost: "مقال جديد",
      viewConsultations: "عرض الاستشارات",
      viewMessages: "عرض الرسائل",
      views: "مشاهدة",
      new: "جديد",
      // Status translations
      statusNew: "جديد",
      statusInProgress: "قيد التنفيذ",
      statusCompleted: "مكتمل",
      statusCancelled: "ملغي",
      statusDraft: "مسودة",
      statusPublished: "منشور",
      statusArchived: "مؤرشف",
    }
  };

  const t = translations[lang];

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, keyof typeof translations.en> = {
      'new': 'statusNew',
      'in_progress': 'statusInProgress',
      'completed': 'statusCompleted',
      'cancelled': 'statusCancelled',
      'draft': 'statusDraft',
      'published': 'statusPublished',
      'archived': 'statusArchived',
    };
    const key = statusMap[status];
    return key ? t[key] : status;
  };

  const statCards = [
    {
      title: t.totalBlogPosts,
      value: stats.blog,
      icon: "bx bx-news",
      color: "#0A4D8C",
      link: "/admin/blog",
    },
    {
      title: t.newConsultations,
      value: stats.newConsultations,
      icon: "bx bx-message-dots",
      color: "#f59e0b",
      link: "/admin/consultations",
      badge: stats.newConsultations > 0,
    },
    {
      title: t.totalConsultations,
      value: stats.consultations,
      icon: "bx bx-chat",
      color: "#607EAC",
      link: "/admin/consultations",
    },
    {
      title: t.contactMessages,
      value: stats.contacts,
      icon: "bx bx-envelope",
      color: "#10b981",
      link: "/admin/contacts",
    },
    ...(user.role === "admin"
      ? [
          {
            title: t.totalUsers,
            value: stats.users,
            icon: "bx bx-user",
            color: "#8b5cf6",
            link: "/admin/users",
          },
        ]
      : []),
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      new: "#f59e0b",
      in_progress: "#3b82f6",
      completed: "#10b981",
      cancelled: "#ef4444",
      draft: "#6b7280",
      published: "#10b981",
      archived: "#9ca3af",
    };
    return colors[status] || "#6b7280";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Welcome Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)",
          borderRadius: "16px",
          padding: "30px",
          marginBottom: "30px",
          color: "#fff",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0", fontSize: "28px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
          {t.welcomeBack}, {user.full_name}!
        </h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "16px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
          {t.welcomeMessage}
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "24px",
              textDecoration: "none",
              border: "1px solid #e5e7eb",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {stat.badge && (
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  [isArabic ? 'left' : 'right']: "12px",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "11px",
                  fontWeight: "700",
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                }}
              >
                {t.new}
              </div>
            )}
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "12px",
                background: `${stat.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <i className={stat.icon} style={{ fontSize: "24px", color: stat.color }}></i>
            </div>
            <div style={{ fontSize: "32px", fontWeight: "700", color: "#1a1a1a", marginBottom: "8px" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: "14px", color: "#6b7280", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>{stat.title}</div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Recent Consultations */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              {t.recentConsultations}
            </h3>
            <Link
              href="/admin/consultations"
              style={{ color: "#0A4D8C", fontSize: "14px", textDecoration: "none", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}
            >
              {t.viewAll} {isArabic ? '←' : '→'}
            </Link>
          </div>

          {recentConsultations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              {t.noConsultations}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentConsultations.map((consultation) => (
                <Link
                  key={consultation.id}
                  href={`/admin/consultations/${consultation.id}`}
                  style={{
                    padding: "16px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    textDecoration: "none",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong style={{ color: "#1a1a1a", fontSize: "14px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                      {consultation.name}
                    </strong>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        background: `${getStatusColor(consultation.status)}20`,
                        color: getStatusColor(consultation.status),
                        fontWeight: "600",
                        textTransform: isArabic ? 'none' : 'uppercase',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      }}
                    >
                      {getStatusLabel(consultation.status)}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {consultation.service_type || (isArabic ? "استفسار عام" : "General Inquiry")}
                  </div>
                  <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                    {formatDate(consultation.created_at)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              {t.recentBlogPosts}
            </h3>
            <Link
              href="/admin/blog"
              style={{ color: "#0A4D8C", fontSize: "14px", textDecoration: "none", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}
            >
              {t.viewAll} {isArabic ? '←' : '→'}
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              {t.noBlogPosts}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/${post.id}`}
                  style={{
                    padding: "16px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    textDecoration: "none",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <strong style={{ color: "#1a1a1a", fontSize: "14px", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                      {isArabic && post.title_ar ? post.title_ar : post.title}
                    </strong>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        background: `${getStatusColor(post.status)}20`,
                        color: getStatusColor(post.status),
                        fontWeight: "600",
                        textTransform: isArabic ? 'none' : 'uppercase',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      }}
                    >
                      {getStatusLabel(post.status)}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#9ca3af" }}>
                    <span>
                      <i className="bx bx-show" style={{ [isArabic ? 'marginLeft' : 'marginRight']: "4px" }}></i>
                      {post.views} {t.views}
                    </span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ margin: "0 0 20px 0", fontSize: "18px", fontWeight: "700", fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
          {t.quickActions}
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link
            href="/admin/blog/new"
            style={{
              padding: "12px 24px",
              background: "#0A4D8C",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            <i className="bx bx-plus"></i>
            {t.newBlogPost}
          </Link>
          <Link
            href="/admin/consultations"
            style={{
              padding: "12px 24px",
              background: "#f3f4f6",
              color: "#374151",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            <i className="bx bx-message-dots"></i>
            {t.viewConsultations}
          </Link>
          <Link
            href="/admin/contacts"
            style={{
              padding: "12px 24px",
              background: "#f3f4f6",
              color: "#374151",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            <i className="bx bx-envelope"></i>
            {t.viewMessages}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
