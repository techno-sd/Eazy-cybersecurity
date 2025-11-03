"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const FooterTwo: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-area pt-100 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <Link href="/" className="logo">
                  <Image
                    src="/img/logo-black.png"
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

                <ul className="social-icon">
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

            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <h3>Help</h3>

                <ul className="import-link">
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

            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <h3>Services Link</h3>

                <ul className="import-link">
                  <li>
                    <Link href="/services/details">Threat Hunter</Link>
                  </li>
                  <li>
                    <Link href="/services/details">Incident Responder</Link>
                  </li>
                  <li>
                    <Link href="/services/details">Secure Managed IT</Link>
                  </li>
                  <li>
                    <Link href="/services/details">Compliance</Link>
                  </li>
                  <li>
                    <Link href="/services/details">Cyber Security</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <h3>Contacts</h3>

                <ul className="address">
                  <li className="location">
                    <span>Address:</span>
                    2750 Quadra Street Victoria, Canada.
                  </li>
                  <li>
                    <span>Email:</span>
                    <a href="mailto:hello@pisa.com">hello@pisa.com</a>
                  </li>
                  <li>
                    <span>Phone:</span>
                    <a href="tel:+44-587-154756">+44 587 154756</a>
                  </li>
                  <li>
                    <span>Fax:</span>
                    <a href="tel:+44-785-4578964">+44 785 4578964</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copy-right-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <p>
                Copyright <i className="bx bx-copyright"></i>
                {currentYear} Pisa. Designed By{" "}
                <a href="https://envytheme.com/" target="blank">
                  EnvyTheme
                </a>
              </p>
            </div>

            <div className="col-lg-6 col-md-6">
              <ul className="footer-menu">
                <li>
                  <Link href="/privacy-policy" target="_blank">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-conditions" target="_blank">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterTwo;
