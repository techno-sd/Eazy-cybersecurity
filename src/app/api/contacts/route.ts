import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Contact extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: Date;
}

// GET - Retrieve all contacts
export async function GET() {
  try {
    const contacts = await query<Contact[]>(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    return NextResponse.json({
      success: true,
      data: contacts,
      count: contacts.length
    });

  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch contacts',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// POST - Create a new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: name, email, subject, message'
        },
        { status: 400 }
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
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create contact',
        error: error.message
      },
      { status: 500 }
    );
  }
}
