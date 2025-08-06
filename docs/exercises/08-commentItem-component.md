# 🎯 실습 8: CommentItem 컴포넌트 만들기

## 📚 학습 목표

* Atom(Molecules) 컴포넌트 조합을 통한 Organism 설계
* TypeScript로 Props 인터페이스 정의하기
* `classnames/bind`를 활용한 CSS Module 클래스 조합
* 댓글 항목 렌더링과 클릭 이벤트 처리 이해
* Storybook으로 컴포넌트 문서화 및 Controls 설정하기

## ⏱️ 예상 소요 시간

**1시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* Atom 단계에서 만든 `Avatar`, `Text`(또는 `ActionButton`) 컴포넌트 학습 완료

## 📘 사전 개념 설명

### Organism 컴포넌트

* 여러 Molecule/Atom을 조합해 실제 화면 단위(댓글 항목)를 구성

### Props 인터페이스

* `interface`로 입력받을 데이터와 이벤트 핸들러 타입 정의

### classnames/bind

* CSS Module 클래스명을 조건부로 조합하기 위한 유틸리티
* `styles` 객체와 바인딩된 `cx` 함수 사용

### Storybook

* 컴포넌트를 독립 실행해 UI 상태 확인 및 문서화
* `argTypes`로 Controls 탭에서 Prop 조작 가능

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 확인 (5분)

```
src/components/organisms/CommentItem/
├── CommentItem.tsx         # 컴포넌트 구현
├── CommentItem.stories.tsx # Storybook 스토리
└── index.ts                # 내보내기
```

> **질문**: Organisms 폴더에 위치해야 하는 이유는 무엇인가요?

### 2단계: Props 인터페이스 작성 (10분)

```typescript
export interface CommentItemProps {
  id: string;                                          // 댓글 고유 ID
  authorName: string;                                  // 작성자 이름
  authorAvatar: string;                                // 작성자 아바타 URL
  content: string;                                     // 댓글 내용
  date: string;                                        // 작성일(예: '2025-08-05')
  onReply?: (id: string) => void;                      // 답글 버튼 클릭 콜백
  className?: string;                                  // 추가 클래스 (선택)
}
```

> **실습 문제**:
>
> 1. `id`를 Props에 포함하는 이유는 무엇인가요?
> 2. `onReply`를 선택적으로 설정한 이유는?

### 3단계: 컴포넌트 구현 (30분)

```typescript
import React from 'react';
import classNames from 'classnames/bind';
import { Avatar } from '@/components/atoms/Avatar';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

export const CommentItem: React.FC<CommentItemProps> = ({
  id,
  authorName,
  authorAvatar,
  content,
  date,
  onReply,
  className,
}) => {
  const handleReply = () => {
    if (onReply) onReply(id);
  };

  return (
    <div className={cx('comment-item', className)}>
      <Avatar src={authorAvatar} alt={authorName} size="sm" />
      <div className={cx('body')}>
        <div className={cx('header')}>
          <span className={cx('author')}>{authorName}</span>
          <span className={cx('date')}>{date}</span>
        </div>
        <p className={cx('content')}>{content}</p>
        {onReply && (
          <button
            type="button"
            className={cx('reply-button')}
            onClick={handleReply}
          >
            답글
          </button>
        )}
      </div>
    </div>
  );
};
```

> **실습 문제**:
>
> 1. `Avatar`를 `sm` 사이즈로 사용하는 이유는?
> 2. `onReply`가 없을 때 UI는 어떻게 달라지나요?

### 4단계: Storybook 스토리 작성 (20분)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { CommentItem, CommentItemProps } from './CommentItem';

const meta: Meta<CommentItemProps> = {
  title: 'Organisms/CommentItem',
  component: CommentItem,
  argTypes: {
    id: { control: 'text' },
    authorName: { control: 'text' },
    authorAvatar: { control: 'text' },
    content: { control: 'text' },
    date: { control: 'text' },
    onReply: { action: 'reply clicked' },
  },
};

export default meta;
export const Default: StoryObj<CommentItemProps> = {
  args: {
    id: '1',
    authorName: '김철수',
    authorAvatar: 'https://via.placeholder.com/32',
    content: '좋은 글 감사합니다!',
    date: '2025-08-05',
  },
};
export const WithReply: StoryObj<CommentItemProps> = {
  args: {
    ...Default.args,
    onReply: (id) => console.log('reply to', id),
  },
};
```

> **실습 문제**:
>
> 1. `WithReply` 스토리의 동작을 확인해 보세요.
> 2. `reply-button` 스타일을 수정해보고 결과를 확인하세요.

---

## 🎯 실습 과제

1. `delete` 버튼을 추가해 `onDelete` 콜백 처리하기
2. `children` prop을 받아 답글 목록 렌더링 지원
3. `isAuthor` prop으로 본인 댓글 강조 스타일 추가

## 📝 체크리스트

*

## 🤔 자주 묻는 질문

**Q: Organism 컴포넌트에 여러 Atom/Molecule을 조합하는 이유는?**
A: 작은 단위 컴포넌트를 조합해 유지보수성과 재사용성을 높이기 위해서입니다.

\*\*Q: \*\*\`\`**가 없으면 버튼이 렌더링되지 않는 이유는?**
A: 콜백이 없는 경우 불필요한 버튼을 숨겨 UI를 깔끔하게 유지하기 위함입니다.

---
