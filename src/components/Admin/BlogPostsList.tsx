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
    const colors: Record<string, string> = {
      draft: '#6b7280',
      published: '#10b981',
      archived: '#9ca3af',
    };
    return colors[status] || '#6b7280';
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
        credentials: 'include', // Include cookies for authentication
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
        alignItems: isMobile ? 'flex-start' : 'center',
        marginBottom: '24px',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '16px' : '0',
      }}>
        <h2 style={{
          margin: 0,
          fontSize: isMobile ? '24px' : '28px',
          fontWeight: '700',
          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          width: isMobile ? '100%' : 'auto',
        }}>
          {t.allPosts}
        </h2>
        <Link
          href="/admin/blog/new"
          style={{
            padding: isMobile ? '10px 20px' : '12px 24px',
            background: '#0A4D8C',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: isMobile ? '13px' : '14px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center',
          }}
        >
          <i className="bx bx-plus"></i>
          {t.addNewPost}
        </Link>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '12px' : '16px',
        marginBottom: '24px',
      }}>
        {[
          { label: t.totalPosts, value: stats.total, color: '#0A4D8C' },
          { label: t.drafts, value: stats.draft, color: '#6b7280' },
          { label: t.publishedPosts, value: stats.published, color: '#10b981' },
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              padding: isMobile ? '16px' : '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: isMobile ? 'center' : 'flex-start',
              justifyContent: isMobile ? 'space-between' : 'flex-start',
            }}
          >
            <div style={{
              fontSize: isMobile ? '24px' : '28px',
              fontWeight: '700',
              color: stat.color,
              order: isMobile ? 2 : 1,
            }}>{stat.value}</div>
            <div style={{
              fontSize: isMobile ? '13px' : '14px',
              color: '#6b7280',
              marginTop: isMobile ? '0' : '4px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              order: isMobile ? 1 : 2,
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div
        style={{
          background: '#fff',
          padding: isMobile ? '16px' : '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: isMobile ? '12px' : '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: isMobile ? 'unset' : 1,
            width: isMobile ? '100%' : 'auto',
            minWidth: isMobile ? 'unset' : '250px',
            padding: isMobile ? '12px 16px' : '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: isMobile ? '15px' : '14px',
            direction: isArabic ? 'rtl' : 'ltr',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
          }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            width: isMobile ? '100%' : 'auto',
            padding: isMobile ? '12px 16px' : '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: isMobile ? '15px' : '14px',
            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
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
              padding: '40px 20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
              color: '#9ca3af',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.noPosts}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {/* Title and Slug */}
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '4px',
                    fontSize: '15px',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}>
                    {isArabic && post.title_ar ? post.title_ar : post.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>{post.slug}</div>
                </div>

                {/* Meta Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #f3f4f6',
                }}>
                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '4px',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      textTransform: isArabic ? 'none' : 'uppercase',
                    }}>{t.author}</div>
                    <div style={{
                      fontSize: '13px',
                      color: '#374151',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    }}>{post.author_name}</div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '4px',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      textTransform: isArabic ? 'none' : 'uppercase',
                    }}>{t.status}</div>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '600',
                        textTransform: isArabic ? 'none' : 'uppercase',
                        background: `${getStatusColor(post.status)}20`,
                        color: getStatusColor(post.status),
                        fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                        display: 'inline-block',
                      }}
                    >
                      {getStatusLabel(post.status)}
                    </span>
                  </div>

                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '4px',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      textTransform: isArabic ? 'none' : 'uppercase',
                    }}>{t.views}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      <i className="bx bx-show" style={{ [isArabic ? 'marginLeft' : 'marginRight']: '4px' }}></i>
                      {post.views}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280',
                      marginBottom: '4px',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      textTransform: isArabic ? 'none' : 'uppercase',
                    }}>{t.date}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>
                      {formatDate(post.created_at)}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid #f3f4f6',
                }}>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      background: '#0A4D8C',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      textDecoration: 'none',
                      fontWeight: '500',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    <i className="bx bx-edit"></i>
                    {t.edit}
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                      flex: 1,
                      padding: '10px 16px',
                      background: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
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
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.title}
                  </th>
                  <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.author}
                  </th>
                  <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.status}
                  </th>
                  <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.views}
                  </th>
                  <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.date}
                  </th>
                  <th style={{ padding: '16px', textAlign: isArabic ? 'right' : 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                    {t.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                      {t.noPosts}
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      style={{ borderBottom: '1px solid #e5e7eb' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                      }}
                    >
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '4px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                          {isArabic && post.title_ar ? post.title_ar : post.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>{post.slug}</div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#374151', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                        {post.author_name}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: isArabic ? 'none' : 'uppercase',
                            background: `${getStatusColor(post.status)}20`,
                            color: getStatusColor(post.status),
                            fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                          }}
                        >
                          {getStatusLabel(post.status)}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
                        <i className="bx bx-show" style={{ [isArabic ? 'marginLeft' : 'marginRight']: '4px' }}></i>
                        {post.views}
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
                        {formatDate(post.created_at)}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <Link
                            href={`/admin/blog/${post.id}`}
                            style={{
                              padding: '6px 12px',
                              background: '#0A4D8C',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              textDecoration: 'none',
                              fontWeight: '500',
                              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                            }}
                          >
                            {t.edit}
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            style={{
                              padding: '6px 12px',
                              background: '#ef4444',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              fontWeight: '500',
                              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                            }}
                          >
                            {t.delete}
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
