import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig, type UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal(baseConfig) {
    // CI 환경(CHROMATIC=true, CI=true)일 때 프록시 제거
    const isCI = Boolean(process.env.CI || process.env.CHROMATIC);
    const custom: UserConfig = {
      server: isCI
        ? undefined
        : {
            proxy: {
              '/joongang-css': {
                target: 'https://static.joongang.co.kr',
                changeOrigin: true,
                secure: true,
                rewrite: p => p.replace(/^\/joongang-css/, '/css'),
                configure(proxy) {
                  proxy.on('proxyRes', proxyRes => {
                    proxyRes.headers['access-control-allow-origin'] = '*';
                  });
                },
              },
            },
          },
    };
    return mergeConfig(baseConfig, custom);
  },
};

export default config;
