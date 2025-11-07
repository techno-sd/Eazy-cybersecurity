import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get published blog posts (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12');
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

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: total > offset + limit,
      },
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
