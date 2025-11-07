"use client";
  
import React from "react";
import Link from "next/link";

interface SignInFormProps {
  lang: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ lang }) => {
  const isArabic = lang === "ar";

  return (
    <>
      <div className="user-area-all-style log-in-area ptb-100">
        <div className="container">
          <div 
            className="section-title" 
            style={{ 
              direction: isArabic ? 'rtl' : 'ltr', 
              textAlign: isArabic ? 'right' : 'left' 
            }}
          >
            <h2>
              {isArabic 
                ? "تسجيل الدخول إلى حسابك!" 
                : "Log In to your account!"}
            </h2>
            <p>
              {isArabic
                ? "الوصول الآمن إلى خدمات الأمن السيبراني والذكاء الاصطناعي المتقدمة لدينا"
                : "Secure access to our advanced cybersecurity and AI services"}
            </p>
          </div>

          <div className="contact-form-action">
            <form method="post">
              <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder={isArabic ? "اسم المستخدم أو البريد الإلكتروني" : "Username or Email"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder={isArabic ? "كلمة المرور" : "Password"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6 form-condition">
                  <div className="agree-label" style={{ justifyContent: isArabic ? 'flex-end' : 'flex-start' }}>
                    <input type="checkbox" id="chb1" />
                    <label htmlFor="chb1" style={{ [isArabic ? 'marginRight' : 'marginLeft']: '8px' }}>
                      {isArabic ? "تذكرني" : "Remember Me"}
                    </label>
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6">
                  <Link 
                    href="/forgot-password" 
                    className="forget"
                    style={{ 
                      float: isArabic ? 'left' : 'right',
                      textAlign: isArabic ? 'left' : 'right'
                    }}
                  >
                    {isArabic ? "هل نسيت كلمة المرور؟" : "Forgot my password?"}
                  </Link>
                </div>

                <div className="col-12">
                  <button className="default-btn btn-two" type="submit">
                    {isArabic ? "تسجيل الدخول" : "Sign In"}
                  </button>
                </div>

                <div className="col-12">
                  <p className="account-desc" style={{ textAlign: 'center' }}>
                    {isArabic ? "ليس لديك حساب؟ " : "Not a member? "}
                    <Link href="/sign-up">
                      {isArabic ? "إنشاء حساب" : "Sign Up"}
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
