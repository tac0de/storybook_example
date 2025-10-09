import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    variant: 'navbar',
    ariaLabel: '메뉴',
    expanded: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['navbar', 'ham', 'search'] },
    onClick: { action: 'clicked' },
    expanded: { control: 'boolean' },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
    }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Navbar: Story = {};

export const Ham: Story = {
  args: { variant: 'ham', ariaLabel: '메뉴 열기 (햄버거)' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/layout.min.css'],
    }),
  ],
};

export const Search: Story = {
  args: { variant: 'search', ariaLabel: '검색 열기', expanded: true, 'aria-haspopup': 'dialog' },
};
