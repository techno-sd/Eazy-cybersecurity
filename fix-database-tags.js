require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function fixTagsColumn() {
  let connection;

  try {
    // Parse DATABASE_URL
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL not found in environment');
    }

    // Extract connection details from URL
    const url = new URL(dbUrl);
    const config = {
      host: url.hostname,
      port: url.port || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.slice(1), // Remove leading slash
      ssl: url.searchParams.get('ssl') ? { rejectUnauthorized: false } : undefined,
    };

    console.log('🔄 Connecting to database...');
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');

    // Step 1: Check current column type
    console.log('\n📊 Checking current column structure...');
    const [columns] = await connection.query(
      "SHOW COLUMNS FROM blog_posts WHERE Field = 'tags'"
    );
    console.log('Current tags column:', columns[0]);

    // Step 2: Alter column type to JSON
    console.log('\n🔧 Altering tags column to JSON type...');
    await connection.query(`
      ALTER TABLE blog_posts
      MODIFY COLUMN tags JSON NULL
    `);
    console.log('✅ Column type updated to JSON');

    // Step 3: Verify the change
    console.log('\n📊 Verifying change...');
    const [newColumns] = await connection.query(
      "SHOW COLUMNS FROM blog_posts WHERE Field = 'tags'"
    );
    console.log('New tags column:', newColumns[0]);

    // Step 4: Check existing data
    console.log('\n📝 Checking existing blog posts...');
    const [posts] = await connection.query(
      'SELECT id, title, tags FROM blog_posts'
    );
    console.log(`Found ${posts.length} blog posts`);

    posts.forEach(post => {
      console.log(`  - Post ${post.id}: ${post.title}`);
      console.log(`    Tags:`, post.tags);
    });

    console.log('\n✅ Migration completed successfully!');
    console.log('\n⚠️  Please restart your application for changes to take effect.');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

fixTagsColumn();
