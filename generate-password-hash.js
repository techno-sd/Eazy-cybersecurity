const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'Admin@Eazy';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    process.exit(1);
  }

  console.log('\n========================================');
  console.log('Password Hash Generated');
  console.log('========================================');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\n-- SQL Update Statement:');
  console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'admin@eazycyber.sa';`);
  console.log('========================================\n');
});
