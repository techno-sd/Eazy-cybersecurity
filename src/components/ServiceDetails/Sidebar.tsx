"use client";
  
import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="sidebar-pl-15">
        <aside className="widget-area" id="secondary">
          <div className="widget widget_search">
            <h3 className="widget-title">Search Now</h3>
            <div className="post-wrap">
              <form className="search-form">
                <label>
                  <input
                    type="search"
                    className="search-field"
                    placeholder="Search..."
                  />
                </label>
                <button type="submit">
                  <i className="bx bx-search"></i>
                </button>
              </form>
            </div>
          </div>

          <section className="widget widget_categories">
            <h3 className="widget-title">Categories</h3>
            <div className="post-wrap">
              <ul>
                <li>
                  <Link href="#">
                    Blockchain <span>(10)</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    Cyber security <span>(20)</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    Cybercrime <span>(10)</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    Global news <span>(12)</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    Ransomware <span>(16)</span>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    Whitepapers <span>(17)</span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>

          <section className="widget widget_tag_cloud">
            <h3 className="widget-title">Tags</h3>
            <div className="post-wrap">
              <div className="tagcloud">
                <Link href="#">Blockchain (3)</Link>
                <Link href="#">Cyber security (3)</Link>

                <Link href="#">Cybercrime (2)</Link>

                <Link href="#">Global news (2)</Link>

                <Link href="#">Ransomware (1)</Link>

                <Link href="#">Whitepapers (2)</Link>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
