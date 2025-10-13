# 강의 포인트 메모

워크숍이나 온보딩 세션에서 강조할 내용을 빠르게 전달할 때 참고하세요.

## 1. 헤더 레시피 (`src/layouts/Header/headerContent.ts`)
- `createHeaderContent` 하나로 네비게이션, Shortcut 버튼, 마스트헤드 설정을 묶어서 관리.
- 배열/문자열만 수정하면 링크가 갱신되므로 비개발자도 레이아웃 구조를 건드릴 필요가 없음.
- 레시피 결과는 레이아웃 컴포넌트(`HomeHeader`, `PlusHomeHeader`, `PlusSubHeader`, `SubHeader`)에서 그대로 구조 분해 후 `HeaderBar`에 전달.
- `SUB_HEADER_CONTENT` 같은 기본 템플릿을 `...baseUser` 방식으로 확장해 로그인 여부 등 런타임 변화에도 대응 가능.

## 2. 메가메뉴 레시피 (`src/recipes/megaMenuRecipes.ts`, `src/components/Organisms/MegaMenu/megaMenuConfig.ts`)
- `linksFromBase`에 도메인 한 번만 적으면 하위 경로 문자열만으로 링크 묶음 생성.
- `[label, href]` 또는 `{ label, href, ext }` 형태를 `makeLinks`에 넘겨 외부 링크/뱃지 값을 쉽게 관리.
- `makeSection`으로 제목·접힘 여부 정의 후 `createMegaMenuConfig`에 바로 전달 → 네비게이션, 스토리북, 실제 메가메뉴가 모두 같은 설정을 공유.
- Storybook에서 `MegaMenuNavigation`이 실서비스 설정과 동일한 데이터를 사용하므로, 데이터 변경 → 스토리북 확인 → 서비스 반영 흐름이 단순해짐.

## 3. 공용 링크/트래킹 헬퍼
- `TrackableLink` (`src/components/common/TrackableLink.tsx`)는 트래킹 데이터(`data-evnt-*`)와 외부 링크 속성을 자동으로 붙여줌.
- `SearchTagLink` 같이 트래킹이 필요한 atom은 `tracking` 객체만 넘기면 되므로 코드가 간결해지고, 새로운 atom도 같은 패턴을 그대로 재사용.
- `useComposedCallback` (`src/hooks/useComposedCallback.ts`)으로 컴포넌트를 만들 때 사용자(onClick 등)와 내부 추적(onTrack) 콜백을 손쉽게 결합.

## 4. 검색 레이어 공통 컴포넌트
- `SearchTagLinkList` (`src/components/Molecules/SearchLayer/SearchTagLinkList/SearchTagLinkList.tsx`)는 AI 태그·트렌드 키워드를 모두 수용하는 범용 리스트 컴포넌트.
- `InlineLinkList`와 `SearchTagLink` 조합을 숨겨 반복 JSX를 줄였고, 데이터 구조가 바뀌어도 링크 속성만 확장하면 됨.
- `SearchLayerAiTagSection`과 `SearchLayerTrendSection`은 동일한 API로 호출되어 유지 보수가 간단.

## 5. 스토리북 헬퍼 (`src/stories/searchLayerStoryHelpers.ts`)
- `createSearchLayerDecorator` 함수로 Storybook 데코레이터 셸을 통일.
- 재사용 상수(`searchLayerBaseDecorator`, `searchLayerOverlayDecorator`)를 통해 SearchLayer 관련 스토리들이 동일한 CSS 환경을 공유.
- 구조가 다른 케이스(`SearchLayer.stories.tsx`)도 함수 인자로 `structure`만 전달하면 끝.
- 동일 파일에서 `megaMenuBaseDecorator`, `megaMenuScrollDecorator` 등을 제공하여 메가메뉴 관련 스토리들도 한 줄로 셸을 공유.

## 6. 문서 & 작업 플로우
- `docs/recipes.md`는 비개발자용 가이드, 이번 변경점과 같이 활용해 레이아웃/검색 설정을 텍스트 작업으로 끝낼 수 있음을 강조.
- 새 레시피를 만들 경우 `src/recipes` 폴더에 추가하고, 관련 Storybook 데코레이터 또는 리스트 컴포넌트를 함께 정의하면 생산성이 가장 좋음.

> 강의 때는 “문자열만 바꿔도 UI가 바뀐다”는 메시지와 Storybook에서 즉시 확인 가능한 데모를 중심으로 진행하면 이해도가 빠르게 올라갑니다.
