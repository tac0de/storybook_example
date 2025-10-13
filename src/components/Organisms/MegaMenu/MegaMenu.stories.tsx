import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenu, { type MegaMenuProps } from './MegaMenu';
import { megaMenuBaseDecorator } from '../../../stories/searchLayerStoryHelpers';

const meta: Meta<MegaMenuProps> = {
  title: 'Organisms/MegaMenu',
  component: MegaMenu,
  tags: ['autodocs'],
  parameters: {
    docs: { story: { inline: false, iframeHeight: 480 } },
    layout: 'fullscreen', // 메뉴는 풀화면으로 보이게
  },
  args: {
    open: true,
    loggedIn: false,
  },
  argTypes: {
    onClose: { action: 'closed' },
    onLogin: { action: 'login clicked' },
  },

  decorators: [megaMenuBaseDecorator],
};

export default meta;
type Story = StoryObj<MegaMenuProps>;

/**
 * 기본 상태 (열린 메뉴, 비로그인)
 */
export const Default: Story = {};

/**
 * 로그인된 상태
 */
export const LoggedIn: Story = {
  args: {
    loggedIn: true,
    userName: 'wonyoungchoiseoul',
  },
};
