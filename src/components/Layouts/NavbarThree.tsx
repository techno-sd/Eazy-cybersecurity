"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import TopHeaderTwo from "./TopHeaderTwo";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { menus } from "../../../libs/menus";

const NavbarThree: React.FC = () => {
  const [menu, setMenu] = useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId?.classList.add("is-sticky");
      } else {
        elementId?.classList.remove("is-sticky");
      }
    });
  });

  const classOne = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  // Search Modal
  const [isActiveSearchModal, setActiveSearchModal] = useState(true);
  const handleToggleSearchModal = () => {
    setActiveSearchModal(!isActiveSearchModal);
  };

  return (
    <>
      <header className="header-area-six fixed-top">
        {/* TopHeader */}
        <TopHeaderTwo />

        <div className="nav-area-six">
          <div id="navbar" className="navbar-area">
            <div className="main-nav">
              <div className="container-fluid">
                <nav className="navbar navbar-expand-md navbar-light">
                  <Link href="/" className="navbar-brand">
                    <Image
                      src="/img/logo-black.png"
                      alt="logo"
                      width={100}
                      height={39}
                    />
                  </Link>

                  <button
                    onClick={toggleNavbar}
                    className={classTwo}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="icon-bar top-bar"></span>
                    <span className="icon-bar middle-bar"></span>
                    <span className="icon-bar bottom-bar"></span>
                  </button>

                  <div className={classOne} id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                      {menus.map((menuItem) => (
                        <MenuItem key={menuItem.label} {...menuItem} />
                      ))}
                    </ul>
                  </div>

                  <div className="others-option">
                    <div className="sidebar-menu">
                      <div
                        className="burger-menu"
                        onClick={handleToggleSearchModal}
                      >
                        <i className='bx bx-menu-alt-right'></i>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Modal */}
      <div className={`sidebar-modal ${isActiveSearchModal ? "" : "active"}`}>
        <div className="sidebar-modal-inner">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <Image
                src="/img/logo-black.png"
                alt="Image"
                width={100}
                height={39}
              />
            </div>

            <span
              className="close-btn sidebar-modal-close-btn"
              onClick={handleToggleSearchModal}
            >
              <i className="bx bx-x"></i>
            </span>
          </div>

          <div className="sidebar-about">
            <div className="title">
              <p>
                Pisa is a high quality video production house. We make a awesome
                branded videos. It is the analogical of film making, but the
                images are digitally recorded instead of film stock.
              </p>
            </div>
          </div>

          <div className="contact-us">
            <h3>Contact Us</h3>

            <ul>
              <li>
                <i className="bx bx-location-plus"></i>
                2750 Quadra Street Victoria,
              </li>
              <li>
                <i className="bx bx-envelope"></i>
                <a href="mailto:hello@pisa.com">hello@pisa.com</a>
                <a href="mailto:info@pisa.com">info@pisa.com</a>
              </li>
              <li>
                <i className="bx bx-phone-call"></i>
                <a href="tel:+44-458-895-456">+44 458 895 456</a>
                <a href="tel:+44-458-895-455">+44 458 895 455</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-follow-us">
            <h3>Sidebar Follow</h3>

            <ul className="social-wrap">
              <li>
                <a href="https://www.twitter.com/" target="_blank">
                  <i className="bx bxl-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/" target="_blank">
                  <i className="bx bxl-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/" target="_blank">
                  <i className="bx bxl-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/" target="_blank">
                  <i className="bx bxl-youtube"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarThree;
