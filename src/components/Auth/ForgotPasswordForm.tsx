"use client";
  
import React from "react";
import Link from "next/link";

interface ForgotPasswordFormProps {
  lang: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ lang }) => {
  const isArabic = lang === "ar";

  return (
    <>
      <div className="user-area-all-style recover-password-area ptb-100">
        <div className="container">
          <div className="contact-form-action">
            <div 
              className="form-heading text-center"
              style={{ direction: isArabic ? 'rtl' : 'ltr' }}
            >
              <h3 className="form-title">
                {isArabic ? "إعادة تعيين كلمة المرور!" : "Reset Password!"}
              </h3>
              <p className="reset-desc">
                {isArabic 
                  ? "أدخل البريد الإلكتروني لحسابك لإعادة تعيين كلمة المرور. سوف تتلقى رابطًا عبر البريد الإلكتروني لإعادة تعيين كلمة المرور. إذا كان لديك أي مشكلة بخصوص إعادة تعيين كلمة المرور، "
                  : "Enter the email of your account to reset the password. Then you will receive a link to email to reset the password. If you have any issue about reset password "}
                <Link href="/contact">
                  {isArabic ? "اتصل بنا." : "contact us."}
                </Link>
              </p>
            </div>

            <form method="post">
              <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder={isArabic ? "أدخل عنوان البريد الإلكتروني" : "Enter Email Address"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6">
                  <Link 
                    href="/sign-in" 
                    className="now-log-in font-q"
                    style={{ 
                      float: isArabic ? 'right' : 'left',
                      textAlign: isArabic ? 'right' : 'left'
                    }}
                  >
                    {isArabic ? "تسجيل الدخول إلى حسابك" : "Sign In your account"}
                  </Link>
                </div>
                
                <div className="col-lg-6 col-sm-6">
                  <p 
                    className="now-register"
                    style={{ 
                      float: isArabic ? 'left' : 'right',
                      textAlign: isArabic ? 'left' : 'right'
                    }}
                  >
                    {isArabic ? "ليس لديك حساب؟ " : "Not a member? "}
                    <Link href="/sign-up" className="font-q">
                      {isArabic ? "إنشاء حساب" : "Sign Up"}
                    </Link>
                  </p>
                </div>

                <div className="col-12">
                  <button className="default-btn btn-two" type="submit">
                    {isArabic ? "إعادة تعيين كلمة المرور" : "Reset Password"}
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
