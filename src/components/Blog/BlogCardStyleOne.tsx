"use client";
  
import React from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Image from "next/image";

const BlogCardStyleOne: React.FC = () => {
  return (
    <>
      <div className="blog-details-area ptb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              {/* Sidebar */}
              <div className="sidebar-pr-15">
                <Sidebar />
              </div>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="blog-details-desc blog-left-sidebar-area">
                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <div className="single-blog">
                      <Image
                        src="/img/blog/blog1.jpg"
                        alt="Image"
                        width={570}
                        height={600}
                      />

                      <div className="blog-content">
                        <h3>
                          <Link href="/blog/details">Secure Managed IT</Link>
                        </h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolorer
                        </p>

                        <Link href="/blog/details" className="read-more">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <div className="single-blog">
                      <Image
                        src="/img/blog/blog2.jpg"
                        alt="Image"
                        width={570}
                        height={600}
                      />

                      <div className="blog-content">
                        <h3>
                          <Link href="/blog/details">Cloud Security</Link>
                        </h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolorer
                        </p>

                        <Link href="/blog/details" className="read-more">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <div className="single-blog">
                      <Image
                        src="/img/blog/blog3.jpg"
                        alt="Image"
                        width={570}
                        height={600}
                      />

                      <div className="blog-content">
                        <h3>
                          <Link href="/blog/details">Secure Managed IT</Link>
                        </h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolorer
                        </p>

                        <Link href="/blog/details" className="read-more">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <div className="single-blog">
                      <Image
                        src="/img/blog/blog4.jpg"
                        alt="Image"
                        width={570}
                        height={600}
                      />

                      <span>Cyber Security</span>
                      <div className="blog-content">
                        <div className="date">
                          <i className="bx bx-calendar"></i>
                          Jun 20 2024
                        </div>

                        <h3>
                          <Link href="/blog/details">
                            DHS issues emergency directive to prevent hacking
                            attack
                          </Link>
                        </h3>

                        <Link href="/blog/details" className="read-more">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <div className="single-blog">
                      <Image
                        src="/img/blog/blog5.jpg"
                        alt="Image"
                        width={570}
                        height={600}
                      />

                      <span>Cyber Crime</span>
                      <div className="blog-content">
                        <div className="date">
                          <i className="bx bx-calendar"></i>
                          Jun 21 2024
                        </div>

                        <h3>
                          <Link href="/blog/details">
                            Drughydrus add google drive to roughrobin torjan
                          </Link>
                        </h3>

                        <Link href="/blog/details" className="read-more">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <div className="single-blog">
                      <Image
                        src="/img/blog/blog6.jpg"
                        alt="Image"
                        width={570}
                        height={600}
                      />

                      <span>Hacking Protection</span>
                      <div className="blog-content">
                        <div className="date">
                          <i className="bx bx-calendar"></i>
                          Jun 22 2024
                        </div>

                        <h3>
                          <Link href="/blog/details">
                            Security in a fragment world of workload
                          </Link>
                        </h3>

                        <Link href="/blog/details" className="read-more">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCardStyleOne;
