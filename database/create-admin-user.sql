-- ============================================================================
-- Create Admin User for Eazy Cyber Agent
-- ============================================================================
-- This file creates a default admin user for testing and initial setup.
--
-- IMPORTANT SECURITY NOTES:
-- 1. This creates a user with a DEFAULT PASSWORD that you MUST change
-- 2. Only use this for initial setup and testing
-- 3. Change the password immediately after first login
-- 4. In production, create users through the registration API with strong passwords
--
-- Default Credentials:
-- Username: admin
-- Email: admin@eazycyber.sa
-- Password: Admin@2025!
-- ============================================================================

-- Delete existing admin user if exists (for clean reinstall)
DELETE FROM users WHERE email = 'admin@eazycyber.sa';

-- Create admin user
-- Password: Admin@2025! (bcrypt hash with 10 rounds)
-- This is a TEST password - CHANGE IT IMMEDIATELY after first login!
INSERT INTO users (
  id,
  username,
  email,
  password_hash,
  password_algo,
  full_name,
  phone,
  company,
  role,
  is_active,
  created_at,
  updated_at
) VALUES (
  1,
  'admin',
  'admin@eazycyber.sa',
  '$2b$10$4k/HUteaQz9e2HB1Le.dL.F5xWM8LYsWxNtT535br167mvii.71wO',
  'bcrypt',
  'System Administrator',
  '+966 50 123 4567',
  'Eazy Cyber Agent',
  'admin',
  1,
  NOW(),
  NOW()
);

-- Verify the user was created
SELECT
  id,
  username,
  email,
  full_name,
  role,
  is_active,
  created_at
FROM users
WHERE email = 'admin@eazycyber.sa';

-- ============================================================================
-- NEXT STEPS:
-- ============================================================================
-- 1. Run this script: mysql -h <host> -P <port> -u <user> -p <db> < create-admin-user.sql
-- 2. Log in with:
--    Email: admin@eazycyber.sa
--    Password: Admin@2025!
-- 3. IMMEDIATELY change the password after first login
-- 4. For production, use the /api/auth/register endpoint to create users
-- ============================================================================

-- ============================================================================
-- TO GENERATE A NEW BCRYPT HASH (Node.js):
-- ============================================================================
-- const bcrypt = require('bcryptjs');
-- const password = 'YourStrongPassword123!';
-- const hash = bcrypt.hashSync(password, 10);
-- console.log(hash);
-- ============================================================================
