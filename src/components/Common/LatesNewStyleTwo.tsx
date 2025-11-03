"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const LatesNewStyleTwo: React.FC = () => {
  return (
    <>
      <section className="blog-area pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Latest News From Blog</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Doloribus quam neque quibusdam corrupti aspernatur corporis alias
              nisi dolorum expedita veritatis voluptates minima.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <div className="single-blog">
                <Image
                  src="/img/blog/blog1.jpg"
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
                      DHS issues emergency directive to prevent hacking attack
                    </Link>
                  </h3>

                  <Link href="/blog/details" className="read-more">
                    Read More
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="single-blog">
                <Image
                  src="/img/blog/blog2.jpg"
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

            <div className="col-lg-4 col-sm-6">
              <div className="single-blog">
                <Image
                  src="/img/blog/blog3.jpg"
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
          </div>
        </div>
      </section>
    </>
  );
};

export default LatesNewStyleTwo;
