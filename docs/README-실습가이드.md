# 헤더 컴포넌트 실습 가이드 📚

## 🎯 실습 개요

이 실습에서는 기존 Header 레이아웃 컴포넌트를 **신문 웹사이트에 적합하도록 개선**합니다.

### 학습 목표
- 기존 컴포넌트 확장 방법 학습
- 조건부 렌더링 활용
- CSS 테마 시스템 구현
- Storybook을 활용한 컴포넌트 개발

### 소요 시간
약 30-45분

---

## 📋 준비사항

### 1. 환경 확인
- ✅ Storybook 서버 실행 중 (http://localhost:3010)
- ✅ 에디터에서 프로젝트 열기
- ✅ 터미널 준비

### 2. 실습 문서
다음 문서들을 참고하세요:

1. **📖 요구사항 문서**: `docs/header-component-requirements.md`
   - 헤더 컴포넌트의 전체 요구사항
   - 기능 명세 및 기술 요구사항

2. **📋 개선 계획**: `docs/header-improvement-plan.md`
   - 현재 상태 분석
   - 단계별 개선 계획
   - 구체적인 구현 가이드

3. **🛠️ 구현 가이드**: `docs/component-implementation-guide.md`
   - 실습 범위 및 파일 구조
   - 최소 구현 방법

4. **📝 실습 워크시트**: `docs/header-workshop-korean.md` ⭐
   - **메인 실습 문서 (이것을 따라하세요!)**
   - 단계별 상세 가이드
   - 체크리스트 포함

---

## 🚀 실습 시작하기

### 1단계: 현재 상태 확인

1. **Storybook 열기**
   - 브라우저에서 http://localhost:3010 접속
   - `Layouts > Header` 섹션 확인
   - 기존 스토리들 살펴보기

2. **파일 구조 확인**
   ```
   src/layouts/Header/
   ├── Header.tsx              # 메인 컴포넌트
   ├── Header.module.scss      # 스타일 파일
   ├── index.ts               # Export 파일
   └── Header.stories.tsx     # Storybook 스토리
   ```

### 2단계: 실습 진행

**📝 메인 가이드 문서 열기**: `docs/header-workshop-korean.md`

이 문서에는 다음이 포함되어 있습니다:
- ✅ 단계별 체크리스트
- 🔧 구체적인 코드 수정 방법
- 📍 정확한 파일 위치 안내
- 🚨 문제 해결 가이드

### 3단계: 구현할 기능들

#### 추가할 새 기능
- 🔴 **속보 티커**: 헤더 최상단의 빨간 배경 속보 영역
- 🌤️ **날씨 위젯**: 우측 상단의 컴팩트 날씨 정보
- 🧡 **구독 버튼**: 주황색 "구독하기" 버튼
- 📰 **신문 테마**: 전통적인 신문 스타일 디자인

#### 개선할 기존 기능
- 📱 **반응형**: 모바일에서 날씨 위젯 숨김
- 🎨 **테마 시스템**: CSS 클래스 기반 테마 변경
- 📖 **Storybook**: 새 기능을 보여주는 스토리 추가

---

## 📁 수정할 파일들

### 1. Header.tsx (메인 컴포넌트)
- Props 인터페이스 확장
- 새 컴포넌트 import
- JSX 구조 수정

### 2. Header.module.scss (스타일)
- 신문 테마 스타일
- 새 영역들 스타일
- 반응형 미디어 쿼리

### 3. Header.stories.tsx (스토리)
- NewspaperTheme 스토리
- FullFeatured 스토리

### 4. index.ts (Export)
- 기존 파일 그대로 유지

---

## 🎯 완료 후 확인사항

### Storybook에서 확인할 스토리들
1. **Layouts > Header > Default**: 기존 기능 정상 작동
2. **Layouts > Header > NewspaperTheme**: 신문 테마 적용
3. **Layouts > Header > FullFeatured**: 모든 새 기능 작동

### 확인할 기능들
- ✅ 신문 테마 (회색 배경, 빨간 테두리)
- ✅ 속보 티커 (빨간 배경 영역)
- ✅ 날씨 위젯 (우측 상단)
- ✅ 구독 버튼 (주황색)
- ✅ 반응형 (모바일에서 날씨 숨김)

---

## 🆘 도움이 필요할 때

### 자주 발생하는 문제들

1. **Import 오류**
   ```
   Module not found: Can't resolve '../../components/Molecules/BreakingNewsTicker'
   ```
   → BreakingNewsTicker 컴포넌트가 존재하는지 확인

2. **TypeScript 오류**
   ```
   Property 'theme' does not exist on type 'HeaderProps'
   ```
   → HeaderProps 인터페이스에 새 속성 추가 확인

3. **CSS 클래스 오류**
   ```
   ClassName 'header--newspaper' not found
   ```
   → SCSS 파일에 해당 클래스 추가 확인

### 문제 해결 순서
1. 에러 메시지 정확히 읽기
2. 파일 경로 및 이름 확인
3. 코드 문법 확인 (괄호, 세미콜론 등)
4. 브라우저 개발자 도구 콘솔 확인
5. Storybook 터미널 로그 확인

---

## 🎉 실습 완료 후

### 학습한 내용 정리
- ✅ 컴포넌트 Props 확장 방법
- ✅ 조건부 렌더링 활용
- ✅ CSS 모듈과 테마 시스템
- ✅ Storybook 스토리 작성
- ✅ 반응형 디자인 구현

### 다음 단계 (선택사항)
- 🎨 추가 테마 만들기
- ⚡ 애니메이션 효과 추가
- ♿ 접근성 개선 (ARIA 라벨)
- 🧪 단위 테스트 작성

---

## 📞 연락처

실습 중 질문이나 문제가 있으면 언제든 문의하세요!

**실습 시작**: `docs/header-workshop-korean.md` 문서를 열고 단계별로 따라하세요! 🚀