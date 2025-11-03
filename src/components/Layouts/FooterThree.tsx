"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const FooterThree: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-style-two-with-color pt-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget-card">
                <Link href="/" className="logo">
                  <Image
                    src="/img/logo.png"
                    alt="Image"
                    width={100}
                    height={39}
                  />
                </Link>

                <p>
                  Lorem ipsum dolor sit amet, consec tetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor
                  sit amet, consec tetur
                </p>

                <ul className="social-links">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank">
                      <i className="bx bxl-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank">
                      <i className="bx bxl-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/" target="_blank">
                      <i className="bx bxl-linkedin-square"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/" target="_blank">
                      <i className="bx bxl-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget-card">
                <h3>Help</h3>

                <ul className="custom-links">
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="#">Return Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions">Termas & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/about">Careers</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget-card">
                <h3>Contacts</h3>

                <ul className="footer-contact-info">
                  <li>
                    <span>Address:</span> 2750 Quadra Street Victoria, Canada.
                  </li>
                  <li>
                    <span>Email:</span>{" "}
                    <a href="mailto:hello@pisa.com">hello@pisa.com</a>
                  </li>
                  <li>
                    <span>Phone:</span>{" "}
                    <a href="tel:+44-587-154756">+44 587 154756</a>
                  </li>
                  <li>
                    <span>Fax:</span>{" "}
                    <a href="tel:+44-785-4578964">+44 785 4578964</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget-card">
                <h3>Newsletter</h3>

                <div className="widget-newsletter-content">
                  <p>Latest resources sent to your inbox weekly</p>
                </div>

                <form className="newsletter-form">
                  <input
                    type="email"
                    className="input-newsletter"
                    placeholder="Email address"
                    name="EMAIL"
                    required
                  />
                  <button type="submit" className="default-btn">
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-style-two-with-color">
          <div className="container">
            <p>
              Copyright <i className="bx bx-copyright"></i>
              {currentYear} Pisa. Designed By{" "}
              <a href="https://envytheme.com/" target="blank">
                EnvyTheme
              </a>
            </p>
            <div className="footer-shape-1">
              <Image
                src="/img/home-7-8-9/footer/footer-shape-1.png"
                alt="image"
                width={240}
                height={336}
              />
            </div>
            <div className="footer-shape-2">
              <Image
                src="/img/home-7-8-9/footer/footer-shape-2.png"
                alt="image"
                width={610}
                height={452}
              />
            </div>
            <div className="lines-line">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterThree;
