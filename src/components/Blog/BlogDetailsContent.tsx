"use client";
  
import React from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

const BlogDetailsContent: React.FC = () => {
  const { lang } = useLang();
  const isArabic = lang === 'ar';
  
  return (
    <>
      <section className="blog-details-area ptb-100" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
            <div className="col-lg-8 col-md-12">
              <div className="blog-details-desc" style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                padding: '40px',
                boxShadow: '0 5px 25px rgba(10, 77, 140, 0.08)',
                border: '1px solid rgba(10, 77, 140, 0.08)'
              }}>
                <div className="article-content">
                  <h3 style={{ 
                    fontSize: '32px', 
                    fontWeight: '700', 
                    marginBottom: '20px', 
                    lineHeight: '1.4',
                    color: '#1a1a1a'
                  }}>
                    {isArabic 
                      ? 'وزارة الأمن الداخلي تصدر توجيهًا طارئًا لمنع هجوم القرصنة'
                      : 'DHS Issues Emergency Directive To Prevent Hacking Attack'}
                  </h3>

                  <div className="entry-meta" style={{ 
                    marginBottom: '30px',
                    padding: '20px',
                    background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05), rgba(96, 126, 172, 0.05))',
                    borderRadius: '12px',
                    border: '1px solid rgba(10, 77, 140, 0.1)'
                  }}>
                    <ul style={{ 
                      display: 'flex', 
                      gap: '30px', 
                      flexWrap: 'wrap',
                      margin: '0',
                      padding: '0',
                      listStyle: 'none'
                    }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="bx bx-calendar" style={{ color: '#0A4D8C', fontSize: '18px' }}></i>
                        <span style={{ fontWeight: '600', color: '#333', marginRight: isArabic ? '0' : '5px', marginLeft: isArabic ? '5px' : '0' }}>
                          {isArabic ? 'نُشر في:' : 'Posted On:'}
                        </span>
                        <Link href="#" style={{ color: '#0A4D8C', textDecoration: 'none', fontWeight: '500' }}>
                          {isArabic ? '١٩ مايو ٢٠٢٤' : 'May 19, 2024'}
                        </Link>
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="bx bx-user" style={{ color: '#0A4D8C', fontSize: '18px' }}></i>
                        <span style={{ fontWeight: '600', color: '#333', marginRight: isArabic ? '0' : '5px', marginLeft: isArabic ? '5px' : '0' }}>
                          {isArabic ? 'بواسطة:' : 'Posted By:'}
                        </span>
                        <Link href="#" style={{ color: '#0A4D8C', textDecoration: 'none', fontWeight: '500' }}>
                          {isArabic ? 'جون أندرسون' : 'John Anderson'}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="article-image" style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden' }}>
                    <Image
                      src="/img/blog-details/blog-details.jpg"
                      alt="image"
                      width={900}
                      height={600}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '20px', textAlign: isArabic ? 'right' : 'left' }}>
                    {isArabic
                      ? 'هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها.'
                      : 'Quuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quia non numquam eius modi tempora incidunt ut labore et dolore magnam dolor sit, consectetur qui ratione voluptatem sequi.'}
                  </p>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '30px', textAlign: isArabic ? 'right' : 'left' }}>
                    {isArabic
                      ? 'ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام هنا يوجد محتوى نصي، هنا يوجد محتوى نصي فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.'
                      : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat labore et dolore magna aliqua.'}
                  </p>

                  <blockquote style={{ 
                    margin: '40px 0',
                    padding: '30px 30px 30px 60px',
                    background: 'linear-gradient(135deg, rgba(10, 77, 140, 0.05), rgba(96, 126, 172, 0.05))',
                    borderLeft: isArabic ? 'none' : '5px solid #0A4D8C',
                    borderRight: isArabic ? '5px solid #0A4D8C' : 'none',
                    borderRadius: '12px',
                    position: 'relative',
                    fontStyle: 'italic'
                  }}>
                    <i className="flaticon-quote bx bxs-quote-alt-left" style={{ 
                      position: 'absolute',
                      top: '30px',
                      left: isArabic ? 'auto' : '20px',
                      right: isArabic ? '20px' : 'auto',
                      fontSize: '40px',
                      color: '#0A4D8C',
                      opacity: '0.3'
                    }}></i>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', marginBottom: '0', textAlign: isArabic ? 'right' : 'left' }}>
                      {isArabic
                        ? 'الأمن السيبراني ليس مجرد تقنية، بل هو استراتيجية شاملة لحماية الأصول الرقمية والبيانات الحساسة من التهديدات المتطورة.'
                        : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus aliquid praesentium eveniet illum asperiores, quidem, ipsum voluptatum numquam ducimus nisi exercitationem dolorum facilis Repellendus aliquid praesentium eveniet illum asperiores.'}
                    </p>
                  </blockquote>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '20px', textAlign: isArabic ? 'right' : 'left' }}>
                    {isArabic
                      ? 'العديد من برامج النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل افتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث.'
                      : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                  </p>

                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', marginBottom: '30px', textAlign: isArabic ? 'right' : 'left' }}>
                    {isArabic
                      ? 'على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.'
                      : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.'}
                  </p>
                </div>

                <div className="article-footer">
                  <div className="article-tags">
                    <span>
                      <i className="bx bx-share-alt"></i>
                    </span>

                    <a href="#">{isArabic ? 'مشاركة' : 'Share'}</a>
                  </div>

                  <div className="article-share">
                    <ul className="social">
                      <li>
                        <a href="https://facebook.com/" target="_blank">
                          <i className="bx bxl-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/" target="_blank">
                          <i className="bx bxl-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com/" target="_blank">
                          <i className="bx bxl-linkedin"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://pinterest.com/" target="_blank">
                          <i className="bx bxl-pinterest-alt"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="post-navigation">
                  <div className="navigation-links">
                    <div className="nav-previous">
                      <Link href="#">
                        <i className={`bx ${isArabic ? 'bx-right-arrow-alt' : 'bx-left-arrow-alt'}`}></i> 
                        {isArabic ? 'المقال السابق' : 'Prev Post'}
                      </Link>
                    </div>

                    <div className="nav-next">
                      <Link href="#">
                        {isArabic ? 'المقال التالي' : 'Next Post'} 
                        <i className={`bx ${isArabic ? 'bx-left-arrow-alt' : 'bx-right-arrow-alt'}`}></i>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="comments-area">
                  <h3 className="comments-title">3 Comments:</h3>

                  <ol className="comment-list">
                    <li className="comment">
                      <div className="comment-body">
                        <footer className="comment-meta">
                          <div className="comment-author vcard">
                            <Image
                              src="/img/blog-details/comment-img-1.jpg"
                              className="avatar"
                              alt="image"
                              width={70}
                              height={70}
                            />
                            <b className="fn">Jimy Pearson</b>
                            <span className="says">says:</span>
                          </div>

                          <div className="comment-metadata">
                            <span>Jun 24, 2024 at 10:59 am</span>
                          </div>
                        </footer>

                        <div className="comment-content">
                          <p>
                            Lorem Ipsum has been the industry’s standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type.
                          </p>
                        </div>

                        <div className="reply">
                          <Link href="#" className="comment-reply-link">
                            Reply
                          </Link>
                        </div>
                      </div>

                      <ol className="children">
                        <li className="comment">
                          <div className="comment-body">
                            <footer className="comment-meta">
                              <div className="comment-author vcard">
                                <Image
                                  src="/img/blog-details/comment-img-2.jpg"
                                  className="avatar"
                                  alt="image"
                                  width={70}
                                  height={70}
                                />
                                <b className="fn">Karl Mekar</b>
                                <span className="says">says:</span>
                              </div>

                              <div className="comment-metadata">
                                <span>Jun 24, 2024 at 10:59 am</span>
                              </div>
                            </footer>

                            <div className="comment-content">
                              <p>
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae
                                ab illo inventore veritatis et quasi architecto
                                beatae vitae dicta sunt explicabo. Nemo enim
                              </p>
                            </div>

                            <div className="reply">
                              <Link href="#" className="comment-reply-link">
                                Reply
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ol>
                    </li>

                    <li className="comment">
                      <div className="comment-body border-none">
                        <footer className="comment-meta">
                          <div className="comment-author vcard">
                            <Image
                              src="/img/blog-details/comment-img-3.jpg"
                              className="avatar"
                              alt="image"
                              width={70}
                              height={70}
                            />
                            <b className="fn">Tesa Jack</b>
                            <span className="says">says:</span>
                          </div>

                          <div className="comment-metadata">
                            <span>Jun 24, 2024 at 10:59 am</span>
                          </div>
                        </footer>

                        <div className="comment-content">
                          <p>
                            Lorem Ipsum has been the industry’s standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type.
                          </p>
                        </div>

                        <div className="reply">
                          <Link href="#" className="comment-reply-link">
                            Reply
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ol>

                  <div className="comment-respond">
                    <h3 className="comment-reply-title">Leave a Reply</h3>

                    <form className="comment-form">
                      <p className="comment-notes">
                        <span id="email-notes">
                          Your email address will not be published.
                        </span>
                        Required fields are marked
                        <span className="required">*</span>
                      </p>

                      <p className="comment-form-author">
                        <label>
                          Name <span className="required">*</span>
                        </label>
                        <input type="text" id="author" name="author" required />
                      </p>

                      <p className="comment-form-email">
                        <label>
                          Email <span className="required">*</span>
                        </label>
                        <input type="email" id="email" name="email" required />
                      </p>

                      <p className="comment-form-url">
                        <label>Website</label>
                        <input type="url" id="url" name="url" />
                      </p>

                      <p className="comment-form-comment">
                        <label>Comment</label>
                        <textarea
                          name="comment"
                          id="comment"
                          cols={45}
                          rows={5}
                          required
                        ></textarea>
                      </p>

                      <p className="form-submit">
                        <input
                          type="submit"
                          name="submit"
                          id="submit"
                          className="submit"
                          value="Post A Comment"
                        />
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12">
              {/* Sidebar */}
              <div className="blog-right-sidebar sidebar-pl-15">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsContent;
