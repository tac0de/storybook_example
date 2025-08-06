# 🎯 실습 2: Input 컴포넌트 만들기

## 📚 학습 목표

* React 함수형 컴포넌트 구조 이해 (Input)
* TypeScript로 Props 인터페이스 정의
* Controlled Component 패턴 적용
* `classnames/bind`를 활용한 CSS Module 연동
* Storybook을 통한 컴포넌트 문서화
* 재사용성 고려한 컴포넌트 설계

## ⏱️ 예상 소요 시간

**1.5시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* 기본적인 JavaScript/TypeScript 기초 지식

## 📘 사전 개념 설명

### React 함수형 컴포넌트

* UI를 작은 컴포넌트 단위로 분할해 관리
* 함수형 컴포넌트는 `props`를 받아 JSX를 반환

### TypeScript 인터페이스

* `interface`로 컴포넌트 `props` 형태 정의
* 타입 안정성 확보 및 자동완성 지원

### classnames/bind

* CSS Module 클래스명을 조건부로 조합하는 유틸
* 스타일 객체(`styles`)와 바인딩한 `cx` 함수 사용

### Storybook

* 독립적인 컴포넌트 미리 보기 및 문서화 도구
* `.stories.tsx` 파일로 다양한 상태를 Controls 탭에서 조작 가능

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 이해 (10분)

```
src/components/atoms/Input/
├── Input.tsx             # 컴포넌트 구현
├── Input.stories.tsx     # Storybook 스토리
└── index.ts              # 내보내기
```

> **질문**: `index.ts` 파일의 역할은 무엇인가요?

### 2단계: TypeScript 인터페이스 작성 (15분)

```typescript
export interface InputProps {
  value: string;                                                  // 입력 값 (필수)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;     // 변경 이벤트 (필수)
  placeholder?: string;                                          // 안내 텍스트 (선택)
  disabled?: boolean;                                            // 비활성화 여부 (선택)
}
```

> **실습 문제**:
>
> 1. `value`와 `onChange`가 모두 필수인 이유는?
> 2. `?`가 붙은 속성의 의미는?

### 3단계: 컴포넌트 구현 (35분)

```typescript
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;    // 비활성화 상태면 이벤트 무시
    onChange(e);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={cx('input', { 'input--disabled': disabled })}
    />
  );
};
```

> **실습 문제**:
>
> 1. `classnames/bind`를 사용하는 이유는?
> 2. `cx('input', { 'input--disabled': disabled })` 동작 방식은?

### 4단계: Storybook 스토리 작성 (25분)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from './Input';

const meta: Meta<InputProps> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
export const Default: StoryObj<InputProps> = {
  args: {
    value: '',
    placeholder: '텍스트를 입력하세요',
    disabled: false,
  },
};
```

> **실습 문제**:
>
> 1. `argTypes`가 하는 역할은 무엇인가요?
> 2. `onChange`를 action으로 설정하는 이유는?

---

## 🎯 실습 과제

1. `label` prop을 추가해 `<label>` 요소로 렌더링
2. `type` prop(`text` | `password`) 추가해 다양한 입력 타입 지원
3. `errorMessage` prop을 받아 에러 텍스트 조건부 표시

## 📝 체크리스트

* [ ] React 함수형 컴포넌트 작성
* [ ] TypeScript 인터페이스 정의
* [ ] classnames/bind 연동 이해
* [ ] Controlled Component 패턴 구현
* [ ] Storybook 스토리 작성

## 🤔 자주 묻는 질문

**Q: 왜 `classnames/bind`를 사용하나요?**
A: CSS Module 클래스 이름을 안전하게 조합하고 조건부 스타일링을 쉽게 처리하기 위해 사용합니다.

**Q: Controlled Component란 무엇인가요?**
A: React state로 입력 값을 관리하는 컴포넌트를 말하며, 항상 `value`와 `onChange`를 통해 제어됩니다.

---
