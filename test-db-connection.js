require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('./src/generated/prisma/client');

async function testConnection() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Testing database connection...');
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection successful!');
    console.log('Query result:', result);
    
    // Try to count blog posts
    const blogCount = await prisma.blog_posts.count();
    console.log(`✅ Blog posts in database: ${blogCount}`);
    
    // Try to fetch one blog post
    const post = await prisma.blog_posts.findFirst({
      select: {
        id: true,
        title: true,
        slug: true,
        created_at: true,
      },
    });
    
    if (post) {
      console.log('✅ Sample blog post:', post);
    } else {
      console.log('⚠️  No blog posts found in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
