import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Get the blog post with Prisma
    const post = await prisma.blog_posts.findFirst({
      where: {
        slug,
        status: 'published',
      },
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
        published_at: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.blog_posts.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}
