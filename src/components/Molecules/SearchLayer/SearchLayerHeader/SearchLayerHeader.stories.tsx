import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerHeader, { type SearchLayerHeaderProps } from './SearchLayerHeader';
import { searchLayerOverlayDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<SearchLayerHeaderProps> = {
  title: 'Molecules/SearchLayer/SearchLayerHeader',
  component: SearchLayerHeader,
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'close' },
  },
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 480 } } },
  decorators: [searchLayerOverlayDecorator],
};

export default meta;
type Story = StoryObj<SearchLayerHeaderProps>;

export const Default: Story = {};
