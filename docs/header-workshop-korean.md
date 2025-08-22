# 헤더 컴포넌트 실습 워크시트 📝

## 🎯 실습 목표
기존 Header 레이아웃 컴포넌트를 신문 웹사이트에 적합하도록 개선하기

## 📋 준비사항
- Storybook 서버가 실행 중인지 확인
- 기존 Header 컴포넌트 파일들 확인
- 에디터에서 프로젝트 열기

## 🚀 실습 단계

### 1단계: 현재 상태 파악하기

#### ✅ 체크리스트
- [ ] `src/layouts/Header/Header.tsx` 파일 열어보기
- [ ] `src/layouts/Header/Header.module.scss` 파일 열어보기
- [ ] `src/layouts/Header/Header.stories.tsx` 파일 열어보기
- [ ] Storybook에서 기존 Header 스토리 확인하기

#### 📝 현재 기능 확인
기존 Header에 이미 있는 기능들:
- ✅ 로고 (Logo 컴포넌트)
- ✅ 네비게이션 메뉴 (Navigation 컴포넌트)
- ✅ 검색 기능 (SearchBar 컴포넌트)
- ✅ 사용자 메뉴 (UserMenu 컴포넌트)
- ✅ 알림 기능
- ✅ 모바일 반응형 메뉴

#### 📝 추가할 기능들
- ❌ 속보 티커 (Breaking News Ticker)
- ❌ 날씨 위젯 (Weather Widget)
- ❌ 구독 버튼
- ❌ 신문 테마

---

### 2단계: Header.tsx 파일 수정하기

#### 📍 위치: `src/layouts/Header/Header.tsx`

#### 🔧 작업 1: Props 인터페이스 확장

**찾을 위치**: `export interface HeaderProps {` (약 28번째 줄)

**추가할 코드**: 기존 props 아래에 다음 코드 추가
```typescript
  // 신문 관련 새 기능들
  showBreakingNews?: boolean;
  breakingNews?: Array<{
    id: string;
    text: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  
  showWeather?: boolean;
  weatherData?: {
    temperature: number;
    condition: string;
    location: string;
  };
  
  showSubscription?: boolean;
  onSubscribe?: () => void;
  
  // 신문 테마
  theme?: 'default' | 'newspaper';
```

#### ✅ 체크포인트
- [ ] HeaderProps 인터페이스에 새 속성들 추가 완료

#### 🔧 작업 2: Import 문 추가

**찾을 위치**: 파일 상단의 import 문들 (약 13-19번째 줄)

**추가할 코드**: 기존 import 문 아래에 추가
```typescript
import { BreakingNewsTicker } from '../../components/Molecules/BreakingNewsTicker';
import { WeatherWidget } from '../../components/Molecules/WeatherWidget';
```

#### ✅ 체크포인트
- [ ] 새 컴포넌트 import 추가 완료

#### 🔧 작업 3: 컴포넌트 함수 매개변수 수정

**찾을 위치**: `export const Header: React.FC<HeaderProps> = ({` (약 106번째 줄)

**수정할 내용**: 기존 매개변수 목록에 새 props 추가
```typescript
export const Header: React.FC<HeaderProps> = ({
  logo = 'JoongAng Daily',
  navigationItems = [],
  showSearch = true,
  showUserMenu = true,
  notificationCount = 0,
  user,
  className,
  variant = 'default',
  sticky = false,
  transparent = false,
  onSearch,
  onLogin,
  onLogout,
  // 새로 추가할 매개변수들
  showBreakingNews = false,
  breakingNews = [],
  showWeather = false,
  weatherData,
  showSubscription = false,
  onSubscribe,
  theme = 'default',
}) => {
```

#### ✅ 체크포인트
- [ ] 새 props 매개변수 추가 완료

#### 🔧 작업 4: JSX 구조 수정

**찾을 위치**: `<header` 태그의 className 부분 (약 125번째 줄)

**수정할 내용**: className에 theme 클래스 추가
```typescript
<header
  className={cx(
    'header',
    Boolean(variant) && `header--${variant}`,
    Boolean(theme) && `header--${theme}`, // 이 줄 추가
    {
      'header--sticky': sticky,
      'header--transparent': transparent,
    },
    className
  )}
  data-testid="header-component"
>
```

#### 🔧 작업 5: 속보 티커 영역 추가

**찾을 위치**: `<header>` 태그 바로 다음, `<div className={cx('header__container')}>` 이전

