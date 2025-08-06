# 🎯 실습 3: Avatar 컴포넌트 만들기

## 📚 학습 목표

* React 함수형 컴포넌트 구조 이해 (Avatar)
* TypeScript로 Props 인터페이스 정의
* `classnames/bind`를 활용한 CSS Module 연동
* Storybook을 통한 컴포넌트 문서화 및 Controls 사용
* 컴포넌트 재사용성 설계

## ⏱️ 예상 소요 시간

**1시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* 기본적인 JavaScript/TypeScript 기초 지식

## 📘 사전 개념 설명

### React 함수형 컴포넌트

* 작은 UI 단위인 컴포넌트를 함수 형태로 선언
* `props`를 받아 JSX로 반환

### TypeScript 인터페이스

* `interface`로 `props` 형태 정의
* 코드 안정성과 자동완성 지원

### classnames/bind

* CSS Module 클래스명을 안전하게 조합
* `styles` 객체와 바인딩된 `cx` 함수 사용

### Storybook

* 컴포넌트를 독립 실행하며 상태별 UI 문서화
* `.stories.tsx` 파일로 Controls 활용 가능

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 이해 (5분)

```
src/components/atoms/Avatar/
├── Avatar.tsx            # 컴포넌트 구현
├── Avatar.stories.tsx    # Storybook 스토리
└── index.ts              # 내보내기
```

> **질문**: `index.ts`는 왜 필요한가요?

### 2단계: TypeScript 인터페이스 작성 (10분)

```typescript
export interface AvatarProps {
  src: string;                  // 이미지 URL (필수)
  alt?: string;                 // 대체 텍스트 (선택)
  size?: 'sm' | 'md' | 'lg';    // 크기 설정 (선택)
  className?: string;           // 추가 스타일 클래스 (선택)
}
```

> **실습 문제**:
>
> 1. `src`가 필수인 이유는?
> 2. `size` 옵션을 제공하는 이유는?

### 3단계: 컴포넌트 구현 (25분)

```typescript
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className,
}) => {
  const rootClass = cx(
    'avatar',
    `avatar--${size}`,
    className
  );

  return (
    <img
      src={src}
      alt={alt}
      className={rootClass}
    />
  );
};
```

> **실습 문제**:
>
> 1. `avatar--${size}` 클래스는 어떻게 동작하나요?
> 2. `className`을 함께 받는 이유는?

### 4단계: Storybook 스토리 작성 (20분)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarProps } from './Avatar';

const meta: Meta<AvatarProps> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    className: { control: false },
  },
};

export default meta;
export const Default: StoryObj<AvatarProps> = {
  args: {
    src: 'https://via.placeholder.com/80',
    alt: 'User Avatar',
    size: 'md',
  },
};
```

> **실습 문제**:
>
> 1. `argTypes`에서 `className`을 숨긴 이유는?
> 2. 다양한 `size` 옵션을 Controls에서 테스트해보세요.

---

## 🎯 실습 과제

1. `fallbackSrc` prop을 추가해 이미지 로드 실패 시 대체 이미지 표시
2. `isRounded` prop을 받아 테두리 둥글게 처리하기
3. `onClick` prop으로 클릭 이벤트 처리 지원

## 📝 체크리스트

*

## 🤔 자주 묻는 질문

**Q: **\`\`** prop을 언제 사용하나요?**
A: 부모 컴포넌트에서 추가 스타일이나 레이아웃 조정을 위해 전달합니다.

**Q: Storybook에서 이미지 로딩이 실패하면 어떻게 하나요?**
A: `fallbackSrc`를 활용해 대체 이미지로 교체합니다.

---

다음 컴포넌트(`Text`) 문서화로 이어집니다.
