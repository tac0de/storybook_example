import type { Meta, StoryObj } from '@storybook/react';
import LinkButton from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  title: 'Atoms/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '링크와 버튼의 기능을 모두 지원하는 재사용 가능한 원자 컴포넌트입니다. 외부 링크, 내부 링크, 그리고 클릭 핸들러를 모두 지원합니다.',
      },
    },
  },
  argTypes: {
    children: {
      description: '버튼/링크에 표시될 텍스트',
      control: 'text',
    },
    href: {
      description: '링크 URL (제공되면 <a> 태그로 렌더링)',
      control: 'text',
    },
    variant: {
      description: '버튼/링크 스타일 변형',
      control: 'select',
      options: ['default', 'outline', 'ghost', 'text'],
    },
    size: {
      description: '크기 변형',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      description: '비활성화 상태',
      control: 'boolean',
    },
    external: {
      description: '외부 링크 여부 (새 탭에서 열기)',
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

// 아이콘 컴포넌트들
const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
    />
    <path
      fillRule="evenodd"
      d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
    />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
);

// 기본 스토리
export const Default: Story = {
  args: {
    children: '기본 버튼',
  },
};

// 링크로 사용
export const AsLink: Story = {
  args: {
    children: '홈페이지로 이동',
    href: '/',
  },
  parameters: {
    docs: {
      description: {
        story: 'href prop이 제공되면 <a> 태그로 렌더링됩니다.',
      },
    },
  },
};

// 외부 링크
export const ExternalLink: Story = {
  args: {
    children: 'GitHub에서 보기',
    href: 'https://github.com',
    external: true,
    icon: <ExternalLinkIcon />,
  },
  parameters: {
    docs: {
      description: {
        story: 'external prop을 사용하면 새 탭에서 열립니다.',
      },
    },
  },
};

// 크기 변형
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <LinkButton size="sm">작은 버튼</LinkButton>
      <LinkButton size="md">중간 버튼</LinkButton>
      <LinkButton size="lg">큰 버튼</LinkButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 LinkButton을 보여줍니다.',
      },
    },
  },
};

// 변형 스타일
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <LinkButton variant="default">기본</LinkButton>
      <LinkButton variant="outline">아웃라인</LinkButton>
      <LinkButton variant="ghost">고스트</LinkButton>
      <LinkButton variant="text">텍스트</LinkButton>
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

// 아이콘과 함께
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <LinkButton icon={<DownloadIcon />}>다운로드</LinkButton>
      <LinkButton icon={<ArrowRightIcon />} href="/next">
        다음 페이지
      </LinkButton>
      <LinkButton icon={<PlusIcon />} variant="outline">
        새로 만들기
      </LinkButton>
      <LinkButton icon={<ExternalLinkIcon />} href="https://example.com" external variant="ghost">
        외부 링크
      </LinkButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '아이콘과 함께 사용하는 예제입니다.',
      },
    },
  },
};

// 상태 변형
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <LinkButton>일반 상태</LinkButton>
        <span style={{ fontSize: '0.75rem', color: '#666' }}>Normal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <LinkButton disabled>비활성화</LinkButton>
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

// 네비게이션 예제
export const NavigationExample: Story = {
  render: () => (
    <nav
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <LinkButton href="/" variant="text">
        홈
      </LinkButton>
      <LinkButton href="/about" variant="text">
        소개
      </LinkButton>
      <LinkButton href="/products" variant="text">
        제품
      </LinkButton>
      <LinkButton href="/contact" variant="text">
        연락처
      </LinkButton>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: '네비게이션 메뉴에서 사용하는 예제입니다.',
      },
    },
  },
};

// CTA 버튼 예제
export const CTAExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>지금 시작하세요!</h3>
      <p style={{ margin: 0, color: '#666', fontSize: '1rem' }}>무료 체험으로 모든 기능을 사용해보세요.</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <LinkButton size="lg" href="/signup">
          무료 체험 시작
        </LinkButton>
        <LinkButton size="lg" variant="outline" href="/demo">
          데모 보기
        </LinkButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Call-to-Action 섹션에서 사용하는 예제입니다.',
      },
    },
  },
};

// 카드 액션 예제
export const CardActionsExample: Story = {
  render: () => (
    <div
      style={{
        maxWidth: '300px',
        padding: '1.5rem',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>프리미엄 플랜</h4>
      <p style={{ margin: '0 0 1rem 0', color: '#666', fontSize: '0.875rem' }}>모든 기능을 제한 없이 사용하세요.</p>
      <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>$29/월</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <LinkButton href="/subscribe" size="sm">
          구독하기
        </LinkButton>
        <LinkButton href="/compare" variant="text" size="sm">
          플랜 비교하기
        </LinkButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '카드 컴포넌트 내에서 액션 버튼으로 사용하는 예제입니다.',
      },
    },
  },
};

// 플레이그라운드
export const Playground: Story = {
  args: {
    children: '버튼 텍스트',
    variant: 'default',
    size: 'md',
    disabled: false,
    external: false,
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 props를 테스트해볼 수 있는 플레이그라운드입니다.',
      },
    },
  },
};
