# UI Recipes 안내

비개발자도 손쉽게 네비게이션, 숏컷, 검색 태그를 다룰 수 있도록 만든 유틸리티입니다.  
Storybook에서 확인한 내용을 그대로 복사해 붙여넣어도 동작하도록 TypeScript 제네릭/타입은 최소한으로 노출했습니다.

---

## 1. 헤더 구성하기 (`src/recipes/headerRecipes.ts`)

### 빠르게 네비게이션 만들기

```ts
import { createHeaderContent } from '../recipes/headerRecipes';

const { nav } = createHeaderContent({
  nav: ['오피니언', '정치', '경제'],
  navOptions: { baseHref: 'https://www.joongang.co.kr' },
});
```

- 문자열만 적으면 `baseHref` + slug 조합으로 링크가 만들어집니다.
- `[label, href]` 형태나 `{ label, href }` 객체를 넘기면 주소를 직접 제어할 수 있습니다.

### 숏컷(더보기 버튼) 설정

```ts
const shortcut = buildShortcut('https://www.joongang.co.kr/plus');
// 혹은 옵션 객체 형태
const customShortcut = buildShortcut({
  href: 'https://www.joongang.co.kr',
  ariaLabel: '중앙일보 홈',
  variant: 'default',
});
```

- `false`(기본값)를 주면 버튼이 렌더링되지 않습니다.
- 문자열은 `variant: 'default'`, 객체는 원하는 옵션만 덮어씌울 수 있습니다.

### 사용자/마스트헤드 영역 한 번에 세팅

```ts
const headerContent = createHeaderContent({
  user: true, // 로그인 여부만 체크하면 됩니다.
  masthead: {
    joinHref: '/join-plus',
    enabled: true,
  },
});
```

- `user: true`는 `{ loggedIn: true }`와 같습니다.
- `masthead.enabled`를 `false`로 주면 마스트헤드 전체가 감춰집니다.
- 나머지 프로퍼티는 필요할 때만 선택적으로 덮어써 주세요. 기본값은 `headerRecipes.ts` 최상단에 정리되어 있습니다.

---

## 2. 검색 레이어 설정 (`src/recipes/searchLayerRecipes.ts`)

### AI 태그/키워드를 텍스트만으로 정의

```ts
import { createSearchLayerConfig } from '../recipes/searchLayerRecipes';

export const searchLayerConfig = createSearchLayerConfig({
  updatedAt: '05.01 09:00 기준',
  desktopTags: [
    '로또 1등 당첨 비결을 알려줘',
    '한강 뚝섬 유원지 야경 명소',
  ],
  searchOptions: {
    baseHref: 'https://www.joongang.co.kr/aisearch',
  },
  trendKeywords: [
    { label: '운세', icon: '🍀' },
    '부동산 세금',
  ],
  trendOptions: {
    baseHref: 'https://www.joongang.co.kr/search',
  },
});
```

- 문자열만 입력하면 자동으로 URL 인코딩된 검색 주소가 만들어집니다.
- `icon`을 넣으면 라벨 앞에 이모지/기호를 붙일 수 있습니다.
- `eventLabel`이 필요하면 `{ label: 'AI', eventLabel: '트렌드 키워드_AI' }`처럼 지정합니다.

### 캐러셀 그룹 크기 조정

```ts
createSearchLayerConfig({
  desktopTags: [...],
  carouselSize: 3, // 한 그룹에 3개씩 묶기
  ...
});
```

- 태그 수가 바뀌어도 `carouselSize`만 조절하면 레이아웃이 자동으로 맞춰집니다.

---

## 3. 메가메뉴 설정 (`src/recipes/megaMenuRecipes.ts`)

### 반복 링크를 한 번에 정의

```ts
import { linksFromBase } from '../recipes/megaMenuRecipes';

const newsLinks = linksFromBase('https://www.joongang.co.kr', {
  정치: 'politics',
  경제: 'money',
  사회: 'society',
  국제: 'world',
});
```

- 공통 도메인만 지정하면 `path` 값만으로도 전체 링크가 생성됩니다.
- `{ path, ext: true }` 형태를 쓰면 새 창 여부나 `withNew` 뱃지도 함께 제어할 수 있습니다.

### 섹션 + 링크 조합 만들기

