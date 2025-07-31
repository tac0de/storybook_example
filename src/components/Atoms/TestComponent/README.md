# TestComponent - React + TypeScript + Storybook 튜토리얼

이 컴포넌트는 React, TypeScript, Storybook의 기본 개념들을 학습하기 위한 완전한 예제입니다.

## 📚 학습 목표

이 컴포넌트를 통해 다음 개념들을 학습할 수 있습니다:

### 1. TypeScript

- **인터페이스 정의**: Props 타입 안전성
- **제네릭 타입**: React.FC 사용법
- **유니온 타입**: size, variant props
- **옵셔널 프로퍼티**: 선택적 props

### 2. React

- **함수형 컴포넌트**: 최신 React 패턴
- **Hooks**: useState를 사용한 상태 관리
- **이벤트 핸들링**: 클릭, 마우스 이벤트
- **조건부 렌더링**: 상태에 따른 UI 변화
- **Props 전달**: 부모-자식 컴포넌트 통신

### 3. CSS Modules

- **스타일 캡슐화**: 컴포넌트별 스타일 관리
- **classnames/bind**: 조건부 클래스 적용
- **반응형 디자인**: 미디어 쿼리 사용
- **애니메이션**: CSS 키프레임

### 4. Storybook

- **스토리 작성**: 다양한 사용 시나리오
- **인터랙티브 데모**: 실제 동작 확인
- **문서화**: 자동 문서 생성
- **Controls**: Props 실시간 조작

## 🚀 사용법

### 기본 사용법

```tsx
import { TestComponent } from '@/components/Atoms/TestComponent';

function App() {
  const handleClick = () => {
    console.log('TestComponent clicked!');
  };

  return (
    <TestComponent
      text='Hello World'
      size='md'
      variant='primary'
      onClick={handleClick}
    />
  );
}
```

### Props 설명

| Prop        | 타입                                                | 기본값      | 설명                            |
| ----------- | --------------------------------------------------- | ----------- | ------------------------------- |
| `text`      | `string`                                            | -           | 컴포넌트에 표시할 텍스트 (필수) |
| `size`      | `'sm' \| 'md' \| 'lg'`                              | `'md'`      | 컴포넌트의 크기                 |
| `variant`   | `'primary' \| 'secondary' \| 'success' \| 'danger'` | `'primary'` | 색상 변형                       |
| `disabled`  | `boolean`                                           | `false`     | 비활성화 여부                   |
| `onClick`   | `() => void`                                        | -           | 클릭 이벤트 핸들러              |
| `className` | `string`                                            | -           | 추가 CSS 클래스                 |

### 크기 옵션

- **sm**: 작은 크기 (80x60px)
- **md**: 중간 크기 (120x80px) - 기본값
- **lg**: 큰 크기 (160x100px)

### 색상 변형

- **primary**: 파란색 (기본)
- **secondary**: 회색
- **success**: 초록색
- **danger**: 빨간색

## 🎯 주요 기능

### 1. 상태 관리

```tsx
const [isHovered, setIsHovered] = useState(false);
const [clickCount, setClickCount] = useState(0);
```

### 2. 이벤트 핸들링

```tsx
const handleClick = () => {
  if (disabled) return;
  setClickCount(prev => prev + 1);
  onClick?.();
};
```

### 3. 조건부 렌더링

```tsx
const renderClickMessage = () => {
  if (clickCount >= 5) {
    return <span className={cx('special-message')}>🎉 축하합니다!</span>;
  }
  return null;
};
```

### 4. CSS Modules 스타일링

```tsx
const componentClasses = cx(
  'test-component',
  `size-${size}`,
  `variant-${variant}`,
  {
    disabled: disabled,
    hovered: isHovered,
  },
  className
);
```

## 📖 Storybook 데모

Storybook에서 다음 스토리들을 확인할 수 있습니다:

### 1. Default

- 기본적인 사용법
- Controls 패널에서 props 실시간 조작 가능

### 2. Sizes

- 세 가지 크기 옵션 비교
- 시각적 차이점 확인

### 3. Variants

- 네 가지 색상 변형 비교
- 각 색상의 의미와 사용법

### 4. Disabled

- 비활성화 상태 동작 확인
- 접근성 고려사항

### 5. Interactive

- 실제 상태 변화 데모
- 클릭할 때마다 색상 변경
- 5회 이상 클릭 시 특별 메시지

### 6. AllCombinations

- 모든 props 조합 그리드
- 완전한 시각적 가이드

## 🔧 개발 가이드

### 파일 구조

```
TestComponent/
├── TestComponent.tsx          # 메인 컴포넌트
├── TestComponent.module.scss  # 스타일
├── TestComponent.module.scss.d.ts  # 타입 정의
├── TestComponent.stories.tsx  # Storybook 스토리
├── index.ts                   # Export
└── README.md                  # 문서
```

### 개발 순서

1. **Props 인터페이스 정의** - TypeScript 타입 안전성
2. **컴포넌트 로직 구현** - React Hooks와 이벤트 핸들링
3. **스타일 작성** - CSS Modules와 반응형 디자인
4. **Storybook 스토리 작성** - 다양한 사용 시나리오
5. **문서화** - README와 주석

### 모범 사례

- **타입 안전성**: 모든 props에 타입 정의
- **접근성**: ARIA 속성과 키보드 네비게이션
- **성능**: 불필요한 리렌더링 방지
- **재사용성**: 유연한 props 설계
- **테스트 가능성**: 명확한 인터페이스

## 🎨 커스터마이징

### 스타일 오버라이드

```tsx
<TestComponent text='Custom Style' className='my-custom-class' />
```

### CSS 변수 사용

```scss
.test-component {
  --custom-color: #ff6b6b;
  background-color: var(--custom-color);
}
```

### 테마 확장

```tsx
// 새로운 variant 추가
variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'custom';
```

## 🧪 테스트

### 단위 테스트 예시

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { TestComponent } from './TestComponent';

test('renders with correct text', () => {
  render(<TestComponent text='Test Text' />);
  expect(screen.getByText('Test Text')).toBeInTheDocument();
});

test('handles click events', () => {
  const handleClick = jest.fn();
  render(<TestComponent text='Click me' onClick={handleClick} />);

  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 📚 추가 학습 자료

- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Storybook 문서](https://storybook.js.org/docs/)
- [CSS Modules 가이드](https://github.com/css-modules/css-modules)

## 🤝 기여하기

이 컴포넌트는 학습 목적으로 만들어졌습니다. 개선 사항이나 버그 리포트는 언제든 환영합니다!

---

**Happy Coding! 🚀**
