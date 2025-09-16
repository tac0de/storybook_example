import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Atoms/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '아이콘만 표시하는 버튼 컴포넌트입니다. 접근성을 고려하여 스크린 리더용 텍스트를 포함합니다.',
      },
    },
  },
  argTypes: {
    icon: {
      description: '아이콘 요소 (i 태그 또는 React 컴포넌트)',
      control: false,
    },
    ariaLabel: {
      description: '접근성을 위한 라벨 (필수)',
      control: 'text',
    },
    size: {
      description: '버튼 크기',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: '버튼 변형 스타일',
      control: 'select',
      options: ['default', 'ghost', 'outline'],
    },
    disabled: {
      description: '비활성화 상태',
      control: 'boolean',
    },
    active: {
      description: '활성 상태 (토글 버튼용)',
      control: 'boolean',
    },
    onClick: {
      description: '클릭 핸들러',
      action: 'clicked',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 아이콘들
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </svg>
);

// 기본 스토리
export const Default: Story = {
  args: {
    icon: <SearchIcon />,
    ariaLabel: '검색',
  },
};

// 크기 변형
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <IconButton icon={<SearchIcon />} ariaLabel="작은 검색 버튼" size="sm" />
      <IconButton icon={<SearchIcon />} ariaLabel="중간 검색 버튼" size="md" />
      <IconButton icon={<SearchIcon />} ariaLabel="큰 검색 버튼" size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 아이콘 버튼을 보여줍니다.',
      },
    },
  },
};

// 변형 스타일
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <IconButton icon={<HeartIcon />} ariaLabel="기본 좋아요" variant="default" />
      <IconButton icon={<HeartIcon />} ariaLabel="고스트 좋아요" variant="ghost" />
      <IconButton icon={<HeartIcon />} ariaLabel="아웃라인 좋아요" variant="outline" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 스타일 변형을 보여줍니다.',
      },
    },
  },
};

// 상태 변형
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <IconButton icon={<SettingsIcon />} ariaLabel="일반 설정" />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Normal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <IconButton icon={<SettingsIcon />} ariaLabel="활성 설정" active />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Active</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <IconButton icon={<SettingsIcon />} ariaLabel="비활성 설정" disabled />
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Disabled</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 다양한 상태를 보여줍니다.',
      },
    },
  },
};

// 다양한 아이콘
export const IconShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <IconButton icon={<SearchIcon />} ariaLabel="검색" />
      <IconButton icon={<HeartIcon />} ariaLabel="좋아요" />
      <IconButton icon={<SettingsIcon />} ariaLabel="설정" />
      <IconButton icon={<CloseIcon />} ariaLabel="닫기" />
      <IconButton icon={<MenuIcon />} ariaLabel="메뉴" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 아이콘을 사용한 버튼들을 보여줍니다.',
      },
    },
  },
};

// 토글 버튼 예제
const ToggleButtonExample = () => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <IconButton
        icon={<HeartIcon />}
        ariaLabel={isActive ? '좋아요 취소' : '좋아요'}
        active={isActive}
        onClick={() => setIsActive(!isActive)}
      />
      <span style={{ fontSize: '0.875rem', color: '#666' }}>{isActive ? '좋아요 활성화됨' : '좋아요 비활성화됨'}</span>
    </div>
  );
};

export const ToggleButton: Story = {
  render: () => <ToggleButtonExample />,
  parameters: {
    docs: {
      description: {
        story: '토글 기능을 가진 아이콘 버튼의 예제입니다.',
      },
    },
  },
};

// 접근성 예제
export const AccessibilityExample: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <IconButton icon={<MenuIcon />} ariaLabel="메뉴 열기" ariaExpanded={false} ariaHaspopup="menu" />
      <IconButton icon={<SearchIcon />} ariaLabel="검색 대화상자 열기" ariaHaspopup="dialog" />
      <IconButton icon={<SettingsIcon />} ariaLabel="설정 메뉴" ariaExpanded={true} ariaHaspopup="menu" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ARIA 속성을 활용한 접근성 지원 예제입니다.',
      },
    },
  },
};

// 실제 사용 예제
export const RealWorldExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '1.125rem' }}>헤더 예제</h3>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <IconButton icon={<SearchIcon />} ariaLabel="검색" variant="ghost" />
        <IconButton icon={<SettingsIcon />} ariaLabel="설정" variant="ghost" />
        <IconButton icon={<MenuIcon />} ariaLabel="메뉴" variant="ghost" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 헤더에서 사용되는 아이콘 버튼들의 예제입니다.',
      },
    },
  },
};

// 플레이그라운드
export const Playground: Story = {
  args: {
    icon: <SearchIcon />,
    ariaLabel: '검색',
    size: 'md',
    variant: 'default',
    disabled: false,
    active: false,
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 props를 테스트해볼 수 있는 플레이그라운드입니다.',
      },
    },
  },
};
