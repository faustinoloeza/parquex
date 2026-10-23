import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/', 'dist-mobile/', 'data/', 'public/', 'node_modules/'] },
  js.configs.recommended,
  {
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: {
      'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
      'prefer-const': 'error',
      eqeqeq: ['error', 'smart'],
    },
  },
  // browser app
  { files: ['src/**/*.js'], languageOptions: { globals: globals.browser } },
  // data pipeline, tools and config files run in Node
  { files: ['pipeline/**/*.js', '*.config.js', 'tests/**/*.js'], languageOptions: { globals: globals.node } },
];
