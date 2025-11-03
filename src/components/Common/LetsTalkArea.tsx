"use client";
  
import React from "react";
import Link from "next/link";

const LetsTalkArea: React.FC = () => {
  return (
    <>
      <div className="lats-talk-area ptb-100">
        <div className="container">
          <div className="lats-talk-content">
            <h2>Ready to get started? we&apos;re here to help</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <Link href="/contact" className="default-btn six">
              <i className="bx bx-file"></i>
              Let’s Talk
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LetsTalkArea;
