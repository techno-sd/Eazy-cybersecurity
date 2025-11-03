"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const ProtectYourWebsite: React.FC = () => {
  return (
    <>
      <div className="manual-area bg-color ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="manual-img">
                <Image
                  src="/img/manual-img.png"
                  alt="Image"
                  width={662}
                  height={597}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="manual-content mr-auto ml-0">
                <h2>How to Protect Your Website: The Manual Way</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse.
                </p>

                <div className="row">
                  <div className="col-lg-6 col-sm-6">
                    <ul className="cybersecurity-item">
                      <li>
                        <i className="bx bx-check"></i>
                        Managed Web Application
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        SIEM Threat Detection
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Content Delivery Network
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Website Hack Repair
                      </li>
                    </ul>
                  </div>

                  <div className="col-lg-6 col-sm-6">
                    <ul>
                      <li>
                        <i className="bx bx-check"></i>
                        Instant Malware Removal
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Instant Malware Removal
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Instant Malware Removal
                      </li>
                      <li>
                        <i className="bx bx-check"></i>
                        Instant Malware Removal
                      </li>
                    </ul>
                  </div>
                </div>

                <Link href="/services/details" className="default-btn mt-30">
                  Know Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectYourWebsite;
