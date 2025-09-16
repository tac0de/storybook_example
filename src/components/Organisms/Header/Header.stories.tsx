import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Header 컴포넌트

웹사이트의 주요 헤더를 구성하는 유기체 컴포넌트입니다.
브랜드, 네비게이션, 인증 메뉴, 액션 버튼들을 통합하여 제공합니다.

## 주요 기능
- 브랜드 헤더 표시
- 네비게이션 메뉴
- 사용자 인증 상태 관리
- 액션 버튼 그룹
- 반응형 레이아웃
- 접근성 지원
        `,
      },
    },
  },
  argTypes: {
    logoSrc: {
      control: 'text',
      description: '브랜드 로고 이미지 URL',
    },
    emblemSrc: {
      control: 'text',
      description: '브랜드 엠블럼 이미지 URL',
    },
    brandName: {
      control: 'text',
      description: '브랜드 이름',
    },
    brandHref: {
      control: 'text',
      description: '브랜드 클릭 시 이동할 URL',
    },
    isLoggedIn: {
      control: 'boolean',
      description: '사용자 로그인 상태',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'minimal'],
      description: '헤더 변형',
    },
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
      description: '헤더 위치',
    },
    transparent: {
      control: 'boolean',
      description: '배경 투명도',
    },
    shadow: {
      control: 'boolean',
      description: '그림자 표시',
    },
    showMobileMenu: {
      control: 'boolean',
      description: '모바일 메뉴 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// 기본 네비게이션 아이템
const defaultNavItems = [
  {
    id: 'home',
    label: '홈',
    href: '/',
    active: true,
  },
  {
    id: 'products',
    label: '제품',
    href: '/products',
  },
  {
    id: 'services',
    label: '서비스',
    href: '/services',
  },
  {
    id: 'about',
    label: '회사소개',
    href: '/about',
  },
  {
    id: 'contact',
    label: '연락처',
    href: '/contact',
  },
];

// 기본 액션 아이템
const defaultActionItems = [
  {
    id: 'search',
    type: 'button' as const,
    content: '🔍',
    ariaLabel: '검색',
    onClick: () => console.log('Search clicked'),
  },
  {
    id: 'notifications',
    type: 'button' as const,
    content: '🔔',
    ariaLabel: '알림',
    onClick: () => console.log('Notifications clicked'),
  },
];

// 기본 사용자 정보
const defaultUser = {
  name: '홍길동',
  email: 'hong@example.com',
  avatar: 'https://via.placeholder.com/32x32/007bff/ffffff?text=홍',
};

/**
 * 기본 헤더
 */
export const Default: Story = {
  args: {
    brandName: 'MyBrand',
    navItems: defaultNavItems,
    actionItems: defaultActionItems,
    isLoggedIn: false,
    variant: 'default',
    position: 'static',
    shadow: true,
    onLogin: () => console.log('Login clicked'),
    onBrandClick: () => console.log('Brand clicked'),
  },
};

/**
 * 로그인된 상태
 */
export const LoggedIn: Story = {
  args: {
    ...Default.args,
    isLoggedIn: true,
    user: defaultUser,
    onLogout: () => console.log('Logout clicked'),
    onProfileClick: () => console.log('Profile clicked'),
  },
};

/**
 * 로고가 있는 헤더
 */
export const WithLogo: Story = {
  args: {
    ...Default.args,
    logoSrc: '/images/logo-word.png',
    emblemSrc: '/images/logo-mark.svg',
  },
};

/**
 * 컴팩트 변형
 */
export const Compact: Story = {
  args: {
    ...LoggedIn.args,
    variant: 'compact',
    logoSrc: '/images/logo-mark.svg',
  },
};

/**
 * 미니멀 변형
 */
export const Minimal: Story = {
  args: {
    ...Default.args,
    variant: 'minimal',
    navItems: defaultNavItems.slice(0, 3),
    actionItems: [],
    shadow: false,
  },
};

/**
 * 고정 위치
 */
export const Fixed: Story = {
  args: {
    ...LoggedIn.args,
    position: 'fixed',
  },
  decorators: [
    Story => (
      <div style={{ height: '200vh', paddingTop: '80px' }}>
        <Story />
        <div style={{ padding: '20px' }}>
          <h2>스크롤해보세요</h2>
          <p>헤더가 상단에 고정되어 있습니다.</p>
          {Array.from({ length: 50 }, (_, i) => (
            <p key={i}>스크롤 콘텐츠 {i + 1}</p>
          ))}
        </div>
      </div>
    ),
  ],
};

/**
 * 투명 배경
 */
export const Transparent: Story = {
  args: {
    ...Default.args,
    transparent: true,
    shadow: false,
  },
  decorators: [
    Story => (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          color: 'white',
        }}
      >
        <Story />
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h1>투명 헤더</h1>
          <p>배경이 투명한 헤더입니다.</p>
        </div>
      </div>
    ),
  ],
};

/**
 * 모바일 메뉴 열린 상태
 */
export const MobileMenuOpen: Story = {
  args: {
    ...LoggedIn.args,
    showMobileMenu: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * 네비게이션 없음
 */
export const NoNavigation: Story = {
  args: {
    ...Default.args,
    navItems: [],
    brandName: 'Simple Brand',
  },
};

/**
 * 액션 버튼 많음
 */
export const ManyActions: Story = {
  args: {
    ...LoggedIn.args,
    actionItems: [
      {
        id: 'search',
        type: 'button' as const,
        content: '🔍',
        ariaLabel: '검색',
        onClick: () => console.log('Search clicked'),
      },
      {
        id: 'notifications',
        type: 'button' as const,
        content: '🔔',
        ariaLabel: '알림',
        onClick: () => console.log('Notifications clicked'),
      },
      {
        id: 'messages',
        type: 'button' as const,
        content: '💬',
        ariaLabel: '메시지',
        onClick: () => console.log('Messages clicked'),
      },
      {
        id: 'help',
        type: 'link' as const,
        content: '❓',
        href: '/help',
        ariaLabel: '도움말',
      },
    ],
  },
};

/**
 * 반응형 테스트
 */
export const ResponsiveTest: Story = {
  args: {
    ...LoggedIn.args,
    logoSrc: '/images/logo-word.png',
    emblemSrc: '/images/logo-mark.svg',
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 화면 크기에서 헤더의 반응형 동작을 확인할 수 있습니다.',
      },
    },
  },
};
