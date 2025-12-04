import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { isValidPassword } from '@/lib/auth';
import { getSecurityHeaders } from '@/lib/security';

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
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    const body = await request.json();
    const { new_password } = body;

    // SECURITY: Validate password strength using the same rules as registration
    const passwordValidation = isValidPassword(new_password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.message },
        { status: 400, headers: getSecurityHeaders() }
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
        { status: 404, headers: getSecurityHeaders() }
      );
    }

    // SECURITY: Hash the new password with 12 rounds (consistent with user creation)
    const password_hash = await bcrypt.hash(new_password, 12);

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
    }, { headers: getSecurityHeaders() });
  } catch (error: any) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to reset password' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
