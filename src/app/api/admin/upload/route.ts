import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import crypto from 'crypto';

// Allowed extensions mapped to MIME types for security validation
const ALLOWED_EXTENSIONS: Record<string, string[]> = {
  'jpg': ['image/jpeg', 'image/jpg'],
  'jpeg': ['image/jpeg', 'image/jpg'],
  'png': ['image/png'],
  'gif': ['image/gif'],
  'webp': ['image/webp'],
};

// POST - Upload image
export async function POST(request: NextRequest) {
  const user = await requireAdmin(request);
  if (user instanceof NextResponse) return user;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type by MIME type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // SECURITY: Validate and sanitize file extension
    // Get extension from filename and validate it matches the MIME type
    const originalName = file.name.toLowerCase();
    const lastDotIndex = originalName.lastIndexOf('.');
    const extractedExt = lastDotIndex > 0 ? originalName.substring(lastDotIndex + 1) : '';

    // Validate extension is in allowed list
    if (!extractedExt || !ALLOWED_EXTENSIONS[extractedExt]) {
      return NextResponse.json(
        { success: false, message: 'Invalid file extension. Only jpg, jpeg, png, gif, and webp are allowed.' },
        { status: 400 }
      );
    }

    // SECURITY: Verify MIME type matches the extension to prevent extension spoofing
    if (!ALLOWED_EXTENSIONS[extractedExt].includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'File extension does not match file type.' },
        { status: 400 }
      );
    }

    // SECURITY: Generate secure filename using crypto (not Math.random)
    const timestamp = Date.now();
    const randomStr = crypto.randomBytes(8).toString('hex');
    // Use validated extension only
    const safeExtension = extractedExt === 'jpeg' ? 'jpg' : extractedExt;
    const filename = `blog-${timestamp}-${randomStr}.${safeExtension}`;

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/blog/${filename}`;

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: publicUrl,
        filename: filename,
      },
    });
  } catch (error: any) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload image', error: error.message },
      { status: 500 }
    );
  }
}
