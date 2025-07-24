import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import storybook from 'eslint-plugin-storybook';

// Helper to flatten config (object or array) and add files property
function flatConfigWithFiles(config, files) {
  if (Array.isArray(config)) {
    return config.map(c => ({ ...c, files }));
  }
  return [{ ...config, files }];
}

export default [
  // --- Config files: must be first to avoid type info errors ---
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
      // No @typescript-eslint rules for config files to prevent type info errors
    },
  },
  // --- Storybook files: only basic JS rules, no type-aware TS rules ---
  {
    files: ['.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    rules: {
      'no-console': 'off',
      // No type-aware TS rules here to prevent type info errors
    },
  },
  // --- Global ignores ---
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
      'vite.config.ts',
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '.storybook/**/*.ts',
    ],
  },
  // --- Base configs and strict rules only for src/**/*.{ts,tsx} ---
  ...flatConfigWithFiles(js.configs.recommended, ['src/**/*.{ts,tsx}']),
  ...flatConfigWithFiles(tseslint.configs.recommended, ['src/**/*.{ts,tsx}']),
  ...flatConfigWithFiles(tseslint.configs.recommendedTypeChecked, [
    'src/**/*.{ts,tsx}',
  ]),
  ...flatConfigWithFiles(react.configs.flat.recommended, ['src/**/*.{ts,tsx}']),
  ...flatConfigWithFiles(react.configs.flat['jsx-runtime'], [
    'src/**/*.{ts,tsx}',
  ]),
  // --- Custom strict rules for src/**/*.{ts,tsx} ---
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: './tsconfig.app.json' },
      },
    },
    rules: {
      // --- TypeScript strict ---
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-shadow': 'error',

      // --- React/JSX ---
      'react/jsx-boolean-value': ['error', 'always'],
      'react/require-default-props': [
        'error',
        { functions: 'defaultArguments' },
      ],
      'react/jsx-props-no-spreading': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // --- Import / Order ---
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
            '**/*.stories.{ts,tsx}',
            '**/vite.config.ts',
            '**/.storybook/**',
          ],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // --- Accessibility ---
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/label-has-associated-control': 'error',

      // --- Collaborative / Strict rules ---
      'no-console': 'error',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-param-reassign': 'error',
      'no-return-await': 'error',
      'no-implicit-coercion': 'error',
      'no-underscore-dangle': 'error',
      'consistent-return': 'error',
      'max-lines': ['error', 500],
      'max-depth': ['error', 4],
      'max-params': ['error', 4],
      'max-statements': ['error', 20],

      // --- Style ---
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  // --- Storybook stories: relax only where necessary ---
  ...flatConfigWithFiles(storybook.configs['flat/recommended'], [
    '**/*.stories.{ts,tsx}',
  ]),
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      'import/no-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
      'storybook/no-uninstalled-addons': 'error',
    },
  },
];
