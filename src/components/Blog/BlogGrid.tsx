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
      <section className="blog-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%)' }}>
        <div className="container">
          <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ 
              display: 'block', 
              width: '60px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', 
              borderRadius: '2px', 
              margin: isArabic ? '0 0 20px auto' : '0 auto 20px 0'
            }}></span>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: '#0A4D8C', 
              fontWeight: '600', 
              fontSize: '16px', 
              marginBottom: '12px',
              letterSpacing: '0.5px'
            }}>
              <i className="bx bx-news"></i>
              {isArabic ? 'آخر الأخبار' : 'Latest Updates'}
            </span>
            <h2 className="gradient-text" style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px', lineHeight: '1.3' }}>
              {isArabic ? 'آخر الأخبار والمقالات' : 'Insights & Resources'}
            </h2>
            <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', color: '#555' }}>
              {isArabic
                ? 'تابع أحدث المقالات والأخبار حول الأمن السيبراني والتحول الرقمي'
                : 'Expert insights, industry trends, and best practices in cybersecurity'}
            </p>
          </div>

          <div className="row g-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            {posts.map((post, idx) => (
              <div className="col-lg-4 col-sm-6 reveal-animation" key={idx} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="modern-card hover-lift" style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#fff',
                  boxShadow: '0 5px 25px rgba(10, 77, 140, 0.08)',
                  border: '1px solid rgba(10, 77, 140, 0.08)'
                }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '240px' }}>
                    <Image
                      src={post.img}
                      alt={post.title}
                      width={570}
                      height={600}
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
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.95), rgba(96, 126, 172, 0.95))',
                      backdropFilter: 'blur(10px)',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '8px',
                      zIndex: '10',
                      boxShadow: '0 4px 15px rgba(10, 77, 140, 0.3)',
                      letterSpacing: '0.3px'
                    }}>
                      {post.category}
                    </span>
                  </div>
                  <div className="blog-content" style={{ 
                    padding: '28px', 
                    textAlign: isArabic ? 'right' : 'left', 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#0A4D8C', 
                      fontWeight: '600', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      letterSpacing: '0.3px'
                    }}>
                      <i className="bx bx-calendar" style={{ fontSize: '16px' }}></i>
                      {post.date}
                    </div>
                    <h3 style={{ 
                      fontSize: '20px', 
                      marginBottom: '0', 
                      lineHeight: '1.5', 
                      fontWeight: '700',
                      flex: 1,
                      minHeight: '60px'
                    }}>
                      <Link 
                        href={post.link} 
                        className="gradient-text-hover"
                        style={{ 
                          textDecoration: 'none',
                          color: '#1a1a1a',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p style={{ 
                      fontSize: '14.5px', 
                      color: '#666', 
                      lineHeight: '1.7', 
                      marginBottom: '0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.desc}
                    </p>
                    <Link href={post.link} className="btn-modern-outlined" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: '2px solid #0A4D8C',
                      color: '#0A4D8C',
                      background: 'transparent',
                      fontWeight: '600',
                      fontSize: '13px',
                      textDecoration: 'none',
                      transition: 'all 0.4s ease',
                      width: '100%',
                      marginTop: 'auto',
                      letterSpacing: '0.5px'
                    }}>
                      {isArabic ? 'اقرأ المزيد' : 'Read More'}
                      <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`} style={{ fontSize: '18px', transition: 'transform 0.3s ease' }}></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="col-lg-12">
              <div className="page-navigation-area" style={{ marginTop: '50px' }}>
                <ul className="pagination" style={{ 
                  justifyContent: 'center', 
                  gap: '10px',
                  direction: isArabic ? 'rtl' : 'ltr',
                  display: 'flex',
                  flexWrap: 'wrap',
                  padding: '0',
                  margin: '0',
                  listStyle: 'none'
                }}>
                  <li className="page-item">
                    <Link href="#" className="page-link page-links" style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#fff',
                      border: '2px solid #e0e0e0',
                      transition: 'all 0.3s ease',
                      color: '#0A4D8C',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '48px',
                      boxShadow: '0 2px 8px rgba(10, 77, 140, 0.08)'
                    }}>
                      <i className="bx bx-chevrons-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link href="#" className="page-link" style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
                      border: '2px solid #0A4D8C',
                      color: '#fff',
                      transition: 'all 0.3s ease',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '48px',
                      boxShadow: '0 4px 15px rgba(10, 77, 140, 0.25)'
                    }}>
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link" style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#fff',
                      border: '2px solid #e0e0e0',
                      transition: 'all 0.3s ease',
                      color: '#333',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '48px',
                      boxShadow: '0 2px 8px rgba(10, 77, 140, 0.08)'
                    }}>
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link" style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#fff',
                      border: '2px solid #e0e0e0',
                      transition: 'all 0.3s ease',
                      color: '#333',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '48px',
                      boxShadow: '0 2px 8px rgba(10, 77, 140, 0.08)'
                    }}>
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link" style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#fff',
                      border: '2px solid #e0e0e0',
                      transition: 'all 0.3s ease',
                      color: '#0A4D8C',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '48px',
                      boxShadow: '0 2px 8px rgba(10, 77, 140, 0.08)'
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
