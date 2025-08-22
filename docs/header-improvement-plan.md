# 헤더 컴포넌트 개선 계획

## 현재 상태 분석

### 기존 Header 컴포넌트 구조
현재 `/src/layouts/Header/` 폴더에는 다음 파일들이 있습니다:
- `Header.tsx` - 메인 컴포넌트 (309줄)
- `Header.module.scss` - 스타일 파일 (297줄)
- `Header.stories.tsx` - Storybook 스토리 (157줄)
- `index.ts` - Export 파일

### 현재 기능
✅ **이미 구현된 기능들:**
- 로고 표시 (Logo 컴포넌트 사용)
- 네비게이션 메뉴 (Navigation 컴포넌트 사용)
- 검색 기능 (SearchBar 컴포넌트 사용)
- 사용자 메뉴 (UserMenu 컴포넌트 사용)
- 알림 기능 (notificationCount)
- 모바일 반응형 메뉴
- 다양한 variant (default, minimal, elevated)
- sticky, transparent 옵션

### 누락된 기능
❌ **추가 구현이 필요한 기능들:**
- 속보 티커 (Breaking News Ticker)
- 날씨 위젯 (Weather Widget)
- 구독 버튼/배너
- 다크모드 지원
- 접근성 개선 (ARIA 라벨)
- 키보드 네비게이션

## 개선 계획

### Phase 1: 기존 컴포넌트 개선 (필수)

#### 1.1 접근성 개선
```typescript
// Header.tsx에 추가할 ARIA 속성들
<header
  role="banner"
  aria-label="사이트 헤더"
  className={cx(...)}
>
  <nav aria-label="주 네비게이션">
    {/* 네비게이션 항목들 */}
  </nav>
</header>
```

#### 1.2 키보드 네비게이션 지원
```typescript
// 키보드 이벤트 핸들러 추가
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }
};
```

#### 1.3 다크모드 지원
```scss
// Header.module.scss에 다크모드 스타일 추가
@media (prefers-color-scheme: dark) {
  .header {
    background-color: var(--color-background-dark);
    border-bottom-color: var(--color-border-dark);
  }
}
```

### Phase 2: 새로운 기능 추가 (중요)

#### 2.1 속보 티커 통합
기존 BreakingNewsTicker 컴포넌트를 Header에 통합:

```typescript
// HeaderProps에 추가
interface HeaderProps {
  // ... 기존 props
  showBreakingNews?: boolean;
  breakingNews?: BreakingNewsItem[];
}

// Header 컴포넌트에 추가
{showBreakingNews && breakingNews && (
  <div className={cx('header__breaking-news')}>
    <BreakingNewsTicker items={breakingNews} />
  </div>
)}
```

#### 2.2 날씨 위젯 통합
기존 WeatherWidget 컴포넌트를 Header에 통합:

```typescript
// HeaderProps에 추가
interface HeaderProps {
  // ... 기존 props
  showWeather?: boolean;
  weatherData?: WeatherData;
}

// Header 컴포넌트에 추가
{showWeather && weatherData && (
  <div className={cx('header__weather')}>
    <WeatherWidget data={weatherData} size="compact" />
  </div>
)}
```

#### 2.3 구독 버튼 추가
```typescript
// HeaderProps에 추가
interface HeaderProps {
  // ... 기존 props
  showSubscription?: boolean;
  onSubscribe?: () => void;
}

// Header 컴포넌트에 추가
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

### Phase 3: 스타일링 개선 (선택)

#### 3.1 신문 스타일 테마 추가
```scss
// Header.module.scss에 신문 테마 추가
.header {
  &--newspaper {
    background-color: #f8f8f8;
    border-bottom: 3px solid #d32f2f;
    font-family: 'Times New Roman', serif;
    
    .header__logo {
      font-weight: bold;
      font-size: 1.8rem;
      color: #d32f2f;
    }
  }
}
```

#### 3.2 반응형 개선
```scss
// 모바일 최적화
@media (max-width: 768px) {
  .header {
    &__breaking-news {
      order: -1;
      width: 100%;
    }
    
    &__weather {
      display: none; // 모바일에서 숨김
    }
  }
}
```

## 구현 가이드

### 1. 기존 컴포넌트 수정

#### 파일: `src/layouts/Header/Header.tsx`
```typescript
// 1. 새로운 import 추가
import { BreakingNewsTicker } from '../../components/Molecules/BreakingNewsTicker';
import { WeatherWidget } from '../../components/Molecules/WeatherWidget';

// 2. HeaderProps 인터페이스 확장
export interface HeaderProps {
  // ... 기존 props
  showBreakingNews?: boolean;
  breakingNews?: BreakingNewsItem[];
  showWeather?: boolean;
  weatherData?: WeatherData;
  showSubscription?: boolean;
  onSubscribe?: () => void;
  theme?: 'default' | 'newspaper';
}

