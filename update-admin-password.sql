-- ============================================================================
-- Update Admin Password SQL
-- ============================================================================
-- This script updates the admin password to: Admin@Eazy
--
-- IMPORTANT: This hash was generated using bcrypt with 10 rounds
-- Hash: $2b$10$uLq8RtHxSDEwWhwe/v4W7.7RSZPJFjHvtt4Ou9Xv/nvMr/8g5LIHe
--
-- Usage:
--   mysql -h HOST -u USER -p DATABASE < update-admin-password.sql
--
-- OR you can use the Node.js script instead (recommended):
--   node set-admin-password.js "Admin@Eazy"
-- ============================================================================

-- Update admin password
UPDATE users
SET password_hash = '$2b$10$uLq8RtHxSDEwWhwe/v4W7.7RSZPJFjHvtt4Ou9Xv/nvMr/8g5LIHe',
    failed_login_attempts = 0,
    locked_until = NULL,
    updated_at = NOW()
WHERE email = 'admin@eazycyber.sa';

-- Verify the update
SELECT id, email, full_name, role, is_active, created_at, updated_at
FROM users
WHERE email = 'admin@eazycyber.sa';
