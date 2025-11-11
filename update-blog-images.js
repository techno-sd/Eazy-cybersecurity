require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('./src/generated/prisma/client');

async function updateBlogImages() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Updating blog post images...');
    
    // Update featured images with actual file paths
    const updates = [
      {
        id: 2,
        slug: 'getting-started-cybersecurity',
        featured_image: '/img/blog/blog1.jpg'
      },
      {
        id: 3,
        slug: 'password-security-best-practices',
        featured_image: '/img/blog/blog2.jpg'
      },
      {
        id: 4,
        slug: 'understanding-phishing-attacks',
        featured_image: '/img/blog/blog3.jpg'
      }
    ];
    
    for (const update of updates) {
      const post = await prisma.blog_posts.update({
        where: { id: update.id },
        data: { featured_image: update.featured_image }
      });
      console.log(`✅ Updated: ${post.title} -> ${post.featured_image}`);
    }
    
    // Verify images
    console.log('\n📸 Current blog post images:');
    const posts = await prisma.blog_posts.findMany({
      select: {
        id: true,
        title: true,
        featured_image: true
      }
    });
    
    posts.forEach(post => {
      console.log(`  ${post.id}. ${post.title}`);
      console.log(`     Image: ${post.featured_image}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateBlogImages();
