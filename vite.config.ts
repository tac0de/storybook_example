/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    // Vitest projects configuration
    projects: [
      // Project for Storybook interaction tests
      {
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          // Include only story files
          include: ['**/*.stories.tsx'],
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            name: 'chromium', // Specify browser name
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      // Project for standard unit tests (e.g., *.test.tsx)
      {
        test: {
          name: 'unit',
          // Include only unit test files
          include: ['**/*.test.tsx'],
          environment: 'jsdom',
          globals: true, // <--- This will fix the error
          setupFiles: ['.storybook/vitest.setup.ts'], // Re-use setup if needed for providers, etc.
        },
      },
    ],
  },
});
