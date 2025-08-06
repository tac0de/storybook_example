# 🎯 실습 9: CommentList 컴포넌트 만들기

## 📚 학습 목표

* Organism 컴포넌트 설계: 여러 댓글 항목을 조합해 목록 UI 구현
* TypeScript로 Props 인터페이스 정의하기
* `classnames/bind`를 활용한 CSS Module 클래스 조합
* 리스트 렌더링 및 이벤트 전달 패턴 이해
* Storybook으로 컴포넌트 문서화 및 Controls 설정하기

## ⏱️ 예상 소요 시간

**1시간** (초보자 기준)

## 🛠️ 준비사항

* VS Code 또는 선호하는 코드 에디터
* Node.js 개발 환경
* Organism 단계에서 만든 `CommentItem` 컴포넌트 학습 완료

## 📘 사전 개념 설명

### Organism 컴포넌트

* 여러 `CommentItem`을 조합해 댓글 목록 전체를 구성하는 컴포넌트

### Props 인터페이스

* 댓글 데이터 배열과 이벤트 핸들러 타입 정의를 통해 안정적인 데이터 흐름 보장

### classnames/bind

* CSS Module 클래스명을 조건부로 조합하기 위한 유틸리티
* `styles` 객체와 바인딩된 `cx` 함수 사용 예:

  ```ts
  const cx = classNames.bind(styles);
  <div className={cx('comment-list', className)}>
  ```

### Storybook

* 독립 실행으로 UI 상태 확인 및 문서화
* `argTypes`로 Controls 탭에서 Prop 조작 가능

---

## 📋 단계별 실습

### 1단계: 프로젝트 구조 확인 (5분)

```
src/components/organisms/CommentList/
├── CommentList.tsx         # 컴포넌트 구현
├── CommentList.stories.tsx # Storybook 스토리
└── index.ts                # 내보내기
```

> **질문**: Organisms 폴더에 위치해야 하는 이유는 무엇인가요?

### 2단계: Props 인터페이스 작성 (10분)

```typescript
export interface CommentData {
  id: string;             // 댓글 고유 ID
  authorName: string;     // 작성자 이름
  authorAvatar: string;   // 작성자 아바타 URL
  content: string;        // 댓글 내용
  date: string;           // 작성일(예: '2025-08-05')
}

export interface CommentListProps {
  comments: CommentData[];            // 댓글 목록 데이터 (필수)
  onReply?: (id: string) => void;     // 답글 버튼 클릭 콜백 (선택)
  className?: string;                 // 추가 클래스 (선택)
}
```

> **실습 문제**:
>
> 1. 댓글 데이터 타입(`CommentData`)을 분리하는 이유는?
> 2. `onReply`를 선택적으로 지정한 이유는?

### 3단계: 컴포넌트 구현 (30분)

```typescript
import React from 'react';
import classNames from 'classnames/bind';
import { CommentItem } from '@/components/organisms/CommentItem';
import styles from './CommentList.module.scss';

const cx = classNames.bind(styles);

export const CommentList: React.FC<CommentListProps> = ({
  comments,
  onReply,
  className,
}) => (
  <div className={cx('comment-list', className)}>
    {comments.map((comment) => (
      <CommentItem
        key={comment.id}
        {...comment}
        onReply={onReply}
      />
    ))}
  </div>
);
```

> **실습 문제**:
>
> 1. `key` prop이 필요한 이유는 무엇인가요?
> 2. `onReply`를 `CommentItem`에 전달하는 방식 설명하기

### 4단계: Storybook 스토리 작성 (20분)

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { CommentList, CommentListProps } from './CommentList';

const sampleComments = [
  {
    id: '1',
    authorName: '김철수',
    authorAvatar: 'https://via.placeholder.com/32',
    content: '첫 번째 댓글입니다.',
    date: '2025-08-05',
  },
  {
    id: '2',
    authorName: '이영희',
    authorAvatar: 'https://via.placeholder.com/32',
    content: '두 번째 댓글입니다.',
    date: '2025-08-06',
  },
];

const meta: Meta<CommentListProps> = {
  title: 'Organisms/CommentList',
  component: CommentList,
  argTypes: {
    comments: { control: 'object' },
    onReply: { action: 'reply clicked' },
  },
};

export default meta;
export const Default: StoryObj<CommentListProps> = {
  args: {
    comments: sampleComments,
  },
};
export const WithReply: StoryObj<CommentListProps> = {
  args: {
    comments: sampleComments,
    onReply: (id) => console.log('reply to', id),
  },
};
```

> **실습 문제**:
>
> 1. `WithReply` 스토리를 실행해 `onReply` 로그를 확인하세요.
> 2. 댓글 목록에 빈 배열 전달 시 UI를 어떻게 처리할지 고민해보세요.

---

## 🎯 실습 과제

1. 댓글이 없을 때 빈 상태 메시지 렌더링하기
2. `isLoading` prop을 추가해 스켈레톤 UI 구현하기
3. 페이지네이션(`page`, `onPageChange` prop) 기능 추가하기

## 📝 체크리스트

* [ ] Props 인터페이스 정의
* [ ] `CommentItem` 조합 이해
* [ ] classnames/bind 연동 이해
* [ ] Storybook 스토리 작성

## 🤔 자주 묻는 질문

**Q: `CommentList`를 왜 분리해 설계하나요?**
A: 댓글 목록 로직과 단일 댓글 UI를 분리해 재사용성과 유지보수성을 높이기 위해서입니다.

**Q: `key` prop은 언제 사용하나요?**
A: 배열 렌더링 시 React가 각 요소를 구분하도록 도와줍니다.

---
