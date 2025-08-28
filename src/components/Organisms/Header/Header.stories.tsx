import type { Meta, StoryObj } from '@storybook/react';
import Header, { type HeaderProps } from './Header';
import type { CategoryItem } from '../../Molecules/CategoryNav/CategoryNav';
import type { UtilityLinkItem } from '../../Molecules/UtilityLinks/UtilityLinks';

const navItems: CategoryItem[] = [
  { label: '오피니언', href: '/opinion', emphasized: true },
  { label: '정치', href: '/politics', emphasized: true },
  { label: '경제', href: '/economy', emphasized: true },
  { label: '사회', href: '/society', emphasized: true },
  { label: '국제', href: '/world', emphasized: true },
  { label: '문화', href: '/culture', emphasized: true },
  { label: '스포츠', href: '/sports', emphasized: true },
  { label: '라이프', href: '/it', emphasized: true },
  { label: '피플', href: '/entertain', emphasized: true },
];

const authMobile: UtilityLinkItem[] = [
  { label: '지면보기', href: '/login' },
  { label: '마이페이지', href: '/me' },
];

const authTablet: UtilityLinkItem[] = [
  { label: '지면보기', href: '/login' },
  { label: '日文', href: '/jp' },
  { label: '中文', href: '/cn' },
  { label: 'ENG', href: '/en' },
  { label: '로그인', href: '/login' },
  { label: '마이페이지', href: '/subscribe' },
];

const authDesktop: UtilityLinkItem[] = [
  { label: '로그인', href: '/login' },
  { label: '구독', href: '/subscribe' },
  { label: '마이페이지', href: '/me' },
];

const meta: Meta<HeaderProps> = {
  title: 'Layouts/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen', // Fullscreen layout
    viewport: { defaultViewport: 'responsive' }, // 기본은 반응형
  },
  args: {
    navItems,
    showLanguage: false,
    showAuth: true,
    showPlus: true,
    showSearch: true,
    sticky: false,
    compact: false,
    homeHref: '/',
  },
};
export default meta;

type Story = StoryObj<HeaderProps>;

export const Mobile: Story = {
  args: { authItems: authMobile },
  parameters: { viewport: { defaultViewport: 'iphone14' } },
};

export const Tablet: Story = {
  args: { authItems: authTablet },
  parameters: { viewport: { defaultViewport: 'ipad' } },
};

export const Desktop: Story = {
  args: { authItems: authDesktop },
  // 데스크탑은 기본 responsive(>=1024)면 충분
};
