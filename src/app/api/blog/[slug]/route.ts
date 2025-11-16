import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCacheControlHeader, CACHE_CONFIG } from "@/lib/performance";
import { getSecurityHeaders } from "@/lib/security";

// GET - Get single published blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Slug is required' },
        { status: 400 }
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
        { status: 404 }
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
    console.error('Error fetching blog post:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sql: error.sql
    });
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post', error: process.env.NODE_ENV === 'development' ? error.message : undefined },
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
