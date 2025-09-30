// src/components/Organisms/HeaderBar/HeaderBar.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderBar from './HeaderBar';
import { withCssAndShell } from '../../../decorators/withCssAndShell';
import { JOONGANGCSS } from '../../../decorators/globalCssNames';

const meta: Meta<typeof HeaderBar> = {
  title: 'Organisms/HeaderBar',
  component: HeaderBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { story: { inline: false, iframeHeight: 480 } } },
  argTypes: {
    onOpenMegaMenu: { action: 'open-mega' },
    onOpenSearch: { action: 'open-search' },
    onClickJoin: { action: 'join' },
    onClickReplica: { action: 'replica' },
  },
  args: {
    // 공통 action props
    onOpenMegaMenu: () => alert('메가메뉴 열기'),
    onOpenSearch: () => alert('검색 열기'),
    onClickJoin: () => alert('회원가입'),
    onClickReplica: () => alert('지면보기'),
  },
};
export default meta;

type Story = StoryObj<typeof HeaderBar>;

// 1. 기본 홈 헤더 (Default Variant)
export const DefaultHome: Story = {
  args: {
    variant: 'default',
    user: { loggedIn: false },
    logo: {
      emblem60Url: 'https://www.joongang.co.kr/60th',
      logoUrl: 'https://img.joongang.co.kr/pubimg/index/logo_thejoongang.png',
      homeHref: 'https://www.joongang.co.kr',
    },
    nav: [
      { label: '뉴스', href: '/news', active: true },
      { label: '정치', href: '/politics' },
      { label: '경제', href: '/economy' },
    ],
    shortcut: {
      variant: 'plus',
    },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
      structure: 'header.header.nav_re.emblem60',
    }),
  ],
};

// 2. 서브 페이지 헤더 (Sub Variant)
export const SubPage: Story = {
  args: {
    variant: 'sub',
    user: { loggedIn: true },
    logo: {
      emblem60Url: 'https://www.joongang.co.kr/60th',
      logoUrl: 'https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png',
      homeHref: 'https://www.joongang.co.kr',
      width: 178,
      height: 26,
    },
    // Sub variant는 nav가 없음
    nav: undefined,
    shortcut: {
      variant: 'plus_without_logo',
      href: 'https://www.joongang.co.kr/plus',
    },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/layout.min.css', '/joongang-css/common.min.css'],
      structure: 'header.header.nav_re.emblem60',
    }),
  ],
};

export const PlusHome: Story = {
  args: {
    variant: 'plus',
    user: { loggedIn: true },
    logo: {
      variant: 'plus',
      homeHref: 'https://www.joongang.co.kr/plus',
      logoAlt: '더 중앙 플러스',
    },
    nav: [
      { label: '콘텐트 탐색', href: '#' },
      { label: '시리즈별 보기', href: '#' },
    ],
    shortcut: {
      variant: 'default',
      href: 'https://www.joongang.co.kr',
      ariaLabel: '중앙일보 바로가기',
    },
  },
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.PLUSCOMMON, JOONGANGCSS.PlUSHOME],
      bodyClass: ['index'],
      structure: 'header.header.black_type.nav_re.emblem60',
    }),
  ],
};

export const PlusSub: Story = {
  args: {
    variant: 'plus-sub',
    user: { loggedIn: true },
    logo: {
      variant: 'plus',
      homeHref: 'https://www.joongang.co.kr/plus',
      logoAlt: '더 중앙 플러스',
    },
    nav: [
      { label: '콘텐트 탐색', href: '#' },
      { label: '시리즈별 보기', href: '#' },
    ],
    shortcut: {
      variant: 'default',
      href: 'https://www.joongang.co.kr',
      ariaLabel: '중앙일보 바로가기',
    },
  },
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.PLUSCOMMON, JOONGANGCSS.PlUS],
      bodyClass: ['index'],
      structure: 'header.header.black_type.nav_re.emblem60',
    }),
  ],
};
