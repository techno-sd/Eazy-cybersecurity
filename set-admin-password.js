require('dotenv').config({ path: '.env.local' });
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('./src/generated/prisma/client');

async function setAdminPassword() {
  const prisma = new PrismaClient();
  const newPassword = process.argv[2] || 'Admin@123456';
  
  try {
    console.log('🔄 Setting admin password...');
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update admin user
    const updated = await prisma.users.update({
      where: { email: 'admin@eazycyber.sa' },
      data: { password_hash: hashedPassword }
    });
    
    console.log('✅ Admin password updated successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log(`   Email: ${updated.email}`);
    console.log(`   Password: ${newPassword}`);
    console.log('\n⚠️  IMPORTANT: Save these credentials securely!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setAdminPassword();
