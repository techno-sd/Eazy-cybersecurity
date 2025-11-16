import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCacheControlHeader, CACHE_CONFIG } from "@/lib/performance";
import { getSecurityHeaders } from "@/lib/security";

// GET - Get published blog posts (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '12'), 100); // Max 100
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch posts with MySQL (sequential to avoid connection pool issues)
    const totalResult = await query<any[]>(
      'SELECT COUNT(*) as total FROM blog_posts WHERE status = ?',
      ['published']
    );

    const posts = await query<any[]>(
      `SELECT
        id, title, title_ar, slug, excerpt, excerpt_ar,
        content, content_ar, featured_image, views, created_at
       FROM blog_posts
       WHERE status = ?
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      ['published', limit, offset]
    );

    const total = totalResult[0]?.total || 0;

    return NextResponse.json(
      {
        success: true,
        data: posts,
        pagination: {
          total,
          limit,
          offset,
          hasMore: total > offset + limit,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': getCacheControlHeader(CACHE_CONFIG.API.MEDIUM, {
            staleWhileRevalidate: CACHE_CONFIG.API.SHORT,
            public: true,
          }),
          'CDN-Cache-Control': getCacheControlHeader(CACHE_CONFIG.API.LONG),
          ...getSecurityHeaders(),
        },
      }
    );
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sql: error.sql
    });
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch blog posts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
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
