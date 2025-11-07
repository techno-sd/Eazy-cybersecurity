const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const blogPosts = [
  {
    title: "Secure Managed IT",
    title_ar: "إدارة تقنية المعلومات الآمنة",
    slug: "secure-managed-it",
    content: `# Secure Managed IT

In today's digital landscape, organizations face unprecedented cybersecurity challenges. Our Secure Managed IT services provide comprehensive protection for your IT infrastructure, ensuring business continuity and data security.

## Key Features

- 24/7 Security Monitoring
- Proactive Threat Detection
- Incident Response & Management
- Compliance & Regulatory Support
- Regular Security Assessments

## Why Choose Our Managed IT Services?

Our team of certified security professionals delivers enterprise-grade protection tailored to your organization's unique needs. We combine advanced technology with expert knowledge to keep your systems secure and running smoothly.

Contact us today to learn how we can protect your business with our Secure Managed IT solutions.`,
    content_ar: `# إدارة تقنية المعلومات الآمنة

في المشهد الرقمي اليوم، تواجه المؤسسات تحديات أمنية سيبرانية غير مسبوقة. توفر خدمات إدارة تقنية المعلومات الآمنة لدينا حماية شاملة للبنية التحتية لتقنية المعلومات، مما يضمن استمرارية الأعمال وأمن البيانات.

## الميزات الرئيسية

- مراقبة أمنية على مدار الساعة طوال أيام الأسبوع
- كشف استباقي للتهديدات
- الاستجابة للحوادث والإدارة
- دعم الامتثال والتنظيم
- تقييمات أمنية منتظمة

## لماذا تختار خدمات إدارة تقنية المعلومات لدينا؟

يقدم فريقنا من محترفي الأمن المعتمدين حماية من المستوى المؤسسي مصممة خصيصًا لتلبية احتياجات مؤسستك الفريدة. نجمع بين التكنولوجيا المتقدمة والمعرفة المتخصصة للحفاظ على أنظمتك آمنة وتعمل بسلاسة.

اتصل بنا اليوم لمعرفة كيف يمكننا حماية عملك بحلول إدارة تقنية المعلومات الآمنة لدينا.`,
    featured_image: "/img/blog/blog1.jpg",
    category: "Cyber Security",
    status: "published"
  },
  {
    title: "Cloud Security",
    title_ar: "أمن السحابة",
    slug: "cloud-security",
    content: `# Cloud Security Best Practices

As organizations migrate to the cloud, ensuring robust security becomes paramount. Our cloud security solutions protect your data and applications across all major cloud platforms.

## Cloud Security Essentials

- Identity & Access Management
- Data Encryption at Rest and in Transit
- Multi-Factor Authentication
- Security Monitoring & Logging
- Compliance Management

## Protecting Your Cloud Infrastructure

We help organizations implement comprehensive cloud security strategies that protect against evolving threats while maintaining operational efficiency. Our experts guide you through the complexities of cloud security, from initial assessment to ongoing management.

Learn more about securing your cloud environment with our specialized services.`,
    content_ar: `# أفضل ممارسات أمن السحابة

مع انتقال المؤسسات إلى السحابة، يصبح ضمان الأمن القوي أمرًا بالغ الأهمية. تحمي حلول أمن السحابة لدينا بياناتك وتطبيقاتك عبر جميع منصات السحابة الرئيسية.

## أساسيات أمن السحابة

- إدارة الهوية والوصول
- تشفير البيانات أثناء الراحة والعبور
- المصادقة متعددة العوامل
- المراقبة الأمنية والتسجيل
- إدارة الامتثال

## حماية بنيتك التحتية السحابية

نساعد المؤسسات على تنفيذ استراتيجيات أمن سحابي شاملة تحمي من التهديدات المتطورة مع الحفاظ على الكفاءة التشغيلية. يرشدك خبراؤنا خلال تعقيدات أمن السحابة، من التقييم الأولي إلى الإدارة المستمرة.

تعرف على المزيد حول تأمين بيئتك السحابية بخدماتنا المتخصصة.`,
    featured_image: "/img/blog/blog2.jpg",
    category: "Cloud Security",
    status: "published"
  },
  {
    title: "Security in a Fragmented World of Workload",
    title_ar: "الأمان في عالم مجزأ من أعباء العمل",
    slug: "security-fragmented-workload",
    content: `# Security in a Fragmented World of Workload

Modern enterprises operate in increasingly complex, distributed environments. Managing security across fragmented workloads requires a unified, strategic approach.

## Challenges of Distributed Workloads

- Multi-Cloud Environments
- Container Security
- Microservices Architecture
- Remote Workforce Protection
- Third-Party Integration Risks

## Our Unified Security Approach

We provide integrated security solutions that protect your entire workload ecosystem, regardless of where your applications and data reside. Our platform delivers consistent security policies and visibility across all environments.

Discover how we can help you secure your fragmented workloads with our comprehensive security platform.`,
    content_ar: `# الأمان في عالم مجزأ من أعباء العمل

تعمل المؤسسات الحديثة في بيئات معقدة وموزعة بشكل متزايد. تتطلب إدارة الأمان عبر أعباء العمل المجزأة نهجًا استراتيجيًا موحدًا.

## تحديات أعباء العمل الموزعة

- بيئات السحابة المتعددة
- أمن الحاويات
- بنية الخدمات الدقيقة
- حماية القوى العاملة عن بُعد
- مخاطر التكامل مع الجهات الخارجية

## نهجنا الأمني الموحد

نوفر حلول أمنية متكاملة تحمي نظام أعباء العمل بالكامل، بغض النظر عن مكان وجود تطبيقاتك وبياناتك. توفر منصتنا سياسات أمنية متسقة ورؤية عبر جميع البيئات.

اكتشف كيف يمكننا مساعدتك في تأمين أعباء العمل المجزأة بمنصتنا الأمنية الشاملة.`,
    featured_image: "/img/blog/blog3.jpg",
    category: "Hacking Protection",
    status: "published"
  },
  {
    title: "Drughydrus Adds Google Drive to RoughRobin Trojan",
    title_ar: "إضافة Google Drive إلى Trojan RoughRobin",
    slug: "drughydrus-google-drive-roughrobin",
    content: `# Drughydrus Adds Google Drive to RoughRobin Trojan

Recent threat intelligence reveals that the Drughydrus APT group has enhanced their RoughRobin malware with Google Drive integration, making detection and mitigation more challenging.

## Key Findings

- Use of legitimate cloud services for C&C communication
- Advanced evasion techniques
- Targeted attacks on critical infrastructure
- Persistent access mechanisms
- Data exfiltration capabilities

## Protection Strategies

Organizations must implement multi-layered security controls to defend against sophisticated APT campaigns. Our threat intelligence team provides real-time updates and protection strategies against emerging threats.

## Stay Protected

Contact our security operations center for advanced threat protection and incident response services. We help organizations detect, respond to, and recover from advanced persistent threats.`,
    content_ar: `# إضافة Google Drive إلى Trojan RoughRobin

تكشف معلومات التهديد الأخيرة أن مجموعة Drughydrus APT قد عززت برنامج RoughRobin الضار بتكامل Google Drive، مما يجعل الكشف والتخفيف أكثر صعوبة.

## النتائج الرئيسية

- استخدام خدمات السحابة الشرعية لاتصال C&C
- تقنيات التهرب المتقدمة
- هجمات مستهدفة على البنية التحتية الحرجة
- آليات الوصول المستمر
- قدرات تسريب البيانات

## استراتيجيات الحماية

يجب على المؤسسات تنفيذ ضوابط أمنية متعددة الطبقات للدفاع ضد حملات APT المتطورة. يوفر فريق معلومات التهديد لدينا تحديثات في الوقت الفعلي واستراتيجيات حماية ضد التهديدات الناشئة.

## ابق محميًا

اتصل بمركز عمليات الأمان لدينا للحصول على حماية متقدمة من التهديدات وخدمات الاستجابة للحوادث. نساعد المؤسسات على اكتشاف التهديدات المستمرة المتقدمة والاستجابة لها والتعافي منها.`,
    featured_image: "/img/blog/blog4.jpg",
    category: "Cyber Crime",
    status: "published"
  }
];

