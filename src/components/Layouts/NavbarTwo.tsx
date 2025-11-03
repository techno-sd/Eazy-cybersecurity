"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MenuItem from "./MenuItem";
import { menus } from "../../../libs/menus";

const NavbarTwo: React.FC = () => {
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

  return (
    <>
      <header className="header-area fixed-top">
        <div className="nav-area nav-area-three">
          <div id="navbar" className="navbar-area">
            <div className="main-nav">
              <div className="container-fluid">
                <nav className="navbar navbar-expand-md navbar-light">
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

                  <div className="others-option">
                    <div className="call-us">
                      <a href="tel:+892-569-756">
                        <i className="bx bxs-phone-call"></i>
                        +892-569-756
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavbarTwo;
