require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('./src/generated/prisma/client');

async function setupDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Setting up database...');
    
    // Check if admin user exists
    let user = await prisma.users.findFirst({
      where: { email: 'admin@eazycyber.sa' }
    });
    
    if (!user) {
      console.log('📝 Creating admin user...');
      user = await prisma.users.create({
        data: {
          email: 'admin@eazycyber.sa',
          password_hash: '$2b$10$abcdefghijklmnopqrstuvwxyz', // dummy hash
          full_name: 'Admin User',
          role: 'admin',
          is_active: true,
        }
      });
      console.log('✅ Admin user created:', user.id);
    } else {
      console.log('✅ Admin user exists:', user.id);
    }
    
    // Insert sample blog posts
    console.log('\n📝 Inserting sample blog posts...');
    const posts = [
      {
        title: 'Getting Started with Cybersecurity',
        title_ar: 'البدء مع الأمن السيبراني',
        slug: 'getting-started-cybersecurity',
        excerpt: 'Learn the fundamentals of cybersecurity and how to protect your digital assets.',
        excerpt_ar: 'تعلم أساسيات الأمن السيبراني وكيفية حماية أصولك الرقمية.',
        content: 'Cybersecurity is the practice of protecting computer systems and networks from digital attacks. In this comprehensive guide, we will explore the key concepts and best practices for securing your digital assets.',
        content_ar: 'الأمن السيبراني هو ممارسة حماية أنظمة وشبكات الكمبيوتر من الهجمات الرقمية. في هذا الدليل الشامل، سنستكشف المفاهيم الرئيسية وأفضل الممارسات لتأمين أصولك الرقمية.',
        featured_image: '/img/blog/cybersecurity-basics.jpg',
        author_id: user.id,
        category: 'Security',
        tags: 'cybersecurity,security,protection',
        status: 'published',
        views: 0,
      },
      {
        title: 'Password Security Best Practices',
        title_ar: 'أفضل ممارسات أمان كلمات المرور',
        slug: 'password-security-best-practices',
        excerpt: 'Discover how to create and manage strong passwords to keep your accounts secure.',
        excerpt_ar: 'اكتشف كيفية إنشاء وإدارة كلمات مرور قوية لإبقاء حساباتك آمنة.',
        content: 'A strong password is your first line of defense against unauthorized access. Learn how to create memorable yet secure passwords that resist common attack methods.',
        content_ar: 'كلمة المرور القوية هي خط الدفاع الأول ضد الوصول غير المصرح به. تعلم كيفية إنشاء كلمات مرور يسهل تذكرها وآمنة تقاوم طرق الهجوم الشائعة.',
        featured_image: '/img/blog/password-security.jpg',
        author_id: user.id,
        category: 'Security',
        tags: 'password,security,protection',
        status: 'published',
        views: 0,
      },
      {
        title: 'Understanding Phishing Attacks',
        title_ar: 'فهم هجمات التصيد الاحتيالي',
        slug: 'understanding-phishing-attacks',
        excerpt: 'Learn to identify and protect yourself from phishing scams.',
        excerpt_ar: 'تعلم كيفية تحديد والحماية من عمليات الاحتيال بالتصيد الاحتيالي.',
        content: 'Phishing attacks are one of the most common cyber threats. This guide will help you understand how phishing works and how to protect yourself and your organization.',
        content_ar: 'هجمات التصيد الاحتيالي هي واحدة من أكثر التهديدات السيبرانية شيوعًا. سيساعدك هذا الدليل على فهم كيفية عمل التصيد الاحتيالي وكيفية حماية نفسك ومنظمتك.',
        featured_image: '/img/blog/phishing-attacks.jpg',
        author_id: user.id,
        category: 'Threats',
        tags: 'phishing,threats,security',
        status: 'published',
        views: 0,
      },
    ];
    
    for (const post of posts) {
      const created = await prisma.blog_posts.create({
        data: post,
      });
      console.log(`✅ Created: "${created.title}"`);
    }
    
    const count = await prisma.blog_posts.count();
    console.log(`\n✅ Total blog posts in database: ${count}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();