```ts
import { makeSection, createMegaMenuConfig, linksFromBase, makeLinks } from '../recipes/megaMenuRecipes';

export const megaMenuConfig = createMegaMenuConfig({
  opinion: makeSection({
    title: '오피니언',
    href: 'https://www.joongang.co.kr/opinion',
    showFoldIcon: true,
    links: linksFromBase('https://www.joongang.co.kr/opinion', {
      사설칼럼: 'editorialcolumn',
      만평: 'satiricalcartoon',
    }),
  }),
  intl: makeLinks([
    { label: 'ENG', href: 'https://koreajoongangdaily.joins.com/', ext: true },
    { label: '中文', href: 'https://chinese.joins.com/', ext: true },
  ]),
  // ...
});
```

- `makeLinks`는 `[label, href]` 튜플이나 `{ label, href }` 객체를 그대로 받아들입니다.
- `makeSection`으로 제목/접힘 여부를 지정하고, 링크는 위에서 만든 배열을 전달하면 됩니다.
- 완성된 설정은 `MegaMenuNavigation`뿐 아니라 메가메뉴 스토리/실제 컴포넌트 모두에서 재사용됩니다.

---

## 4. 컴포넌트 빌드시 유틸 (`TrackableLink`, `useComposedCallback`)

### 트래킹 가능한 링크 만들기

```tsx
import TrackableLink from '../components/common/TrackableLink';

<TrackableLink
  href="https://www.joongang.co.kr/sample"
  tracking={{ category: 'area:중앙|홈', action: 'click:sample', label: '샘플 링크' }}
  external
>
  <span>샘플 링크</span>
</TrackableLink>
```

- `tracking` 객체만 넘기면 `data-evnt-*` 속성이 자동 생성됩니다.
- `external` 옵션을 켜면 `target="_blank"`, `rel="noreferrer"`가 자동으로 붙습니다.
- `onTrack`과 `onClick`을 동시에 넘기면 `useComposedCallback`이 두 콜백을 순서대로 실행합니다.

### 콜백 합치기

```ts
import { useComposedCallback } from '../hooks/useComposedCallback';

const handleClick = useComposedCallback(onClick, () => log('clicked'));
```

- 새로운 atom/molecule에서 외부에서 전달받은 핸들러와 내부 추적 로직을 결합할 때 유용합니다.
- 배열의 길이만큼 순서대로 실행되며, `undefined`는 자동으로 건너뜁니다.

---

## 5. JSX 구조 단순화 (`maybeWrap`, `composeChildren`)

```tsx
import { composeChildren, maybeWrap } from '../utils/reactNode';

const content = composeChildren(primary, secondary, actions);
const wrapped = maybeWrap(content, children => <nav className="nav_group">{children}</nav>);
```

- `composeChildren`은 `null`/`undefined` 요소를 자동으로 거르고 배열을 그대로 ReactNode로 반환합니다.
- `maybeWrap`은 콘텐츠가 존재할 때만 래퍼를 적용합니다. 조건부 `<div>...</div>` 패턴을 한 줄로 줄일 수 있습니다.

---

## 6. 변형/접근성 유틸 (`selectVariant`, `buildAriaProps`)

```ts
import { selectVariant } from '../utils/variants';
import { buildAriaProps } from '../utils/accessibility';

const buttonClass = selectVariant(BUTTON_CLASS_BY_VARIANT, variant);
const ariaProps = buildAriaProps({ expanded });
```

- variant 레코드에서 안전하게 값을 꺼낼 때 `selectVariant`를 사용하면 기본값 처리까지 한 번에 끝납니다.
- `buildAriaProps`는 필요한 ARIA 속성만 객체로 반환하므로 `<button {...ariaProps}>`처럼 간결하게 적용할 수 있습니다.

---

## 7. 적용 순서 요약

1. `docs/shared-components.md`에서 사용할 공통 레이아웃/컴포넌트를 살펴봅니다.
2. 헤더/메가메뉴/검색 키워드 교체가 필요하면 이 문서에 나온 Recipe 함수를 먼저 수정합니다.
3. Storybook에서 `Layouts/Headers`, `Organisms/MegaMenu`, `Organisms/SearchLayer` 스토리를 열어 변경 사항을 바로 확인합니다. 새 atom/molecule은 위 유틸을 활용해 트래킹/외부 링크 로직, JSX 래핑, variant/ARIA 처리를 빠르게 붙일 수 있습니다.
4. 문제가 없다면 git commit → 배포 프로세스를 진행합니다.

필요한 조합이 추가로 생기면 `src/recipes` 폴더에 파일을 하나 더 만들어 같은 패턴으로 확장하면 됩니다.
