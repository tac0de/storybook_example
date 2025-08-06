# 🎯 실습 5: SortSelector 컴포넌트 만들기

## 📚 학습 목표

* Atom 컴포넌트 조합을 통한 Molecule 설계
* TypeScript로 Props 인터페이스 정의
* `classnames/bind`를 활용한 CSS Module 연동
* Storybook에서 컴포넌트 문서화 및 Controls 사용
* 선택 옵션 기반 UI 구현 및 이벤트 처리

## ⏱️ 예상 소요 시간

**1시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* Atom 단계에서 만든 `Text`(레이블) 컴포넌트 학습 완료

## 📘 사전 개념 설명

### Atom-Molecule 관계

* **Atom**: 재사용 가능한 최소 단위 컴포넌트 (예: Text)
* **Molecule**: 여러 Atom을 조합해 실용적 UI를 완성하는 중간 단위

### Props 인터페이스

* `interface`로 `props` 타입을 명확히 정의해 오류를 사전에 방지

### classnames/bind

* CSS Module 클래스명을 안전하게 조합
* `styles`와 바인딩한 `cx` 함수 사용

### Storybook

* 독립 실행으로 컴포넌트를 테스트·문서화
* `.stories.tsx` 파일에 `argTypes` 설정해 Controls 탭에서 조작 가능

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 확인 (5분)

```
src/components/molecules/SortSelector/
├── SortSelector.tsx        # 컴포넌트 구현
├── SortSelector.stories.tsx# Storybook 스토리
└── index.ts                # 내보내기
```

> **질문**: Molecules 폴더에 위치해야 하는 이유는 무엇인가요?

### 2단계: Props 인터페이스 작성 (10분)

```typescript
export interface SortSelectorProps {
  options: { value: string; label: string }[];  // 선택지 목록 (필수)
  value: string;                                // 현재 선택 값 (필수)
  onChange: (value: string) => void;            // 값 변경 콜백 (필수)
  label?: string;                              // 레이블 텍스트 (선택)
  className?: string;                          // 추가 클래스 (선택)
}
```

> **실습 문제**:
>
> 1. `options` 배열에 `value`와 `label`을 분리한 이유는?
> 2. `onChange` 인자 타입을 `string`으로 설정한 이유는?

### 3단계: 컴포넌트 구현 (30분)

```typescript
import React from 'react';
import classNames from 'classnames/bind';
import styles from './SortSelector.module.scss';
import { Text } from '@/components/atoms/Text';

const cx = classNames.bind(styles);

export const SortSelector: React.FC<SortSelectorProps> = ({
  options,
  value,
  onChange,
  label = 'Sort by',
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cx('sort-selector', className)}>
      <Text variant="caption">{label}</Text>
      <select
        className={cx('select')}
        value={value}
        onChange={handleChange}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
```

> **실습 문제**:
>
> 1. `Text` Atom을 사용한 이유는?
> 2. `className`을 조합할 때 `cx` 함수의 동작 원리를 설명하세요.

### 4단계: Storybook 스토리 작성 (20분)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { SortSelector, SortSelectorProps } from './SortSelector';

const optionsExample = [
  { value: 'asc', label: '오름차순' },
  { value: 'desc', label: '내림차순' },
];

const meta: Meta<SortSelectorProps> = {
  title: 'Molecules/SortSelector',
  component: SortSelector,
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;
export const Default: StoryObj<SortSelectorProps> = {
  args: {
    options: optionsExample,
    value: 'asc',
    label: '정렬 기준',
  },
};
```

> **실습 문제**:
>
> 1. `argTypes`에서 `options`를 `object`로 설정한 이유는?
> 2. `onChange` 액션 로그를 확인해보세요.

---

## 🎯 실습 과제

1. 기본 `value`를 설정하는 `defaultValue` prop 추가
2. `disabled` prop을 받아 `<select>` 비활성화 처리
3. 옵션 그룹(`optgroup`) 기능을 추가해보세요

## 📝 체크리스트

* [ ] Atom 컴포넌트 조합 이해
* [ ] Props 인터페이스 정의
* [ ] classnames/bind 연동 이해
* [ ] Storybook 스토리 작성

## 🤔 자주 묻는 질문

**Q: Molecule 컴포넌트에 Atom을 왜 사용하나요?**
A: 재사용성 증대와 일관된 스타일 유지가 목적입니다.

**Q: `defaultValue`와 `value` 중 무엇을 선택해야 하나요?**
A: 제어 컴포넌트로 유지하려면 `value`를, 비제어 컴포넌트로 간단히 설정하려면 `defaultValue`를 사용합니다.

---
