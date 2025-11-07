-- Eazy Cyber Agent Database Schema
-- For use with Aiven MySQL (assumed >= 8.0)
-- Security & performance enhancements applied:
--  * Use BIGINT UNSIGNED PKs for scalability
--  * Add composite and selective indexes for common query patterns
--  * Add CHECK constraints where lightweight validation is useful (MySQL 8.0 enforces)
--  * Introduce session revocation and auditing columns
--  * Strengthen token column type (fixed length CHAR for hashed/token values)
--  * Add ON UPDATE CASCADE on FK to maintain referential integrity
--  * Provide comments to guide future migrations & privacy (PII considerations)
--  * Suggest strict SQL modes (to be set at server level, not in DDL): NO_ZERO_DATE, STRICT_TRANS_TABLES

-- NOTE: If existing tables already deployed with INT PKs, migrating to BIGINT requires:
--  ALTER TABLE <table> MODIFY COLUMN id BIGINT UNSIGNED AUTO_INCREMENT;
-- Apply in maintenance window; ensure no FK type mismatches.

CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(32), -- Keep lean; store E.164 (+XXXXXXXXXXX)
  subject VARCHAR(300) NOT NULL, -- Trim length for better index fit
  message TEXT NOT NULL, -- Consider MEDIUMTEXT only if expecting >64KB content
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  -- Basic email pattern check (not exhaustive). Remove if causing false negatives.
  CONSTRAINT chk_contacts_email CHECK (email LIKE '%@%.%'),
  INDEX idx_contacts_email_created (email, created_at),
  INDEX idx_contacts_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE, -- Reduced length improves index efficiency
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL, -- Supports bcrypt/argon2id/sha256-hmac etc.
  password_algo VARCHAR(32) DEFAULT 'argon2id', -- Track hash algorithm for future migrations
  full_name VARCHAR(255),
  role ENUM('admin', 'user') DEFAULT 'user',
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL,
  -- Lightweight validation examples (optional; remove if legacy version ignores CHECK)
  CONSTRAINT chk_users_username CHECK (CHAR_LENGTH(username) >= 3),
  CONSTRAINT chk_users_email CHECK (email LIKE '%@%.%'),
  INDEX idx_users_email (email),
  INDEX idx_users_username (username),
  INDEX idx_users_role_active (role, is_active),
  INDEX idx_users_last_login (last_login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  session_token CHAR(128) NOT NULL UNIQUE, -- Fixed length for hashed/encoded tokens
  ip_address VARCHAR(45), -- IPv4/IPv6
  user_agent TEXT, -- Consider truncation strategy in application layer
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  revoked_at TIMESTAMP NULL, -- If set, token invalidated before expiry
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT chk_sessions_expiry CHECK (expires_at > created_at),
  INDEX idx_sessions_token (session_token),
  INDEX idx_sessions_user_expires (user_id, expires_at),
  INDEX idx_sessions_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Additional Recommendations (not executed here):
-- 1. Enable encryption at rest (Aiven managed) + TLS in transit.
-- 2. Rotate session_token secrets and prefer HMAC or Argon2id derived token values.
-- 3. Periodically purge expired/revoked sessions (scheduled job).
-- 4. Use least privilege DB user (SELECT/INSERT/UPDATE/DELETE only, no SUPER).
-- 5. Consider masking or encrypting PII fields (email, full_name) for compliance.
-- 6. Apply slow query log & examine for missing indexes.
-- 7. Enforce strict SQL mode and utf8mb4 everywhere for full Unicode.
