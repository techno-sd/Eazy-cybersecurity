// Insert sample consultations data
require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function insertSampleConsultations() {
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
    console.log('📊 Inserting sample consultations data...');

    // Read the SQL file
    const sqlPath = path.join(__dirname, 'database', 'sample-consultations.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute the SQL
    await connection.query(sql);

    // Get count of consultations
    const [rows] = await connection.query('SELECT COUNT(*) as total FROM consultations');

    console.log('✅ Sample consultations inserted successfully!');
    console.log(`📈 Total consultations in database: ${rows[0].total}`);
    console.log('');
    console.log('Sample data includes:');
    console.log('   - 12 consultation requests');
    console.log('   - Mix of Arabic and English content');
    console.log('   - Various service types (الأمن السيبراني, الذكاء الاصطناعي, etc.)');
    console.log('   - Different statuses: new, in_progress, completed, cancelled');
    console.log('   - Priority levels: low, medium, high, urgent');
    console.log('');
    console.log('🔍 You can now view these consultations in the admin panel:');
    console.log('   http://localhost:3000/admin (after npm run dev)');

  } catch (error) {
    console.error('❌ Error inserting sample data:', error.message);
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Make sure the consultations table exists (run migrate-admin-tables.js first)');
    console.error('   2. Check database connection settings');
    console.error('   3. Verify you have write permissions');
  } finally {
    await connection.end();
  }
}

insertSampleConsultations();
