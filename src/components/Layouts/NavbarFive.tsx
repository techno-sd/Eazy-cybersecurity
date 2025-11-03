"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { menus } from "../../../libs/menus";

const NavbarFive: React.FC = () => {
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
      <div className="seku-new-nav-area nav-with-black-color">
        <div id="navbar" className="navbar-area">
          <div className="main-nav">
            <nav className="navbar navbar-expand-md navbar-light">
              <div className="container-fluid">
                <Link href="/" className="navbar-brand">
                  <Image
                    src="/img/logo.png"
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

                <div className="others-option d-flex align-items-center">
                  <div className="option-item">
                    <i
                      className="search-btn bx bx-search"
                      onClick={handleToggleSearchModal}
                    ></i>
                  </div>

                  <div className="option-item">
                    <Link href="/contact" className="default-btn">
                      Get A Free Quote
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div
        className={`search-overlay ${
          isActiveSearchModal ? "" : "search-overlay-active"
        }`}
      >
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>

            <div
              className="search-overlay-close"
              onClick={handleToggleSearchModal}
            >
              <span className="search-overlay-close-line"></span>
              <span className="search-overlay-close-line"></span>
            </div>

            <div className="search-overlay-form">
              <form>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Enter your keywords..."
                />
                <button type="submit">
                  <i className="ri-search-line"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarFive;
