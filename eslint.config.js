// ESLint simple config for TypeScript + React
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js(),
  tseslint.config({
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // يمكنك تخصيص القواعد هنا
    },
  }),
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
    ],
  },
];