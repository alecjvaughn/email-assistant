const { build } = require('esbuild');
const { GasPlugin } = require('esbuild-gas-plugin');

build({
  entryPoints: ['src/smoke_test.ts'],
  bundle: true,
  outfile: 'dist/bundle.js',
  plugins: [GasPlugin],
}).catch(() => process.exit(1));
