import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { getSecurityHeaders } from "@/lib/security";

// Update consultation status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Get user from database
    const users = await query<any[]>(
      "SELECT id, role FROM users WHERE id = ? AND is_active = true",
      [decoded.userId]
    );

    if (users.length === 0 || (users[0].role !== "admin" && users[0].role !== "moderator")) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    const validStatuses = ['pending', 'scheduled', 'completed', 'cancelled'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update consultation
    await query(
      `UPDATE consultations
       SET status = ?, updated_at = NOW()
       WHERE id = ?`,
      [status, id]
    );

    return NextResponse.json({
      success: true,
      message: 'Consultation status updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating consultation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update consultation' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

// Delete consultation
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // Get user from database
    const users = await query<any[]>(
      "SELECT id, role FROM users WHERE id = ? AND is_active = true",
      [decoded.userId]
    );

    if (users.length === 0 || users[0].role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Forbidden - Admin only" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Delete consultation
    await query(
      `DELETE FROM consultations WHERE id = ?`,
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'Consultation deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting consultation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete consultation' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
