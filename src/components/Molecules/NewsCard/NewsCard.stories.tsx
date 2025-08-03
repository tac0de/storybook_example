/**
 * 🗞️ NewsCard 컴포넌트 Storybook 스토리
 *
 * 이 파일은 NewsCard 컴포넌트의 다양한 상태와 사용 예시를 보여줍니다.
 * Storybook을 통해 컴포넌트의 동작을 테스트하고 문서화할 수 있습니다.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NewsCard } from './NewsCard';

// 🎯 Storybook 메타데이터 정의
const meta: Meta<typeof NewsCard> = {
  title: 'Molecules/NewsCard',
  component: NewsCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
🗞️ **NewsCard 컴포넌트**

중앙일보 스타일의 뉴스 카드 컴포넌트입니다. 뉴스 제목, 요약, 이미지, 카테고리, 메타 정보를 표시합니다.

**주요 기능:**
- 📰 뉴스 제목과 요약 표시
- 🖼️ 썸네일 이미지 표시
- 🏷️ 카테고리 및 메타 정보 표시
- 🔥 인기 뉴스 및 주요 뉴스 표시
- 🎨 호버 효과 및 클릭 인터랙션
- 📱 반응형 디자인

**사용 예시:**
\`\`\`tsx
<NewsCard
  id="1"
  title="중앙일보, 새로운 뉴스 플랫폼 출시"
  summary="독자들에게 더 나은 뉴스 경험을 제공하기 위한 새로운 플랫폼을 출시했습니다."
  thumbnail="https://example.com/image.jpg"
  category="기술"
  reporter="김기자"
  publishedAt="2024-01-15T10:30:00Z"
  viewCount={1234}
  commentCount={56}
  onClick={handleNewsClick}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: '뉴스 기사 고유 ID',
      control: 'text',
    },
    title: {
      description: '뉴스 제목',
      control: 'text',
    },
    summary: {
      description: '뉴스 요약',
      control: 'text',
    },
    thumbnail: {
      description: '썸네일 이미지 URL',
      control: 'text',
    },
    category: {
      description: '뉴스 카테고리',
      control: 'select',
      options: ['정치', '경제', '사회', '문화', '스포츠', '기술', '국제'],
    },
    reporter: {
      description: '기자 이름',
      control: 'text',
    },
    publishedAt: {
      description: '발행일',
      control: 'date',
    },
    viewCount: {
      description: '조회수',
      control: 'number',
    },
    commentCount: {
      description: '댓글 수',
      control: 'number',
    },
    isPopular: {
      description: '인기 뉴스 여부',
      control: 'boolean',
    },
    isMain: {
      description: '주요 뉴스 여부',
      control: 'boolean',
    },
    onClick: {
      description: '카드 클릭 이벤트 핸들러',
      action: 'clicked',
    },
    onReporterClick: {
      description: '기자 클릭 이벤트 핸들러',
      action: 'reporter clicked',
    },
    onCategoryClick: {
      description: '카테고리 클릭 이벤트 핸들러',
      action: 'category clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 📰 기본 뉴스 카드
export const Default: Story = {
  args: {
    id: '1',
    title: '중앙일보, 새로운 뉴스 플랫폼 출시',
    summary:
      '독자들에게 더 나은 뉴스 경험을 제공하기 위한 새로운 플랫폼을 출시했습니다. 이번 플랫폼은 AI 기술을 활용한 개인화된 뉴스 추천 시스템을 도입하여 사용자 맞춤형 콘텐츠를 제공할 예정입니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop',
    category: '기술',
    reporter: '김기자',
    publishedAt: '2024-01-15T10:30:00Z',
    viewCount: 1234,
    commentCount: 56,
  },
};

// 🔥 인기 뉴스 카드
export const Popular: Story = {
  args: {
    id: '2',
    title: '정부, 새로운 경제 정책 발표 예정',
    summary:
      '정부가 내일 새로운 경제 정책을 발표할 예정입니다. 이번 정책은 소득 불평등 해소와 경제 활성화를 동시에 추구하는 혁신적인 방안으로 평가받고 있습니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
    category: '경제',
    reporter: '이기자',
    publishedAt: '2024-01-15T09:15:00Z',
    viewCount: 5678,
    commentCount: 234,
    isPopular: true,
  },
};

// ⭐ 주요 뉴스 카드
export const Main: Story = {
  args: {
    id: '3',
    title: '대통령, 국정감사에서 주요 정책 방향 제시',
    summary:
      '대통령이 오늘 국정감사에서 향후 3년간의 주요 정책 방향을 제시했습니다. 교육 개혁, 의료 시스템 개선, 환경 보호 등 다양한 분야에서의 정책 계획을 발표했습니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
    category: '정치',
    reporter: '박기자',
    publishedAt: '2024-01-15T08:00:00Z',
    viewCount: 8901,
    commentCount: 456,
    isMain: true,
  },
};

// 🖼️ 이미지 없는 뉴스 카드
export const NoImage: Story = {
  args: {
    id: '4',
    title: '코로나19 신규 확진자 수 감소세 지속',
    summary:
      '전국 코로나19 신규 확진자 수가 지속적으로 감소하고 있습니다. 전문가들은 방역 정책의 효과와 백신 접종률 향상이 주요 원인으로 분석하고 있습니다.',
    category: '사회',
    reporter: '최기자',
    publishedAt: '2024-01-15T07:45:00Z',
    viewCount: 3456,
    commentCount: 123,
  },
};

// 📱 모바일 최적화 뉴스 카드
export const Mobile: Story = {
  args: {
    id: '5',
    title: '스마트폰 시장, 새로운 기술 혁신 예고',
    summary:
      '주요 스마트폰 제조사들이 올해 하반기 새로운 기술 혁신을 예고했습니다. 접이식 화면, AI 카메라, 초고속 충전 등 다양한 혁신 기술이 적용될 예정입니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=200&fit=crop',
    category: '기술',
    reporter: '정기자',
    publishedAt: '2024-01-15T06:30:00Z',
    viewCount: 2345,
    commentCount: 89,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 🎨 다양한 카테고리 뉴스 카드들
export const Categories: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
      }}
    >
      <NewsCard
        id='6'
        title='문화재청, 새로운 문화재 발굴 성과 발표'
        summary='문화재청이 최근 발굴한 새로운 문화재의 성과를 발표했습니다. 이번 발굴로 고대 문화에 대한 새로운 사실들이 밝혀졌습니다.'
        thumbnail='https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=150&fit=crop'
        category='문화'
        reporter='한기자'
        publishedAt='2024-01-15T05:15:00Z'
        viewCount={1234}
        commentCount={45}
      />
      <NewsCard
        id='7'
        title='올림픽 선수단, 새로운 기록 달성'
        summary='국가 대표 선수단이 최근 대회에서 새로운 기록을 달성했습니다. 이번 성과는 향후 올림픽 준비에 큰 도움이 될 것으로 기대됩니다.'
        thumbnail='https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=150&fit=crop'
        category='스포츠'
        reporter='송기자'
        publishedAt='2024-01-15T04:00:00Z'
        viewCount={3456}
        commentCount={123}
      />
      <NewsCard
        id='8'
        title='국제 정상회담, 새로운 협력 방안 논의'
        summary='주요 국가 정상들이 모여 새로운 국제 협력 방안을 논의했습니다. 이번 회담은 글로벌 문제 해결을 위한 중요한 진전을 이루었습니다.'
        thumbnail='https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=150&fit=crop'
        category='국제'
        reporter='임기자'
        publishedAt='2024-01-15T03:30:00Z'
        viewCount={2345}
        commentCount={67}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// 🎯 인터랙션 테스트 뉴스 카드
export const Interactive: Story = {
  args: {
    id: '9',
    title: '인터랙션 테스트 뉴스 카드',
    summary:
      '이 뉴스 카드는 클릭, 기자 클릭, 카테고리 클릭 등의 인터랙션을 테스트할 수 있습니다. 개발자 도구의 콘솔을 확인해보세요.',
    thumbnail:
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=150&fit=crop',
    category: '테스트',
    reporter: '테스트기자',
    publishedAt: '2024-01-15T02:00:00Z',
    viewCount: 999,
    commentCount: 99,
  },
  parameters: {
    docs: {
      description: {
        story: `
🎯 **인터랙션 테스트**

이 스토리는 NewsCard 컴포넌트의 다양한 인터랙션을 테스트할 수 있습니다:

1. **카드 클릭**: 전체 카드를 클릭하면 콘솔에 로그가 출력됩니다
2. **기자 클릭**: 기자 이름을 클릭하면 기자 관련 로그가 출력됩니다
3. **카테고리 클릭**: 카테고리 배지를 클릭하면 카테고리 관련 로그가 출력됩니다

개발자 도구의 콘솔을 열어서 각 인터랙션의 결과를 확인해보세요!
        `,
      },
    },
  },
};

// 📊 데이터 시각화 뉴스 카드
export const DataVisualization: Story = {
  args: {
    id: '10',
    title: '빅데이터 분석, 뉴스 트렌드 변화 예측',
    summary:
      '최신 빅데이터 분석 결과, 뉴스 소비 패턴이 크게 변화하고 있습니다. AI 기술을 활용한 개인화된 뉴스 추천 시스템이 주목받고 있습니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    category: '기술',
    reporter: '데이터기자',
    publishedAt: '2024-01-15T01:00:00Z',
    viewCount: 7890,
    commentCount: 345,
    isPopular: true,
  },
};

// 🎨 다크 모드 뉴스 카드
export const DarkMode: Story = {
  args: {
    id: '11',
    title: '다크 모드 지원 뉴스 카드',
    summary:
      '이 뉴스 카드는 다크 모드를 지원합니다. 시스템 설정에서 다크 모드를 활성화하면 자동으로 다크 테마가 적용됩니다.',
    thumbnail:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=200&fit=crop',
    category: '기술',
    reporter: '다크기자',
    publishedAt: '2024-01-15T00:30:00Z',
    viewCount: 1234,
    commentCount: 56,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};
