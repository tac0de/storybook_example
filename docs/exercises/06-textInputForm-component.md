# 🎯 실습 6: TextInputForm 컴포넌트 만들기

## 📚 학습 목표

* Atom 컴포넌트 조합을 통한 Molecule 설계
* TypeScript로 Props 인터페이스 정의하기
* `classnames/bind`를 활용해 CSS Module 클래스 조합하기
* React 이벤트(입력·제출) 처리 패턴 이해
* Storybook에서 컴포넌트 문서화 및 Controls 설정하기

## ⏱️ 예상 소요 시간

**1.5시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* Atom 단계에서 만든 `Input`과 `ActionButton` 컴포넌트 학습 완료

## 📘 사전 개념 설명

### Molecule 컴포넌트

* 여러 Atom을 한데 묶어 실용적인 UI 단위(입력 + 버튼)를 완성

### Props 인터페이스

* `interface`로 `props` 타입 명확히 정의해 오류 방지 및 자동완성 지원

### classnames/bind

* CSS Module 스타일을 조건부로 조합하는 유틸리티
* `styles` 객체와 바인딩된 `cx` 함수 사용

### React 이벤트 처리

* Controlled Component 패턴으로 입력값을 상위로 올림
* `onSubmit` 콜백으로 폼 제출 처리

### Storybook

* 컴포넌트를 독립 실행해 UI 상태 확인 및 문서화
* `argTypes`로 Controls 탭에서 Prop 조작 가능

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 확인 (5분)

```
src/components/molecules/TextInputForm/
├── TextInputForm.tsx        # 컴포넌트 구현
├── TextInputForm.stories.tsx# Storybook 스토리
└── index.ts                 # 내보내기
```

> **질문**: Molecules 폴더에 위치해야 하는 이유는 무엇인가요?

### 2단계: Props 인터페이스 작성 (10분)

```typescript
export interface TextInputFormProps {
  value: string;                                          // 입력 값 (필수)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 변경 콜백
  onSubmit: () => void;                                   // 제출 처리 콜백 (필수)
  placeholder?: string;                                   // 입력 안내 텍스트 (선택)
  buttonLabel?: string;                                   // 버튼 텍스트 (선택, 기본: "전송")
  disabled?: boolean;                                     // 비활성화 상태 (선택)
  className?: string;                                     // 추가 클래스 (선택)
}
```

> **실습 문제**:
>
> 1. `value`와 `onChange`가 모두 필요한 이유는?
> 2. `onSubmit`과 버튼 클릭 이벤트 처리 방식 차이는?

### 3단계: 컴포넌트 구현 (40분)

```typescript
import React from 'react';
import classNames from 'classnames/bind';
import { Input } from '@/components/atoms/Input';
import { ActionButton } from '@/components/molecules/ActionButton';
import styles from './TextInputForm.module.scss';

const cx = classNames.bind(styles);

export const TextInputForm: React.FC<TextInputFormProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = '',
  buttonLabel = '전송',
  disabled = false,
  className,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className={cx('text-input-form', className)}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cx('input')}
        onKeyPress={handleKeyPress}
      />
      <ActionButton
        label={buttonLabel}
        onAction={onSubmit}
        disabled={disabled}
        className={cx('button')}
      />
    </div>
  );
};
```

> **실습 문제**:
>
> 1. `handleKeyPress`에서 `Enter` 키를 처리하는 이유는?
> 2. Atom `Input`과 Molecule `ActionButton`을 조합했을 때 장점은?

### 4단계: Storybook 스토리 작성 (25분)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { TextInputForm, TextInputFormProps } from './TextInputForm';

const meta: Meta<TextInputFormProps> = {
  title: 'Molecules/TextInputForm',
  component: TextInputForm,
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    buttonLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    onSubmit: { action: 'submitted' },
  },
};

export default meta;
export const Default: StoryObj<TextInputFormProps> = {
  args: {
    value: '',
    placeholder: '메시지를 입력하세요',
    buttonLabel: '전송',
    disabled: false,
  },
};
```

> **실습 문제**:
>
> 1. `argTypes`에서 `onSubmit`을 어떻게 테스트하나요?
> 2. `onChange`와 `onSubmit` 로그를 확인해 보세요.

---

## 🎯 실습 과제

1. `maxLength` prop을 추가해 입력 글자 수 제한 처리
2. 입력값이 비어 있으면 버튼을 비활성화(`disabled`) 처리
3. 에러 메시지(`errorMessage` prop) 조건부 렌더링 구현

## 📝 체크리스트

* [ ] Props 인터페이스 정의
* [ ] classnames/bind 이해
* [ ] React 이벤트 처리 패턴 구현
* [ ] Storybook 스토리 작성

## 🤔 자주 묻는 질문

**Q: `onKeyPress`와 `onSubmit`을 함께 사용할 때 주의할 점은?**
A: 두 핸들러가 중복 호출되지 않도록 `disabled` 체크를 충분히 해야 합니다.

**Q: Molecule 컴포넌트를 테스트할 때 Storybook 외 다른 방법은?**
A: Jest 및 React Testing Library를 사용해 유닛 테스트 작성이 가능합니다.

---