**추가할 코드**:
```typescript
{/* 속보 티커 (최상단) */}
{showBreakingNews && breakingNews.length > 0 && (
  <div className={cx('header__breaking-news')}>
    <BreakingNewsTicker items={breakingNews} />
  </div>
)}
```

#### 🔧 작업 6: 날씨 위젯과 구독 버튼 추가

**찾을 위치**: `<div className={cx('header__actions')}>` 내부, 검색 기능 다음

**추가할 코드**: 기존 검색 코드 다음에 추가
```typescript
{/* 날씨 위젯 */}
{showWeather && weatherData && (
  <div className={cx('header__weather')}>
    <WeatherWidget data={weatherData} size="compact" />
  </div>
)}

{/* 구독 버튼 */}
{showSubscription && (
  <Button
    variant="primary"
    size="sm"
    onClick={onSubscribe}
    className={cx('header__subscribe-btn')}
  >
    구독하기
  </Button>
)}
```

#### ✅ 체크포인트
- [ ] 속보 티커 영역 추가 완료
- [ ] 날씨 위젯 영역 추가 완료
- [ ] 구독 버튼 추가 완료

---

### 3단계: Header.module.scss 파일 수정하기

#### 📍 위치: `src/layouts/Header/Header.module.scss`

#### 🔧 작업 1: 신문 테마 스타일 추가

**찾을 위치**: `.header` 클래스 내부, 기존 variant 스타일들 다음

**추가할 코드**: 기존 `&--transparent` 스타일 다음에 추가
```scss
// 신문 테마
&--newspaper {
  background-color: #f8f8f8;
  border-bottom: 3px solid #d32f2f;
  font-family: 'Times New Roman', serif;
  
  .header__logo {
    color: #d32f2f;
    font-weight: bold;
    font-size: 1.8rem;
  }
}
```

#### 🔧 작업 2: 새 영역들 스타일 추가

**찾을 위치**: `.header` 클래스 내부 마지막 부분

**추가할 코드**: 기존 `&__container` 스타일 다음에 추가
```scss
// 속보 티커 영역
&__breaking-news {
  background-color: #d32f2f;
  color: white;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 500;
}

// 날씨 위젯 영역
&__weather {
  margin-right: 1rem;
  
  @media (max-width: 768px) {
    display: none; // 모바일에서 숨김
  }
}

// 구독 버튼
&__subscribe-btn {
  background-color: #ff6b35;
  border-color: #ff6b35;
  margin-right: 0.5rem;
  font-weight: 600;
  
  &:hover {
    background-color: #e55a2b;
    border-color: #e55a2b;
  }
}
```

#### ✅ 체크포인트
- [ ] 신문 테마 스타일 추가 완료
- [ ] 속보 티커 스타일 추가 완료
- [ ] 날씨 위젯 스타일 추가 완료
- [ ] 구독 버튼 스타일 추가 완료

---

### 4단계: Header.stories.tsx 파일 수정하기

#### 📍 위치: `src/layouts/Header/Header.stories.tsx`

#### 🔧 작업 1: 새 스토리 추가

**찾을 위치**: 파일 마지막 부분, 기존 스토리들 다음

**추가할 코드**: 파일 끝에 다음 스토리들 추가
```typescript
// 신문 테마 스토리
export const NewspaperTheme: Story = {
  args: {
    theme: 'newspaper',
    logo: 'Daily News',
    navigationItems: [
      { label: '정치', href: '/politics', active: false },
      { label: '경제', href: '/economy', active: false },
      { label: '사회', href: '/society', active: true },
      { label: '문화', href: '/culture', active: false },
    ],
    showBreakingNews: true,
    breakingNews: [
      {
        id: '1',
        text: '속보: 중요한 뉴스가 발생했습니다',
        priority: 'high'
      }
    ],
    showWeather: true,
    weatherData: {
      temperature: 23,
      condition: 'sunny',
      location: '서울'
    },
    showSubscription: true,
  },
};

// 모든 기능 포함 스토리
export const FullFeatured: Story = {
  args: {
    theme: 'newspaper',
    variant: 'elevated',
    sticky: true,
    showBreakingNews: true,
    breakingNews: [
      { id: '1', text: '속보: 주요 정치 뉴스 발생', priority: 'high' },
      { id: '2', text: '경제: 주식시장 급등세', priority: 'medium' }
    ],
    showWeather: true,
    weatherData: {
      temperature: 25,
      condition: 'cloudy',
      location: '서울'
    },
    showSearch: true,
    showUserMenu: true,
    showSubscription: true,
    notificationCount: 3,
    user: {
      name: '홍길동',
      avatar: 'https://via.placeholder.com/32',
      isLoggedIn: true
    },
    navigationItems: [
      { label: '정치', href: '/politics', active: false },
      { label: '경제', href: '/economy', active: false },
      { label: '사회', href: '/society', active: true },
      { label: '문화', href: '/culture', active: false },
      { label: '스포츠', href: '/sports', active: false },
    ],
  },
};
```

