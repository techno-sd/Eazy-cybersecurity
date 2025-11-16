"use client";

import React, { useMemo, memo } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";
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
  const { lang, isArabic } = useAdminLang();

  // Service type mapping to match website consultation form
  const serviceTypeMap = {
    en: {
      'ai-solutions': 'AI Solutions',
      'cybersecurity': 'Cybersecurity Services',
      'big-data': 'Big Data & Analytics',
      'cloud-computing': 'Cloud Computing & Hosting',
      'sme-eazy': 'SME-EAZY Program',
      'digital-transformation': 'Digital Transformation',
      'vision-2030': 'Vision 2030 Initiatives',
      'security-training': 'Security Training & Awareness',
      'other': 'Other',
    },
    ar: {
      'ai-solutions': 'حلول الذكاء الاصطناعي',
      'cybersecurity': 'خدمات الأمن السيبراني',
      'big-data': 'البيانات الضخمة والتحليلات',
      'cloud-computing': 'الحوسبة السحابية والاستضافة',
      'sme-eazy': 'برنامج SME-EAZY',
      'digital-transformation': 'التحول الرقمي',
      'vision-2030': 'مبادرات رؤية 2030',
      'security-training': 'التدريب والتوعية الأمنية',
      'other': 'أخرى',
    }
  };

  const getServiceName = (serviceType: string | undefined): string => {
    if (!serviceType) return '-';
    const serviceMap = isArabic ? serviceTypeMap.ar : serviceTypeMap.en;
    return serviceMap[serviceType as keyof typeof serviceMap] || serviceType;
  };

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

  const getStatusLabel = useMemo(() => (status: string): string => {
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
  }, [t]);

  const statCards = useMemo(() => [
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
  ], [t, stats, user.role]);

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
    <div
      style={{
        direction: isArabic ? 'rtl' : 'ltr',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f0fa 0%, #f8fafc 100%)',
        padding: '40px 0',
      }}
    >
      {/* Welcome Section */}
      <div
        style={{
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '20px',
          padding: '36px 32px',
          marginBottom: '36px',
          color: '#0A4D8C',
          boxShadow: '0 8px 32px 0 rgba(10,77,140,0.10)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
        }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0A4D8C 60%, #607EAC 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px #0A4D8C22',
          flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 28, fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
            {user.full_name?.[0] || 'A'}
          </span>
        </div>
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', color: '#0A4D8C' }}>
            {t.welcomeBack}, {user.full_name}!
          </h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '16px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', color: '#607EAC' }}>
            {t.welcomeMessage}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}
      >
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            style={{
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '18px',
              padding: '32px 24px',
              textDecoration: 'none',
              border: '1.5px solid #e5e7eb',
              transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 16px 0 rgba(10,77,140,0.07)',
              backdropFilter: 'blur(4px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 12px 36px 0 rgba(10,77,140,0.13)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 16px 0 rgba(10,77,140,0.07)';
            }}
          >
            {stat.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: '14px',
                  [isArabic ? 'left' : 'right']: '14px',
                  background: 'linear-gradient(90deg, #ef4444 60%, #f59e0b 100%)',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  fontWeight: '700',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  boxShadow: '0 2px 8px #ef444422',
                }}
              >
                {t.new}
              </div>
            )}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${stat.color}22, #fff 80%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
                boxShadow: `0 2px 8px ${stat.color}22`,
              }}
            >
              <i className={stat.icon} style={{ fontSize: '28px', color: stat.color }}></i>
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#0A4D8C', marginBottom: '8px', letterSpacing: '-1px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '15px', color: '#607EAC', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', fontWeight: 600 }}>{stat.title}</div>
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
                  href="/admin/consultations"
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
                    {getServiceName(consultation.service_type)}
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
        </div>
      </div>
    </div>
  );
};

export default memo(AdminDashboard);
