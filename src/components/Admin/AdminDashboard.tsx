"use client";

import React, { useMemo, memo, useState, useEffect } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      className="dashboard-container"
      style={{
        direction: isArabic ? 'rtl' : 'ltr',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8f0fa 0%, #f8fafc 100%)',
        padding: '40px 20px',
      }}
    >
      {/* Welcome Section */}
      <div
        className="dashboard-welcome"
        style={{
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '24px',
          padding: '36px 32px',
          marginBottom: '36px',
          color: '#0A4D8C',
          boxShadow: '0 10px 40px 0 rgba(10,77,140,0.12)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          border: '1px solid rgba(255,255,255,0.6)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          flexWrap: 'wrap',
        }}
      >
        <div className="dashboard-avatar" style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(10,77,140,0.25)',
          flexShrink: 0,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            inset: -3,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0A4D8C40, #607EAC40)',
            animation: 'pulse 2s ease-in-out infinite',
          }}></div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 32, fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', position: 'relative', zIndex: 1 }}>
            {user.full_name?.[0] || 'A'}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', color: '#0A4D8C', fontWeight: 700 }}>
            {t.welcomeBack}, {user.full_name}!
          </h2>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '16px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit', color: '#607EAC', fontWeight: 500 }}>
            {t.welcomeMessage}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .dashboard-stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) !important;
            gap: 20px !important;
          }
          .dashboard-activity-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 768px) {
          .dashboard-welcome {
            padding: 24px 20px !important;
            gap: 20px !important;
          }
          .dashboard-avatar {
            width: 56px !important;
            height: 56px !important;
          }
          .dashboard-avatar span {
            font-size: 24px !important;
          }
          .dashboard-welcome h2 {
            font-size: 22px !important;
          }
          .dashboard-welcome p {
            font-size: 14px !important;
          }
          .dashboard-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .dashboard-stat-card {
            padding: 24px 20px !important;
          }
          .dashboard-activity-card {
            padding: 20px !important;
            border-radius: 16px !important;
          }
          .dashboard-activity-header h3 {
            font-size: 18px !important;
          }
          .dashboard-quick-actions {
            padding: 20px !important;
            margin-top: 24px !important;
          }
          .dashboard-quick-actions h3 {
            font-size: 18px !important;
          }
          .dashboard-action-buttons {
            flex-direction: column !important;
            width: 100%;
          }
          .dashboard-action-button {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .dashboard-container {
            padding: 24px 12px !important;
          }
          .dashboard-welcome {
            flex-direction: column !important;
            text-align: center;
            padding: 20px 16px !important;
          }
          .dashboard-stat-value {
            font-size: 32px !important;
          }
          .dashboard-activity-item {
            padding: 14px !important;
          }
        }
      `}</style>

      {/* Stats Grid */}
      <div
        className="dashboard-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '40px',
        }}
      >
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="dashboard-stat-card"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              borderRadius: '20px',
              padding: '32px 28px',
              textDecoration: 'none',
              border: '1px solid rgba(10,77,140,0.08)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 4px 20px 0 rgba(10,77,140,0.08)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 16px 48px 0 rgba(10,77,140,0.15)';
              e.currentTarget.style.borderColor = `${stat.color}40`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px 0 rgba(10,77,140,0.08)';
              e.currentTarget.style.borderColor = 'rgba(10,77,140,0.08)';
            }}
          >
            {/* Decorative gradient background */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}80 100%)`,
              borderRadius: '20px 20px 0 0',
            }}></div>

            {stat.badge && (
              <div
                style={{
                  position: 'absolute',
                  top: '18px',
                  [isArabic ? 'left' : 'right']: '18px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
                  color: '#fff',
                  borderRadius: '24px',
                  padding: '6px 16px',
                  fontSize: '11px',
                  fontWeight: '700',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {t.new}
              </div>
            )}
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '18px',
                background: `linear-gradient(135deg, ${stat.color}18, ${stat.color}08)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                marginTop: '8px',
                boxShadow: `0 4px 16px ${stat.color}20`,
                border: `2px solid ${stat.color}15`,
                transition: 'all 0.3s ease',
              }}
            >
              <i className={stat.icon} style={{ fontSize: '32px', color: stat.color }}></i>
            </div>
            <div className="dashboard-stat-value" style={{
              fontSize: '40px',
              fontWeight: '800',
              color: '#0A4D8C',
              marginBottom: '10px',
              letterSpacing: '-1.5px',
              background: `linear-gradient(135deg, #0A4D8C 0%, ${stat.color} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '15px',
              color: '#607EAC',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              fontWeight: 600,
              textAlign: 'center',
            }}>
              {stat.title}
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="dashboard-activity-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "24px",
      }}>
        {/* Recent Consultations */}
        <div
          className="dashboard-activity-card"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "28px",
            border: "1px solid rgba(10,77,140,0.08)",
            boxShadow: "0 4px 20px 0 rgba(10,77,140,0.08)",
            backdropFilter: "blur(8px)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}
        >
          <div className="dashboard-activity-header" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "2px solid #f3f4f6",
          }}>
            <h3 style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "700",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              color: '#0A4D8C',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <i className="bx bx-message-dots" style={{ fontSize: '24px', color: '#607EAC' }}></i>
              {t.recentConsultations}
            </h3>
            <Link
              href="/admin/consultations"
              style={{
                color: "#0A4D8C",
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.gap = '8px';
                e.currentTarget.style.color = '#607EAC';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.gap = '4px';
                e.currentTarget.style.color = '#0A4D8C';
              }}
            >
              {t.viewAll} <i className={`bx bx-${isArabic ? 'left' : 'right'}-arrow-alt`}></i>
            </Link>
          </div>

          {recentConsultations.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9ca3af",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              <i className="bx bx-message-x" style={{ fontSize: '48px', opacity: 0.3, marginBottom: '16px', display: 'block' }}></i>
              {t.noConsultations}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {recentConsultations.map((consultation, idx) => (
                <Link
                  key={consultation.id}
                  href="/admin/consultations"
                  className="dashboard-activity-item"
                  style={{
                    padding: "18px",
                    background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
                    borderRadius: "14px",
                    textDecoration: "none",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateX(0)' : `translateX(${isArabic ? '20px' : '-20px'})`,
                    transitionDelay: `${0.5 + idx * 0.1}s`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%)";
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(10,77,140,0.1)';
                    e.currentTarget.style.borderColor = '#0A4D8C40';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)";
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: `linear-gradient(180deg, ${getStatusColor(consultation.status)} 0%, ${getStatusColor(consultation.status)}80 100%)`,
                    borderRadius: '14px 0 0 14px',
                  }}></div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: 'flex-start' }}>
                    <strong style={{
                      color: "#1a1a1a",
                      fontSize: "15px",
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      fontWeight: 700,
                      flex: 1,
                      [isArabic ? 'marginLeft' : 'marginRight']: '12px',
                    }}>
                      {consultation.name}
                    </strong>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "5px 12px",
                        borderRadius: "14px",
                        background: `${getStatusColor(consultation.status)}15`,
                        color: getStatusColor(consultation.status),
                        fontWeight: "700",
                        textTransform: isArabic ? 'none' : 'uppercase',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                        whiteSpace: 'nowrap',
                        border: `1px solid ${getStatusColor(consultation.status)}30`,
                      }}
                    >
                      {getStatusLabel(consultation.status)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "6px",
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <i className="bx bx-briefcase" style={{ fontSize: '14px', color: '#9ca3af' }}></i>
                    {getServiceName(consultation.service_type)}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#9ca3af",
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <i className="bx bx-calendar" style={{ fontSize: '14px' }}></i>
                    {formatDate(consultation.created_at)}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div
          className="dashboard-activity-card"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "20px",
            padding: "28px",
            border: "1px solid rgba(10,77,140,0.08)",
            boxShadow: "0 4px 20px 0 rgba(10,77,140,0.08)",
            backdropFilter: "blur(8px)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "2px solid #f3f4f6",
          }}>
            <h3 style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "700",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              color: '#0A4D8C',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <i className="bx bx-news" style={{ fontSize: '24px', color: '#607EAC' }}></i>
              {t.recentBlogPosts}
            </h3>
            <Link
              href="/admin/blog"
              style={{
                color: "#0A4D8C",
                fontSize: "14px",
                textDecoration: "none",
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.gap = '8px';
                e.currentTarget.style.color = '#607EAC';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.gap = '4px';
                e.currentTarget.style.color = '#0A4D8C';
              }}
            >
              {t.viewAll} <i className={`bx bx-${isArabic ? 'left' : 'right'}-arrow-alt`}></i>
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9ca3af",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              <i className="bx bx-news" style={{ fontSize: '48px', opacity: 0.3, marginBottom: '16px', display: 'block' }}></i>
              {t.noBlogPosts}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {recentPosts.map((post, idx) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/${post.id}`}
                  className="dashboard-activity-item"
                  style={{
                    padding: "18px",
                    background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
                    borderRadius: "14px",
                    textDecoration: "none",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? 'translateX(0)' : `translateX(${isArabic ? '-20px' : '20px'})`,
                    transitionDelay: `${0.6 + idx * 0.1}s`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #f3f4f6 0%, #f9fafb 100%)";
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(10,77,140,0.1)';
                    e.currentTarget.style.borderColor = '#0A4D8C40';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)";
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: `linear-gradient(180deg, ${getStatusColor(post.status)} 0%, ${getStatusColor(post.status)}80 100%)`,
                    borderRadius: '14px 0 0 14px',
                  }}></div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: 'flex-start' }}>
                    <strong style={{
                      color: "#1a1a1a",
                      fontSize: "15px",
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      fontWeight: 700,
                      flex: 1,
                      [isArabic ? 'marginLeft' : 'marginRight']: '12px',
                      lineHeight: '1.4',
                    }}>
                      {isArabic && post.title_ar ? post.title_ar : post.title}
                    </strong>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "5px 12px",
                        borderRadius: "14px",
                        background: `${getStatusColor(post.status)}15`,
                        color: getStatusColor(post.status),
                        fontWeight: "700",
                        textTransform: isArabic ? 'none' : 'uppercase',
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                        whiteSpace: 'nowrap',
                        border: `1px solid ${getStatusColor(post.status)}30`,
                      }}
                    >
                      {getStatusLabel(post.status)}
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "18px",
                    fontSize: "12px",
                    color: "#9ca3af",
                    alignItems: 'center',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="bx bx-show" style={{ fontSize: '14px' }}></i>
                      {post.views} {t.views}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="bx bx-calendar" style={{ fontSize: '14px' }}></i>
                      {formatDate(post.created_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className="dashboard-quick-actions"
        style={{
          marginTop: "32px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "20px",
          padding: "28px",
          border: "1px solid rgba(10,77,140,0.08)",
          boxShadow: "0 4px 20px 0 rgba(10,77,140,0.08)",
          backdropFilter: "blur(8px)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s',
        }}
      >
        <h3 style={{
          margin: "0 0 24px 0",
          fontSize: "20px",
          fontWeight: "700",
          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          color: '#0A4D8C',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <i className="bx bx-rocket" style={{ fontSize: '24px', color: '#607EAC' }}></i>
          {t.quickActions}
        </h3>
        <div className="dashboard-action-buttons" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link
            href="/admin/blog/new"
            className="dashboard-action-button"
            style={{
              padding: "14px 28px",
              background: "linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)",
              color: "#fff",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 16px rgba(10,77,140,0.25)',
              border: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,77,140,0.35)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(10,77,140,0.25)';
            }}
          >
            <i className="bx bx-plus-circle" style={{ fontSize: '20px' }}></i>
            {t.newBlogPost}
          </Link>
          <Link
            href="/admin/consultations"
            className="dashboard-action-button"
            style={{
              padding: "14px 28px",
              background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
              color: "#0A4D8C",
              borderRadius: "12px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "700",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '2px solid #e5e7eb',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#0A4D8C';
              e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,77,140,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <i className="bx bx-message-dots" style={{ fontSize: '20px' }}></i>
            {t.viewConsultations}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminDashboard);
