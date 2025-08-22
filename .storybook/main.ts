import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config) {
    if (config.css?.preprocessorOptions?.scss) {
      config.css.preprocessorOptions.scss.additionalData = `@use "@/styles/index" as *;`;
    } else {
      config.css = {
        ...config.css,
        preprocessorOptions: {
          scss: {
            additionalData: `@use "@/styles/index" as *;`,
          },
        },
      };
    }
    return config;
  },
};
export default config;
