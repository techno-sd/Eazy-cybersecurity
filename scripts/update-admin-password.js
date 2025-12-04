/**
 * Script to update admin password with proper bcrypt hashing
 * Run with: node scripts/update-admin-password.js
 */

const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const NEW_PASSWORD = 'Maz@Zizo#2025Adm';
const ADMIN_EMAIL = 'admin@eazycyber.sa'; // Change this to your admin email

async function updateAdminPassword() {
  console.log('🔐 Updating admin password...\n');

  // Hash the password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(NEW_PASSWORD, salt);

  console.log('✅ Password hashed successfully');

  // Connect to database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });

  console.log('✅ Connected to database');

  try {
    // Update the password
    const [result] = await connection.execute(
      'UPDATE users SET password_hash = ?, updated_at = NOW() WHERE email = ? OR role = ?',
      [passwordHash, ADMIN_EMAIL, 'admin']
    );

    if (result.affectedRows > 0) {
      console.log(`✅ Password updated for ${result.affectedRows} admin user(s)`);
    } else {
      console.log('⚠️  No admin user found. Creating one...');

      // Create admin user if doesn't exist
      await connection.execute(
        `INSERT INTO users (email, password_hash, full_name, role, is_active, is_verified)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [ADMIN_EMAIL, passwordHash, 'Administrator', 'admin', true, true]
      );
      console.log('✅ Admin user created successfully');
    }

    console.log('\n🎉 Done! You can now login with:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${NEW_PASSWORD}`);

  } finally {
    await connection.end();
  }
}

updateAdminPassword().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
