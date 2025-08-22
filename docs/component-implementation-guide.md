# 컴포넌트 구현 가이드 (실습용)

## 📚 학습 목표
이 가이드는 신문 웹사이트용 헤더 컴포넌트를 단계별로 구현하는 실습을 위한 것입니다. 각 컴포넌트마다 필수 파일 4개(tsx, module.scss, index.ts, stories.tsx)를 작성하는 최소한의 구현을 목표로 합니다.

## 🎯 실습 범위
- **대상**: 기존 Header 레이아웃 컴포넌트 개선
- **목표**: 신문 웹사이트에 적합한 헤더로 변환
- **방법**: 최소한의 코드로 핵심 기능 구현

## 📁 파일 구조 규칙

각 컴포넌트는 다음 4개 파일을 반드시 포함해야 합니다:

```
src/layouts/Header/
├── Header.tsx              # 메인 컴포넌트
├── Header.module.scss      # 스타일 파일
├── index.ts               # Export 파일
└── Header.stories.tsx     # Storybook 스토리
```

## 🚀 실습 단계

### 단계 1: 기존 Header 컴포넌트 분석

#### 현재 상태 확인
```bash
# 기존 파일들 확인
ls -la src/layouts/Header/
```

#### 현재 기능 목록
- ✅ 로고 표시
- ✅ 네비게이션 메뉴
- ✅ 검색 기능
- ✅ 사용자 메뉴
- ✅ 모바일 반응형
- ❌ 속보 티커 (추가 필요)
- ❌ 날씨 위젯 (추가 필요)
- ❌ 구독 버튼 (추가 필요)

### 단계 2: Header.tsx 최소 개선

#### 2.1 Props 인터페이스 확장
```typescript
// src/layouts/Header/Header.tsx

// 기존 HeaderProps에 추가할 속성들
export interface HeaderProps {
  // ... 기존 props
  
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
}
```

#### 2.2 컴포넌트 구조 개선 (최소)
```typescript
// 새로운 import 추가 (기존 컴포넌트 활용)
import { BreakingNewsTicker } from '../../components/Molecules/BreakingNewsTicker';
import { WeatherWidget } from '../../components/Molecules/WeatherWidget';

// 컴포넌트 내부에 추가할 최소 코드
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
      className={cx(
        'header',
        Boolean(variant) && `header--${variant}`,
        Boolean(theme) && `header--${theme}`, // 새 테마 클래스
        {
          'header--sticky': sticky,
          'header--transparent': transparent,
        },
        className
      )}
    >
      {/* 속보 티커 추가 (최상단) */}
      {showBreakingNews && breakingNews.length > 0 && (
        <div className={cx('header__breaking-news')}>
          <BreakingNewsTicker items={breakingNews} />
        </div>
      )}
      
      <div className={cx('header__container')}>
        {/* 기존 로고 */}
        <Logo ... />
        
        {/* 기존 네비게이션 */}
        {navigationItems.length > 0 && (
          <Navigation ... />
        )}
        
        <div className={cx('header__actions')}>
          {/* 날씨 위젯 추가 */}
          {showWeather && weatherData && (
            <div className={cx('header__weather')}>
              <WeatherWidget data={weatherData} size="compact" />
            </div>
          )}
          
          {/* 기존 검색 */}
          {showSearch && (
            // ... 기존 검색 코드
          )}
          
          {/* 구독 버튼 추가 */}
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
          
          {/* 기존 사용자 메뉴 등 */}
          // ... 기존 코드
        </div>
      </div>
      
      {/* 기존 모바일 메뉴 */}
      // ... 기존 코드
    </header>
  );
};
```

### 단계 3: Header.module.scss 최소 개선

