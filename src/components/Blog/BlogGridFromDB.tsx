"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  title_ar: string;
  slug: string;
  content: string;
  content_ar: string;
  featured_image: string;
  category: string;
  views: number;
  created_at: string;
}

const BlogGridFromDB: React.FC = () => {
  const router = useRouter();
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === 'ar';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // Prefetch post data on hover
  const prefetchPost = useCallback((slug: string) => {
    router.prefetch(`/blog/${slug}`);
  }, [router]);

  useEffect(() => {
    fetchPosts();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        if (data.success && (data.user.role === 'admin' || data.user.role === 'moderator')) {
          setIsAdmin(true);
        }
      }
    } catch (err) {
      // User not authenticated or error - keep isAdmin false
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/public');
      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getExcerpt = (content: string, maxLength = 150) => {
    const textContent = content.replace(/[#*`]/g, '').replace(/\n/g, ' ').trim();
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  if (loading) {
    return (
      <section className="blog-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)' }}>
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="gradient-text" style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.3' }}>
              {isArabic ? 'جار التحميل...' : 'Loading...'}
            </h2>
          </div>
          <div className="row g-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {[1, 2, 3].map((i) => (
              <div className="col-lg-4 col-sm-6" key={i}>
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '100%',
                  background: '#fff',
                  boxShadow: '0 8px 30px rgba(10, 77, 140, 0.1)',
                  border: '1px solid rgba(10, 77, 140, 0.1)'
                }}>
                  <div style={{
                    height: '260px',
                    background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.1) 100%)',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}></div>
                  <div style={{ padding: '30px' }}>
                    <div style={{
                      height: '20px',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.1) 100%)',
                      borderRadius: '4px',
                      marginBottom: '15px',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}></div>
                    <div style={{
                      height: '60px',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.1) 100%)',
                      borderRadius: '4px',
                      marginBottom: '15px',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}></div>
                    <div style={{
                      height: '80px',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.1) 100%)',
                      borderRadius: '4px',
                      animation: 'pulse 1.5s ease-in-out infinite'
                    }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)' }}>
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '24px', color: '#ef4444' }}>
              {isArabic ? 'فشل تحميل المقالات' : 'Failed to load blog posts'}
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="blog-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)' }}>
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: 'clamp(36px, 7vw, 56px)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: 'clamp(20px, 3vw, 30px)',
              background: 'linear-gradient(135deg, #0A4D8C 0%, #607EAC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: 'none'
            }}>
              {isArabic ? 'آخر الأخبار' : 'Latest News'}
            </h2>
            <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', color: '#555' }}>
              {isArabic
                ? 'تابع أحدث المقالات والأخبار حول الأمن السيبراني والتحول الرقمي'
                : 'Expert insights, industry trends, and best practices in cybersecurity'}
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="blog-empty-state" style={{ textAlign: 'center', padding: '80px 20px' }}>
              <i className="bx bx-news" style={{
                fontSize: '80px',
                color: 'rgba(10, 77, 140, 0.2)',
                marginBottom: '20px',
                display: 'block'
              }}></i>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1a1a1a',
                marginBottom: '10px'
              }}>
                {isArabic ? 'لا توجد مقالات بعد' : 'No Posts Yet'}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666'
              }}>
                {isArabic ? 'ترقب قريباً المزيد من المقالات والأخبار' : 'Stay tuned for upcoming articles and news'}
              </p>
            </div>
          ) : (
          <div className="row g-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {posts.map((post, idx) => (
              <div className="col-lg-4 col-sm-6 reveal-animation" key={post.id} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="modern-card hover-lift" style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  boxShadow: '0 8px 30px rgba(10, 77, 140, 0.1)',
                  border: '1px solid rgba(10, 77, 140, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(10, 77, 140, 0.18)';
                  e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(10, 77, 140, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(10, 77, 140, 0.1)';
                }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '260px' }}>
                    <Image
                      src={post.featured_image}
                      alt={isArabic && post.title_ar ? post.title_ar : post.title}
                      width={570}
                      height={600}
                      unoptimized={true}
                      priority={false}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      className="blog-image-hover"
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.15) 0%, rgba(96, 126, 172, 0.15) 100%)',
                      opacity: '0',
                      transition: 'opacity 0.4s ease'
                    }} className="gradient-overlay-hover"></div>
                    <span style={{
                      position: 'absolute',
                      top: '20px',
                      right: isArabic ? 'auto' : '20px',
                      left: isArabic ? '20px' : 'auto',
                      padding: '10px 18px',
                      background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '600',
                      borderRadius: '10px',
                      zIndex: '10',
                      boxShadow: '0 6px 20px rgba(10, 77, 140, 0.35)',
                      letterSpacing: '0.5px',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      {post.category}
                    </span>
                    {isAdmin && (
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        style={{
                          position: 'absolute',
                          top: '20px',
                          right: isArabic ? '20px' : 'auto',
                          left: isArabic ? 'auto' : '20px',
                          padding: '8px 16px',
                          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))',
                          backdropFilter: 'blur(10px)',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: '600',
                          borderRadius: '8px',
                          zIndex: '10',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                          letterSpacing: '0.3px',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(185, 28, 28, 0.95))';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
                        }}
                      >
                        <i className="bx bx-edit-alt" style={{ fontSize: '14px' }}></i>
                        {isArabic ? 'تحديث' : 'Update'}
                      </Link>
                    )}
                  </div>
                  <div className="blog-content" style={{
                    padding: '30px',
                    textAlign: isArabic ? 'right' : 'left',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}>
                    <div style={{
                      fontSize: '13px',
                      color: '#0A4D8C',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      letterSpacing: '0.3px',
                      flexDirection: isArabic ? 'row-reverse' : 'row'
                    }}>
                      <i className="bx bx-calendar" style={{ fontSize: '16px' }}></i>
                      {formatDate(post.created_at)}
                    </div>
                    <h3 style={{
                      fontSize: '22px',
                      marginBottom: '0',
                      lineHeight: '1.4',
                      fontWeight: '700',
                      flex: 1,
                      minHeight: '60px'
                    }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="gradient-text-hover"
                        style={{
                          textDecoration: 'none',
                          color: '#1a1a1a',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'linear-gradient(135deg, #0A4D8C, #607EAC)';
                          (e.currentTarget.style as any).webkitBackgroundClip = 'text';
                          (e.currentTarget.style as any).webkitTextFillColor = 'transparent';
                          e.currentTarget.style.backgroundClip = 'text';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                          (e.currentTarget.style as any).webkitTextFillColor = '#1a1a1a';
                        }}
                      >
                        {isArabic && post.title_ar ? post.title_ar : post.title}
                      </Link>
                    </h3>
                    <p style={{
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: '1.8',
                      marginBottom: '0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {getExcerpt(isArabic && post.content_ar ? post.content_ar : post.content)}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="btn-modern-outlined"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        border: '2px solid #0A4D8C',
                        color: '#0A4D8C',
                        background: 'transparent',
                        fontWeight: '600',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        width: '100%',
                        marginTop: 'auto',
                        letterSpacing: '0.5px',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        position: 'relative',
                        zIndex: 1,
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        prefetchPost(post.slug);
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0A4D8C, #607EAC)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(10, 77, 140, 0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#0A4D8C';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {isArabic ? 'اقرأ المزيد' : 'Read More'}
                      <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{ fontSize: '18px', transition: 'transform 0.3s ease' }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {posts.length > 0 && (
              <div className="col-lg-12">
                <div className="page-navigation-area" style={{ marginTop: '60px' }}>
                  <ul className="pagination" style={{
                    justifyContent: 'center',
                    gap: '12px',
                    direction: isArabic ? 'rtl' : 'ltr',
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '0',
                    margin: '0',
                    listStyle: 'none'
                  }}>
                    <li className="page-item active">
                      <Link href="#" className="page-link" style={{
                        padding: '14px 20px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                        border: '2px solid transparent',
                        color: '#fff',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '52px',
                        boxShadow: '0 6px 20px rgba(10, 77, 140, 0.3)',
                        textDecoration: 'none',
                        fontSize: '15px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(10, 77, 140, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 77, 140, 0.3)';
                      }}>
                        1
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogGridFromDB;
