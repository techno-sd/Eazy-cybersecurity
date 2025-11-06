"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { getMessages } from "@/i18n";

const blogPosts = {
  en: [
    {
      img: "/img/blog/blog1.jpg",
      category: "Cyber Security",
      date: "Jun 20 2024",
      title: "Secure Managed IT",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer",
      link: "/blog/details",
    },
    {
      img: "/img/blog/blog2.jpg",
      category: "Cloud Security",
      date: "Jun 21 2024",
      title: "Cloud Security",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer",
      link: "/blog/details",
    },
    {
      img: "/img/blog/blog3.jpg",
      category: "Hacking Protection",
      date: "Jun 22 2024",
      title: "Security in a fragment world of workload",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer",
      link: "/blog/details",
    },
    {
      img: "/img/blog/blog4.jpg",
      category: "Cyber Crime",
      date: "Jun 23 2024",
      title: "Drughydrus add google drive to roughrobin torjan",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolorer",
      link: "/blog/details",
    },
  ],
  ar: [
    {
      img: "/img/blog/blog1.jpg",
      category: "الأمن السيبراني",
      date: "٢٠ يونيو ٢٠٢٤",
      title: "إدارة تقنية المعلومات الآمنة",
      desc: "لوريم إيبسوم هو نص تجريبي يستخدم في التصميم، هنا وصف مختصر للمقال باللغة العربية.",
      link: "/blog/details",
    },
    {
      img: "/img/blog/blog2.jpg",
      category: "أمن السحابة",
      date: "٢١ يونيو ٢٠٢٤",
      title: "أمن السحابة",
      desc: "لوريم إيبسوم هو نص تجريبي يستخدم في التصميم، هنا وصف مختصر للمقال باللغة العربية.",
      link: "/blog/details",
    },
    {
      img: "/img/blog/blog3.jpg",
      category: "حماية من الاختراق",
      date: "٢٢ يونيو ٢٠٢٤",
      title: "الأمان في عالم مجزأ من أعباء العمل",
      desc: "لوريم إيبسوم هو نص تجريبي يستخدم في التصميم، هنا وصف مختصر للمقال باللغة العربية.",
      link: "/blog/details",
    },
    {
      img: "/img/blog/blog4.jpg",
      category: "جرائم إلكترونية",
      date: "٢٣ يونيو ٢٠٢٤",
      title: "إضافة Google Drive إلى Trojan RoughRobin",
      desc: "لوريم إيبسوم هو نص تجريبي يستخدم في التصميم، هنا وصف مختصر للمقال باللغة العربية.",
      link: "/blog/details",
    },
  ],
};

const BlogGrid: React.FC = () => {
  const { lang } = useLang();
  const t = getMessages(lang);
  const posts = blogPosts[lang] || blogPosts.en;
  const isArabic = lang === 'ar';

  return (
    <>
      <section className="blog-area ptb-100" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}>
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ display: 'block', width: '60px', height: '4px', background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', borderRadius: '2px', margin: '0 auto 20px 0' }}></span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0A4D8C', fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>
              <i className="bx bx-news"></i>
              {isArabic ? 'آخر الأخبار' : 'Latest News'}
            </span>
            <h2 className="gradient-text" style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px' }}>
              {isArabic ? 'آخر الأخبار والمقالات' : 'Latest News From Blog'}
            </h2>
            <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', color: '#666' }}>
              {isArabic
                ? 'تابع أحدث المقالات والأخبار حول الأمن السيبراني والتحول الرقمي.'
                : 'Stay up to date with the latest articles and news on cybersecurity and digital transformation.'}
            </p>
          </div>

          <div className="row g-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {posts.map((post, idx) => (
              <div className="col-lg-4 col-sm-6 reveal-animation" key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="modern-card hover-lift" style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
                    <Image
                      src={post.img}
                      alt={post.title}
                      width={570}
                      height={600}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.1) 0%, rgba(96, 126, 172, 0.1) 100%)',
                      opacity: '0',
                      transition: 'opacity 0.3s ease'
                    }} className="gradient-overlay-hover"></div>
                    <span className="modern-badge" style={{
                      position: 'absolute',
                      top: '15px',
                      right: isArabic ? 'auto' : '15px',
                      left: isArabic ? '15px' : 'auto',
                      zIndex: '10'
                    }}>
                      {post.category}
                    </span>
                  </div>
                  <div className="blog-content" style={{ padding: '25px', textAlign: isArabic ? 'right' : 'left', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '13px', color: '#0A4D8C', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <i className="bx bx-calendar"></i>
                      {post.date}
                    </div>
                    <h3 className="gradient-text" style={{ fontSize: '20px', marginBottom: '12px', lineHeight: '1.4', fontWeight: '600', flex: 1 }}>
                      <Link href={post.link} style={{ textDecoration: 'none' }}>{post.title}</Link>
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>
                      {post.desc}
                    </p>
                    <Link href={post.link} className="btn-modern" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                      color: '#fff',
                      fontWeight: '600',
                      fontSize: '13px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      width: 'fit-content'
                    }}>
                      {isArabic ? 'اقرأ المزيد' : 'Read More'}
                      <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="col-lg-12">
              <div className="page-navigation-area">
                <ul className="pagination" style={{ justifyContent: 'center', gap: '8px' }}>
                  <li className="page-item">
                    <Link href="#" className="page-link page-links" style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: '#f0f0f0',
                      transition: 'all 0.3s ease'
                    }}>
                      <i className="bx bx-chevrons-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link href="#" className="page-link" style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                      color: '#fff',
                      transition: 'all 0.3s ease'
                    }}>
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link" style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: '#f0f0f0',
                      transition: 'all 0.3s ease'
                    }}>
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link" style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: '#f0f0f0',
                      transition: 'all 0.3s ease'
                    }}>
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link" style={{
                      padding: '10px 14px',
                      borderRadius: '6px',
                      background: '#f0f0f0',
                      transition: 'all 0.3s ease'
                    }}>
                      <i className="bx bx-chevrons-right"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogGrid;
