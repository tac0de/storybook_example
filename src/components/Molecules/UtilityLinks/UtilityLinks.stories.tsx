import type { Meta, StoryObj } from '@storybook/react';
import UtilityLinks, { type UtilityLinksProps } from './UtilityLinks';

const langItems = [
  { label: '日文', href: '/jp' },
  { label: '中文', href: '/cn' },
  { label: 'ENG', href: '/en' },
];

const authOut = [
  { label: '로그인', href: '/login' },
  { label: '회원가입', href: '/signup', muted: true },
];

const authIn = [
  { label: '로그아웃', href: '/logout' },
  { label: '마이페이지', href: '/mypage', active: true },
  { label: '지면보기', href: '/paper', external: true },
];

const meta: Meta<UtilityLinksProps> = {
  title: 'Molecules/UtilityLinks',
  tags: ['autodocs'],
  component: UtilityLinks,
  parameters: { layout: 'centered' },
  args: {
    items: langItems,
    separator: 'pipe',
    condensed: false,
    wrap: false,
  },
  argTypes: {
    separator: { control: 'inline-radio', options: ['pipe', 'dot', 'none'] },
    condensed: { control: 'boolean' },
    wrap: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<UtilityLinksProps>;

export const Language: Story = {};

export const AuthLoggedOut: Story = {
  args: {
    items: authOut,
    separator: 'dot',
  },
};

export const AuthLoggedIn: Story = {
  args: {
    items: authIn,
    separator: 'pipe',
    condensed: true,
  },
};

export const WrapLong: Story = {
  args: {
    items: [
      { label: '이용약관', href: '#' },
      { label: '개인정보처리방침', href: '#' },
      { label: '고객센터', href: '#' },
      { label: '광고문의', href: '#' },
      { label: '뉴스레터 구독', href: '#' },
    ],
    separator: 'none',
    wrap: true,
  },
};

export const ClickHandler: Story = {
  args: {
    onItemClick(item) {
      alert(`Clicked: ${item.label}`);
    },
  },
};
