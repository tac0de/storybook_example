import type { Meta, StoryObj } from '@storybook/react';
import CategoryNav, { type CategoryNavProps } from './CategoryNav';

const baseItems = [
  { label: '오피니언', href: '/opinion' },
  { label: '정치', href: '/politics' },
  { label: '경제', href: '/economy' },
  { label: '사회', href: '/society' },
  { label: '국제', href: '/world' },
  { label: '문화', href: '/culture' },
  { label: '스포츠', href: '/sports', emphasized: true },
  { label: 'IT', href: '/it' },
  { label: '연예', href: '/entertain' },
];

const meta: Meta<CategoryNavProps> = {
  title: 'Molecules/CategoryNav',
  component: CategoryNav,
  parameters: { layout: 'fullscreen' },
  args: {
    items: baseItems.map((x, i) => ({ ...x, active: i === 2 })), // '경제' 활성
    scrollableOnMobile: true,
    withEdgeFade: true,
  },
  argTypes: {
    scrollableOnMobile: { control: 'boolean' },
    withEdgeFade: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CategoryNavProps>;

export const Default: Story = {};

export const NoScrollFade: Story = {
  args: { withEdgeFade: false, scrollableOnMobile: false },
};

export const EmphasizedActive: Story = {
  args: {
    items: baseItems.map(x => (x.label === '스포츠' ? { ...x, emphasized: true, active: true } : x)),
  },
};

export const ClickHandler: Story = {
  args: {
    onItemClick(item) {
      alert(`Clicked: ${item.label} -> ${item.href}`);
    },
  },
};
