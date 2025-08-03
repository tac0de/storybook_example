/**
 * 🗞️ NewsNavigation 컴포넌트 Storybook 스토리
 * 
 * 이 파일은 NewsNavigation 컴포넌트의 다양한 상태와 사용 예시를 보여줍니다.
 * Storybook을 통해 컴포넌트의 동작을 테스트하고 문서화할 수 있습니다.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NewsNavigation } from './NewsNavigation';

// 🎯 Storybook 메타데이터 정의
const meta: Meta<typeof NewsNavigation> = {
  title: 'Molecules/NewsNavigation',
  component: NewsNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
🗞️ **NewsNavigation 컴포넌트**

중앙일보 스타일의 뉴스 카테고리 네비게이션 컴포넌트입니다. 뉴스 카테고리를 선택하고 필터링할 수 있습니다.

**주요 기능:**
- 🏷️ 뉴스 카테고리 네비게이션
- 📱 반응형 디자인 (데스크톱/모바일)
- 🎯 활성 카테고리 표시
- 📱 모바일 드롭다운 메뉴
- 🎨 다양한 스타일 변형

**사용 예시:**
\`\`\`tsx
<NewsNavigation
  activeCategory="정치"
  onCategoryChange={handleCategoryChange}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeCategory: {
      description: '현재 선택된 카테고리',
      control: 'select',
      options: ['전체', '정치', '경제', '사회', '문화', '스포츠', '기술', '국제', '연예', '건강', '교육', '환경'],
    },
    categories: {
      description: '표시할 카테고리 목록',
      control: 'object',
    },
    useMobileDropdown: {
      description: '모바일에서 드롭다운 사용 여부',
      control: 'boolean',
    },
    variant: {
      description: '네비게이션 스타일',
      control: 'select',
      options: ['default', 'compact', 'minimal'],
    },
    onCategoryChange: {
      description: '카테고리 변경 이벤트 핸들러',
      action: 'category changed',
    },
    onMobileMenuToggle: {
      description: '모바일 메뉴 토글 이벤트 핸들러',
      action: 'mobile menu toggled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 📰 기본 네비게이션
export const Default: Story = {
  args: {
    activeCategory: '전체',
  },
};

// 🏷️ 정치 카테고리 활성
export const Politics: Story = {
  args: {
    activeCategory: '정치',
  },
};

// 💰 경제 카테고리 활성
export const Economy: Story = {
  args: {
    activeCategory: '경제',
  },
};

// 🏃 스포츠 카테고리 활성
export const Sports: Story = {
  args: {
    activeCategory: '스포츠',
  },
};

// 🔬 기술 카테고리 활성
export const Technology: Story = {
  args: {
    activeCategory: '기술',
  },
};

// 🎨 컴팩트 스타일
export const Compact: Story = {
  args: {
    activeCategory: '문화',
    variant: 'compact',
  },
};

// 🎯 미니멀 스타일
export const Minimal: Story = {
  args: {
    activeCategory: '사회',
    variant: 'minimal',
  },
};

// 📱 모바일 드롭다운 비활성화
export const NoMobileDropdown: Story = {
  args: {
    activeCategory: '국제',
    useMobileDropdown: false,
  },
};

// 🎨 커스텀 카테고리
export const CustomCategories: Story = {
  args: {
    activeCategory: '정치',
    categories: ['전체', '정치', '경제', '사회', '기술'],
  },
};

// 🎯 인터랙션 테스트
export const Interactive: Story = {
  args: {
    activeCategory: '전체',
  },
  parameters: {
    docs: {
      description: {
        story: `
🎯 **인터랙션 테스트**

이 스토리는 NewsNavigation 컴포넌트의 다양한 인터랙션을 테스트할 수 있습니다:

1. **카테고리 클릭**: 각 카테고리 버튼을 클릭하면 콘솔에 로그가 출력됩니다
2. **모바일 메뉴**: 모바일 뷰에서 드롭다운 메뉴를 토글할 수 있습니다
3. **반응형**: 브라우저 크기를 조절하여 반응형 동작을 확인할 수 있습니다

개발자 도구의 콘솔을 열어서 각 인터랙션의 결과를 확인해보세요!
        `,
      },
    },
  },
};

// 📱 모바일 뷰 테스트
export const MobileView: Story = {
  args: {
    activeCategory: '연예',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 🖥️ 태블릿 뷰 테스트
export const TabletView: Story = {
  args: {
    activeCategory: '건강',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

// 🎨 다크 모드 테스트
export const DarkMode: Story = {
  args: {
    activeCategory: '교육',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

// 🎯 모든 카테고리 표시
export const AllCategories: Story = {
  args: {
    activeCategory: '환경',
    categories: [
      '전체', '정치', '경제', '사회', '문화', '스포츠',
      '기술', '국제', '연예', '건강', '교육', '환경'
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
}; 