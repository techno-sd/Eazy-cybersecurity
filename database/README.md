# Database Schema Files

This directory contains SQL schema files for the Eazy Cyber Agent application.

## Files Overview

### 1. `complete-schema.sql` ⭐ **MAIN SCHEMA FILE**
**Use this file for database setup.**

This file contains the complete database schema in the correct order:
- Core tables (contacts, users, sessions)
- Admin panel tables (blog_posts, blog_categories, consultations, website_settings, activity_logs)
- Default data (categories, settings)

All tables use `BIGINT UNSIGNED` for primary keys for scalability and consistency.

**Usage:**
```bash
# You will be prompted for the password
mysql -h <your-host> -P <port> -u <username> -p <database> < database/complete-schema.sql
```

---

### 2. `sample-blog-posts.sql` (Optional)
Contains sample bilingual blog posts for testing the blog functionality.

**Includes:**
- 4 published posts (Cybersecurity, AI, Vision 2030, Cloud Computing)
- 1 draft post
- Full bilingual content (English & Arabic)
- Realistic view counts and publish dates

**Usage:**
```bash
mysql -h <your-host> -P <port> -u <username> -p <database> < database/sample-blog-posts.sql
```

### 3. `sample-consultations.sql` (Optional)
Contains sample consultation data for testing purposes.

**Usage:**
```bash
mysql -h <your-host> -P <port> -u <username> -p <database> < database/sample-consultations.sql
```

---

## Quick Start Guide

### Fresh Setup
If you're setting up the database for the first time:

```bash
# Step 1: Run the complete schema
mysql -h <your-host> -P <port> -u <username> -p <database> < database/complete-schema.sql

# Step 2 (Optional): Add sample blog posts
mysql -h <your-host> -P <port> -u <username> -p <database> < database/sample-blog-posts.sql

# Step 3 (Optional): Add sample consultations
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

### Error: "Table already exists"

**Cause:** Tables already created.

**Solution:** The schema uses `CREATE TABLE IF NOT EXISTS`, so this is just a warning and can be safely ignored.

### Error: "Duplicate entry for key"

**Cause:** Default data already inserted.

**Solution:** The INSERT statements use `ON DUPLICATE KEY UPDATE`, so this is just a warning and can be safely ignored.

### Need to reset the database?

**Drop all tables and start fresh:**
```sql
-- Warning: This will delete all data!
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS website_settings;
DROP TABLE IF EXISTS consultations;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS blog_categories;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS contacts;
```

Then run `complete-schema.sql` again.

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

### Table Relationships

```
users (1) ──< (N) sessions
users (1) ──< (N) blog_posts
users (1) ──< (N) consultations (assigned_to)
users (1) ──< (N) website_settings (updated_by)
users (1) ──< (N) activity_logs
```

---

## Key Features

✅ **Bilingual Support**: Arabic and English fields for blog content
✅ **Security**: Password hashing, session management, audit logs
✅ **Performance**: Indexed columns for fast queries
✅ **Scalability**: BIGINT UNSIGNED IDs for large datasets
✅ **Data Integrity**: Foreign key constraints with CASCADE rules
✅ **Full-Text Search**: FULLTEXT indexes on blog content
✅ **Session Management**: Token-based auth with expiry and revocation
✅ **Audit Trail**: Activity logs for user actions

---

## Schema Details

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `contacts` | Contact form submissions | name, email, subject, message |
| `users` | User accounts | username, email, password_hash, role |
| `sessions` | Auth sessions | session_token, user_id, expires_at |

### Admin Panel Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `blog_posts` | Blog articles (bilingual) | title, title_ar, content, content_ar, slug |
| `blog_categories` | Blog categories | name, name_ar, slug |
| `consultations` | Consultation requests | name, email, service_type, status, priority |
| `website_settings` | Site configuration | setting_key, setting_value, setting_type |
| `activity_logs` | User activity tracking | user_id, action, entity_type, entity_id |

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

1. **Create an admin user:**
```sql
INSERT INTO users (username, email, password_hash, full_name, role, is_active)
VALUES ('admin', 'admin@eazycyber.sa', '$2b$10$...', 'Admin User', 'admin', 1);
```

2. **Test authentication endpoints:**
   - POST `/api/auth/register`
   - POST `/api/auth/login`

3. **Create blog posts** via admin panel at `/admin/blog`

4. **Monitor activity logs** for user actions

---

## Default Data

The schema includes default data for:

- **Blog Categories:**
  - Cybersecurity (الأمن السيبراني)
  - Artificial Intelligence (الذكاء الاصطناعي)
  - Cloud Computing (الحوسبة السحابية)
  - Digital Transformation (التحول الرقمي)
  - Vision 2030 (رؤية 2030)

- **Website Settings:**
  - site_name: "Eazy Cyber Agent"
  - site_email: "info@eazycyber.sa"
  - site_phone: "+966 XX XXX XXXX"
  - maintenance_mode: false
  - posts_per_page: 10

---

## Maintenance Tips

1. **Purge expired sessions regularly:**
```sql
DELETE FROM sessions WHERE expires_at < NOW() OR revoked_at IS NOT NULL;
```

2. **Archive old activity logs:**
```sql
-- Move logs older than 90 days to archive table
-- Implement based on your retention policy
```

3. **Monitor table sizes:**
```sql
SELECT
  table_name,
  ROUND((data_length + index_length) / 1024 / 1024, 2) AS size_mb
FROM information_schema.tables
WHERE table_schema = 'defaultdb'
ORDER BY (data_length + index_length) DESC;
```

---

**Last Updated:** January 2025
**MySQL Version:** 8.0+
**Character Set:** utf8mb4 (full Unicode support)
**Collation:** utf8mb4_unicode_ci
