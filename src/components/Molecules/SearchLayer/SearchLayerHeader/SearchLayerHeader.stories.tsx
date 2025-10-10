import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerHeader, { type SearchLayerHeaderProps } from './SearchLayerHeader';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const meta: Meta<SearchLayerHeaderProps> = {
  title: 'Molecules/SearchLayer/SearchLayerHeader',
  component: SearchLayerHeader,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: { layout: 'fullscreen' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      structure: 'div.layer_popup.layer_search',
      bodyClass: ['index'],
    }),
  ],
};

export default meta;
type Story = StoryObj<SearchLayerHeaderProps>;

export const Default: Story = {};
