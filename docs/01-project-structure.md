# 📁 1단계: 프로젝트 구조 이해

## 🎯 학습 목표

이 단계에서는 전체 프로젝트의 구조와 각 폴더의 역할을 이해합니다.

## 📂 프로젝트 구조 상세 분석

### 루트 디렉토리

```
storybook_example/
├── 📄 package.json          # 프로젝트 설정 및 의존성
├── 📄 tsconfig.json         # TypeScript 설정
├── 📄 vite.config.ts        # Vite 빌드 도구 설정
├── 📄 .storybook/           # Storybook 설정
├── 📁 public/               # 정적 파일들
├── 📁 src/                  # 소스 코드
└── 📁 docs/                 # 강의 문서
```

### src 디렉토리 (핵심)

```
src/
├── 📁 components/           # 🧩 컴포넌트 라이브러리
│   ├── 📁 Atoms/           # ⚛️ 기본 UI 요소
│   ├── 📁 Molecules/       # 🔬 복합 컴포넌트
│   ├── 📁 Organisms/       # 🧬 복잡한 컴포넌트
│   └── 📄 index.ts         # 📦 전체 컴포넌트 내보내기
├── 📁 layouts/             # 🏗️ 레이아웃 컴포넌트
├── 📁 pages/               # 📄 페이지 컴포넌트
├── 📁 styles/              # 🎨 스타일 시스템
├── 📁 assets/              # 🖼️ 이미지, 아이콘 등
├── 📄 main.tsx             # 🚀 앱 진입점
└── 📄 App.tsx              # 📱 메인 앱 컴포넌트
```

## 🧩 Atomic Design 구조

### Atoms (원자)

**가장 기본적인 UI 요소들**

```
src/components/Atoms/
├── 📁 Button/              # 버튼 컴포넌트
│   ├── 📄 Button.tsx       # 컴포넌트 로직
│   ├── 📄 Button.module.scss # 스타일
│   ├── 📄 Button.stories.tsx # Storybook 스토리
│   └── 📄 index.ts         # 내보내기
├── 📁 Input/               # 입력 필드 컴포넌트
└── 📁 Avatar/              # 아바타 컴포넌트
```

**특징:**

- 다른 컴포넌트에 의존하지 않음
- 재사용 가능한 기본 UI 요소
- Props로 다양한 변형 지원

### Molecules (분자)

**Atoms를 조합한 복합 컴포넌트**

```
src/components/Molecules/
├── 📁 UserHeader/          # 사용자 정보 헤더
├── 📁 ActionButtons/       # 액션 버튼 그룹
├── 📁 TextInputForm/       # 텍스트 입력 폼
└── 📁 SortSelector/        # 정렬 선택기
```

**특징:**

- Atoms만을 조합하여 구성
- 특정 기능을 담당
- 재사용 가능하지만 특정 맥락에 맞춤

### Organisms (유기체)

**복잡한 비즈니스 로직을 가진 컴포넌트**

```
src/components/Organisms/
├── 📁 CommentItem/         # 댓글 아이템
└── 📁 CommentList/         # 댓글 목록
```

**특징:**

- Molecules와 Atoms를 조합
- 복잡한 상태 관리
- 특정 기능 영역을 담당

## 🏗️ Layouts와 Pages

### Layouts (레이아웃)

**페이지 구조를 담당하는 컴포넌트**

```
src/layouts/
├── 📁 PageLayout/          # 페이지 레이아웃
├── 📁 Header/              # 헤더 컴포넌트
├── 📁 Footer/              # 푸터 컴포넌트
├── 📁 Sidebar/             # 사이드바 컴포넌트
└── 📁 Container/           # 컨테이너 컴포넌트
```

### Pages (페이지)

**완전한 페이지 컴포넌트**

```
src/pages/
└── 📁 CommentPage/         # 댓글 페이지
    ├── 📄 CommentPage.tsx  # 페이지 로직
    ├── 📄 CommentPage.module.scss # 페이지 스타일
    ├── 📄 CommentPage.stories.tsx # 페이지 스토리
    └── 📄 index.ts         # 내보내기
```

## 🎨 스타일 시스템

```
src/styles/
└── 📁 abstracts/           # 추상화된 스타일
    ├── 📄 variables.scss   # 색상, 크기, 간격 등 변수
    └── 📄 mixins.scss      # 재사용 가능한 스타일 믹스인
```

**설계 원칙:**

- **변수 기반**: 색상, 크기, 간격을 변수로 관리
- **믹스인 활용**: 반복되는 스타일을 믹스인으로 추상화
- **일관성**: 모든 컴포넌트가 동일한 디자인 토큰 사용

## 📦 모듈 시스템

### 내보내기 구조

각 컴포넌트는 `index.ts` 파일을 통해 내보내집니다:

```typescript
// src/components/Atoms/Button/index.ts
export * from './Button';

// src/components/Atoms/index.ts
export * from './Button';
export * from './Input';
export * from './Avatar';

// src/components/index.ts
export * from './Atoms';
export * from './Molecules';
export * from './Organisms';
```

### 장점

- **명확한 의존성**: 어떤 컴포넌트를 사용할 수 있는지 명확
- **쉬운 import**: 복잡한 경로 없이 간단하게 import
- **유지보수성**: 파일 위치 변경 시 import 경로 수정 최소화

## 🔧 개발 도구 설정

### TypeScript 설정

- **엄격한 타입 체크**: 타입 안전성 보장
- **모듈 해석**: 절대 경로 import 지원
- **JSX 지원**: React 컴포넌트 작성 지원

### Vite 설정

- **빠른 개발 서버**: HMR(Hot Module Replacement) 지원
- **빌드 최적화**: 프로덕션 빌드 최적화
- **플러그인 지원**: React, TypeScript 플러그인

### Storybook 설정

- **컴포넌트 문서화**: 각 컴포넌트의 사용법과 예시
- **개발 환경**: 컴포넌트를 독립적으로 개발
- **테스트 환경**: 컴포넌트 동작 확인

## 🎯 실습 과제

### 1. 프로젝트 탐색

1. 각 폴더를 열어보고 어떤 파일들이 있는지 확인
2. `package.json`에서 사용 중인 라이브러리 확인
3. `tsconfig.json`에서 TypeScript 설정 확인

### 2. 컴포넌트 구조 이해

1. `src/components/Atoms/Button/` 폴더의 모든 파일 확인
2. `Button.tsx`와 `Button.module.scss`의 관계 이해
3. `Button.stories.tsx`에서 Storybook 사용법 확인

### 3. 개발 서버 실행

```bash
# 개발 서버 실행
npm run dev

# Storybook 실행 (새 터미널에서)
npm run storybook
```

### 4. 질문과 답변

- **Q**: 왜 Atomic Design을 사용하나요?
- **A**: 컴포넌트를 체계적으로 구성하고 재사용성을 높이기 위함입니다.

- **Q**: SCSS Modules를 사용하는 이유는?
- **A**: CSS 클래스명 충돌을 방지하고 컴포넌트별로 스타일을 격리하기 위함입니다.

## 📝 정리

이 단계에서 배운 것:

- ✅ 프로젝트의 전체 구조 이해
- ✅ Atomic Design의 각 레벨별 역할
- ✅ 파일 및 폴더 명명 규칙
- ✅ 모듈 시스템과 내보내기 구조
- ✅ 개발 도구 설정 이해

**다음 단계**: [2단계: Atomic Design 개념 이해](./02-atomic-design.md)로 이동하세요!
