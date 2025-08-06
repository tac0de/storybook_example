# 🎯 실습 7: UserHeader 컴포넌트 만들기

## 📚 학습 목표

* Atom 컴포넌트(`Avatar`) 조합을 통한 Molecule 설계
* TypeScript로 Props 인터페이스 정의하기
* `classnames/bind`를 활용한 CSS Module 클래스 조합
* Storybook으로 컴포넌트 문서화 및 Controls 설정하기
* 마우스 이벤트(click) 처리 패턴 이해

## ⏱️ 예상 소요 시간

**1시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* Atom 단계에서 만든 `Avatar` 컴포넌트 학습 완료

## 📘 사전 개념 설명

### Molecule 컴포넌트

* 여러 Atom 또는 기본 HTML 요소를 조합해 실용적 UI 단위 구현

### Props 인터페이스

* `interface`로 `props` 타입 정의해 오류 방지 및 자동완성 지원

### classnames/bind

* CSS Module 클래스명을 조건부로 조합하는 유틸리티
* `styles` 객체와 바인딩된 `cx` 함수 사용

### Storybook

* 독립 실행으로 UI 상태 확인 및 문서화
* `argTypes`로 Controls 탭에서 Prop 조작 가능

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 확인 (5분)

```
src/components/molecules/UserHeader/
├── UserHeader.tsx         # 컴포넌트 구현
├── UserHeader.stories.tsx # Storybook 스토리
└── index.ts               # 내보내기
```

> **질문**: Molecules 폴더에 위치해야 하는 이유는 무엇인가요?

### 2단계: Props 인터페이스 작성 (10분)

```typescript
export interface UserHeaderProps {
  src: string;                  // 아바타 이미지 URL (필수)
  alt?: string;                 // 이미지 대체 텍스트 (선택)
  username: string;             // 사용자 이름 (필수)
  subtitle?: string;            // 부제목/설명 (선택)
  onClickAvatar?: () => void;   // 아바타 클릭 이벤트 (선택)
  className?: string;           // 추가 클래스 (선택)
}
```

> **실습 문제**:
>
> 1. `username`을 필수로 둔 이유는 무엇인가요?
> 2. `onClickAvatar`를 선택적으로 제공하는 이유는?

### 3단계: 컴포넌트 구현 (30분)

```typescript
import React from 'react';
import classNames from 'classnames/bind';
import { Avatar } from '@/components/atoms/Avatar';
import styles from './UserHeader.module.scss';

const cx = classNames.bind(styles);

export const UserHeader: React.FC<UserHeaderProps> = ({
  src,
  alt = 'User Avatar',
  username,
  subtitle,
  onClickAvatar,
  className,
}) => {
  return (
    <div className={cx('user-header', className)}>
      <div className={cx('avatar-wrapper')} onClick={onClickAvatar}>
        <Avatar src={src} alt={alt} size="md" />
      </div>
      <div className={cx('info')}>  
        <span className={cx('username')}>{username}</span>
        {subtitle && <span className={cx('subtitle')}>{subtitle}</span>}
      </div>
    </div>
  );
};
```

> **실습 문제**:
>
> 1. `onClickAvatar` 핸들러를 `div`에 붙인 이유는 무엇인가요?
> 2. Molecule 레벨에서 추가된 레이아웃 역할은?

### 4단계: Storybook 스토리 작성 (20분)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { UserHeader, UserHeaderProps } from './UserHeader';

const meta: Meta<UserHeaderProps> = {
  title: 'Molecules/UserHeader',
  component: UserHeader,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    username: { control: 'text' },
    subtitle: { control: 'text' },
    onClickAvatar: { action: 'avatar clicked' },
  },
};

export default meta;
export const Default: StoryObj<UserHeaderProps> = {
  args: {
    src: 'https://via.placeholder.com/80',
    alt: 'User Avatar',
    username: '홍길동',
    subtitle: '백엔드 개발자',
  },
};
```

> **실습 문제**:
>
> 1. `onClickAvatar` 액션 로그를 확인해 보세요.
> 2. `subtitle` 없는 경우 UI가 어떻게 보이는지 테스트해 보세요.

---

## 🎯 실습 과제

1. `size` prop을 받아 Avatar 크기 조정하기
2. `onClickUsername` prop을 추가해 이름 클릭 이벤트 처리 지원
3. `href` prop으로 전체 헤더를 링크로 감싸기

## 📝 체크리스트

* [ ] Props 인터페이스 정의
* [ ] Atom Avatar 조합 이해
* [ ] classnames/bind 연동 이해
* [ ] Storybook 스토리 작성

## 🤔 자주 묻는 질문

**Q: Molecule 컴포넌트에 왜 Atom Avatar를 사용하나요?**
A: 디자인 일관성과 재사용성을 위해 단일 UI 요소를 분리해 관리합니다.

**Q: `onClickAvatar`과 `onClickUsername` 처리 차이는 무엇인가요?**
A: 각 영역에 별도 이벤트를 연결해 유연한 UI 동작을 지원하기 위함입니다.

---
