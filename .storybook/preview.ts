import '../src/index.css';
import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
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
  },
};

export default preview;
