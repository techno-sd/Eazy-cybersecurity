import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { sanitizeInput, isValidEmail, getSecurityHeaders } from '@/lib/security';

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
        { status: 400, headers: getSecurityHeaders() }
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
        { status: 404, headers: getSecurityHeaders() }
      );
    }

    return NextResponse.json({
      success: true,
      data: targetUser,
    }, { headers: getSecurityHeaders() });
  } catch (error: any) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user' },
      { status: 500, headers: getSecurityHeaders() }
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
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    const body = await request.json();
    const { full_name, email, phone, company, role, is_active } = body;

    // Validation
    if (!full_name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // SECURITY: Sanitize all inputs
    const sanitizedFullName = sanitizeInput(full_name);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? sanitizeInput(phone) : null;
    const sanitizedCompany = company ? sanitizeInput(company) : null;

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Validate role if provided
    const validRoles = ['admin', 'moderator', 'user'];
    const sanitizedRole = role && validRoles.includes(role) ? role : 'user';

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404, headers: getSecurityHeaders() }
      );
    }

    // Check if email is already used by another user
    if (sanitizedEmail !== existingUser.email) {
      const emailCheck = await prisma.users.findFirst({
        where: {
          email: sanitizedEmail,
          id: { not: userId },
        },
        select: { id: true },
      });

      if (emailCheck) {
        return NextResponse.json(
          { success: false, message: 'Email already exists' },
          { status: 409, headers: getSecurityHeaders() }
        );
      }
    }

    // Update user with sanitized data
    await prisma.users.update({
      where: { id: userId },
      data: {
        full_name: sanitizedFullName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        company: sanitizedCompany,
        role: sanitizedRole,
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
      `Updated user: ${sanitizedFullName} (${sanitizedEmail})`,
      request.headers.get('x-forwarded-for') || 'unknown',
      request.headers.get('user-agent') || 'unknown'
    );

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
    }, { headers: getSecurityHeaders() });
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user' },
      { status: 500, headers: getSecurityHeaders() }
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
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Prevent admin from deleting themselves
    if (userId === user.id) {
      return NextResponse.json(
        { success: false, message: 'Cannot delete your own account' },
        { status: 403, headers: getSecurityHeaders() }
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
        { status: 404, headers: getSecurityHeaders() }
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
    }, { headers: getSecurityHeaders() });
  } catch (error: any) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete user' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
