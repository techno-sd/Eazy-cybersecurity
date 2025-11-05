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
  return (
    <>
      <section className="blog-area ptb-100">
        <div className="container">
          <div className="section-title">
            <h2>{lang === 'ar' ? 'آخر الأخبار والمقالات' : 'Latest News From Blog'}</h2>
            <p>
              {lang === 'ar'
                ? 'تابع أحدث المقالات والأخبار حول الأمن السيبراني والتحول الرقمي.'
                : 'Stay up to date with the latest articles and news on cybersecurity and digital transformation.'}
            </p>
          </div>

          <div className="row">
            {posts.map((post, idx) => (
              <div className="col-lg-4 col-sm-6" key={idx}>
                <div className="single-blog">
                  <Image
                    src={post.img}
                    alt="Image"
                    width={570}
                    height={600}
                  />
                  <span>{post.category}</span>
                  <div className="blog-content">
                    <div className="date">
                      <i className="bx bx-calendar"></i>
                      {post.date}
                    </div>
                    <h3>
                      <Link href={post.link}>{post.title}</Link>
                    </h3>
                    <p>{post.desc}</p>
                    <Link href={post.link} className="read-more">
                      {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="col-lg-12">
              <div className="page-navigation-area">
                <ul className="pagination">
                  <li className="page-item">
                    <Link href="#" className="page-link page-links">
                      <i className="bx bx-chevrons-left"></i>
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link href="#" className="page-link">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link href="#" className="page-link">
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
