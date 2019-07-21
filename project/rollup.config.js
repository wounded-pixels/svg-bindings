import typescript from 'rollup-plugin-typescript';

import pkg from './package.json';

export default {
  input: './src/svg-bindings.ts',
  output: [
    {
      file: 'dist/svg-bindings.js',
      format: 'cjs',
    },
    {
      file: 'dist/svg-bindings.es.js',
      format: 'es',
    },
    {
      file: 'dist/svg-bindings.vanilla.js',
      format: 'iife',
      name: 'SvgBindings', // the global which can be used in a browser
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
  ],
};
