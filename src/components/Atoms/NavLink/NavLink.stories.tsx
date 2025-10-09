import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavLink } from './NavLink';
import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof NavLink> = {
  title: 'Atoms/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  args: {
    href: '/news',
    children: '뉴스',
    active: false,
    baseClassName: 'nav_item',
    activeClassName: 'is-active',
    linkClassName: undefined,
  },
  argTypes: {
    href: { control: 'text' },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
    baseClassName: { control: 'text' },
    activeClassName: { control: 'text' },
    linkClassName: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
    }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof NavLink>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    active: true,
  },
};
