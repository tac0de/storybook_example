// @eslint/js: ESLint의 핵심 규칙을 적용합니다.
import js from '@eslint/js';
// globals: 'browser', 'node' 등 사전 정의된 전역 변수 설정을 가져옵니다.
import globals from 'globals';
// typescript-eslint: TypeScript 코드의 린팅 규칙을 제공합니다.
import tseslint from 'typescript-eslint';
// eslint-plugin-react: React 코드에 특화된 린팅 규칙을 적용합니다.
import react from 'eslint-plugin-react';
// eslint-plugin-react-hooks: React Hooks의 규칙을 강제하고 실수를 방지합니다.
import reactHooks from 'eslint-plugin-react-hooks';
// eslint-plugin-react-refresh: React Fast Refresh 관련 규칙을 적용합니다.
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Global ignores
  {
    ignores: [
      'dist',
      'build',
      'node_modules',
      'coverage',
      'storybook-static',
      '*.min.js',
      '*.min.css',
      '*.generated.*',
    ],
  },

  // Config files
  {
    files: ['**/*.config.{js,ts}', 'vite.config.ts', '**/*.d.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Storybook files
  {
    files: ['.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Main source files
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Essential TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Essential React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react-refresh/only-export-components': 'warn',

      // Basic code quality
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },

  // Storybook stories
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      'no-console': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
];
