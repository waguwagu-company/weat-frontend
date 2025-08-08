import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import prettierPlugin from 'eslint-plugin-prettier';
import queryPlugin from '@tanstack/eslint-plugin-query';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      prettier: prettierPlugin,
      '@tanstack/query': queryPlugin,
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      'prettier/prettier': 'warn',

      '@tanstack/query/exhaustive-deps': 'warn',
      '@tanstack/query/no-rest-destructuring': 'warn',
      '@tanstack/query/stable-query-client': 'warn',
    },
  },
];

export default eslintConfig;
