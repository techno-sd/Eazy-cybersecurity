# Database Schema Files

This directory contains SQL schema files for the Eazy Cyber Agent application.

## Files Overview

### 1. `complete-schema.sql` ⭐ **RECOMMENDED**
**Use this file for a fresh database setup.**

This file contains the complete database schema in the correct order:
- Core tables (contacts, users, sessions)
- Admin panel tables (blog_posts, consultations, etc.)
- Default data (categories, settings)

**Usage:**
```bash
# You will be prompted for the password
mysql -h <your-host> -P <port> -u <username> -p <database> < database/complete-schema.sql
```

---

### 2. `schema.sql`
Contains the core tables:
- `contacts` - Contact form submissions
- `users` - User accounts
- `sessions` - User authentication sessions

**Usage:**
Run this first if you want to apply schemas separately:
```bash
mysql -h <your-host> -P <port> -u <username> -p <database> < database/schema.sql
```

---

### 3. `admin-schema.sql`
Contains admin panel tables:
- `blog_posts` - Blog articles
- `blog_categories` - Blog categories
- `consultations` - Consultation requests
- `website_settings` - Site configuration
- `activity_logs` - User activity tracking

**⚠️ IMPORTANT:** This file requires the `users` table to exist first!

**Usage:**
```bash
# Run schema.sql first, then run this:
mysql -h <your-host> -P <port> -u <username> -p <database> < database/admin-schema.sql
```

---

### 4. `sample-consultations.sql`
Contains sample consultation data for testing.

---

## Quick Start Guide

### Option 1: Fresh Setup (Recommended)
If you're setting up the database for the first time:

```bash
# Use the complete schema file (you will be prompted for password)
mysql -h <your-host> -P <port> -u <username> -p <database> < database/complete-schema.sql
```

### Option 2: Separate Files
If you prefer to run files separately:

```bash
# Step 1: Create core tables
mysql -h <your-host> -P <port> -u <username> -p <database> < database/schema.sql

# Step 2: Create admin panel tables
mysql -h <your-host> -P <port> -u <username> -p <database> < database/admin-schema.sql

# Step 3 (Optional): Add sample data
mysql -h <your-host> -P <port> -u <username> -p <database> < database/sample-consultations.sql
```

---

## Using MySQL Workbench

1. **Connect to your MySQL database:**
   - Host: Your database host
   - Port: Your database port
   - Username: Your database username
   - Password: Your database password
   - Database: Your database name
   - SSL: Required (if applicable)

2. **Run SQL File:**
   - File → Run SQL Script
   - Select `complete-schema.sql`
   - Click "Run"

---

## Troubleshooting

### Error: "Cannot add foreign key constraint"

**Cause:** The `users` table doesn't exist or has a different ID type.

**Solution:**
- Use `complete-schema.sql` instead of individual files
- OR run `schema.sql` before `admin-schema.sql`

### Error: "Table already exists"

**Cause:** Tables already created.

**Solution:** The schema uses `CREATE TABLE IF NOT EXISTS`, so this is just a warning and can be safely ignored.

### Error: "Duplicate entry for key"

**Cause:** Default data already inserted.

**Solution:** The INSERT statements use `ON DUPLICATE KEY UPDATE`, so this is just a warning and can be safely ignored.

---

## Database Structure

```
defaultdb/
├── contacts              # Contact form submissions
├── users                 # User accounts (admin, user)
├── sessions              # Authentication sessions
├── blog_posts            # Blog articles (bilingual)
├── blog_categories       # Blog categories
├── consultations         # Consultation requests
├── website_settings      # Site configuration
└── activity_logs         # User activity audit trail
```

---

## Key Features

✅ **Bilingual Support**: Arabic and English fields for blog content
✅ **Security**: Password hashing, session management, audit logs
✅ **Performance**: Indexed columns for fast queries
✅ **Scalability**: BIGINT UNSIGNED IDs for large datasets
✅ **Data Integrity**: Foreign key constraints with CASCADE rules
✅ **Full-Text Search**: FULLTEXT indexes on blog content

---

## Environment Variables

Make sure your `.env.local` file has:

```env
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>?ssl-mode=REQUIRED"
```

Replace the placeholders with your actual database credentials.

---

## Next Steps

After running the schema:

1. **Create an admin user** (use Prisma Studio or SQL)
2. **Test authentication** endpoints
3. **Create blog posts** via admin panel
4. **Monitor activity logs** for user actions

---

**Last Updated:** January 2025
**MySQL Version:** 8.0+
**Character Set:** utf8mb4 (full Unicode support)