#### 3.1 신문 테마 스타일 추가
```scss
// src/layouts/Header/Header.module.scss
// 기존 스타일에 추가

.header {
  // ... 기존 스타일
  
  // 신문 테마 (최소 구현)
  &--newspaper {
    background-color: #f8f8f8;
    border-bottom: 3px solid #d32f2f;
    
    .header__logo {
      color: #d32f2f;
      font-weight: bold;
    }
  }
  
  // 속보 티커 영역
  &__breaking-news {
    background-color: #d32f2f;
    color: white;
    padding: 0.5rem 0;
    font-size: 0.9rem;
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
    
    &:hover {
      background-color: #e55a2b;
    }
  }
}
```

### 단계 4: index.ts 확인

#### 4.1 Export 파일 검증
```typescript
// src/layouts/Header/index.ts
// 기존 파일이 올바른지 확인

export { Header } from './Header';
export type { HeaderProps } from './Header';
```

### 단계 5: Header.stories.tsx 개선

#### 5.1 새로운 스토리 추가 (최소)
```typescript
// src/layouts/Header/Header.stories.tsx
// 기존 스토리에 추가

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
      { id: '1', text: '속보: 주요 정치 뉴스', priority: 'high' },
      { id: '2', text: '경제: 주식시장 상승', priority: 'medium' }
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

## 🧪 테스트 방법

### Storybook에서 확인
```bash
# Storybook 실행
npm run storybook

# 브라우저에서 확인할 스토리들:
# - Layouts/Header/Default
# - Layouts/Header/NewspaperTheme
# - Layouts/Header/FullFeatured
```

### 확인할 기능들
1. **신문 테마**: 빨간색 테두리와 로고 색상
2. **속보 티커**: 빨간 배경의 속보 영역
3. **날씨 위젯**: 우측 상단의 날씨 정보
4. **구독 버튼**: 주황색 구독 버튼
5. **반응형**: 모바일에서 날씨 위젯 숨김

## 📝 실습 체크리스트

### 필수 구현 (Phase 1)
- [ ] Header.tsx에 새 Props 추가
- [ ] 속보 티커 영역 추가
- [ ] 날씨 위젯 영역 추가
- [ ] 구독 버튼 추가
- [ ] 신문 테마 클래스 추가

### 스타일링 (Phase 2)
- [ ] Header.module.scss에 신문 테마 스타일
- [ ] 속보 티커 스타일
- [ ] 날씨 위젯 스타일
- [ ] 구독 버튼 스타일
- [ ] 모바일 반응형 스타일

### 스토리북 (Phase 3)
- [ ] NewspaperTheme 스토리 추가
- [ ] FullFeatured 스토리 추가
- [ ] 모든 새 기능이 스토리에서 작동

### 테스트 (Phase 4)
- [ ] Storybook에서 모든 스토리 확인
- [ ] 반응형 동작 확인
- [ ] 버튼 클릭 동작 확인
- [ ] 테마 변경 확인

## 💡 구현 팁

### 1. 기존 컴포넌트 활용
- BreakingNewsTicker, WeatherWidget 컴포넌트가 이미 존재
- 새로 만들지 말고 기존 것을 import해서 사용

### 2. 최소한의 변경
- 기존 코드를 최대한 보존
- 새 기능만 추가하는 방식

### 3. 조건부 렌더링 활용
```typescript
{showNewFeature && (
  <div className={cx('header__new-feature')}>
    <NewComponent />
  </div>
)}
```

### 4. CSS 클래스 네이밍
```scss
.header {
  &__new-section {     // BEM 방식
    // 스타일
  }
  
  &--new-theme {       // modifier
    // 테마 스타일
  }
}
```

## 🎓 학습 포인트

1. **컴포넌트 확장**: 기존 컴포넌트에 새 기능 추가하는 방법
2. **조건부 렌더링**: Props에 따라 UI 요소 표시/숨김
3. **테마 시스템**: CSS 클래스를 통한 테마 변경
4. **반응형 디자인**: 미디어 쿼리를 통한 모바일 최적화
5. **Storybook 활용**: 컴포넌트 개발과 테스트

이 가이드를 따라 단계별로 구현하면 신문 웹사이트에 적합한 헤더 컴포넌트를 완성할 수 있습니다.