"use client";

import React, { useMemo, memo } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";
import Link from "next/link";
import { colors, radius, typography, transitions, spacing, getFontFamily, getDirection } from './theme';
import { StatCard, StatusBadge, EmptyState } from './Button';
import Button from './Button';

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

// Centralized service type mapping
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
} as const;

const translations = {
  en: {
    welcomeBack: "Welcome back",
    welcomeMessage: "Here's what's happening with your website today.",
    totalBlogPosts: "Blog Posts",
    newConsultations: "New Consultations",
    totalConsultations: "Consultations",
    contactMessages: "Messages",
    totalUsers: "Users",
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
    totalBlogPosts: "المقالات",
    newConsultations: "استشارات جديدة",
    totalConsultations: "الاستشارات",
    contactMessages: "الرسائل",
    totalUsers: "المستخدمين",
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
    statusNew: "جديد",
    statusInProgress: "قيد التنفيذ",
    statusCompleted: "مكتمل",
    statusCancelled: "ملغي",
    statusDraft: "مسودة",
    statusPublished: "منشور",
    statusArchived: "مؤرشف",
  }
} as const;

const AdminDashboard: React.FC<DashboardProps> = ({
  stats,
  recentConsultations,
  recentPosts,
  user,
}) => {
  const { lang, isArabic } = useAdminLang();
  const fontFamily = getFontFamily(isArabic);
  const t = translations[lang];

  const getServiceName = useMemo(() => (serviceType: string | undefined): string => {
    if (!serviceType) return '-';
    const serviceMap = isArabic ? serviceTypeMap.ar : serviceTypeMap.en;
    return serviceMap[serviceType as keyof typeof serviceMap] || serviceType;
  }, [isArabic]);

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
      label: t.totalBlogPosts,
      value: stats.blog,
      icon: "bx-news",
      color: colors.primary,
      link: "/admin/blog",
    },
    {
      label: t.newConsultations,
      value: stats.newConsultations,
      icon: "bx-message-dots",
      color: colors.warning,
      link: "/admin/consultations",
      badge: stats.newConsultations > 0,
    },
    {
      label: t.totalConsultations,
      value: stats.consultations,
      icon: "bx-chat",
      color: colors.info,
      link: "/admin/consultations",
    },
    ...(user.role === "admin"
      ? [
          {
            label: t.totalUsers,
            value: stats.users,
            icon: "bx-user",
            color: '#8b5cf6',
            link: "/admin/users",
          },
        ]
      : []),
  ], [t, stats, user.role]);

  const getStatusColor = useMemo(() => (status: string) => {
    const statusColors: Record<string, string> = {
      new: colors.warning,
      in_progress: colors.info,
      completed: colors.success,
      cancelled: colors.danger,
      draft: colors.textMuted,
      published: colors.success,
      archived: colors.textLight,
    };
    return statusColors[status] || colors.textMuted;
  }, []);

  const formatDate = useMemo(() => (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }, [isArabic]);

  return (
    <div
      style={{
        direction: getDirection(isArabic),
        padding: spacing.xl,
        fontFamily,
      }}
    >
      {/* Welcome Section */}
      <div
        style={{
          marginBottom: spacing.xl,
        }}
      >
        <h1 style={{
          margin: 0,
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.semibold,
          color: colors.text,
          fontFamily,
        }}>
          {t.welcomeBack}, {user.full_name}
        </h1>
        <p style={{
          margin: `${spacing.xs} 0 0`,
          fontSize: typography.fontSize.base,
          color: colors.textMuted,
          fontFamily,
        }}>
          {t.welcomeMessage}
        </p>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dashboard-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .dashboard-activity-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .dashboard-stats-grid { grid-template-columns: 1fr !important; }
          .dashboard-action-buttons { flex-direction: column !important; }
          .dashboard-action-buttons a { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      {/* Stats Grid */}
      <div
        className="dashboard-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: spacing.lg,
          marginBottom: spacing.xl,
        }}
      >
        {statCards.map((stat, index) => (
          <Link key={index} href={stat.link} style={{ textDecoration: 'none' }}>
            <StatCard
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="dashboard-activity-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: spacing.lg,
      }}>
        {/* Recent Consultations */}
        <div
          style={{
            background: colors.surface,
            borderRadius: radius.xl,
            padding: spacing.lg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing.lg,
          }}>
            <h3 style={{
              margin: 0,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text,
              fontFamily,
            }}>
              {t.recentConsultations}
            </h3>
            <Link
              href="/admin/consultations"
              style={{
                color: colors.primary,
                fontSize: typography.fontSize.sm,
                textDecoration: "none",
                fontFamily,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {t.viewAll}
            </Link>
          </div>

          {recentConsultations.length === 0 ? (
            <EmptyState
              icon="bx-message-x"
              title={t.noConsultations}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              {recentConsultations.map((consultation) => (
                <Link
                  key={consultation.id}
                  href="/admin/consultations"
                  style={{
                    padding: spacing.md,
                    background: colors.background,
                    borderRadius: radius.lg,
                    textDecoration: "none",
                    border: `1px solid ${colors.border}`,
                    transition: transitions.fast,
                    display: 'block',
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.xs, alignItems: 'center' }}>
                    <span style={{
                      color: colors.text,
                      fontSize: typography.fontSize.base,
                      fontFamily,
                      fontWeight: typography.fontWeight.medium,
                    }}>
                      {consultation.name}
                    </span>
                    <StatusBadge
                      status={consultation.status}
                      customLabels={{ [consultation.status]: getStatusLabel(consultation.status) }}
                    />
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.textMuted,
                    fontFamily,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.md,
                  }}>
                    <span>{getServiceName(consultation.service_type)}</span>
                    <span style={{ color: colors.textLight }}>{formatDate(consultation.created_at)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div
          style={{
            background: colors.surface,
            borderRadius: radius.xl,
            padding: spacing.lg,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing.lg,
          }}>
            <h3 style={{
              margin: 0,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text,
              fontFamily,
            }}>
              {t.recentBlogPosts}
            </h3>
            <Link
              href="/admin/blog"
              style={{
                color: colors.primary,
                fontSize: typography.fontSize.sm,
                textDecoration: "none",
                fontFamily,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {t.viewAll}
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <EmptyState
              icon="bx-news"
              title={t.noBlogPosts}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/${post.id}`}
                  style={{
                    padding: spacing.md,
                    background: colors.background,
                    borderRadius: radius.lg,
                    textDecoration: "none",
                    border: `1px solid ${colors.border}`,
                    transition: transitions.fast,
                    display: 'block',
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing.xs, alignItems: 'center' }}>
                    <span style={{
                      color: colors.text,
                      fontSize: typography.fontSize.base,
                      fontFamily,
                      fontWeight: typography.fontWeight.medium,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                      marginRight: spacing.sm,
                    }}>
                      {isArabic && post.title_ar ? post.title_ar : post.title}
                    </span>
                    <StatusBadge
                      status={post.status}
                      customLabels={{ [post.status]: getStatusLabel(post.status) }}
                    />
                  </div>
                  <div style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.textMuted,
                    fontFamily,
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.md,
                  }}>
                    <span>{post.views} {t.views}</span>
                    <span style={{ color: colors.textLight }}>{formatDate(post.created_at)}</span>
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
          marginTop: spacing.xl,
          background: colors.surface,
          borderRadius: radius.xl,
          padding: spacing.lg,
          border: `1px solid ${colors.border}`,
        }}
      >
        <h3 style={{
          margin: `0 0 ${spacing.lg} 0`,
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text,
          fontFamily,
        }}>
          {t.quickActions}
        </h3>
        <div className="dashboard-action-buttons" style={{ display: "flex", gap: spacing.md, flexWrap: "wrap" }}>
          <Link href="/admin/blog/new" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon="bx-plus" style={{ fontFamily }}>
              {t.newBlogPost}
            </Button>
          </Link>
          <Link href="/admin/consultations" style={{ textDecoration: 'none' }}>
            <Button variant="outline" icon="bx-message-dots" style={{ fontFamily }}>
              {t.viewConsultations}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminDashboard);
