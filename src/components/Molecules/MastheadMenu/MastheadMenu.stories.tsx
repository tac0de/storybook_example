import type { Meta, StoryObj } from '@storybook/react-vite';
import { MastheadMenu } from './MastheadMenu';

const meta: Meta<typeof MastheadMenu> = {
  title: 'Molecules/MastheadMenu',
  component: MastheadMenu,
  tags: ['autodocs'],
  args: {
    loggedIn: false,
  },
  argTypes: {
    loggedIn: { control: 'boolean' },
    onClickReplica: { action: 'replica' },
    onClickJoin: { action: 'join' },
    className: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    // withCssLinks({
    //   hrefs: ['/joongang-css/index.min.css'],
    //   bodyClass: ['index'],
    // }),
  ],
};
export default meta;

type Story = StoryObj<typeof MastheadMenu>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  args: { loggedIn: true },
};

export const WithCustomClass: Story = {
  args: { className: 'debug-outline' },
};
