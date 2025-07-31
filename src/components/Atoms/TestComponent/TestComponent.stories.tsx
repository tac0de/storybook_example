import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TestComponent } from './TestComponent';

/**
 * TestComponent Storybook 메타데이터
 *
 * 이 객체는 Storybook에서 컴포넌트를 어떻게 표시할지 정의합니다.
 * - title: Storybook 사이드바에서 표시될 경로
 * - component: 실제 컴포넌트
 * - tags: 자동 문서 생성 등 기능 활성화
 * - argTypes: Storybook Controls 패널에서 props를 조작할 수 있도록 설정
 */
const meta: Meta<typeof TestComponent> = {
  title: 'Atoms/TestComponent',
  component: TestComponent,
  tags: ['autodocs'],
  parameters: {
    // 컴포넌트 설명
    docs: {
      description: {
        component: `
## TestComponent - React + TypeScript + Storybook 튜토리얼

이 컴포넌트는 React, TypeScript, Storybook의 기본 개념들을 학습하기 위한 예제입니다.

### 주요 학습 포인트

1. **TypeScript Props 정의**: 인터페이스를 통한 타입 안전성
2. **React Hooks**: useState, useEffect, useRef를 사용한 상태 관리
3. **이벤트 핸들링**: 클릭, 마우스 이벤트 처리
4. **조건부 렌더링**: 상태에 따른 UI 변화
5. **사이드 이펙트**: useEffect를 사용한 생명주기 관리
6. **DOM 접근**: useRef를 사용한 DOM 요소 직접 조작
7. **CSS Modules**: 컴포넌트별 스타일 관리
8. **접근성**: ARIA 속성과 키보드 네비게이션

### Props 설명

- \`text\`: 컴포넌트에 표시할 텍스트 (필수)
- \`size\`: 컴포넌트 크기 (sm, md, lg)
- \`variant\`: 색상 변형 (primary, secondary, success, danger)
- \`disabled\`: 비활성화 여부
- \`onClick\`: 클릭 이벤트 핸들러
- \`className\`: 추가 CSS 클래스

### 사용 예시

\`\`\`tsx
import { TestComponent } from './TestComponent';

function App() {
  const handleClick = () => {
    console.log('TestComponent clicked!');
  };

  return (
    <TestComponent
      text="Hello World"
      size="md"
      variant="primary"
      onClick={handleClick}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    // text prop 설정
    text: {
      control: 'text',
      description: '컴포넌트에 표시할 텍스트',
      defaultValue: 'Hello World',
    },
    // size prop 설정
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '컴포넌트의 크기',
      defaultValue: 'md',
    },
    // variant prop 설정
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger'],
      description: '컴포넌트의 색상 변형',
      defaultValue: 'primary',
    },
    // disabled prop 설정
    disabled: {
      control: 'boolean',
      description: '컴포넌트 비활성화 여부',
      defaultValue: false,
    },
    // onClick prop 설정
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 스토리
 *
 * 컴포넌트의 기본적인 사용법을 보여줍니다.
 */
export const Default: Story = {
  args: {
    text: 'Hello World',
    size: 'md',
    variant: 'primary',
    disabled: false,
  },
};

/**
 * 크기 변형 스토리
 *
 * 다양한 크기 옵션을 한 번에 보여줍니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <TestComponent text='Small' size='sm' variant='primary' />
      <TestComponent text='Medium' size='md' variant='primary' />
      <TestComponent text='Large' size='lg' variant='primary' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TestComponent의 세 가지 크기 변형을 보여줍니다: sm, md, lg',
      },
    },
  },
};

/**
 * 색상 변형 스토리
 *
 * 다양한 색상 옵션을 한 번에 보여줍니다.
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <TestComponent text='Primary' size='md' variant='primary' />
      <TestComponent text='Secondary' size='md' variant='secondary' />
      <TestComponent text='Success' size='md' variant='success' />
      <TestComponent text='Danger' size='md' variant='danger' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'TestComponent의 네 가지 색상 변형을 보여줍니다: primary, secondary, success, danger',
      },
    },
  },
};

/**
 * 비활성화 상태 스토리
 *
 * disabled prop의 동작을 보여줍니다.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <TestComponent
        text='Enabled'
        size='md'
        variant='primary'
        disabled={false}
      />
      <TestComponent
        text='Disabled'
        size='md'
        variant='primary'
        disabled={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'disabled prop이 true일 때 컴포넌트가 비활성화되어 클릭할 수 없고 시각적으로도 구분됩니다.',
      },
    },
  },
};

/**
 * 인터랙티브 스토리
 *
 * 실제 상태 변화와 이벤트 핸들링을 보여줍니다.
 */
export const Interactive: Story = {
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState<
      'primary' | 'secondary' | 'success' | 'danger'
    >('primary');

    const handleClick = () => {
      setClickCount(prev => prev + 1);

      // 클릭 횟수에 따라 색상 변경
      const variants: Array<'primary' | 'secondary' | 'success' | 'danger'> = [
        'primary',
        'secondary',
        'success',
        'danger',
      ];
      const nextVariant = variants[clickCount % variants.length];
      setSelectedVariant(nextVariant);
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h3>인터랙티브 데모</h3>
          <p>컴포넌트를 클릭해보세요! 클릭할 때마다 색상이 바뀝니다.</p>
          <p>전체 클릭 횟수: {clickCount}</p>
        </div>

        <TestComponent
          text={`클릭해보세요! (${clickCount}회)`}
          size='lg'
          variant={selectedVariant}
          onClick={handleClick}
        />

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>
            현재 색상: <strong>{selectedVariant}</strong>
          </p>
          <p>5회 이상 클릭하면 특별한 메시지가 나타납니다! 🎉</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
이 스토리는 실제 React 상태 관리와 이벤트 핸들링을 보여줍니다.

### 주요 기능
- 클릭할 때마다 카운터 증가
- 클릭 횟수에 따라 색상 자동 변경
- 5회 이상 클릭 시 특별 메시지 표시
- useState Hook을 사용한 상태 관리

### 학습 포인트
1. **useState Hook**: 컴포넌트 내부 상태 관리
2. **useEffect Hook**: 사이드 이펙트와 생명주기 관리
3. **useRef Hook**: DOM 요소 직접 접근과 값 저장
4. **이벤트 핸들링**: onClick 이벤트 처리
5. **조건부 렌더링**: 클릭 횟수에 따른 UI 변화
6. **동적 props**: 상태에 따른 props 변경
7. **DOM 조작**: 클릭할 때마다 컴포넌트 크기 증가
        `,
      },
    },
  },
};

/**
 * 모든 옵션 조합 스토리
 *
 * 모든 props 조합을 한 번에 보여줍니다.
 */
export const AllCombinations: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {/* Small Size */}
      <TestComponent text='Small Primary' size='sm' variant='primary' />
      <TestComponent text='Small Secondary' size='sm' variant='secondary' />
      <TestComponent text='Small Success' size='sm' variant='success' />
      <TestComponent text='Small Danger' size='sm' variant='danger' />

      {/* Medium Size */}
      <TestComponent text='Medium Primary' size='md' variant='primary' />
      <TestComponent text='Medium Secondary' size='md' variant='secondary' />
      <TestComponent text='Medium Success' size='md' variant='success' />
      <TestComponent text='Medium Danger' size='md' variant='danger' />

      {/* Large Size */}
      <TestComponent text='Large Primary' size='lg' variant='primary' />
      <TestComponent text='Large Secondary' size='lg' variant='secondary' />
      <TestComponent text='Large Success' size='lg' variant='success' />
      <TestComponent text='Large Danger' size='lg' variant='danger' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '모든 크기와 색상 조합을 그리드 형태로 보여줍니다. 각 컴포넌트를 클릭해보세요!',
      },
    },
  },
};
