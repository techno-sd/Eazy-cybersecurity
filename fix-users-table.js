// Fix users table schema
require('dotenv').config();
const mysql = require('mysql2/promise');

async function fixUsersTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });

  try {
    console.log('🔄 Fixing users table schema...');

    // Drop tables in correct order (child tables first)
    await connection.query('DROP TABLE IF EXISTS activity_logs');
    await connection.query('DROP TABLE IF EXISTS blog_posts');
    await connection.query('DROP TABLE IF EXISTS consultations');
    await connection.query('DROP TABLE IF EXISTS website_settings');
    await connection.query('DROP TABLE IF EXISTS sessions');
    await connection.query('DROP TABLE IF EXISTS users');
    console.log('✅ Dropped old tables');

    // Create new users table with correct schema
    await connection.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        role ENUM('admin', 'user', 'moderator') DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        failed_login_attempts INT DEFAULT 0,
        last_failed_login TIMESTAMP NULL,
        locked_until TIMESTAMP NULL,
        last_login TIMESTAMP NULL,
        last_login_ip VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_is_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created new users table');

    // Create sessions table
    await connection.query(`
      CREATE TABLE sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        session_token VARCHAR(255) NOT NULL UNIQUE,
        ip_address VARCHAR(45),
        user_agent TEXT,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_session_token (session_token),
        INDEX idx_expires_at (expires_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created sessions table');

    console.log('✅ Users table fixed successfully!');

  } catch (error) {
    console.error('❌ Error fixing users table:', error.message);
  } finally {
    await connection.end();
  }
}

fixUsersTable();
