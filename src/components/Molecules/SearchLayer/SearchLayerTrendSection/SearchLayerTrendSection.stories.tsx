import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerTrendSection from './SearchLayerTrendSection';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<typeof SearchLayerTrendSection> = {
  title: 'Molecules/SearchLayer/SearchLayerTrendSection',
  component: SearchLayerTrendSection,
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
type Story = StoryObj<typeof SearchLayerTrendSection>;

export const Default: Story = {};
