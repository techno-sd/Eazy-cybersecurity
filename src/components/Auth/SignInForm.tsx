"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SignInFormProps {
  lang: string;
}

const SignInForm: React.FC<SignInFormProps> = ({ lang }) => {
  const isArabic = lang === "ar";
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation errors when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    setError("");
  };

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = isArabic ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = isArabic ? "البريد الإلكتروني غير صالح" : "Invalid email format";
    }

    // Password validation
    if (!formData.password) {
      errors.password = isArabic ? "كلمة المرور مطلوبة" : "Password is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || (isArabic ? "فشل تسجيل الدخول" : "Login failed"));
      }

      setSuccess(isArabic ? "تم تسجيل الدخول بنجاح!" : "Login successful!");

      // Store user data in localStorage if remember me is checked
      if (formData.rememberMe) {
        localStorage.setItem("user_email", formData.email);
      }

      // Redirect to admin or home page after 1 second
      setTimeout(() => {
        if (data.data?.role === 'admin' || data.data?.role === 'moderator') {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
      }, 1000);

    } catch (err: any) {
      setError(err.message || (isArabic ? "حدث خطأ ما" : "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

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
            {error && (
              <div
                style={{
                  padding: "12px 20px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                  backgroundColor: "#fee",
                  border: "1px solid #fcc",
                  color: "#c33",
                  textAlign: isArabic ? 'right' : 'left',
                  direction: isArabic ? 'rtl' : 'ltr',
                }}
              >
                <i className="bx bx-error-circle" style={{ marginRight: isArabic ? '0' : '8px', marginLeft: isArabic ? '8px' : '0' }}></i>
                {error}
              </div>
            )}

            {success && (
              <div
                style={{
                  padding: "12px 20px",
                  marginBottom: "20px",
                  borderRadius: "8px",
                  backgroundColor: "#efe",
                  border: "1px solid #cfc",
                  color: "#3c3",
                  textAlign: isArabic ? 'right' : 'left',
                  direction: isArabic ? 'rtl' : 'ltr',
                }}
              >
                <i className="bx bx-check-circle" style={{ marginRight: isArabic ? '0' : '8px', marginLeft: isArabic ? '8px' : '0' }}></i>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={isArabic ? "البريد الإلكتروني" : "Email Address"}
                      style={{ textAlign: isArabic ? 'right' : 'left' }}
                      disabled={isLoading}
                    />
                    {validationErrors.email && (
                      <div style={{ color: '#c33', fontSize: '14px', marginTop: '5px', textAlign: isArabic ? 'right' : 'left' }}>
                        {validationErrors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group" style={{ position: 'relative' }}>
                    <input
                      className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={isArabic ? "كلمة المرور" : "Password"}
                      style={{ textAlign: isArabic ? 'right' : 'left', paddingRight: isArabic ? '15px' : '45px', paddingLeft: isArabic ? '45px' : '15px' }}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        [isArabic ? 'left' : 'right']: '15px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666',
                        fontSize: '18px',
                        padding: '0',
                      }}
                    >
                      <i className={showPassword ? "bx bx-show" : "bx bx-hide"}></i>
                    </button>
                    {validationErrors.password && (
                      <div style={{ color: '#c33', fontSize: '14px', marginTop: '5px', textAlign: isArabic ? 'right' : 'left' }}>
                        {validationErrors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-6 col-sm-6 form-condition">
                  <div className="agree-label" style={{ justifyContent: isArabic ? 'flex-end' : 'flex-start' }}>
                    <input
                      type="checkbox"
                      id="chb1"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
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
                  <button
                    className="default-btn btn-two"
                    type="submit"
                    disabled={isLoading}
                    style={{
                      opacity: isLoading ? 0.7 : 1,
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <i className="bx bx-loader-alt bx-spin" style={{ marginRight: isArabic ? '0' : '8px', marginLeft: isArabic ? '8px' : '0' }}></i>
                        {isArabic ? "جاري تسجيل الدخول..." : "Signing In..."}
                      </>
                    ) : (
                      isArabic ? "تسجيل الدخول" : "Sign In"
                    )}
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
