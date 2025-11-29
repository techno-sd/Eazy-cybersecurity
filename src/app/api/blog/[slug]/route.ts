import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCacheControlHeader, CACHE_CONFIG } from "@/lib/performance";
import { getSecurityHeaders, sanitizeSlug } from "@/lib/security";

// GET - Get single published blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug: rawSlug } = await params;

    if (!rawSlug) {
      return NextResponse.json(
        { success: false, message: 'Slug is required' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Sanitize slug to prevent injection attacks
    const slug = sanitizeSlug(rawSlug);

    if (!slug || slug.length < 1) {
      return NextResponse.json(
        { success: false, message: 'Invalid slug format' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Get the blog post with MySQL
    const posts = await query<any[]>(
      `SELECT
        id, title, title_ar, slug, excerpt, excerpt_ar,
        content, content_ar, featured_image, views,
        created_at, published_at
       FROM blog_posts
       WHERE slug = ? AND status = ?
       LIMIT 1`,
      [slug, 'published']
    );

    const post = posts[0];

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404, headers: getSecurityHeaders() }
      );
    }

    // Increment view count
    await query(
      'UPDATE blog_posts SET views = views + 1 WHERE id = ?',
      [post.id]
    );

    // Increment the views in the returned post object
    post.views = post.views + 1;

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': getCacheControlHeader(CACHE_CONFIG.API.SHORT, {
            staleWhileRevalidate: CACHE_CONFIG.API.SHORT,
            public: true,
          }),
          ...getSecurityHeaders(),
        },
      }
    );
  } catch (error: any) {
    // Only log detailed errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching blog post:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        errno: error.errno,
      });
    } else {
      // In production, log minimal info without SQL details
      console.error('Error fetching blog post:', error.message);
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
          ...getSecurityHeaders(),
        },
      }
    );
  }
}
