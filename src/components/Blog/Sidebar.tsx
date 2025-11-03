"use client";
  
import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <>
      <aside className="widget-area" id="secondary">
        <div className="widget widget_search mt-0">
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

        <div className="widget widget-peru-posts-thumb">
          <h3 className="widget-title">Popular Posts</h3>
          <div className="post-wrap">
            <div className="item">
              <Link href="/blog/details" className="thumb">
                <span className="fullimage cover bg1" role="img"></span>
              </Link>

              <div className="info">
                <span className="time">April 20, 2024</span>
                <h4 className="title usmall">
                  <Link href="/blog/details">
                    Drughydrus Add Google Drive To Roughrobin Torjan
                  </Link>
                </h4>
              </div>

              <div className="clear"></div>
            </div>

            <div className="item">
              <Link href="/blog/details" className="thumb">
                <span className="fullimage cover bg2" role="img"></span>
              </Link>
              <div className="info">
                <span className="time">Jun 21, 2024</span>
                <h4 className="title usmall">
                  <Link href="/blog/details">
                    DHS Issues Emergency Directive To Prevent Hacking Attack
                  </Link>
                </h4>
              </div>

              <div className="clear"></div>
            </div>

            <div className="item">
              <Link href="/blog/details" className="thumb">
                <span className="fullimage cover bg3" role="img"></span>
              </Link>
              <div className="info">
                <span className="time">Jun 22, 2024</span>
                <h4 className="title usmall">
                  <Link href="/blog/details">
                    Security In A Fragment World Of Workload
                  </Link>
                </h4>
              </div>

              <div className="clear"></div>
            </div>
          </div>
        </div>

        <div className="widget widget_tag_cloud">
          <h3 className="widget-title">Tags</h3>
          <div className="post-wrap">
            <div className="tagcloud">
              <Link href="/blog">Blockchain (3)</Link>

              <Link href="/blog">Cyber security (3)</Link>

              <Link href="/blog">Cybercrime (2)</Link>

              <Link href="/blog">Global news (2)</Link>

              <Link href="/blog">Ransomware (1)</Link>

              <Link href="/blog">Whitepapers (2)</Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
