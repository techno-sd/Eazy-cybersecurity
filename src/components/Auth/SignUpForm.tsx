"use client";
  
import React from "react";
import Link from "next/link";

interface SignUpFormProps {
  lang: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ lang }) => {
  const isArabic = lang === "ar";

  return (
    <>
      <section className="user-area-all-style sign-up-area ptb-100">
        <div className="container">
          <div 
            className="section-title" 
            style={{ 
              direction: isArabic ? 'rtl' : 'ltr', 
              textAlign: isArabic ? 'right' : 'left' 
            }}
          >
            <h2>
              {isArabic ? "إنشاء حساب جديد!" : "Create an account!"}
            </h2>
            <p>
              {isArabic
                ? "انضم إلى منصتنا للوصول إلى خدمات الأمن السيبراني والذكاء الاصطناعي المتطورة"
                : "Join our platform to access advanced cybersecurity and AI services"}
            </p>
          </div>

          <div className="contact-form-action">
            <form>
              <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="firstName"
                      placeholder={isArabic ? "الاسم الأول" : "First Name"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                    />
                  </div>
                </div>

                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="lastName"
                      placeholder={isArabic ? "اسم العائلة" : "Last Name"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                    />
                  </div>
                </div>

                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="username"
                      placeholder={isArabic ? "اسم المستخدم" : "Username"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                    />
                  </div>
                </div>

                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder={isArabic ? "البريد الإلكتروني" : "Email Address"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                    />
                  </div>
                </div>

                <div className="col-md-12 col-sm-12">
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

                <div className="col-md-12 col-sm-12 col-xs-12 form-condition">
                  <div className="agree-label" style={{ justifyContent: isArabic ? 'flex-end' : 'flex-start' }}>
                    <input type="checkbox" id="chb2" />
                    <label htmlFor="chb2" style={{ [isArabic ? 'marginRight' : 'marginLeft']: '8px' }}>
                      {isArabic ? "أوافق على " : "I agree with "}
                      <Link href="/terms-conditions">
                        {isArabic ? "الشروط والأحكام" : "Terms & Conditions"}
                      </Link>
                      {isArabic ? " و " : " & "}
                      <Link href="/privacy-policy">
                        {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
                      </Link>
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <button className="default-btn btn-two" type="submit">
                    {isArabic ? "إنشاء حساب" : "Sign Up"}
                  </button>
                </div>

                <div className="col-12">
                  <p className="account-desc" style={{ textAlign: 'center' }}>
                    {isArabic ? "لديك حساب بالفعل؟ " : "Already have an account? "}
                    <Link href="/sign-in">
                      {isArabic ? "تسجيل الدخول" : "Sign In"}
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpForm;
