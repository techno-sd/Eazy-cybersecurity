import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className="error-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="error-content-wrap">
                <Image
                  src="/img/404.png"
                  alt="Image"
                  width={618}
                  height={412}
                />

                <h3>Oops! Page Not Found</h3>
                <p>The page you were looking for could not be found.</p>

                <Link href="/" className="default-btn page-btn">
                  Return To Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
