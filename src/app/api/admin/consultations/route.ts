import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { query } from '@/lib/db';

// Get all consultations
export async function GET(request: NextRequest) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status') || '';
    const priority = searchParams.get('priority') || '';
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    let whereClause = '1=1';
    const params: any[] = [];

    if (status) {
      whereClause += ' AND status = ?';
      params.push(status);
    }

    if (priority) {
      whereClause += ' AND priority = ?';
      params.push(priority);
    }

    if (search) {
      whereClause += ' AND (name LIKE ? OR email LIKE ? OR company LIKE ? OR message LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }

    // Get total count
    const [countResult] = await query<any[]>(
      `SELECT COUNT(*) as total FROM consultations WHERE ${whereClause}`,
      params
    );

    // Get consultations
    const consultations = await query<any[]>(
      `SELECT
        c.*,
        u.full_name as assigned_to_name
       FROM consultations c
       LEFT JOIN users u ON c.assigned_to = u.id
       WHERE ${whereClause}
       ORDER BY
         CASE c.priority
           WHEN 'urgent' THEN 1
           WHEN 'high' THEN 2
           WHEN 'medium' THEN 3
           WHEN 'low' THEN 4
         END,
         c.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: consultations,
      pagination: {
        page,
        limit,
        total: countResult.total,
        totalPages: Math.ceil(countResult.total / limit),
      },
    });
  } catch (error: any) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch consultations', error: error.message },
      { status: 500 }
    );
  }
}

// Create new consultation (from public form)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service_type, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert consultation
    const result = await query<any>(
      `INSERT INTO consultations
       (name, email, phone, company, service_type, message, status, priority, created_at)
       VALUES (?, ?, ?, ?, ?, ?, 'new', 'medium', NOW())`,
      [name, email, phone || null, company || null, service_type || null, message]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request submitted successfully',
        data: { id: result.insertId },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit consultation request', error: error.message },
      { status: 500 }
    );
  }
}
