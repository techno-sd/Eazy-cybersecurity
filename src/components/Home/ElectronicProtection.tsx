"use client";
  
import React from "react";
import Link from "next/link";
import Image from "next/image";

const ElectronicProtection: React.FC = () => {
  const openTabSection = (evt: React.MouseEvent<HTMLLIElement>, tabName: string) => {
    let i: number;
    let tabcontent: HTMLCollectionOf<Element> = document.getElementsByClassName("tabs_item");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }

    let tablinks: HTMLCollectionOf<Element> = document.getElementsByTagName("li");
    for (i = 0; i < tablinks.length; i++) {
      (tablinks[i] as HTMLElement).className = (tablinks[i] as HTMLElement).className.replace("current", "");
    }

    let element = document.getElementById(tabName);
    if (element) {
      element.style.display = "block";
    }
    (evt.currentTarget as HTMLElement).className += " current";
  };

  return (
    <>
      <section className="electronic-area bg-color ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="electronic-content">
                <h2>
                  Innovative Electronic Protection of Your Office and Home
                  Control Online
                </h2>

                <div className="electronic-tab-wrap">
                  <div className="tab electronic-tab">
                    {/* Tabs Nav */}
                    <ul className="tabs">
                      <li
                        className="current"
                        onClick={(e) => openTabSection(e, "tab1")}
                      >
                        Intercom System
                      </li>
                      <li onClick={(e) => openTabSection(e, "tab2")}>CCTV</li>
                      <li onClick={(e) => openTabSection(e, "tab3")}>GDPR</li>
                      <li onClick={(e) => openTabSection(e, "tab4")}>
                        Encryption
                      </li>
                      <li onClick={(e) => openTabSection(e, "tab5")}>
                        Our Goal
                      </li>
                    </ul>

                    {/* Tab Content */}
                    <div className="tab_content">
                      <div id="tab1" className="tabs_item">
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Illo ducimus vero, vero corporis voluptates
                          beatae pariatur laudantium, fugiat illum ab deserunt
                          nostrum aliquid quisquam esse? Voluptatibus quia velit
                          numquam esse porro ipsum dolor, sit amet consectetur
                          adipisicing elit. Illo ducimus vero, corporis.
                        </p>

                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Perspiciatis, soluta, aspernatur dolorum sequi
                          quisquam ullam in pariatur nihil dolorem cumque
                          excepturi totam. Qui excepturi quasi cumque placeat
                          fuga. Ea, eius?
                        </p>

                        <Link href="/about" className="default-btn">
                          Learn About
                        </Link>
                      </div>

                      <div id="tab2" className="tabs_item">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum
                        </p>

                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo.
                        </p>

                        <Link href="/about" className="default-btn">
                          Learn About
                        </Link>
                      </div>

                      <div id="tab3" className="tabs_item">
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo.
                        </p>

                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum
                        </p>

                        <Link href="/about" className="default-btn">
                          Learn About
                        </Link>
                      </div>

                      <div id="tab4" className="tabs_item">
                        <p>
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain was born and
                          I will give you a complete account of the system, and
                          expound the actual teachings of the great explorer of
                          the truth, the master-builder of human happiness.
                        </p>

                        <p>
                          At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum deleniti
                          atque corrupti quos dolores et quas molestias
                          excepturi sint occaecati cupiditate non provident,
                          similique
                        </p>

                        <Link href="/about" className="default-btn">
                          Learn About
                        </Link>
                      </div>

                      <div id="tab5" className="tabs_item">
                        <p>
                          At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum deleniti
                          atque corrupti quos dolores et quas molestias
                          excepturi sint occaecati cupiditate non provident,
                          similique
                        </p>

                        <p>
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain was born and
                          I will give you a complete account of the system, and
                          expound the actual teachings of the great explorer of
                          the truth, the master-builder of human happiness.
                        </p>

                        <Link href="/about" className="default-btn">
                          Learn About
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="electronic-img">
                <Image
                  src="/img/electronic-img.png"
                  alt="Image"
                  width={570}
                  height={485}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectronicProtection;
