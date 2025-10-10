import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuAccountSection, { type MegaMenuAccountSectionProps } from './MegaMenuAccountSection';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

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
  parameters: { layout: 'padded' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
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
