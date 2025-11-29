import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, logActivity } from '@/lib/adminAuth';
import { query } from '@/lib/db';
import {
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  checkRateLimit,
  RATE_LIMITS,
  getSecurityHeaders
} from '@/lib/security';

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
    // Rate limiting for public endpoint
    const rateLimitCheck = checkRateLimit(request, RATE_LIMITS.API_CONSULTATION, 'consultation');
    if (!rateLimitCheck.allowed) {
      return rateLimitCheck.response!;
    }

    const body = await request.json();
    const { name, email, phone, company, service_type, message, budget, preferred_date } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Sanitize all text inputs to prevent XSS
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? sanitizeInput(phone) : null;
    const sanitizedCompany = company ? sanitizeInput(company) : null;
    const sanitizedServiceType = service_type ? sanitizeInput(service_type) : null;
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedBudget = budget ? sanitizeInput(budget) : null;

    // Validate sanitized name length
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Name must be between 2 and 100 characters' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Email validation
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Phone validation (if provided)
    if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Message length validation
    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message must be between 10 and 5000 characters' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Get client IP address
    const ip_address = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
                       request.headers.get('x-real-ip') ||
                       'unknown';

    // Validate preferred_date if provided
    let validPreferredDate = null;
    if (preferred_date) {
      const dateObj = new Date(preferred_date);
      if (!isNaN(dateObj.getTime()) && dateObj > new Date()) {
        validPreferredDate = dateObj.toISOString().split('T')[0];
      }
    }

    // Insert consultation with sanitized data
    const result = await query<any>(
      `INSERT INTO consultations
       (contact_person, company_name, email, phone, service_type, description, budget, preferred_date, status, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
      [
        sanitizedName,
        sanitizedCompany,
        sanitizedEmail,
        sanitizedPhone,
        sanitizedServiceType,
        sanitizedMessage,
        sanitizedBudget,
        validPreferredDate,
        ip_address
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request submitted successfully',
        data: { id: result.insertId },
      },
      { status: 201, headers: getSecurityHeaders() }
    );
  } catch (error: any) {
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit consultation request' },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}
