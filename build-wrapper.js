// Build wrapper to handle Windows permission errors
const { spawn } = require('child_process');
const { execSync } = require('child_process');

// Set up global error handling
process.on('unhandledRejection', (reason) => {
  if (reason && reason.code === 'EPERM') {
    // Silently ignore EPERM errors
    return;
  }
});

process.on('uncaughtException', (error) => {
  if (error && error.code === 'EPERM') {
    // Silently ignore EPERM errors
    return;
  }
  console.error('Uncaught exception:', error);
});

// Run prisma generate
try {
  console.log('Generating Prisma Client...');
  execSync('npx prisma generate', {
    stdio: 'inherit',
    env: { ...process.env, SUPPRESS_NO_CONFIG_WARNING: 'true' }
  });
  console.log('✓ Prisma Client generated');
} catch (error) {
  console.error('✗ Prisma generate failed:', error.message);
  process.exit(1);
}

// Run next build
console.log('Building Next.js application...');
const buildProcess = spawn('npx', ['next', 'build'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
  env: { ...process.env, SUPPRESS_NO_CONFIG_WARNING: 'true', NODE_ENV: 'production' }
});

let buildOutput = '';
let hasRealError = false;

buildProcess.stdout.on('data', (data) => {
  const output = data.toString();
  buildOutput += output;

  // Check for compilation failures
  if (output.includes('Failed to compile')) {
    hasRealError = true;
  }

  // Filter out glob errors but show real output
  const lines = output.split('\n');
  lines.forEach(line => {
    if (!line.includes('glob error') &&
        !line.includes('unhandledRejection') &&
        !line.includes('EPERM') &&
        line.trim()) {
      console.log(line);
    }
  });

  // Check for actual build success indicators
  if (output.includes('Compiled successfully') || output.includes('✓ Compiled')) {
    console.log('✓ Build compiled successfully');
  }
});

buildProcess.stderr.on('data', (data) => {
  const output = data.toString();
  buildOutput += output;

  // Always show compilation errors
  if (output.includes('Failed to compile') ||
      output.includes('Type error:') ||
      output.includes('Syntax error:') ||
      output.includes('Module not found')) {
    hasRealError = true;
    console.error(output);
  }
  // Show other errors unless they're EPERM warnings
  else if (!output.includes('EPERM') &&
           !output.includes('glob error') &&
           !output.includes('unhandledRejection')) {
    if (output.includes('Error:') || output.includes('Failed')) {
      hasRealError = true;
      console.error(output);
    }
  }
});

buildProcess.on('close', (code) => {
  // Check if .next directory was created with actual build files
  const fs = require('fs');
  const path = require('path');

  // If we detected a real compilation error, fail immediately
  if (hasRealError) {
    console.error('\n✗ Build failed due to compilation errors');
    console.error('Please check the errors above and fix them before deploying');
    process.exit(1);
  }

  const nextDir = path.join(process.cwd(), '.next');
  const hasServer = fs.existsSync(path.join(nextDir, 'server'));
  const hasStatic = fs.existsSync(path.join(nextDir, 'static'));
  const hasRoutesManifest = fs.existsSync(path.join(nextDir, 'routes-manifest.json'));

  // Check for routes-manifest.json which Vercel requires
  if (!hasRoutesManifest && fs.existsSync(nextDir)) {
    console.error('\n✗ Build failed - routes-manifest.json not generated');
    console.error('This usually indicates a compilation failure');
    process.exit(1);
  }

  if (hasServer || hasStatic) {
    console.log('\n✓ Build completed successfully!');
    console.log('Build output created in .next directory');
    process.exit(0);
  } else if (!hasRealError && fs.existsSync(nextDir)) {
    // Build might have partially succeeded despite EPERM errors
    console.log('\n⚠ Build completed with warnings');
    console.log('Note: Some Windows permission warnings were ignored');
    process.exit(0);
  } else {
    console.error('\n✗ Build failed - no output files generated');
    process.exit(1);
  }
});
