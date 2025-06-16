const { execSync } = require('child_process');
const isLinux = process.platform === 'linux';

if (isLinux) {
  try {
    execSync('chmod +x node_modules/.bin/vite');
    console.log('✔️ Fixed vite permissions');
  } catch (err) {
    console.error('❌ Failed to chmod vite:', err);
  }
} else {
  console.log('Skipping chmod — not running on Linux.');
}
