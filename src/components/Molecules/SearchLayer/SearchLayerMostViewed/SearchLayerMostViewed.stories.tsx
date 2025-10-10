import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerMostViewed from './SearchLayerMostViewed';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<typeof SearchLayerMostViewed> = {
  title: 'Molecules/SearchLayer/SearchLayerMostViewed',
  component: SearchLayerMostViewed,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchLayerMostViewed>;

export const Default: Story = {};
