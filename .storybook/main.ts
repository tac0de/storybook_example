import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal(config) {
    config.server ??= {};
    config.server.proxy = {
      '/joongang-css': {
        target: 'https://static.joongang.co.kr',
        changeOrigin: true, // Host 헤더 교체
        secure: true,
        rewrite: p => p.replace(/^\/joongang-css/, '/css'),
        configure(proxy) {
          proxy.on('proxyRes', proxyRes => {
            // 응답에 CORS 허용 헤더 추가
            proxyRes.headers['access-control-allow-origin'] = '*';
          });
        },
      },
    };
    return config;
  },
};
export default config;
