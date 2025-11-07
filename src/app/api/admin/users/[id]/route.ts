import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

// GET - Get single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const targetUser = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        full_name: true,
        phone: true,
        company: true,
        role: true,
        is_active: true,
        last_login: true,
        last_login_ip: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: targetUser,
    });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user', error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { full_name, email, phone, company, role, is_active } = body;

    // Validation
    if (!full_name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is already used by another user
    if (email !== existingUser.email) {
      const emailCheck = await prisma.users.findFirst({
        where: {
          email,
          id: { not: userId },
        },
        select: { id: true },
      });

      if (emailCheck) {
        return NextResponse.json(
          { success: false, message: 'Email already exists' },
          { status: 409 }
        );
      }
    }

    // Update user with Prisma
    await prisma.users.update({
      where: { id: userId },
      data: {
        full_name,
        email,
        phone: phone || null,
        company: company || null,
        role: role || 'user',
        is_active: is_active !== undefined ? is_active : true,
        updated_at: new Date(),
      },
    });

    // Log activity
    await logActivity(
      user.id,
      'update_user',
      'user',
      userId,
      `Updated user: ${full_name} (${email})`,
      request.headers.get('x-forwarded-for') || 'unknown',
      request.headers.get('user-agent') || 'unknown'
    );

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user', error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Prevent admin from deleting themselves
    if (userId === user.id) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete your own account' },
        { status: 403 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, full_name: true, email: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user with Prisma
    await prisma.users.delete({
      where: { id: userId },
    });

    // Log activity
    await logActivity(
      user.id,
      'delete_user',
      'user',
      userId,
      `Deleted user: ${existingUser.full_name} (${existingUser.email})`,
      request.headers.get('x-forwarded-for') || 'unknown',
      request.headers.get('user-agent') || 'unknown'
    );

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete user', error: error.message },
      { status: 500 }
    );
  }
}
