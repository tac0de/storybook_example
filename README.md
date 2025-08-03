# 🎓 Atomic Design React 컴포넌트 라이브러리 강의

## 📚 강의 개요

이 프로젝트는 **React + TypeScript + Atomic Design**을 학습하기 위한 실습용 컴포넌트 라이브러리입니다.
초보자부터 중급자까지 단계별로 학습할 수 있도록 구성되어 있습니다.

### 🎯 학습 목표

1. **React 기초** - 컴포넌트 기반 개발 이해
2. **TypeScript 활용** - 타입 안전성과 개발 생산성 향상
3. **Atomic Design 패턴** - 체계적인 UI 컴포넌트 설계
4. **Storybook 활용** - 컴포넌트 문서화 및 개발 도구
5. **SCSS Modules** - CSS-in-JS 대안으로 스타일링
6. **실무 개발 워크플로우** - 실제 프로젝트에서 사용하는 개발 방식

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn
- VS Code (권장)
- Git

### 설치 및 실행

```bash
# 1. 프로젝트 클론
git clone [repository-url]
cd storybook_example

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. Storybook 실행 (새 터미널에서)
npm run storybook
```

## ✅ 마이그레이션 완료 상태

### 🎉 완료된 작업

- ✅ **Atomic Design 구조 구축**
  - Atoms: Button, Input, Avatar
  - Molecules: UserHeader, ActionButtons, TextInputForm, SortSelector
  - Organisms: CommentItem, CommentList
  - Pages: CommentPage
  - Layouts: PageLayout

- ✅ **SCSS Modules 스타일 시스템**
  - 변수 및 믹스인 정의
  - 컴포넌트별 모듈 스타일
  - 반응형 디자인 지원

- ✅ **TypeScript 타입 시스템**
  - 모든 컴포넌트의 Props 인터페이스 정의
  - 타입 안전성 보장
  - 자동완성 지원

- ✅ **실제 사용 예시 구현**
  - 완전한 댓글 시스템 데모
  - 상태 관리 및 이벤트 핸들링
  - 샘플 데이터 포함

- ✅ **Storybook 설정**
  - 컴포넌트 문서화
  - 인터랙티브 예시
  - 개발 도구 통합

### 🎯 현재 구현된 기능

1. **댓글 작성 및 표시**
   - 새 댓글 작성
   - 댓글 목록 표시
   - 작성자 정보 표시

2. **댓글 상호작용**
   - 좋아요/좋아요 취소
   - 답글 작성 (UI 준비)
   - 신고, 수정, 삭제 (기본 구조)

3. **정렬 및 필터링**
   - 최신순, 오래된순, 좋아요순, 답글순 정렬
   - 정렬 방식 변경

4. **사용자 인터페이스**
   - 인증된 사용자 표시
   - 사용자 상태 표시
   - 반응형 디자인

## 📖 단계별 학습 가이드

### 🥇 1단계: 프로젝트 구조 이해 (30분)

**목표**: 전체 프로젝트 구조와 Atomic Design 개념 이해

**학습 내용**:

- [프로젝트 구조 살펴보기](./docs/01-project-structure.md)
- [Atomic Design 개념 이해](./docs/02-atomic-design.md)
- [개발 도구 설정](./docs/03-development-tools.md)

**실습**: 프로젝트를 실행하고 Storybook에서 각 컴포넌트를 확인해보세요.

### 🥈 2단계: Atoms 컴포넌트 만들기 (2시간)

**목표**: 기본 UI 컴포넌트(Button, Input, Avatar) 구현

**학습 내용**:

- [React 컴포넌트 기초](./docs/04-react-basics.md)
- [TypeScript 인터페이스 작성](./docs/05-typescript-interfaces.md)
- [SCSS Modules 스타일링](./docs/06-scss-modules.md)

**실습**:

1. [Button 컴포넌트 만들기](./docs/exercises/01-button-component.md)
2. [Input 컴포넌트 만들기](./docs/exercises/02-input-component.md)
3. [Avatar 컴포넌트 만들기](./docs/exercises/03-avatar-component.md)

### 🥉 3단계: Molecules 컴포넌트 만들기 (3시간)

**목표**: Atoms를 조합한 복합 컴포넌트 구현

**학습 내용**:

- [컴포넌트 조합 패턴](./docs/07-component-composition.md)
- [Props 전달과 이벤트 처리](./docs/08-props-and-events.md)
- [재사용 가능한 컴포넌트 설계](./docs/09-reusable-components.md)

**실습**:

