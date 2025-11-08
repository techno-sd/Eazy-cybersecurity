import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { rateLimit, getClientIp, RATE_LIMITS, getSecurityHeaders, isValidEmail as validateEmail } from '@/lib/security';

interface Contact extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: Date;
}

// GET - Retrieve all contacts (Admin only - should be protected by middleware)
export async function GET() {
  try {
    const contacts = await query<Contact[]>(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    return NextResponse.json(
      {
        success: true,
        data: contacts,
        count: contacts.length
      },
      {
        headers: getSecurityHeaders()
      }
    );

  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch contacts',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      {
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

// POST - Create a new contact
export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const clientIp = getClientIp(request);

    // Apply rate limiting
    const limit = rateLimit(clientIp, RATE_LIMITS.API_CONTACT);

    if (!limit.allowed) {
      const retryAfter = Math.ceil((limit.resetTime - Date.now()) / 1000);
      return NextResponse.json(
        {
          success: false,
          message: 'Too many contact submissions. Please try again later.',
          retryAfter
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            ...getSecurityHeaders()
          }
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: name, email, subject, message'
        },
        {
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format'
        },
        {
          status: 400,
          headers: getSecurityHeaders()
        }
      );
    }

    // Insert the contact into the database
    const result = await query<any>(
      `INSERT INTO contacts (name, email, phone, subject, message, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [name, email, phone || null, subject, message]
    );

    // Fetch the newly created contact
    const newContact = await queryOne<Contact>(
      'SELECT * FROM contacts WHERE id = ?',
      [result.insertId]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Contact created successfully',
        data: newContact
      },
      {
        status: 201,
        headers: getSecurityHeaders()
      }
    );

  } catch (error: any) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create contact',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      {
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}
