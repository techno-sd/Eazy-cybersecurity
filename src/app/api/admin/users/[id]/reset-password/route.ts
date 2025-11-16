import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// POST - Reset user password
export async function POST(
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
    const { new_password } = body;

    // Validation
    if (!new_password || new_password.length < 8) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if target user exists
    const targetUser = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, full_name: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Hash the new password
    const password_hash = await bcrypt.hash(new_password, 10);

    // Update password
    await prisma.users.update({
      where: { id: userId },
      data: {
        password_hash,
        updated_at: new Date(),
      },
    });

    // Log activity
    await logActivity(
      user.id,
      'reset_password',
      'user',
      userId,
      `Reset password for user: ${targetUser.full_name} (${targetUser.email})`,
      request.headers.get('x-forwarded-for') || 'unknown',
      request.headers.get('user-agent') || 'unknown'
    );

    return NextResponse.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password', error: error.message },
      { status: 500 }
    );
  }
}