1. [UserHeader 컴포넌트 만들기](./docs/exercises/04-user-header.md)
2. [ActionButtons 컴포넌트 만들기](./docs/exercises/05-action-buttons.md)
3. [TextInputForm 컴포넌트 만들기](./docs/exercises/06-text-input-form.md)
4. [SortSelector 컴포넌트 만들기](./docs/exercises/07-sort-selector.md)

### 🏆 4단계: Organisms 컴포넌트 만들기 (4시간)

**목표**: 복잡한 비즈니스 로직을 가진 컴포넌트 구현

**학습 내용**:

- [상태 관리와 React Hooks](./docs/10-state-management.md)
- [조건부 렌더링과 리스트 처리](./docs/11-conditional-rendering.md)
- [컴포넌트 간 데이터 흐름](./docs/12-data-flow.md)

**실습**:

1. [CommentItem 컴포넌트 만들기](./docs/exercises/08-comment-item.md)
2. [CommentList 컴포넌트 만들기](./docs/exercises/09-comment-list.md)

### 🎯 5단계: Pages와 Layouts 만들기 (2시간)

**목표**: 완전한 페이지와 레이아웃 시스템 구현

**학습 내용**:

- [페이지 컴포넌트 설계](./docs/13-page-components.md)
- [레이아웃 시스템 구축](./docs/14-layout-system.md)
- [반응형 디자인 구현](./docs/15-responsive-design.md)

**실습**:

1. [CommentPage 완성하기](./docs/exercises/10-comment-page.md)
2. [Layout 컴포넌트들 만들기](./docs/exercises/11-layouts.md)

### 🔧 6단계: Storybook과 테스팅 (1시간)

**목표**: 컴포넌트 문서화와 테스팅 방법 학습

**학습 내용**:

- [Storybook 스토리 작성](./docs/16-storybook-stories.md)
- [컴포넌트 테스팅](./docs/17-component-testing.md)
- [문서화와 유지보수](./docs/18-documentation.md)

**실습**:

1. [컴포넌트 스토리 작성하기](./docs/exercises/12-storybook-stories.md)
2. [테스트 코드 작성하기](./docs/exercises/13-component-tests.md)

## 📁 프로젝트 구조

```
storybook_example/
├── docs/                          # 📚 강의 문서
│   ├── exercises/                 # 🎯 실습 가이드
│   └── *.md                       # 📖 학습 자료
├── src/
│   ├── components/                # 🧩 컴포넌트
│   │   ├── Atoms/                 # ⚛️ 기본 UI 요소
│   │   │   ├── Button/            # 🎯 버튼 컴포넌트
│   │   │   ├── Input/             # 📝 입력 컴포넌트
│   │   │   └── Avatar/            # 👤 아바타 컴포넌트
│   │   ├── Molecules/             # 🔬 복합 컴포넌트
│   │   │   ├── UserHeader/        # 👤 사용자 헤더
│   │   │   ├── ActionButtons/     # 🎛️ 액션 버튼들
│   │   │   ├── TextInputForm/     # 📝 텍스트 입력 폼
│   │   │   └── SortSelector/      # 🔄 정렬 선택기
│   │   ├── Organisms/             # 🧬 복잡한 컴포넌트
│   │   │   ├── CommentItem/       # 💬 댓글 아이템
│   │   │   └── CommentList/       # 📋 댓글 목록
│   │   └── index.ts               # 📦 내보내기
│   ├── layouts/                   # 🏗️ 레이아웃 컴포넌트
│   │   ├── PageLayout/            # 📄 페이지 레이아웃
│   │   ├── Header/                # 🏷️ 헤더
│   │   ├── Footer/                # 🦶 푸터
│   │   ├── Sidebar/               # 📑 사이드바
│   │   └── Container/             # 📦 컨테이너
│   ├── pages/                     # 📄 페이지 컴포넌트
│   │   └── CommentPage/           # 💬 댓글 페이지
│   ├── styles/                    # 🎨 스타일 시스템
│   │   └── abstracts/             # 📐 변수 및 믹스인
│   └── assets/                    # 🖼️ 정적 자산
├── shrimp-rules.md                # 📋 개발 가이드라인
└── README.md                      # 📖 이 파일
```

## 🎯 학습 체크리스트

### 기본 개념 이해

- [x] React 컴포넌트의 개념과 사용법
- [x] TypeScript 인터페이스와 타입 정의
- [x] Atomic Design 패턴의 이해
- [x] SCSS Modules의 장점과 사용법

### 실습 완료

