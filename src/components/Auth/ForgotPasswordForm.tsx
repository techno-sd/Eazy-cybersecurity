"use client";
  
import React from "react";
import Link from "next/link";

const ForgotPasswordForm: React.FC = () => {
  return (
    <>
      <div className="user-area-all-style recover-password-area ptb-100">
        <div className="container">
          <div className="contact-form-action">
            <div className="form-heading text-center">
              <h3 className="form-title">Reset Password!</h3>
              <p className="reset-desc">
                Enter the email of your account to reset the password. Then you
                will receive a link to email to reset the password. If you have
                any issue about reset password{" "}
                <Link href="/contact">contact us.</Link>
              </p>
            </div>

            <form method="post">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Enter Email Address"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6">
                  <Link href="/sign-in" className="now-log-in font-q">
                    Sign In your account
                  </Link>
                </div>
                
                <div className="col-lg-6 col-sm-6">
                  <p className="now-register">
                    Not a member?
                    <Link href="/sign-up" className="font-q">
                      Sign Up
                    </Link>
                  </p>
                </div>

                <div className="col-12">
                  <button className="default-btn btn-two" type="submit">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
