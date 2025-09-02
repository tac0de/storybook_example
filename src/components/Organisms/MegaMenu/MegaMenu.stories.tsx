import type { Meta, StoryObj } from '@storybook/react';
import MegaMenu, { type MegaMenuProps } from './MegaMenu';
import HeaderShell from '../../../layouts/Header/HeaderShell';

const meta: Meta<MegaMenuProps> = {
  title: 'Organisms/MegaMenu',
  component: MegaMenu,
  //   tags: ['autodocs'],
  parameters: {
    // docs: {
    //   story: { inline: false },
    //   container: ({ children, context }) => (
    //     <DocsContainer context={context}>
    //       <style>
    //         {`
    //         .sb-main-padded { // Or a more specific selector for the canvas content area
    //           height: 100vh;
    //           overflow: auto; // Add overflow if content might exceed viewport
    //         }
    //       `}
    //       </style>
    //       {children}
    //     </DocsContainer>
    //   ),
    // },
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

  decorators: [
    Story => (
      <HeaderShell>
        <Story />
      </HeaderShell>
    ),
  ],
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
