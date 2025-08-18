import prettierPlugin from 'eslint-plugin-prettier';
import jconfig from './esconfig.joongang';
import pluginCypress from 'eslint-plugin-cypress/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';

export default [
  pluginCypress.configs.recommended,
  react.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
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
      parserOptions: {
        ecmaVersion: 12,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': hooks,
      cypress: pluginCypress,
      prettier: prettierPlugin, // Prettier 플러그인
    },
    rules: {
      ...jconfig.rules,
      ...eslintPluginPrettierRecommended.rules,
      'react/no-unescaped-entities': 0,
      'react/react-in-jsx-scope': 0,
      'react/no-unknown-property': 0,
      'react/no-danger': 0,
      'react/prop-types': 0,
      'react-hooks/exhaustive-deps': 0,
      'react/no-danger': 0,
      complexity: 0,
      'no-undefined': 0,
      'no-new': 0,
      'require-jsdoc': 0,
      'max-len': 'off',
      'react/jsx-no-target-blank': 0,
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
        pragma: 'h',
        version: '17.0',
      },
    },
  },
  {
    ignores: ['node_modules', 'dist'],
  },
];
