"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const LatesNews: React.FC = () => {
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

                <div className="blog-content">
                  <h3>
                    <Link href="/blog/details">Secure Managed IT</Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolorer
                  </p>

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

                <div className="blog-content">
                  <h3>
                    <Link href="/blog/details">Cloud Security</Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolorer
                  </p>

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

                <div className="blog-content">
                  <h3>
                    <Link href="/blog/details">Secure Managed Web</Link>
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolorer
                  </p>

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

export default LatesNews;
