// import '../src/legacy.css';
import type { Preview } from '@storybook/react-vite';

const customViewports = {
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '414px',
      height: '968px',
    },
  },
  Laptop: {
    name: 'Laptop',
    styles: {
      width: '986px',
      height: '968px',
    },
  },
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '968px',
    },
  },
  // Add more custom viewports as needed
};

const preview: Preview = {
  parameters: {
    viewport: {
      options: customViewports,
      defaultViewport: 'Mobile',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    // Disable interaction testing to prevent window determination errors
    interactions: {
      disable: true,
    },

    // Disable chromatic for now to prevent interaction issues
    chromatic: {
      disableSnapshot: true,
    },
    layouts: 'fullscreen',
  },
};

export default preview;
