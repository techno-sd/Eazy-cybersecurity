import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { query } from '@/lib/db';

// Get all blog posts
export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

    if (status) {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR title_ar LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Get total count
    const [countResult] = await query<any[]>(
      `SELECT COUNT(*) as total FROM blog_posts WHERE ${whereClause}`,
      params
    );

    // Get posts
    const posts = await query<any[]>(
      `SELECT
        bp.*,
        u.full_name as author_name
       FROM blog_posts bp
       LEFT JOIN users u ON bp.author_id = u.id
       WHERE ${whereClause}
       ORDER BY bp.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        page,
        limit,
        total: countResult.total,
        totalPages: Math.ceil(countResult.total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog posts', error: error.message },
      { status: 500 }
    );
  }
}

// Create new blog post
export async function POST(request: NextRequest) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

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
      category,
      tags,
      status,
    } = body;

    // Validation
    if (!title || !title_ar || !slug || !content || !content_ar) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if slug exists
    const existing = await query<any[]>(
      'SELECT id FROM blog_posts WHERE slug = ?',
      [slug]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Insert post
    const result = await query<any>(
      `INSERT INTO blog_posts
       (title, title_ar, slug, excerpt, excerpt_ar, content, content_ar,
        featured_image, author_id, category, tags, status, published_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        title,
        title_ar,
        slug,
        excerpt || null,
        excerpt_ar || null,
        content,
        content_ar,
        featured_image || null,
        user.id,
        category || null,
        tags ? JSON.stringify(tags) : null,
        status || 'draft',
        status === 'published' ? new Date() : null,
      ]
    );

    // Log activity
    await logActivity(
      user.id,
      'create_post',
      'blog_post',
      result.insertId,
      `Created blog post: ${title}`,
      request.headers.get('x-forwarded-for') || 'unknown',
      request.headers.get('user-agent') || 'unknown'
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Blog post created successfully',
        data: { id: result.insertId },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog post', error: error.message },
      { status: 500 }
    );
  }
}
