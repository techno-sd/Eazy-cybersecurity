"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const WhyChooseUsStyleTwo: React.FC = () => {
  return (
    <>
      <section className="choose-area-four ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="choose-img">
                <Image
                  src="/img/choose-img.png"
                  alt="Image"
                  width={655}
                  height={430}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="choose-wrap p-0">
                <h2>Why Choose Us</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel.
                </p>

                <ul className="mt-30">
                  <li>
                    <i className="bx bx-check"></i>
                    Extemly low response time at all time
                  </li>
                  <li>
                    <i className="bx bx-check"></i>
                    We are always ready for your growth
                  </li>
                  <li>
                    <i className="bx bx-check"></i>
                    We understand security and compliance
                  </li>
                </ul>

                <Link href="/about" className="default-btn mt-30">
                  Know Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUsStyleTwo;
