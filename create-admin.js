// Create admin user script
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function createAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });

  try {
    // Hash the password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash('Admin@Eazy', salt);

    // Insert admin user
    const [result] = await connection.query(
      `INSERT INTO users (
        email,
        password_hash,
        full_name,
        phone,
        company,
        role,
        is_active,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        'admin@eazycyber.sa',
        passwordHash,
        'Admin User',
        '+966123456789',
        'Eazy Cyber Agent',
        'admin',
        true
      ]
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@eazycyber.sa');
    console.log('🔑 Password: Admin@Eazy');
    console.log('👤 Role: admin');
    console.log(`🆔 User ID: ${result.insertId}`);

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('⚠️  Admin user already exists!');

      // Update existing admin user
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash('Admin@Eazy', salt);

      await connection.query(
        `UPDATE users
         SET password_hash = ?,
             full_name = ?,
             phone = ?,
             company = ?,
             role = ?,
             is_active = ?
         WHERE email = ?`,
        [
          passwordHash,
          'Admin User',
          '+966123456789',
          'Eazy Cyber Agent',
          'admin',
          true,
          'admin@eazycyber.sa'
        ]
      );

      console.log('✅ Admin user updated successfully!');
      console.log('📧 Email: admin@eazycyber.sa');
      console.log('🔑 Password: Admin@Eazy');
      console.log('👤 Role: admin');
    } else {
      console.error('❌ Error creating admin user:', error.message);
    }
  } finally {
    await connection.end();
  }
}

createAdmin();
