import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerInfoBox from './SearchLayerInfoBox';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<typeof SearchLayerInfoBox> = {
  title: 'Molecules/SearchLayer/SearchLayerInfoBox',
  component: SearchLayerInfoBox,
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
type Story = StoryObj<typeof SearchLayerInfoBox>;

export const Default: Story = {};
