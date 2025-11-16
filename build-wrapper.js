const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Generating Prisma Client...');

try {
  // Generate Prisma Client
  execSync('prisma generate', {
    stdio: 'inherit',
    env: { ...process.env, PRISMA_SKIP_POSTINSTALL_GENERATE: 'true' }
  });
} catch (error) {
  // Check if Prisma artifacts exist despite the error
  const prismaPath = path.join(__dirname, 'src', 'generated', 'prisma');
  const clientExists = fs.existsSync(path.join(prismaPath, 'index.js'));

  if (clientExists) {
    console.warn('\n⚠ Prisma generate reported an error, but artifacts exist. Proceeding...\n');
  } else {
    console.error('Failed to generate Prisma Client');
    process.exit(1);
  }
}

console.log('Building Next.js application...');

try {
  // Build Next.js application
  execSync('next build', { stdio: 'inherit' });
  console.log('\n✓ Build completed successfully!');
} catch (error) {
  console.error('Build failed');
  process.exit(1);
}
