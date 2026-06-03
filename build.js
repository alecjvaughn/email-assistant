const { build } = require('esbuild');
const { GasPlugin } = require('esbuild-gas-plugin');

build({
  entryPoints: ['src/smoke_test.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [GasPlugin],
  format: 'iife',
  target: 'es2019', // Apps Script uses a modern V8 engine, es2019 is very safe
}).catch(() => process.exit(1));
