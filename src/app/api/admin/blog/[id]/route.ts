import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

// Get single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid post ID' },
        { status: 400 }
      );
    }

    const post = await prisma.blog_posts.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Get author name
    const author = await prisma.users.findUnique({
      where: { id: post.author_id },
      select: { full_name: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...post,
        author_name: author?.full_name || null,
      },
    });
  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog post', error: error.message },
      { status: 500 }
    );
  }
}

// Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrResponse = await requireAdmin(request);
  if (userOrResponse instanceof NextResponse) return userOrResponse;
  const user = userOrResponse;

  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid post ID' },
        { status: 400 }
      );
    }

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
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.blog_posts.findUnique({
      where: { id: postId },
      select: { id: true, author_id: true, status: true, published_at: true },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Check if slug is already used by another post
    const slugCheck = await prisma.blog_posts.findFirst({
      where: {
        slug,
        id: { not: postId },
      },
      select: { id: true },
    });

    if (slugCheck) {
      return NextResponse.json(
        { success: false, message: 'Slug already exists' },
        { status: 409 }
      );
    }

    // Determine if we need to update published_at
    let publishedAtValue: Date | null = null;
    if (status === 'published') {
      if (existingPost.status === 'published' && existingPost.published_at) {
        // Keep existing published date
        publishedAtValue = existingPost.published_at;
      } else {
        // Set new published date
        publishedAtValue = new Date();
      }
    }

    // Update post with Prisma
    await prisma.blog_posts.update({
      where: { id: postId },
      data: {
        title,
        title_ar,
        slug,
        excerpt: excerpt || null,
        excerpt_ar: excerpt_ar || null,
        content,
        content_ar,
        featured_image: featured_image || null,
        status: status || 'draft',
        published_at: publishedAtValue,
        updated_at: new Date(),
      },
    });

    // Log activity
    if (user) {
      await logActivity(
        user.id,
        'update_post',
        'blog_post',
        postId,
        `Updated blog post: ${title}`,
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown'
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog post', error: error.message },
      { status: 500 }
    );
  }
}

// Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrResponse = await requireAdmin(request);
  if (userOrResponse instanceof NextResponse) return userOrResponse;
  const user = userOrResponse;

  try {
    const { id } = await params;
    const postId = parseInt(id);

    if (isNaN(postId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid post ID' },
        { status: 400 }
      );
    }

    // Check if post exists
    const existingPost = await prisma.blog_posts.findUnique({
      where: { id: postId },
      select: { id: true, title: true },
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, message: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Delete post with Prisma
    await prisma.blog_posts.delete({
      where: { id: postId },
    });

    // Log activity
    if (user) {
      await logActivity(
        user.id,
        'delete_post',
        'blog_post',
        postId,
        `Deleted blog post: ${existingPost.title}`,
        request.headers.get('x-forwarded-for') || 'unknown',
        request.headers.get('user-agent') || 'unknown'
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog post', error: error.message },
      { status: 500 }
    );
  }
}