#### ✅ 체크포인트
- [ ] NewspaperTheme 스토리 추가 완료
- [ ] FullFeatured 스토리 추가 완료

---

### 5단계: 테스트하기

#### 🔧 작업 1: Storybook에서 확인

1. **터미널에서 Storybook 실행**
   ```bash
   npm run storybook
   ```

2. **브라우저에서 확인할 스토리들**
   - `Layouts > Header > Default` (기존 기능 확인)
   - `Layouts > Header > NewspaperTheme` (신문 테마 확인)
   - `Layouts > Header > FullFeatured` (모든 기능 확인)

#### ✅ 확인할 기능들
- [ ] **신문 테마**: 회색 배경, 빨간 테두리, 빨간 로고
- [ ] **속보 티커**: 빨간 배경의 속보 영역이 헤더 최상단에 표시
- [ ] **날씨 위젯**: 우측 상단에 날씨 정보 표시
- [ ] **구독 버튼**: 주황색 "구독하기" 버튼
- [ ] **반응형**: 모바일 크기에서 날씨 위젯 숨김
- [ ] **기존 기능**: 로고, 네비게이션, 검색, 사용자 메뉴 정상 작동

---

## 🎯 최종 체크리스트

### 파일별 완료 확인
- [ ] **Header.tsx**: Props 확장, Import 추가, JSX 구조 수정
- [ ] **Header.module.scss**: 신문 테마, 새 영역 스타일 추가
- [ ] **Header.stories.tsx**: 새 스토리 2개 추가
- [ ] **index.ts**: 기존 파일 그대로 유지

### 기능별 완료 확인
- [ ] **속보 티커**: 조건부 렌더링으로 표시/숨김
- [ ] **날씨 위젯**: 컴팩트 사이즈로 우측에 표시
- [ ] **구독 버튼**: 주황색 버튼으로 액션 영역에 추가
- [ ] **신문 테마**: CSS 클래스로 테마 변경
- [ ] **반응형**: 모바일에서 날씨 위젯 숨김

### Storybook 확인
- [ ] **Default 스토리**: 기존 기능 정상 작동
- [ ] **NewspaperTheme 스토리**: 신문 테마 적용
- [ ] **FullFeatured 스토리**: 모든 새 기능 작동

---

## 🚨 문제 해결

### 자주 발생하는 오류들

#### 1. Import 오류
```
Module not found: Can't resolve '../../components/Molecules/BreakingNewsTicker'
```
**해결방법**: BreakingNewsTicker 컴포넌트가 실제로 존재하는지 확인

#### 2. TypeScript 오류
```
Property 'theme' does not exist on type 'HeaderProps'
```
**해결방법**: HeaderProps 인터페이스에 theme 속성이 추가되었는지 확인

#### 3. CSS 클래스 오류
```
ClassName 'header--newspaper' not found
```
**해결방법**: SCSS 파일에 해당 클래스가 추가되었는지 확인

#### 4. Storybook 오류
```
Story 'NewspaperTheme' is not defined
```
**해결방법**: 스토리 export가 올바른지 확인

---

## 🎉 완료!

모든 체크리스트를 완료했다면 신문 웹사이트에 적합한 헤더 컴포넌트 개선이 완료되었습니다!

### 다음 단계 (선택사항)
- 추가 테마 만들기
- 애니메이션 효과 추가
- 접근성 개선 (ARIA 라벨)
- 단위 테스트 작성

### 학습한 내용
1. **컴포넌트 확장**: 기존 컴포넌트에 새 기능 추가
2. **조건부 렌더링**: Props에 따른 UI 요소 제어
3. **CSS 테마**: 클래스 기반 테마 시스템
4. **반응형 디자인**: 미디어 쿼리 활용
5. **Storybook**: 컴포넌트 개발 및 테스트 도구

수고하셨습니다! 🎊