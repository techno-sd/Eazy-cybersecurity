/* Simple environment validation for production builds */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
let dotenv;
try {
  dotenv = require('dotenv');
} catch (e) {
  // dotenv might not be installed yet (first install). That's ok; rely on CI/host envs.
}

function loadEnvFiles() {
  if (!dotenv) return; // Skip if not available
  const cwd = process.cwd();
  const isProd = process.env.NODE_ENV === 'production';

  // Load with increasing precedence (later wins)
  const candidates = [];
  if (isProd) {
    candidates.push('.env');
    candidates.push('.env.production');
    candidates.push('.env.local');
    candidates.push('.env.production.local');
  } else {
    candidates.push('.env');
    candidates.push('.env.local');
  }

  for (const rel of candidates) {
    const p = path.join(cwd, rel);
    if (fs.existsSync(p)) {
      dotenv.config({ path: p, override: true });
    }
  }
}

function requireVar(name) {
  const val = process.env[name];
  if (!val || String(val).trim() === '') {
    return `${name} is required`;
  }
  return null;
}

function validateDbSplit() {
  // If any DB_* var is set, ensure the essential set is present
  const keys = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const anySet = keys.some((k) => !!process.env[k]);
  if (!anySet) return [];
  const errors = keys
    .map((k) => (process.env[k] ? null : `${k} is required when using mysql2 pool`))
    .filter(Boolean);
  return errors;
}

function main() {
  loadEnvFiles();
  const isProd = process.env.NODE_ENV === 'production';
  const errors = [];

  // Always required for Prisma
  const dbUrlErr = requireVar('DATABASE_URL');
  if (dbUrlErr) errors.push(dbUrlErr);

  // JWT secret must be set in production
  if (isProd) {
    const jwtErr = requireVar('JWT_SECRET');
    if (jwtErr) errors.push(jwtErr);
  }

  // Validate split DB_* if used
  errors.push(...validateDbSplit());

  if (errors.length) {
    console.error('\nEnvironment validation failed:');
    for (const e of errors) console.error(` - ${e}`);
    console.error('\nSet the missing variables or create a .env.production.local with correct values.');
    process.exit(1);
  } else {
    console.log('Environment validation passed.');
  }
}

main();
