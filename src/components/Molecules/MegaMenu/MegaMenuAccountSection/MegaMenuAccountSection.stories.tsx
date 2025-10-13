import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuAccountSection, { type MegaMenuAccountSectionProps } from './MegaMenuAccountSection';
import { megaMenuScrollDecorator } from '../../../../stories/searchLayerStoryHelpers';

const meta: Meta<MegaMenuAccountSectionProps> = {
  title: 'Molecules/MegaMenu/MegaMenuAccountSection',
  component: MegaMenuAccountSection,
  tags: ['autodocs'],
  args: {
    loggedIn: false,
    userName: '홍길동',
  },
  argTypes: {
    onLogin: { action: 'login' },
  },
  parameters: { layout: 'padded', docs: { story: { inline: false, iframeHeight: 480 } } },
  decorators: [megaMenuScrollDecorator],
};

export default meta;
type Story = StoryObj<MegaMenuAccountSectionProps>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  args: {
    loggedIn: true,
    userName: 'wonyoung',
  },
};
