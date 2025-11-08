import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCacheControlHeader, CACHE_CONFIG } from "@/lib/performance";
import { getSecurityHeaders } from "@/lib/security";

// GET - Get published blog posts (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '12'), 100); // Max 100
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category') || '';

    // Build where clause
    const where: any = {
      status: 'published',
    };

    if (category) {
      where.category = category;
    }

    // Fetch posts with Prisma
    const [posts, total] = await Promise.all([
      prisma.blog_posts.findMany({
        where,
        select: {
          id: true,
          title: true,
          title_ar: true,
          slug: true,
          content: true,
          content_ar: true,
          featured_image: true,
          category: true,
          views: true,
          created_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.blog_posts.count({ where }),
    ]);

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
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
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
