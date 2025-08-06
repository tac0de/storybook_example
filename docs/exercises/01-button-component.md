# 🎯 실습 1: Button 컴포넌트 만들기

## 📚 학습 목표

이 실습을 통해 다음을 학습합니다:

* React 함수형 컴포넌트 기본 구조 이해
* TypeScript로 인터페이스(Props) 정의하는 방법
* Props를 통한 데이터 전달과 이벤트 처리
* Storybook을 활용해 컴포넌트를 문서화하고 테스트하는 방법
* 컴포넌트 재사용성 설계

## ⏱️ 예상 소요 시간

**2시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* 기본적인 HTML, CSS, JavaScript 기초 지식

## 📘 사전 개념 설명

### React 함수형 컴포넌트

* **React**는 UI를 컴포넌트 단위로 구성합니다.
* 함수형 컴포넌트는 자바스크립트 함수 형태로, `props`를 받아서 JSX를 반환합니다.

### TypeScript 인터페이스

* **TypeScript**는 자바스크립트에 타입을 추가한 언어입니다.
* 인터페이스(`interface`)로 컴포넌트에 넘겨줄 `props`의 형태를 정의해 오류를 줄이고, 개발 자동완성을 돕습니다.

### Storybook

* **Storybook**은 컴포넌트를 독립적으로 실행해 보고, 다양한 상태를 문서화하는 도구입니다.
* `.stories.tsx` 파일에 컴포넌트 사용 예시를 작성하면, 웹에서 미리 보기와 Controls(조작)를 제공합니다.

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 이해 (10분)

```
src/components/atoms/Button/
├── Button.tsx             # 컴포넌트 구현
├── Button.stories.tsx     # Storybook 스토리
└── index.ts               # 컴포넌트 내보내기
```

> **질문**: 각 파일의 역할을 설명해보세요.

### 2단계: TypeScript 인터페이스 작성 (20분)

#### 🎯 학습 포인트

* 인터페이스로 `props` 타입 정의
* 선택적 속성(`?`)과 필수 속성 구분

#### 📝 실습 과제

`Button.tsx` 파일에서 `ButtonProps` 인터페이스를 확인하세요:

```typescript
export interface ButtonProps {
  text: string;                             // 버튼 텍스트 (필수)
  onClick?: (e: React.MouseEvent) => void;  // 클릭 이벤트 (선택)
  disabled?: boolean;                       // 비활성화 여부 (선택)
  fullWidth?: boolean;                      // 가로 100% 여부 (선택)
}
```

> **실습 문제**:
>
> 1. `?`가 있는 속성과 없는 속성 차이
> 2. `onClick`이 선택적인 이유

### 3단계: 컴포넌트 구조 이해 (30분)

#### 🎯 학습 포인트

* 함수형 컴포넌트 선언
* Props 구조 분해 할당
* 기본값 설정

#### 📝 실습 과제

```typescript
export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  fullWidth = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onClick && onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={fullWidth ? 'full-width' : ''}
    >
      {text}
    </button>
  );
};
```

> **실습 문제**:
>
> 1. `React.FC<ButtonProps>` 의미
> 2. 기본값 설정 이유

### 4단계: CSS Module 적용 (20분)

> SCSS 스타일링 대신 기본 CSS Modules로 연습합니다.

1. `Button.module.scss` 대신 `Button.module.css` 생성
2. `import styles from './Button.module.css'`
3. `<button className={styles.button}>`

> **실습 문제**:
>
> * CSS Modules 사용 장점

### 5단계: 이벤트 핸들링 (15분)

#### 🎯 학습 포인트

* React 이벤트 처리 패턴

#### 📝 실습 과제

```typescript
const handleClick = (e: React.MouseEvent) => {
  if (disabled) return;
  onClick && onClick(e);
};
```

> **실습 문제**:
>
> * `disabled` 체크 이유

### 6단계: 조건부 렌더링 (15분)

#### 🎯 학습 포인트

* 조건에 따라 다른 JSX 반환

#### 📝 실습 과제

```typescript
return (
  <button onClick={handleClick} disabled={disabled}>
    {icon ? (
      <span>{icon}</span>
    ) : (
      text
    )}
  </button>
);
```

> **실습 문제**:
>
> * `icon` 있을 때와 없을 때 차이

### 7단계: Storybook 스토리 작성 (20분)

#### 🎯 학습 포인트

* 스토리를 통한 컴포넌트 문서화
* Controls 활용

#### 📝 실습 과제

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    text: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
export const Default: StoryObj<typeof Button> = {
  args: {
    text: '클릭하세요',
    disabled: false,
    fullWidth: false,
  },
};
```

> **실습 문제**:
>
> * `argTypes` 역할

---

## 🎯 실습 과제

1. 새로운 버튼 컴포넌트 복제 및 수정
2. `loading` prop 추가
3. `danger` variant 구현

## 📝 체크리스트

* [ ] React 함수형 컴포넌트 작성
* [ ] TypeScript 인터페이스 정의
* [ ] CSS Modules 적용
* [ ] 이벤트 핸들링 패턴 이해
* [ ] 조건부 렌더링 이해
* [ ] Storybook 스토리 작성

## 🤔 자주 묻는 질문

**Q1: CSS Modules 대신 직접 CSS 파일 사용하면 안 되나요?**
A: CSS Modules는 클래스 충돌을 막고, 파일 단위로 스타일을 격리해줍니다.

**Q2: Storybook이 꼭 필요한가요?**
A: 단독으로 컴포넌트를 미리 보고, 문서화하며 테스트할 수 있어 개발 효율이 올라갑니다.

---
