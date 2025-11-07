"use client";
import React, { useEffect, useState, useMemo, useCallback, memo } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Layouts/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layouts/Footer";
import { useLang } from "@/context/LangContext";
import Image from "next/image";
import Link from "next/link";

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
  published_at: string;
}

// Memoized content renderer component
const ContentRenderer = memo(({ content, isArabic }: { content: string; isArabic: boolean }) => {
  const renderedContent = useMemo(() => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} style={{ fontSize: '36px', fontWeight: '700', marginTop: '24px', marginBottom: '16px', lineHeight: '1.3' }}>{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} style={{ fontSize: '28px', fontWeight: '700', marginTop: '24px', marginBottom: '16px', lineHeight: '1.3', color: '#0A4D8C' }}>{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} style={{ fontSize: '22px', fontWeight: '600', marginTop: '20px', marginBottom: '12px', lineHeight: '1.4' }}>{line.substring(4)}</h3>;
      }
      // List items
      else if (line.startsWith('- ')) {
        return (
          <li key={index} style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '8px', color: '#374151' }}>
            {line.substring(2)}
          </li>
        );
      }
      // Empty lines
      else if (line.trim() === '') {
        return <br key={index} />;
      }
      // Regular paragraphs
      else {
        return <p key={index} style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '16px', color: '#374151' }}>{line}</p>;
      }
    });
  }, [content]);

  return (
    <div style={{
      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
      textAlign: isArabic ? 'right' : 'left',
    }}>
      {renderedContent}
    </div>
  );
});

ContentRenderer.displayName = 'ContentRenderer';

function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { lang } = useLang();
  const isArabic = lang === 'ar';
  const slug = typeof params.slug === 'string' ? params.slug : Array.isArray(params.slug) ? params.slug[0] : '';

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`, {
        next: { revalidate: 60 } // Cache for 60 seconds
      });

      if (!response.ok) {
        if (response.status === 404) {
          setError(isArabic ? 'المقال غير موجود' : 'Post not found');
        } else {
          throw new Error('Failed to fetch post');
        }
        return;
      }

      const data = await response.json();
      if (data.success) {
        setPost(data.data);
      }
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError(isArabic ? 'فشل تحميل المقال' : 'Failed to load post');
    } finally {
      setLoading(false);
    }
  }, [slug, isArabic]);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug, fetchPost]);

  const formattedDate = useMemo(() => {
    if (!post) return '';
    const date = new Date(post.created_at);
    return new Intl.DateTimeFormat(isArabic ? "ar-SA" : "en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }, [post, isArabic]);

  const displayTitle = useMemo(() => {
    if (!post) return '';
    return isArabic && post.title_ar ? post.title_ar : post.title;
  }, [post, isArabic]);

  const displayContent = useMemo(() => {
    if (!post) return '';
    return isArabic && post.content_ar ? post.content_ar : post.content;
  }, [post, isArabic]);

  if (loading) {
    return (
      <>
        <Navbar />
        <PageBanner
          pageTitle={isArabic ? 'جار التحميل...' : 'Loading...'}
          homePageUrl="/"
          homePageText={isArabic ? 'الرئيسية' : 'Home'}
          activePageText={isArabic ? 'المدونة' : 'Blog'}
        />
        <section className="blog-details-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              <div style={{ fontSize: '48px', color: '#0A4D8C', marginBottom: '16px' }}>
                <i className="bx bx-loader-alt bx-spin"></i>
              </div>
              <p style={{ fontSize: '18px', color: '#6b7280' }}>
                {isArabic ? 'جار تحميل المقال...' : 'Loading article...'}
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <PageBanner
          pageTitle={isArabic ? 'خطأ' : 'Error'}
          homePageUrl="/"
          homePageText={isArabic ? 'الرئيسية' : 'Home'}
          activePageText={isArabic ? 'المدونة' : 'Blog'}
        />
        <section className="blog-details-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
              <div style={{ fontSize: '48px', color: '#ef4444', marginBottom: '16px' }}>
                <i className="bx bx-error-circle"></i>
              </div>
              <h2 style={{ fontSize: '24px', color: '#1a1a1a', marginBottom: '16px' }}>{error}</h2>
              <Link href="/blog" style={{ display: 'inline-block', padding: '12px 32px', background: '#0A4D8C', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', marginTop: '16px' }}>
                {isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <PageBanner
        pageTitle={displayTitle}
        homePageUrl="/"
        homePageText={isArabic ? 'الرئيسية' : 'Home'}
        activePageText={isArabic ? 'المدونة' : 'Blog'}
      />

      <section className="blog-details-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)', direction: isArabic ? 'rtl' : 'ltr' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              {/* Article Card */}
              <article style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 5px 25px rgba(10, 77, 140, 0.08)',
                border: '1px solid rgba(10, 77, 140, 0.08)',
                marginBottom: '40px'
              }}>
                {/* Featured Image */}
                {post.featured_image && (
                  <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
                    <Image
                      src={post.featured_image}
                      alt={displayTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                      style={{ objectFit: 'cover' }}
                      priority
                      loading="eager"
                    />
                  </div>
                )}

                {/* Article Meta */}
                <div style={{ padding: '40px 50px' }}>
                  {/* Category Badge */}
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '8px 20px',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1), rgba(96, 126, 172, 0.1))',
                      color: '#0A4D8C',
                      fontSize: '13px',
                      fontWeight: '600',
                      borderRadius: '20px',
                      letterSpacing: '0.5px',
                      fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                    }}>
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 style={{
                    fontSize: '42px',
                    fontWeight: '700',
                    marginBottom: '24px',
                    lineHeight: '1.3',
                    color: '#1a1a1a',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}>
                    {displayTitle}
                  </h1>

                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    paddingBottom: '24px',
                    marginBottom: '32px',
                    borderBottom: '2px solid #f3f4f6',
                    flexWrap: 'wrap',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px' }}>
                      <i className="bx bx-calendar" style={{ fontSize: '18px', color: '#0A4D8C' }}></i>
                      {formattedDate}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '14px' }}>
                      <i className="bx bx-show" style={{ fontSize: '18px', color: '#0A4D8C' }}></i>
                      {post.views} {isArabic ? 'مشاهدة' : 'views'}
                    </div>
                  </div>

                  {/* Content */}
                  <ContentRenderer content={displayContent} isArabic={isArabic} />
                </div>
              </article>

              {/* Back to Blog Button */}
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link
                  href="/blog"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                    color: '#fff',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(10, 77, 140, 0.25)',
                    transition: 'all 0.3s ease',
                    fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  }}
                >
                  <i className={`bx ${isArabic ? 'bx-right-arrow-alt' : 'bx-left-arrow-alt'}`} style={{ fontSize: '20px' }}></i>
                  {isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default memo(BlogDetailPage);
