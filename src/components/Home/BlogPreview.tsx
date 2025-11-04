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
    <section className="security-area pt-100 pb-70" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="section-title" style={{ direction: isArabic ? 'rtl' : 'ltr', textAlign: 'center' }}>
          <span className="sub-title">
            <i className="bx bx-news"></i>
            {t.home.blog_preview.title}
          </span>
          <h2>{t.home.blog_preview.title}</h2>
        </div>

        <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
          {blogPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-blog" style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                marginBottom: '30px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}>
                <div className="blog-img" style={{ overflow: 'hidden', height: '220px', position: 'relative' }}>
                  <Link href="/blog/details">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={220}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/img/blog/placeholder.jpg';
                      }}
                    />
                  </Link>
                </div>
                <div className="blog-content" style={{ padding: '25px', textAlign: isArabic ? 'right' : 'left' }}>
                  <span style={{ fontSize: '13px', color: '#999', display: 'block', marginBottom: '10px' }}>
                    <i className="bx bx-calendar" style={{ marginRight: isArabic ? '0' : '5px', marginLeft: isArabic ? '5px' : '0' }}></i>
                    {post.date}
                  </span>
                  <h3 style={{ fontSize: '20px', marginBottom: '12px', lineHeight: '1.4' }}>
                    <Link href="/blog/details" style={{ color: '#252525', transition: 'color 0.3s ease' }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.7', marginBottom: '15px', color: '#666' }}>
                    {post.excerpt}
                  </p>
                  <Link href="/blog/details" style={{ color: '#0A4D8C', fontWeight: '600', fontSize: '14px' }}>
                    {t.home.blog_preview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link href="/blog" className="default-btn">
            {t.home.blog_preview.button} <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
