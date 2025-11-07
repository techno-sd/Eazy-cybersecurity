// Migration script to add phone and company columns to users table
require('dotenv').config();
const mysql = require('mysql2/promise');

async function migrateUsersTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });

  try {
    console.log('🔄 Migrating users table...');

    // Add phone column if it doesn't exist
    try {
      await connection.query(`
        ALTER TABLE users
        ADD COLUMN phone VARCHAR(50) AFTER full_name
      `);
      console.log('✅ Added phone column');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('⏭️  Phone column already exists');
      } else {
        throw error;
      }
    }

    // Add company column if it doesn't exist
    try {
      await connection.query(`
        ALTER TABLE users
        ADD COLUMN company VARCHAR(255) AFTER phone
      `);
      console.log('✅ Added company column');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('⏭️  Company column already exists');
      } else {
        throw error;
      }
    }

    console.log('✅ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration error:', error.message);
  } finally {
    await connection.end();
  }
}

migrateUsersTable();