async function migrateBlogPosts() {
  let connection;

  try {
    console.log('🔄 Connecting to database...');
    connection = await mysql.createConnection({
      host: envVars.DB_HOST,
      port: parseInt(envVars.DB_PORT || '3306'),
      user: envVars.DB_USER,
      password: envVars.DB_PASSWORD,
      database: envVars.DB_NAME || 'eazyDb',
      ssl: envVars.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    });

    console.log('✅ Connected to database');

    // Get admin user ID
    const [adminUsers] = await connection.query(
      'SELECT id FROM users WHERE role = ? LIMIT 1',
      ['admin']
    );

    if (adminUsers.length === 0) {
      console.error('❌ No admin user found. Please create an admin user first.');
      return;
    }

    const adminId = adminUsers[0].id;
    console.log(`👤 Using admin user ID: ${adminId}`);

    // Check if posts already exist
    const [existingPosts] = await connection.query(
      'SELECT COUNT(*) as count FROM blog_posts'
    );

    if (existingPosts[0].count > 0) {
      console.log(`⚠️  Found ${existingPosts[0].count} existing blog posts.`);
      console.log('   Skipping migration. Delete existing posts if you want to re-migrate.');
      return;
    }

    console.log('\n📝 Migrating blog posts...');

    for (const post of blogPosts) {
      try {
        const [result] = await connection.query(
          `INSERT INTO blog_posts (
            title, title_ar, slug, content, content_ar,
            featured_image, author_id, category, status, published_at, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            post.title,
            post.title_ar,
            post.slug,
            post.content,
            post.content_ar,
            post.featured_image,
            adminId,
            post.category,
            post.status
          ]
        );

        console.log(`   ✓ Migrated: ${post.title} (ID: ${result.insertId})`);
      } catch (error) {
        console.error(`   ✗ Failed to migrate: ${post.title}`, error.message);
      }
    }

    console.log('\n✅ Blog post migration completed!');
    console.log(`   Total posts migrated: ${blogPosts.length}`);
    console.log('\n📍 Next steps:');
    console.log('   1. Visit http://localhost:3003/admin/blog to see your posts');
    console.log('   2. The frontend blog page will now fetch from database');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

migrateBlogPosts();
