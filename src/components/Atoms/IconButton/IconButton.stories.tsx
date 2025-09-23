import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import { withCssLinks } from '../../../decorators/withCssLinks';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    kind: 'search',
    ariaLabel: '검색',
  },
  argTypes: {
    kind: {
      control: 'select',
      options: ['navbar', 'search', 'newspaper'],
    },
    onClick: { action: 'clicked' },
  },
  decorators: [
    withCssLinks({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const Navbar: Story = {
  args: { kind: 'navbar', ariaLabel: '메뉴 열기' },
};

export const Search: Story = {
  args: { kind: 'search', ariaLabel: '검색 열기' },
};

export const Newspaper: Story = {
  args: { kind: 'newspaper', ariaLabel: '지면보기' },
};
