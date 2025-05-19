// Script to run before Netlify build
console.log('Running Netlify build hook...');

// Check Node.js version
console.log(`Node version: ${process.version}`);
console.log(`NPM version: ${process.env.npm_version}`);

// List installed dependencies
console.log('Listing installed dependencies:');
try {
  const { execSync } = require('child_process');
  const deps = execSync('npm list --depth=0').toString();
  console.log(deps);
} catch (error) {
  console.error('Error listing dependencies:', error.message);
}

console.log('Build hook completed successfully!'); 