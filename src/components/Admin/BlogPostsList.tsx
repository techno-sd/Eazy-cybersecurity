"use client";

import React, { useState, useMemo, memo } from "react";
import { useAdminLang } from "@/hooks/useAdminLang";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  title_ar: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  published_at: string | null;
  created_at: string;
  author_name: string;
}

interface BlogPostsListProps {
  posts: BlogPost[];
  user: any;
}

const BlogPostsList: React.FC<BlogPostsListProps> = ({ posts: initialPosts, user }) => {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { lang, isArabic } = useAdminLang();
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const translations = {
    en: {
      allPosts: "All Posts",
      addNewPost: "Add New Post",
      searchPlaceholder: "Search posts...",
      allStatuses: "All Statuses",
      draft: "Draft",
      published: "Published",
      archived: "Archived",
      title: "Title",
      author: "Author",
      status: "Status",
      views: "Views",
      date: "Date",
      actions: "Actions",
      noPosts: "No blog posts found",
      edit: "Edit",
      delete: "Delete",
      totalPosts: "Total Posts",
      drafts: "Drafts",
      publishedPosts: "Published",
      confirmDelete: "Are you sure you want to delete this post?",
      deleteSuccess: "Post deleted successfully",
      deleteError: "Failed to delete post",
    },
    ar: {
      allPosts: "كل المقالات",
      addNewPost: "إضافة مقال جديد",
      searchPlaceholder: "بحث في المقالات...",
      allStatuses: "كل الحالات",
      draft: "مسودة",
      published: "منشور",
      archived: "مؤرشف",
      title: "العنوان",
      author: "الكاتب",
      status: "الحالة",
      views: "المشاهدات",
      date: "التاريخ",
      actions: "الإجراءات",
      noPosts: "لا توجد مقالات",
      edit: "تعديل",
      delete: "حذف",
      totalPosts: "إجمالي المقالات",
      drafts: "المسودات",
      publishedPosts: "المنشور",
      confirmDelete: "هل أنت متأكد من حذف هذا المقال؟",
      deleteSuccess: "تم حذف المقال بنجاح",
      deleteError: "فشل حذف المقال",
    }
  };

  const t = translations[lang];

  // Minimalist color palette
  const colors = {
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    danger: "#ef4444",
    dangerHover: "#dc2626",
    text: "#1e293b",
    textMuted: "#64748b",
    border: "#e2e8f0",
    background: "#f8fafc",
  };

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, keyof typeof translations.en> = {
      'draft': 'draft',
      'published': 'published',
      'archived': 'archived',
    };
    const key = statusMap[status];
    return key ? t[key] : status;
  };

  const getStatusColor = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      draft: { bg: "#f1f5f9", text: "#64748b" },
      published: { bg: "#dcfce7", text: "#16a34a" },
      archived: { bg: "#f1f5f9", text: "#94a3b8" },
    };
    return statusConfig[status] || statusConfig.draft;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const filteredPosts = useMemo(() => posts.filter((post) => {
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title_ar.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  }), [posts, filterStatus, searchTerm]);

  const stats = useMemo(() => ({
    total: posts.length,
    draft: posts.filter((p) => p.status === 'draft').length,
    published: posts.filter((p) => p.status === 'published').length,
  }), [posts]);

  const handleDelete = async (id: number) => {
    if (!confirm(t.confirmDelete)) return;

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== id));
        alert(t.deleteSuccess);
      } else {
        alert(data.message || t.deleteError);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert(t.deleteError);
    }
  };

  return (
    <div style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        marginBottom: '24px',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '16px',
      }}>
        <div>
          <h2 style={{
            margin: 0,
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '600',
            color: colors.text,
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            letterSpacing: '-0.025em',
          }}>
            {t.allPosts}
          </h2>
          <p style={{
            margin: '4px 0 0',
            fontSize: '14px',
            color: colors.textMuted,
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}>
            {stats.total} {isArabic ? 'مقال' : 'posts'}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          style={{
            padding: '10px 16px',
            background: colors.primary,
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            justifyContent: 'center',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = colors.primaryHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = colors.primary;
          }}
        >
          <i className="bx bx-plus" style={{ fontSize: '18px' }}></i>
          {t.addNewPost}
        </Link>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {[
          { label: t.totalPosts, value: stats.total, icon: 'bx-file' },
          { label: t.drafts, value: stats.draft, icon: 'bx-edit' },
          { label: t.publishedPosts, value: stats.published, icon: 'bx-check-circle' },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: '16px 20px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: colors.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <i className={`bx ${stat.icon}`} style={{ fontSize: '20px', color: colors.textMuted }}></i>
            </div>
            <div>
              <div style={{
                fontSize: '22px',
                fontWeight: '600',
                color: colors.text,
                lineHeight: '1.2',
              }}>{stat.value}</div>
              <div style={{
                fontSize: '13px',
                color: colors.textMuted,
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          background: '#fff',
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '16px',
          border: `1px solid ${colors.border}`,
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div style={{
          flex: isMobile ? 'unset' : 1,
          width: isMobile ? '100%' : 'auto',
          position: 'relative',
        }}>
          <i
            className="bx bx-search"
            style={{
              position: 'absolute',
              [isArabic ? 'right' : 'left']: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '18px',
              color: colors.textMuted,
            }}
          ></i>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              [isArabic ? 'paddingRight' : 'paddingLeft']: '40px',
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              fontSize: '14px',
              direction: isArabic ? 'rtl' : 'ltr',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              outline: 'none',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = colors.primary}
            onBlur={(e) => e.currentTarget.style.borderColor = colors.border}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            width: isMobile ? '100%' : 'auto',
            padding: '10px 32px 10px 12px',
            border: `1px solid ${colors.border}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            background: '#fff',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <option value="all">{t.allStatuses}</option>
          <option value="draft">{t.draft}</option>
          <option value="published">{t.published}</option>
          <option value="archived">{t.archived}</option>
        </select>
      </div>

      {/* Posts Table/Cards */}
      {isMobile ? (
        // Mobile Card View
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredPosts.length === 0 ? (
            <div style={{
              background: '#fff',
              padding: '48px 24px',
              borderRadius: '8px',
              border: `1px solid ${colors.border}`,
              textAlign: 'center',
              color: colors.textMuted,
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              <i className="bx bx-file" style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.3 }}></i>
              <div>{t.noPosts}</div>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: '#fff',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Title and Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: '500',
                      color: colors.text,
                      fontSize: '15px',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      lineHeight: '1.4',
                    }}>
                      {isArabic && post.title_ar ? post.title_ar : post.title}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>{post.slug}</div>
                  </div>
                  <span
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '500',
                      background: getStatusColor(post.status).bg,
                      color: getStatusColor(post.status).text,
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      flexShrink: 0,
                    }}
                  >
                    {getStatusLabel(post.status)}
                  </span>
                </div>

                {/* Meta Info */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '13px',
                  color: colors.textMuted,
                  paddingTop: '12px',
                  borderTop: `1px solid ${colors.border}`,
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="bx bx-user" style={{ fontSize: '14px' }}></i>
                    {post.author_name}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="bx bx-show" style={{ fontSize: '14px' }}></i>
                    {post.views}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <i className="bx bx-calendar" style={{ fontSize: '14px' }}></i>
                    {formatDate(post.created_at)}
                  </span>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: `1px solid ${colors.border}`,
                }}>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'transparent',
                      color: colors.primary,
                      border: `1px solid ${colors.primary}`,
                      borderRadius: '6px',
                      fontSize: '13px',
                      textDecoration: 'none',
                      fontWeight: '500',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <i className="bx bx-edit-alt"></i>
                    {t.edit}
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'transparent',
                      color: colors.danger,
                      border: `1px solid ${colors.danger}`,
                      borderRadius: '6px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <i className="bx bx-trash"></i>
                    {t.delete}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        // Desktop Table View
        <div
          style={{
            background: '#fff',
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <th style={{ padding: '12px 16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.title}
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.author}
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.status}
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.views}
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.date}
                  </th>
                  <th style={{ padding: '12px 16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '48px', textAlign: 'center', color: colors.textMuted, fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                      <i className="bx bx-file" style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.3, display: 'block' }}></i>
                      {t.noPosts}
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      style={{ borderBottom: `1px solid ${colors.border}` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = colors.background;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                      }}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ fontWeight: '500', color: colors.text, marginBottom: '2px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                          {isArabic && post.title_ar ? post.title_ar : post.title}
                        </div>
                        <div style={{ fontSize: '12px', color: colors.textMuted }}>{post.slug}</div>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: colors.textMuted, fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                        {post.author_name}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: getStatusColor(post.status).bg,
                            color: getStatusColor(post.status).text,
                            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                          }}
                        >
                          {getStatusLabel(post.status)}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: colors.textMuted }}>
                        {post.views.toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 16px', fontSize: '13px', color: colors.textMuted }}>
                        {formatDate(post.created_at)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <Link
                            href={`/admin/blog/${post.id}`}
                            title={t.edit}
                            style={{
                              padding: '6px 10px',
                              background: 'transparent',
                              color: colors.textMuted,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '6px',
                              fontSize: '14px',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = colors.primary;
                              e.currentTarget.style.color = colors.primary;
                              e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = colors.border;
                              e.currentTarget.style.color = colors.textMuted;
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <i className="bx bx-edit-alt"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            title={t.delete}
                            style={{
                              padding: '6px 10px',
                              background: 'transparent',
                              color: colors.textMuted,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '6px',
                              fontSize: '14px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = colors.danger;
                              e.currentTarget.style.color = colors.danger;
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = colors.border;
                              e.currentTarget.style.color = colors.textMuted;
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <i className="bx bx-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(BlogPostsList);
