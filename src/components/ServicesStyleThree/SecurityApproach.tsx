"use client";
  
import React from "react";
import Image from "next/image";

const SecurityApproach: React.FC = () => {
  return (
    <>
      <section className="approach-area pt-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="approach-img">
                <Image
                  src="/img/approach-img.jpg"
                  alt="Image"
                  width={660}
                  height={700}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="approach-content">
                <h2>Our Approach To Security</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsumv
                </p>

                <ul>
                  <li>
                    <i className="flaticon-cyber"></i>
                    <h3>Secure by Design</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut suspendisse ultrices
                    </p>
                  </li>
                  <li>
                    <i className="flaticon-cyber-security"></i>
                    <h3>Compliant by Design</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut suspendisse ultrices
                    </p>
                  </li>
                  <li>
                    <i className="flaticon-profile"></i>
                    <h3>Continuous Monitoring</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut suspendisse ultrices
                    </p>
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

export default SecurityApproach;
