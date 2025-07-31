import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    if (config.css?.preprocessorOptions?.scss) {
      config.css.preprocessorOptions.scss.additionalData = `@use "sass:color"; @import "@/styles/abstracts/variables"; @import "@/styles/abstracts/mixins";`;
    } else {
      config.css = {
        ...config.css,
        preprocessorOptions: {
          scss: {
            additionalData: `@use "sass:color"; @import "@/styles/abstracts/variables"; @import "@/styles/abstracts/mixins";`,
          },
        },
      };
    }
    return config;
  },
};
export default config;
