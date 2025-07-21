// ESLint configuration for Next.js + TypeScript
import js from '@eslint/js';
import next from 'eslint-config-next';

export default [
  js(),
  ...next,
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
    ],
    rules: {
      // يمكنك تخصيص القواعد هنا
    },
  },
];