- [x] Atoms 컴포넌트 3개 구현
- [x] Molecules 컴포넌트 4개 구현
- [x] Organisms 컴포넌트 2개 구현
- [x] Pages와 Layouts 구현
- [x] Storybook 스토리 작성

### 고급 개념

- [x] 컴포넌트 재사용성 설계
- [x] 상태 관리 패턴
- [x] 성능 최적화 기법
- [x] 접근성 고려사항

## 🛠️ 개발 도구

### VS Code 확장 프로그램 (권장)

- **ES7+ React/Redux/React-Native snippets** - React 코드 스니펫
- **TypeScript Importer** - 자동 import
- **SCSS IntelliSense** - SCSS 자동완성
- **Auto Rename Tag** - JSX 태그 자동 변경
- **Bracket Pair Colorizer** - 괄호 색상 구분

### 유용한 명령어

```bash
# 개발 서버 실행
npm run dev

# Storybook 실행
npm run storybook

# 타입 체크
npm run type-check

# 빌드
npm run build

# 린트 체크
npm run lint
```

## 🎮 데모 사용법

### 🚀 실행하기

1. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   브라우저에서 `http://localhost:5173` 접속

2. **Storybook 실행**
   ```bash
   npm run storybook
   ```
   브라우저에서 `http://localhost:3010` 접속

### 🎯 테스트 기능

- **댓글 작성**: 상단의 입력 폼에서 새 댓글 작성
- **좋아요**: 각 댓글의 하트 아이콘 클릭
- **정렬**: 상단의 정렬 선택기로 댓글 정렬 방식 변경
- **삭제**: 자신이 작성한 댓글의 삭제 버튼 클릭
- **작성자 클릭**: 사용자 이름 클릭하여 프로필 페이지 이동 (알림)

### 🔍 개발자 도구

브라우저의 개발자 도구 콘솔을 열어서 다음 이벤트들을 확인할 수 있습니다:

- 새 댓글 추가
- 좋아요 토글
- 정렬 방식 변경
- 사용자 클릭
- 기타 상호작용

## 🤝 도움말

### 자주 묻는 질문

- [FAQ](./docs/faq.md) - 자주 묻는 질문들

### 문제 해결

- [Troubleshooting](./docs/troubleshooting.md) - 일반적인 문제 해결 방법

### 추가 학습 자료

- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
- [Storybook 공식 문서](https://storybook.js.org/)

## 📝 학습 노트

각 단계를 완료할 때마다 다음을 기록하세요:

1. **학습한 개념**: 새로 배운 React/TypeScript 개념
2. **어려웠던 점**: 이해하기 어려웠던 부분
3. **해결 방법**: 어떻게 문제를 해결했는지
4. **개선 아이디어**: 더 나은 방법이 있는지

## 🎉 완료 후 다음 단계

이 강의를 완료한 후에는:

1. **실무 프로젝트 적용**: 실제 프로젝트에 Atomic Design 적용
2. **고급 패턴 학습**: Context API, Custom Hooks, 성능 최적화
3. **테스팅 심화**: Jest, React Testing Library 활용
4. **상태 관리**: Redux, Zustand 등 상태 관리 라이브러리 학습

---

**💡 팁**: 각 단계를 완료한 후에는 반드시 코드를 커밋하고, 변경사항을 기록해두세요.
나중에 복습할 때 매우 유용합니다!

**🚀 시작하세요**: [1단계: 프로젝트 구조 이해](./docs/01-project-structure.md)부터 시작하세요!

## 🏆 마이그레이션 완료!

이 프로젝트는 **Tailwind CSS에서 SCSS Modules로의 마이그레이션**이 완료되었습니다.

### ✅ 완료된 작업

- **Atomic Design 구조 구축**: Atoms, Molecules, Organisms, Pages, Layouts
- **SCSS Modules 스타일 시스템**: 변수, 믹스인, 컴포넌트별 스타일
- **TypeScript 타입 시스템**: 모든 컴포넌트의 타입 안전성 보장
- **실제 사용 예시**: 완전한 댓글 시스템 데모
- **Storybook 통합**: 컴포넌트 문서화 및 개발 도구

### 🎯 현재 상태

- ✅ 모든 컴포넌트가 SCSS Modules로 스타일링됨
- ✅ TypeScript 타입 시스템 완전 적용
- ✅ Atomic Design 패턴 완전 구현
- ✅ 실제 사용 가능한 댓글 시스템 데모
- ✅ Storybook을 통한 컴포넌트 문서화

**🎉 이제 프로젝트를 실행하여 결과를 확인해보세요!**
