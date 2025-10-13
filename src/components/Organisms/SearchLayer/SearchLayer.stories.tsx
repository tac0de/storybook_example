import type { Meta, StoryObj } from '@storybook/react-vite';
import SearchLayer, { type SearchLayerProps } from './SearchLayer';
import { createSearchLayerDecorator } from '../../../stories/searchLayerStoryHelpers';

const searchLayerPageDecorator = createSearchLayerDecorator({
  structure: 'header#header.header.nav_re.emblem60.sticky_top',
});

const meta: Meta<SearchLayerProps> = {
  title: 'Organisms/SearchLayer',
  component: SearchLayer,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { inline: false, iframeHeight: 480 } },
    layout: 'fullscreen', // 메뉴는 풀화면으로 보이게
  },
  args: {
    open: true,
  },
  argTypes: {
    onClose: { action: 'closed' },
  },

  decorators: [searchLayerPageDecorator],
};
export default meta;

type Story = StoryObj<typeof SearchLayer>;

export const Default: Story = {
  args: {
    inputBoxIsShow: false,
  },
};
