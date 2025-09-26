// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import hooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginCypress from 'eslint-plugin-cypress/flat';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import jRules from './eslint.rules.js';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        PRODUCTION: true,
        window: false,
        cy: true,
        document: 'readonly',
        navigator: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        Promise: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        console: 'readonly',
        URLSearchParams: 'readonly',
        location: 'readonly',
        ResizeObserver: 'readonly',
        localStorage: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': hooks,
      cypress: pluginCypress,
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...jRules.rules,
      ...eslintPluginPrettierRecommended.rules,
      'react/display-name': ['error', { ignoreTranspilerName: false }],
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': 'off',
      'react/no-danger': 'off',
      'react/prop-types': 'off',
      'react-hooks/exhaustive-deps': 'off',
      complexity: 'off',
      'no-undefined': 'off',
      'no-new': 'off',
      'require-jsdoc': 'off',
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: false,
          ignoreUrls: true,
          ignoreStrings: true,
        },
      ],
      'react/jsx-no-target-blank': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      ...hooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: ['node_modules', 'dist', '*.config.js', '*.config.mjs', 'eslint.rules.js'],
  },
  ...storybook.configs['flat/recommended'],
];
