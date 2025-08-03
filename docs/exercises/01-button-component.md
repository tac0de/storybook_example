# 🎯 실습 1: Button 컴포넌트 만들기

## 📚 학습 목표

이 실습을 통해 다음을 학습합니다:

- React 함수형 컴포넌트 작성법
- TypeScript 인터페이스 정의
- Props와 이벤트 핸들링
- SCSS Modules를 활용한 스타일링
- 컴포넌트 재사용성 설계

## ⏱️ 예상 소요 시간

**2시간** (초보자 기준)

## 🛠️ 준비사항

- VS Code 또는 선호하는 코드 에디터
- Node.js 개발 환경
- 기본적인 HTML, CSS, JavaScript 지식

## 📋 단계별 실습

### 1단계: 프로젝트 구조 이해 (10분)

먼저 Button 컴포넌트의 폴더 구조를 확인해보세요:

```
src/components/Atoms/Button/
├── Button.tsx              # 🎯 컴포넌트 로직
├── Button.module.scss      # 🎨 스타일 정의
├── Button.stories.tsx      # 📖 Storybook 스토리
└── index.ts               # 📦 내보내기
```

**질문**: 각 파일의 역할이 무엇인지 설명해보세요.

### 2단계: TypeScript 인터페이스 작성 (20분)

#### 🎯 학습 포인트

- TypeScript 인터페이스의 필요성
- Props 타입 정의 방법
- 선택적 속성과 필수 속성 구분

#### 📝 실습 과제

`Button.tsx` 파일을 열고 `ButtonProps` 인터페이스를 살펴보세요:

```typescript
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg';
  borderRadius?: 'sm' | 'md' | 'lg' | 'full';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
}
```

**실습 문제**:

1. `?` 기호가 있는 속성과 없는 속성의 차이점은?
2. `children: React.ReactNode`가 필수인 이유는?
3. `onClick` 함수의 매개변수 타입이 복잡한 이유는?

### 3단계: 컴포넌트 구조 이해 (30분)

#### 🎯 학습 포인트

- 함수형 컴포넌트 작성법
- Props 구조 분해 할당
- 기본값 설정 방법

#### 📝 실습 과제

Button 컴포넌트의 구조를 분석해보세요:

```typescript
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary', // 기본값 설정
  size = 'md',
  borderRadius = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  children, // 필수 prop
  className,
  leftIcon,
  rightIcon,
  icon,
}) => {
  // 컴포넌트 로직
};
```

**실습 문제**:

1. `React.FC<ButtonProps>`의 의미는?
2. 왜 일부 props에는 기본값이 있고, 일부는 없을까요?
3. `children`이 필수인 이유는?

### 4단계: CSS 클래스 조합 로직 (20분)

#### 🎯 학습 포인트

- classnames 라이브러리 활용
- 조건부 클래스 적용
- CSS Modules와의 연동

#### 📝 실습 과제

CSS 클래스 조합 로직을 이해해보세요:

```typescript
const buttonClasses = cx(
  'button', // 기본 클래스
  `button--${variant}`, // variant에 따른 클래스
  `button--${size}`, // size에 따른 클래스
  `button--radius-${borderRadius}`, // borderRadius에 따른 클래스
  {
    'button--full-width': fullWidth, // 조건부 클래스
  },
  className // 사용자 정의 클래스
);
```

**실습 문제**:

1. `cx()` 함수의 역할은?
2. 템플릿 리터럴을 사용하는 이유는?
3. 객체 형태로 조건부 클래스를 적용하는 방법은?

### 5단계: 이벤트 핸들링 (15분)

#### 🎯 학습 포인트

- React 이벤트 핸들링
- 조건부 함수 실행
- 이벤트 객체 활용

#### 📝 실습 과제

클릭 이벤트 핸들러를 분석해보세요:

```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  if (disabled) {
    return; // 비활성화된 버튼은 아무것도 하지 않음
  }

  if (onClick) {
    onClick(event); // 전달받은 함수 실행
  }
};
```

**실습 문제**:

1. `disabled` 상태일 때 왜 `return`하나요?
2. `onClick` 함수가 없을 수 있는 이유는?
3. `event` 객체를 전달하는 이유는?

### 6단계: 조건부 렌더링 (15분)

#### 🎯 학습 포인트

- 조건부 렌더링 패턴
- JSX 조각(Fragment) 활용
- 컴포넌트 내부 구조 설계

#### 📝 실습 과제

버튼 내용 렌더링 로직을 이해해보세요:

