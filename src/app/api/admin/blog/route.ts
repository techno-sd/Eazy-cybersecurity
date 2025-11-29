import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { sanitizeInput, sanitizeSlug, getSecurityHeaders } from '@/lib/security';

// Get all blog posts
export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const statusFilter = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (statusFilter) {
      where.status = statusFilter;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { title_ar: { contains: search } },
        { content: { contains: search } },
      ];
    }

    // Get total count and posts in parallel
    const [total, posts] = await Promise.all([
      prisma.blog_posts.count({ where }),
      prisma.blog_posts.findMany({
        where,
        orderBy: {
          created_at: 'desc',
        },
        skip: offset,
        take: limit,
      }),
    ]);

    // Get author names for all posts
    const authorIds = [...new Set(posts.map(p => p.author_id))];
    const authors = await prisma.users.findMany({
      where: { id: { in: authorIds } },
      select: { id: true, full_name: true },
    });
    const authorMap = new Map(authors.map(a => [a.id, a.full_name]));

    // Add author names to posts
    const postsWithAuthors = posts.map(post => ({
      ...post,
      author_name: authorMap.get(post.author_id) || null,
    }));

    return NextResponse.json({
      success: true,
      data: postsWithAuthors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

// Create new blog post
export async function POST(request: NextRequest) {
  const userOrResponse = await requireAdmin(request);
  if (userOrResponse instanceof NextResponse) return userOrResponse;
  const user = userOrResponse;

  try {
    const body = await request.json();
    const {
      title,
      title_ar,
      slug,
      excerpt,
      excerpt_ar,
      content,
      content_ar,
      featured_image,
      status,
    } = body;

    // Validation
    if (!title || !title_ar || !slug || !content || !content_ar) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Sanitize inputs
    const sanitizedSlugValue = sanitizeSlug(slug);
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedTitleAr = sanitizeInput(title_ar);

    // Validate slug format
    if (!sanitizedSlugValue || sanitizedSlugValue.length < 3) {
      return NextResponse.json(
        { success: false, message: 'Invalid slug format. Use only letters, numbers, and hyphens.' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Validate status
    const validStatuses = ['draft', 'published', 'archived'];
    const sanitizedStatus = status && validStatuses.includes(status) ? status : 'draft';

    // Check if slug exists
    const existing = await prisma.blog_posts.findFirst({
      where: { slug: sanitizedSlugValue },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Slug already exists' },
        { status: 409, headers: getSecurityHeaders() }
      );
    }

    // Create post with Prisma (content is not sanitized as it may contain markdown)
    const post = await prisma.blog_posts.create({
      data: {
        title: sanitizedTitle,
        title_ar: sanitizedTitleAr,
        slug: sanitizedSlugValue,
        excerpt: excerpt ? sanitizeInput(excerpt) : null,
        excerpt_ar: excerpt_ar ? sanitizeInput(excerpt_ar) : null,
        content,
        content_ar,
        featured_image: featured_image || null,
        author_id: user?.id || 0,
        status: sanitizedStatus,
        published_at: sanitizedStatus === 'published' ? new Date() : null,
      },
    });

    // Log activity
    if (user) {
      await logActivity(
        user.id,
        'create_post',
        'blog_post',
        post.id,
        `Created blog post: ${title}`,
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown'
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        data: { id: post.id },
      },
      { status: 201, headers: getSecurityHeaders() }
    );
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
