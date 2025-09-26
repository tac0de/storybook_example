import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavList, type NavItem } from './NavList';
import { withCssLinks } from '../../../decorators/withCssLinks';

const meta: Meta<typeof NavList> = {
  title: 'Molecules/NavList',
  component: NavList,
  tags: ['autodocs'],
  args: {
    items: [
      { label: '뉴스', href: '/news', active: true },
      { label: '정치', href: '/politics' },
      { label: '경제', href: '/economy' },
      { label: '사회', href: '/society' },
      { label: '국제', href: '/world' },
    ] as NavItem[],
    ariaLabel: '주요 메뉴',
  },
  argTypes: {
    onItemClick: { action: 'item-click' },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
  parameters: {
    layout: 'padded',
  },
  // decorators: [],
};
export default meta;

type Story = StoryObj<typeof NavList>;

export const Playground: Story = {};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 12 }).map((_, i) => ({
      label: `메뉴 ${i + 1}`,
      href: `/m${i + 1}`,
      active: i === 2,
    })),
  },
};

export const NoActive: Story = {
  args: {
    items: [
      { label: '뉴스', href: '/news' },
      { label: '정치', href: '/politics' },
      { label: '경제', href: '/economy' },
    ],
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'debug-outline', // 필요 시 local SCSS에서 스타일 확인용
  },
};
