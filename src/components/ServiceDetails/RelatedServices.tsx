"use client";
  
import React from "react";
import Link from "next/link";

const RelatedServices: React.FC = () => {
  return (
    <>
      <h3 className="services-related-post">Related Post</h3>
      <div className="row">
        <div className="col-lg-6 col-sm-6">
          <div
            className="single-solutions mb-0 mb-ud"
            style={{
              backgroundImage: `url(/img/solution/solution-img1.jpg)`,
            }}
          >
            <div className="solutions-content">
              <h3>Secure Managed IT</h3>
              <p>
                Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do
              </p>

              <Link href="/services/details" className="read-more">
                Read More
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-sm-6">
          <div
            className="single-solutions mb-0"
            style={{
              backgroundImage: `url(/img/solution/solution-img2.jpg)`,
            }}
          >
            <div className="solutions-content">
              <h3>Compliance</h3>
              <p>
                Lorem ipsum dolor sit amet sed, consectetur adipiscing elit do
              </p>

              <Link href="/services/details" className="read-more">
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedServices;
