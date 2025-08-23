import type { Meta, StoryObj } from '@storybook/react';
import Header, { type HeaderProps } from './Header';

const navItems = [
  { label: '오피니언', href: '/opinion' },
  { label: '정치', href: '/politics' },
  { label: '경제', href: '/economy', active: true },
  { label: '사회', href: '/society' },
  { label: '국제', href: '/world' },
  { label: '문화', href: '/culture' },
  { label: '스포츠', href: '/sports', emphasized: true },
  { label: 'IT', href: '/it' },
  { label: '연예', href: '/entertain' },
];

const languageItems = [
  { label: '日文', href: '/jp' },
  { label: '中文', href: '/cn' },
  { label: 'ENG', href: '/en' },
];

const authLoggedOut = [
  { label: '로그인', href: '/login' },
  { label: '회원가입', href: '/signup', muted: true },
];

const authLoggedIn = [
  { label: '로그아웃', href: '/logout' },
  { label: '마이페이지', href: '/mypage', active: true },
  { label: '지면보기', href: '/paper', external: true },
];

const meta: Meta<HeaderProps> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'responsive' },
  },
  args: {
    navItems,
    languageItems,
    authItems: authLoggedOut,
    showLanguage: true,
    showAuth: true,
    showPlus: true,
    showSearch: true,
    sticky: true,
    compact: false,
  },
  argTypes: {
    showLanguage: { control: 'boolean' },
    showAuth: { control: 'boolean' },
    showPlus: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    sticky: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {};

export const LoggedIn: Story = {
  args: { authItems: authLoggedIn },
};

export const Compact: Story = {
  args: { compact: true },
};

export const NoPlusNoSearch: Story = {
  args: { showPlus: false, showSearch: false },
};

// 모바일 미리보기
export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'iphone14' },
  },
};
