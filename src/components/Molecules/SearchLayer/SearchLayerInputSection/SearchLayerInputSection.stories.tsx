import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerInputSection from './SearchLayerInputSection';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<typeof SearchLayerInputSection> = {
  title: 'Molecules/SearchLayer/SearchLayerInputSection',
  component: SearchLayerInputSection,
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
type Story = StoryObj<typeof SearchLayerInputSection>;

export const Default: Story = {};
