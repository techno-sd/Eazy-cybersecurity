"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";
import HorizontalScrollCarousel from "./HorizontalScrollCarousel";
import BlogCard from "./BlogCard";

interface BlogPost {
  id: number;
  title: string;
  title_ar: string;
  slug: string;
  content: string;
  content_ar: string;
  featured_image: string | null;
  category: string;
  views: number;
  created_at: string;
}

const LatesNews: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const isArabic = lang === "ar";
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog/public?limit=6');
        const data = await response.json();

        if (data.success) {
          setBlogPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Helper function to extract plain text from HTML content
  const extractDescription = (content: string, maxLength: number = 150): string => {
    const plainText = content.replace(/<[^>]+>/g, '');
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + '...'
      : plainText;
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <>
      <section className="blog-area blog-area-full-width pb-70" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', paddingTop: '100px', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', overflow: 'hidden', padding: '100px 0 70px 0', boxSizing: 'border-box' }}>
        <div className="container-fluid" style={{ maxWidth: '100%', paddingLeft: '0', paddingRight: '0', width: '100%', margin: '0', boxSizing: 'border-box' }}>
          <div className="section-title" style={{
            direction: isArabic ? 'rtl' : 'ltr',
            textAlign: isArabic ? 'right' : 'left',
            marginBottom: '60px',
            maxWidth: '900px',
            margin: '0 auto 60px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <span style={{
              display: 'block',
              width: '70px',
              height: '5px',
              background: 'linear-gradient(90deg, #0A4D8C, #607EAC)',
              borderRadius: '3px',
              marginBottom: '25px',
              [isArabic ? 'marginLeft' : 'marginRight']: 'auto',
              boxShadow: '0 2px 10px rgba(10, 77, 140, 0.3)'
            }}></span>
            <h2 className="gradient-text" style={{
              fontSize: '42px',
              fontWeight: '800',
              marginBottom: '20px',
              lineHeight: '1.2',
              letterSpacing: '-0.5px'
            }}>
              {isArabic ? 'آخر الأخبار' : 'Latest News'}
            </h2>
            <p style={{
              fontSize: '17px',
              lineHeight: '1.9',
              marginBottom: '25px',
              color: '#555',
              fontWeight: '500'
            }}>
              {isArabic
                ? 'ابق على اطلاع بأحدث المقالات والأخبار حول الأمن السيبراني والحلول الرقمية المتقدمة.'
                : 'Stay up to date with the latest articles and news on cybersecurity and digital transformation.'}
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                border: '4px solid rgba(10, 77, 140, 0.2)',
                borderTopColor: '#0A4D8C',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <style jsx>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : blogPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#666' }}>
              <i className="bx bx-news" style={{ fontSize: '64px', color: '#0A4D8C', opacity: 0.3, marginBottom: '20px' }}></i>
              <p style={{ fontSize: '18px', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
                {isArabic ? 'لا توجد مقالات منشورة حالياً' : 'No published posts yet'}
              </p>
              <Link
                href="/blog"
                className="default-btn"
                style={{
                  display: 'inline-block',
                  marginTop: '20px',
                  padding: '12px 30px'
                }}
              >
                {isArabic ? 'عرض المدونة' : 'View Blog'}
              </Link>
            </div>
          ) : (
            <HorizontalScrollCarousel
              cardWidth={420}
              gap={24}
              showArrows={true}
            >
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  image={post.featured_image || '/img/blog/default.jpg'}
                  alt={isArabic ? post.title_ar : post.title}
                  category={post.category}
                  date={formatDate(post.created_at)}
                  title={isArabic ? post.title_ar : post.title}
                  description={extractDescription(isArabic ? post.content_ar : post.content)}
                  slug={post.slug}
                  isArabic={isArabic}
                />
              ))}
            </HorizontalScrollCarousel>
          )}

          {/* View All Button */}
          {!loading && blogPosts.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Link
                href="/blog"
                className="default-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 35px',
                  fontSize: '16px',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit'
                }}
              >
                {isArabic ? 'عرض جميع المقالات' : 'View All Posts'}
                <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LatesNews;
