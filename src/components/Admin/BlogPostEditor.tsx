"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface BlogPostEditorProps {
  post?: any;
  user: any;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ post, user }) => {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const isArabic = lang === 'ar';
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: post?.title || "",
    title_ar: post?.title_ar || "",
    slug: post?.slug || "",
    content: post?.content || "",
    content_ar: post?.content_ar || "",
    featured_image: post?.featured_image || "",
    category: post?.category || "",
    tags: post?.tags ? (typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags) : [],
    status: post?.status || "draft",
  });

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('admin_lang') as 'en' | 'ar' || 'en';
    setLang(savedLang);

    const handleStorageChange = () => {
      const newLang = localStorage.getItem('admin_lang') as 'en' | 'ar' || 'en';
      setLang(newLang);
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const translations = {
    en: {
      newPost: "New Blog Post",
      editPost: "Edit Blog Post",
      title: "Title (English)",
      titleAr: "Title (Arabic)",
      slug: "URL Slug",
      content: "Content (English)",
      contentAr: "Content (Arabic)",
      featuredImage: "Featured Image",
      uploadImage: "Upload Image",
      orEnterUrl: "Or enter image URL",
      category: "Category",
      tags: "Tags (comma separated)",
      status: "Status",
      draft: "Draft",
      published: "Published",
      archived: "Archived",
      saveDraft: "Save Draft",
      publish: "Publish",
      cancel: "Cancel",
      saving: "Saving...",
      publishing: "Publishing...",
      uploading: "Uploading...",
      required: "This field is required",
      success: "Blog post saved successfully!",
      error: "Failed to save blog post",
      uploadError: "Failed to upload image",
      currentImage: "Current Image",
      changeImage: "Change Image",
    },
    ar: {
      newPost: "مقال جديد",
      editPost: "تعديل المقال",
      title: "العنوان (إنجليزي)",
      titleAr: "العنوان (عربي)",
      slug: "رابط URL",
      content: "المحتوى (إنجليزي)",
      contentAr: "المحتوى (عربي)",
      featuredImage: "الصورة المميزة",
      uploadImage: "رفع صورة",
      orEnterUrl: "أو أدخل رابط الصورة",
      category: "التصنيف",
      tags: "الوسوم (مفصولة بفواصل)",
      status: "الحالة",
      draft: "مسودة",
      published: "منشور",
      archived: "مؤرشف",
      saveDraft: "حفظ كمسودة",
      publish: "نشر",
      cancel: "إلغاء",
      saving: "جاري الحفظ...",
      publishing: "جاري النشر...",
      uploading: "جاري الرفع...",
      required: "هذا الحقل مطلوب",
      success: "تم حفظ المقال بنجاح!",
      error: "فشل حفظ المقال",
      uploadError: "فشل رفع الصورة",
      currentImage: "الصورة الحالية",
      changeImage: "تغيير الصورة",
    }
  };

  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Auto-generate slug from title
    if (name === 'title' && !post) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, title: value, slug }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value;
    const tagsArray = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.slug || !formData.content) {
      setError(t.required);
      return false;
    }
    return true;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        credentials: 'include',
        body: uploadFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.uploadError);
      }

      // Update featured_image with the uploaded image URL
      setFormData(prev => ({ ...prev, featured_image: data.data.url }));
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || t.uploadError);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (publishNow = false) => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const dataToSend = {
        ...formData,
        status: publishNow ? 'published' : formData.status,
      };

      const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.error);
      }

      setSuccess(t.success);
      setTimeout(() => {
        router.push('/admin/blog');
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setError(err.message || t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700', fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit' }}>
          {post ? t.editPost : t.newPost}
        </h2>
      </div>

      {/* Messages */}
      {error && (
        <div style={{
          padding: '12px 16px',
          background: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '8px',
          color: '#dc2626',
          marginBottom: '20px',
          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          padding: '12px 16px',
          background: '#d1fae5',
          border: '1px solid #10b981',
          borderRadius: '8px',
          color: '#059669',
          marginBottom: '20px',
          fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
        }}>
          {success}
        </div>
      )}

      {/* Form */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Title English */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.title} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Title Arabic */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.titleAr}
            </label>
            <input
              type="text"
              name="title_ar"
              value={formData.title_ar}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
              }}
            />
          </div>

          {/* Slug */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.slug} *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>

          {/* Content English */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.content} *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Content Arabic */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.contentAr}
            </label>
            <textarea
              name="content_ar"
              value={formData.content_ar}
              onChange={handleChange}
              rows={10}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'Cairo, sans-serif',
                direction: 'rtl',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Row with Category, Tags, Status */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {/* Category */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              }}>
                {t.category}
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              />
            </div>

            {/* Tags */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              }}>
                {t.tags}
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                }}
              />
            </div>

            {/* Status */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '8px',
                fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
              }}>
                {t.status}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                }}
              >
                <option value="draft">{t.draft}</option>
                <option value="published">{t.published}</option>
                <option value="archived">{t.archived}</option>
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.featuredImage}
            </label>

            {/* Image Preview */}
            {formData.featured_image && (
              <div style={{
                marginBottom: '12px',
                padding: '12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: '#f9fafb',
              }}>
                <div style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  marginBottom: '8px',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                }}>
                  {t.currentImage}
                </div>
                <img
                  src={formData.featured_image}
                  alt="Featured"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Upload Button */}
            <div style={{ marginBottom: '12px' }}>
              <label
                htmlFor="image-upload"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: isUploading ? '#9ca3af' : '#0A4D8C',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
                  transition: 'background 0.3s ease',
                }}
              >
                <i className="bx bx-upload" style={{ fontSize: '18px' }}></i>
                {isUploading ? t.uploading : t.uploadImage}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
            </div>

            {/* Or Enter URL */}
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginBottom: '8px',
              textAlign: 'center',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}>
              {t.orEnterUrl}
            </div>

            <input
              type="text"
              name="featured_image"
              value={formData.featured_image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '12px',
          justifyContent: isArabic ? 'flex-start' : 'flex-end',
        }}>
          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            disabled={isLoading}
            style={{
              padding: '10px 24px',
              background: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              color: '#374151',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            {t.cancel}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isLoading}
            style={{
              padding: '10px 24px',
              background: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              color: '#fff',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            {isLoading ? t.saving : t.saveDraft}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={isLoading}
            style={{
              padding: '10px 24px',
              background: '#0A4D8C',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              color: '#fff',
              fontFamily: isArabic ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            {isLoading ? t.publishing : t.publish}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEditor;