```typescript
const renderContent = () => {
  if (icon) {
    return <span className={cx('button__icon')}>{icon}</span>;
  }

  return (
    <>
      {leftIcon && (
        <span className={cx('button__icon', 'button__icon--left')}>
          {leftIcon}
        </span>
      )}
      <span className={cx('button__content')}>{children}</span>
      {rightIcon && (
        <span className={cx('button__icon', 'button__icon--right')}>
          {rightIcon}
        </span>
      )}
    </>
  );
};
```

**실습 문제**:

1. `icon` prop이 있을 때와 없을 때의 차이점은?
2. `<>` (Fragment)를 사용하는 이유는?
3. 조건부 렌더링 `{leftIcon && ...}`의 의미는?

### 7단계: SCSS 스타일링 (20분)

#### 🎯 학습 포인트

- SCSS Modules 사용법
- BEM 방법론 적용
- 반응형 디자인

#### 📝 실습 과제

`Button.module.scss` 파일을 열고 스타일 구조를 분석해보세요:

```scss
.button {
  // 기본 스타일
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // variant별 스타일
  &--primary {
    background: $primary-color;
    color: white;
  }

  &--secondary {
    background: $gray-200;
    color: $gray-800;
  }

  // size별 스타일
  &--sm {
    height: 24px;
  }
  &--md {
    height: 32px;
  }
  &--lg {
    height: 40px;
  }
}
```

**실습 문제**:

1. `&` 기호의 역할은?
2. BEM 방법론에서 `button--primary`의 의미는?
3. 왜 CSS Modules를 사용하나요?

### 8단계: Storybook 스토리 작성 (20분)

#### 🎯 학습 포인트

- Storybook 활용법
- 컴포넌트 문서화
- 다양한 사용 예시 제공

#### 📝 실습 과제

`Button.stories.tsx` 파일을 확인하고 스토리 구조를 이해해보세요:

```typescript
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select' },
    size: { control: 'select' },
    onClick: { control: false },
  },
};

export const Default: Story = {
  render: (args) => (
    <Button {...args} onClick={() => alert('클릭!')}>
      클릭하세요
    </Button>
  ),
};
```

**실습 문제**:

1. `argTypes`의 역할은?
2. `control: false`의 의미는?
3. `render` 함수에서 `alert`를 사용하는 이유는?

## 🎯 실습 과제

### 기본 과제

1. **Button 컴포넌트 복사하기**: 기존 Button 컴포넌트를 참고하여 새로운 버튼 컴포넌트를 만들어보세요.
2. **Props 추가하기**: `loading` prop을 추가하여 로딩 상태를 표시하는 기능을 구현해보세요.
3. **새로운 variant 만들기**: `danger` variant를 추가하여 위험한 액션용 버튼을 만들어보세요.

### 심화 과제

1. **애니메이션 추가**: 버튼 클릭 시 ripple 효과를 추가해보세요.
2. **접근성 개선**: 키보드 네비게이션과 스크린 리더 지원을 추가해보세요.
3. **테스트 작성**: Jest와 React Testing Library를 사용하여 테스트 코드를 작성해보세요.

## 📝 체크리스트

- [ ] TypeScript 인터페이스 이해
- [ ] Props 구조 분해 할당 이해
- [ ] CSS 클래스 조합 로직 이해
- [ ] 이벤트 핸들링 패턴 이해
- [ ] 조건부 렌더링 이해
- [ ] SCSS Modules 사용법 이해
- [ ] Storybook 스토리 작성법 이해

## 🤔 자주 묻는 질문

### Q: 왜 TypeScript를 사용하나요?

**A**: 타입 안전성을 보장하고, 개발 시 자동완성과 오류 검출을 통해 생산성을 높일 수 있습니다.

### Q: CSS Modules 대신 일반 CSS를 사용하면 안 되나요?

**A**: CSS Modules를 사용하면 클래스명 충돌을 방지하고 컴포넌트별로 스타일을 격리할 수 있습니다.

### Q: 왜 이벤트 핸들러를 props로 전달하나요?

**A**: React에서는 데이터가 위에서 아래로 흐르는 단방향 데이터 플로우를 따르기 때문입니다.

## 🎉 완료 후 다음 단계

Button 컴포넌트 실습을 완료했다면:

1. **Input 컴포넌트 실습**으로 이동하세요
2. **Avatar 컴포넌트 실습**으로 이동하세요
3. **Molecules 컴포넌트 실습**으로 이동하세요

---

**💡 팁**: 각 단계를 완료할 때마다 코드를 커밋하고, 변경사항을 기록해두세요.
나중에 복습할 때 매우 유용합니다!
