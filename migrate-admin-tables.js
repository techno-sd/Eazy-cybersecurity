// Migration script for admin panel tables
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function migrateAdminTables() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    multipleStatements: true,
  });

  try {
    console.log('🔄 Running admin panel migrations...');

    // Read and execute the schema file
    const schemaPath = path.join(__dirname, 'database', 'admin-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    await connection.query(schema);

    console.log('✅ Admin panel tables created successfully!');
    console.log('📊 Tables created:');
    console.log('   - blog_posts');
    console.log('   - blog_categories');
    console.log('   - consultations');
    console.log('   - website_settings');
    console.log('   - activity_logs');

  } catch (error) {
    console.error('❌ Migration error:', error.message);
  } finally {
    await connection.end();
  }
}

migrateAdminTables();
