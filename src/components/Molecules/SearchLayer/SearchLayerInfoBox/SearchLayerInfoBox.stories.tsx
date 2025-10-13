import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayerInfoBox from './SearchLayerInfoBox';
import { searchLayerBaseDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<typeof SearchLayerInfoBox> = {
  title: 'Molecules/SearchLayer/SearchLayerInfoBox',
  component: SearchLayerInfoBox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [searchLayerBaseDecorator],
};

export default meta;
type Story = StoryObj<typeof SearchLayerInfoBox>;

export const Default: Story = {
  args: {
    inputBoxIsShow: false,
  },
};
