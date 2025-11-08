-- ============================================================================
-- Eazy Cyber Agent - Complete Database Schema
-- ============================================================================
-- This file contains the complete database schema in the correct order
-- to avoid foreign key constraint errors.
--
-- Order of execution:
-- 1. Core tables (users, contacts)
-- 2. Admin panel tables (blog_posts, consultations, etc.)
-- 3. Default data (categories, settings)
--
-- MySQL Version: 8.0+
-- Character Set: utf8mb4 (full Unicode support)
-- ============================================================================

-- ============================================================================
-- SECTION 1: CORE TABLES
-- ============================================================================

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32),
  subject VARCHAR(300) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_contacts_email CHECK (email LIKE '%@%.%'),
  INDEX idx_contacts_email_created (email, created_at),
  INDEX idx_contacts_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  password_algo VARCHAR(32) DEFAULT 'argon2id',
  full_name VARCHAR(255),
  phone VARCHAR(32),
  company VARCHAR(255),
  role ENUM('admin', 'user') DEFAULT 'user',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  CONSTRAINT chk_users_username CHECK (CHAR_LENGTH(username) >= 3),
  CONSTRAINT chk_users_email CHECK (email LIKE '%@%.%'),
  INDEX idx_users_email (email),
  INDEX idx_users_username (username),
  INDEX idx_users_role_active (role, is_active),
  INDEX idx_users_last_login (last_login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Sessions Table
CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  session_token CHAR(128) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP NULL,
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chk_sessions_expiry CHECK (expires_at > created_at),
  INDEX idx_sessions_token (session_token),
  INDEX idx_sessions_user_expires (user_id, expires_at),
  INDEX idx_sessions_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- ============================================================================
-- SECTION 2: ADMIN PANEL TABLES
-- ============================================================================

-- Blog Categories Table
CREATE TABLE IF NOT EXISTS blog_categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  description_ar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  title_ar VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  excerpt_ar TEXT,
  content LONGTEXT NOT NULL,
  content_ar LONGTEXT NOT NULL,
  featured_image VARCHAR(500),
  author_id BIGINT UNSIGNED NOT NULL,
  category VARCHAR(100),
  tags JSON,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  views INT DEFAULT 0,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_blog_posts_author FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_published_at (published_at),
  INDEX idx_author_id (author_id),
  FULLTEXT INDEX idx_content (title, content, title_ar, content_ar)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Consultations Table
CREATE TABLE IF NOT EXISTS consultations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service_type VARCHAR(100),
  message TEXT NOT NULL,
  status ENUM('new', 'in_progress', 'completed', 'cancelled') DEFAULT 'new',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  assigned_to BIGINT UNSIGNED NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_consultations_assigned FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_email (email),
  INDEX idx_status (status),
  INDEX idx_priority (priority),
  INDEX idx_created_at (created_at),
  INDEX idx_assigned_to (assigned_to)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Website Settings Table
CREATE TABLE IF NOT EXISTS website_settings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
  description VARCHAR(500),
  updated_by BIGINT UNSIGNED NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_settings_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity Log Table
CREATE TABLE IF NOT EXISTS activity_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id BIGINT UNSIGNED,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_activity_logs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SECTION 3: DEFAULT DATA
-- ============================================================================

-- Insert default blog categories
INSERT INTO blog_categories (name, name_ar, slug, description, description_ar) VALUES
('Cybersecurity', 'الأمن السيبراني', 'cybersecurity', 'Latest cybersecurity news and tips', 'آخر أخبار ونصائح الأمن السيبراني'),
('Artificial Intelligence', 'الذكاء الاصطناعي', 'artificial-intelligence', 'AI innovations and applications', 'ابتكارات وتطبيقات الذكاء الاصطناعي'),
('Cloud Computing', 'الحوسبة السحابية', 'cloud-computing', 'Cloud solutions and services', 'حلول وخدمات الحوسبة السحابية'),
('Digital Transformation', 'التحول الرقمي', 'digital-transformation', 'Digital transformation strategies', 'استراتيجيات التحول الرقمي'),
('Vision 2030', 'رؤية 2030', 'vision-2030', 'Vision 2030 initiatives', 'مبادرات رؤية 2030')
ON DUPLICATE KEY UPDATE name=name;

-- Insert default website settings
INSERT INTO website_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Eazy Cyber Agent', 'text', 'Website name'),
('site_email', 'info@eazycyber.sa', 'text', 'Contact email'),
('site_phone', '+966 XX XXX XXXX', 'text', 'Contact phone'),
('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode'),
('posts_per_page', '10', 'number', 'Blog posts per page')
ON DUPLICATE KEY UPDATE setting_value=setting_value;

-- ============================================================================
-- NOTES & RECOMMENDATIONS
-- ============================================================================
--
-- 1. Security:
--    - Enable encryption at rest (Aiven managed)
--    - Use TLS for all connections
--    - Rotate session tokens regularly
--    - Use least privilege DB user
--
-- 2. Performance:
--    - Periodically purge expired sessions
--    - Monitor slow query log
--    - Review and optimize indexes based on actual query patterns
--
-- 3. Compliance:
--    - Consider PII encryption for sensitive fields
--    - Implement data retention policies
--    - Regular backups and disaster recovery testing
--
-- 4. Maintenance:
--    - Use strict SQL mode: NO_ZERO_DATE, STRICT_TRANS_TABLES
--    - Regular ANALYZE TABLE to update statistics
--    - Monitor table sizes and implement archiving strategy
--
-- ============================================================================