// 3. 컴포넌트 구조 개선
export const Header: React.FC<HeaderProps> = ({
  // ... 기존 props
  showBreakingNews = false,
  breakingNews = [],
  showWeather = false,
  weatherData,
  showSubscription = false,
  onSubscribe,
  theme = 'default',
}) => {
  // ... 기존 로직
  
  return (
    <header
      role="banner"
      aria-label="사이트 헤더"
      className={cx(
        'header',
        Boolean(variant) && `header--${variant}`,
        Boolean(theme) && `header--${theme}`,
        {
          'header--sticky': sticky,
          'header--transparent': transparent,
        },
        className
      )}
      data-testid="header-component"
    >
      {/* 속보 티커 (최상단) */}
      {showBreakingNews && breakingNews.length > 0 && (
        <div className={cx('header__breaking-news')}>
          <BreakingNewsTicker items={breakingNews} />
        </div>
      )}
      
      <div className={cx('header__container')}>
        {/* 기존 로고 섹션 */}
        <Logo
          text={typeof logo === 'string' ? logo : 'JoongAng Daily'}
          href="/"
          size="md"
          variant="default"
          className={cx('header__logo')}
        />

        {/* 기존 네비게이션 섹션 */}
        {navigationItems.length > 0 && (
          <nav aria-label="주 네비게이션">
            <Navigation 
              items={navigationItems} 
              variant="horizontal" 
              alignment="left" 
              className={cx('header__nav')} 
            />
          </nav>
        )}

        {/* 우측 액션 섹션 */}
        <div className={cx('header__actions')}>
          {/* 날씨 위젯 */}
          {showWeather && weatherData && (
            <div className={cx('header__weather')}>
              <WeatherWidget data={weatherData} size="compact" />
            </div>
          )}
          
          {/* 기존 검색 */}
          {showSearch && (
            // ... 기존 검색 코드
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

          {/* 기존 알림, 사용자 메뉴, 모바일 토글 */}
          {/* ... 기존 코드 */}
        </div>
      </div>

      {/* 기존 모바일 메뉴 */}
      {/* ... 기존 코드 */}
    </header>
  );
};
```

### 2. 스타일 파일 수정

#### 파일: `src/layouts/Header/Header.module.scss`
```scss
// 기존 스타일에 추가
.header {
  // ... 기존 스타일
  
  // 신문 테마
  &--newspaper {
    background-color: #f8f8f8;
    border-bottom: 3px solid #d32f2f;
    font-family: 'Times New Roman', serif;
    
    .header__logo {
      font-weight: bold;
      font-size: 1.8rem;
      color: #d32f2f;
    }
  }
  
  // 속보 티커 영역
  &__breaking-news {
    background-color: #d32f2f;
    color: white;
    padding: 0.5rem 0;
  }
  
  // 날씨 위젯 영역
  &__weather {
    margin-right: var(--spacing-md);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
  
  // 구독 버튼
  &__subscribe-btn {
    margin-right: var(--spacing-sm);
    background-color: #ff6b35;
    border-color: #ff6b35;
    
    &:hover {
      background-color: #e55a2b;
      border-color: #e55a2b;
    }
  }
  
  // 다크모드 지원
  @media (prefers-color-scheme: dark) {
    background-color: var(--color-background-dark, #1a1a1a);
    border-bottom-color: var(--color-border-dark, #333);
    color: var(--color-text-dark, #fff);
  }
  
  // 접근성 개선
  &:focus-within {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
```

### 3. 스토리 파일 수정

#### 파일: `src/layouts/Header/Header.stories.tsx`
```typescript
// 새로운 스토리 추가
export const NewspaperTheme: Story = {
  args: {
    theme: 'newspaper',
    showBreakingNews: true,
    breakingNews: [
      {
        id: '1',
        text: '속보: 중요한 뉴스가 발생했습니다',
        timestamp: new Date(),
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

export const FullFeatured: Story = {
  args: {
    variant: 'elevated',
    sticky: true,
    showBreakingNews: true,
    showWeather: true,
    showSearch: true,
    showUserMenu: true,
    showSubscription: true,
    notificationCount: 3,
    user: {
      name: '홍길동',
      avatar: 'https://via.placeholder.com/32',
      isLoggedIn: true
    }
  },
};
```

## 테스트 계획

### 1. 기능 테스트
- [ ] 속보 티커 표시/숨김
- [ ] 날씨 위젯 표시/숨김
- [ ] 구독 버튼 클릭
- [ ] 키보드 네비게이션
- [ ] 모바일 반응형

### 2. 접근성 테스트
- [ ] 스크린 리더 호환성
- [ ] 키보드만으로 네비게이션
- [ ] 색상 대비 확인
- [ ] ARIA 라벨 검증

### 3. 성능 테스트
- [ ] 초기 로딩 시간
- [ ] 번들 크기 확인
- [ ] 애니메이션 성능

## 완료 체크리스트

### Phase 1 (필수)
- [ ] 접근성 ARIA 라벨 추가
- [ ] 키보드 네비게이션 구현
- [ ] 다크모드 스타일 추가
- [ ] 기존 기능 테스트

### Phase 2 (중요)
- [ ] 속보 티커 통합
- [ ] 날씨 위젯 통합
- [ ] 구독 버튼 추가
- [ ] 신문 테마 구현

### Phase 3 (선택)
- [ ] 고급 애니메이션
- [ ] 추가 테마 옵션
- [ ] 성능 최적화
- [ ] 상세 문서화

이 계획을 따라 단계별로 구현하면 요구사항에 맞는 완전한 신문 헤더 컴포넌트를 만들 수 있습니다.