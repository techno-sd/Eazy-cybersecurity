"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface BlogPreviewProps {
  lang: string;
  t: any;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ lang, t }) => {
  const isArabic = lang === "ar";

  // Sample blog posts - these would typically come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      image: "/img/blog/blog1.jpg",
      title: isArabic ? "أهمية الأمن السيبراني في العصر الرقمي" : "The Importance of Cybersecurity in the Digital Age",
      excerpt: isArabic ? "استكشف لماذا أصبح الأمن السيبراني ضرورة حيوية للشركات في عصر التحول الرقمي." : "Explore why cybersecurity has become a vital necessity for businesses in the digital transformation era.",
      date: isArabic ? "15 مارس 2025" : "March 15, 2025"
    },
    {
      id: 2,
      image: "/img/blog/blog2.jpg",
      title: isArabic ? "الذكاء الاصطناعي وتأثيره على الأعمال" : "AI and Its Impact on Business",
      excerpt: isArabic ? "كيف يغير الذكاء الاصطناعي طريقة عمل الشركات ويعزز الإنتاجية والكفاءة." : "How artificial intelligence is changing the way businesses operate and enhancing productivity and efficiency.",
      date: isArabic ? "10 مارس 2025" : "March 10, 2025"
    },
    {
      id: 3,
      image: "/img/blog/blog3.jpg",
      title: isArabic ? "رؤية 2030 والتحول الرقمي في المملكة" : "Vision 2030 and Digital Transformation in Saudi Arabia",
      excerpt: isArabic ? "نظرة على مبادرات التحول الرقمي في إطار رؤية السعودية 2030 ودور التقنية في تحقيقها." : "An overview of digital transformation initiatives within Saudi Vision 2030 and the role of technology in achieving them.",
      date: isArabic ? "5 مارس 2025" : "March 5, 2025"
    }
  ];

  return (
    <section className="security-area pt-100 pb-70" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #f0f5f9 100%)' }}>
      <div className="container">
        <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ display: 'block', width: '60px', height: '4px', background: 'linear-gradient(90deg, #0A4D8C, #607EAC)', borderRadius: '2px', margin: '0 auto 20px 0' }}></span>
          <span className="sub-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0A4D8C', fontWeight: '600', fontSize: '16px', marginBottom: '12px' }}>
            <i className="bx bx-news"></i>
            {t.home.blog_preview.title}
          </span>
          <h2 className="gradient-text" style={{ fontSize: '42px', fontWeight: '700', marginBottom: '20px' }}>
            {t.home.blog_preview.title}
          </h2>
          <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8', color: '#666' }}>
            {isArabic 
              ? 'استكشف أحدث المقالات والأفكار الثاقبة حول الأمن السيبراني والتحول الرقمي.'
              : 'Explore the latest articles and insights on cybersecurity and digital transformation.'}
          </p>
        </div>

        <div className="row g-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {blogPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6 col-sm-6 reveal-animation">
              <div className="modern-card hover-lift" style={{
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div className="blog-img" style={{ overflow: 'hidden', height: '220px', position: 'relative' }}>
                  <Link href="/blog/details">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={220}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        transition: 'transform 0.4s ease' 
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/img/blog/placeholder.jpg';
                      }}
                    />
                  </Link>
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
                </div>
                <div className="blog-content" style={{ padding: '25px', textAlign: isArabic ? 'right' : 'left', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '13px', color: '#0A4D8C', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <i className="bx bx-calendar"></i>
                    {post.date}
                  </span>
                  <h3 className="gradient-text" style={{ fontSize: '20px', marginBottom: '12px', lineHeight: '1.4', fontWeight: '600', flex: 1 }}>
                    <Link href="/blog/details" style={{ textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.7', marginBottom: '15px', color: '#666' }}>
                    {post.excerpt}
                  </p>
                  <Link href="/blog/details" className="btn-modern" style={{
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
                    {t.home.blog_preview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link href="/blog" className="btn-gradient" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #0A4D8C, #607EAC)',
            color: '#fff'
          }}>
            {t.home.blog_preview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
