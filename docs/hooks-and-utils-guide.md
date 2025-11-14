# Hooks & Utils Reference (쉽게 쓰는 요약집)

컴포넌트 작업 중 “어떤 훅을 쓰면 편할까?” “이 유틸은 언제 필요한가?” 고민될 때 바로 참고할 수 있는 가이드입니다.  
각 항목은 **언제 쓰면 좋은지**, **어떻게 쓰는지**, **실전 예시** 순으로 정리했습니다.

---

## Hooks

### `useBoolean` — `src/hooks/useBoolean.ts`

**언제 사용하면 좋을까요?**

- 토글 버튼, 드롭다운 열림/닫힘 등 불린 상태를 간단히 제어하고 싶을 때.

**사용 순서**

1. 훅을 호출하면서 초기값을 넘긴다. (기본값은 `false`)
2. `value`로 현재 상태를 읽고, `setTrue`, `setFalse`, `toggle`로 조작한다.

```tsx
import { useBoolean } from '../hooks/useBoolean';

const expanded = useBoolean(false);

return (
  <>
    <button type="button" onClick={expanded.toggle}>
      {expanded.value ? '메뉴 닫기' : '메뉴 열기'}
    </button>
    {expanded.value && <NavigationMenu onClose={expanded.setFalse} />}
  </>
);
```

---

### `useDisclosure` — `src/hooks/useDisclosure.ts`

**언제 사용하면 좋을까요?**

- 모달, 드롭다운 등 “열기/닫기” 패턴을 쓸 때.
- 외부에서 `isOpen`을 제어하는 컨트롤드 패턴도 지원합니다.

**사용 순서**

1. `const dialog = useDisclosure();` 로 훅 초기화.
2. `dialog.isOpen`을 UI에 넘기고, `dialog.open/close/toggle`을 액션에 연결.
3. 필요하면 `onOpen`, `onClose` props로 사이드 이펙트 실행.

```tsx
const dialog = useDisclosure();

<IconButton ariaLabel="검색 열기" onClick={dialog.open} expanded={dialog.isOpen} />;
<SearchLayer open={dialog.isOpen} onClose={dialog.close} onSubmit={handleSubmit} />;
```

---

### `useClickOutside` — `src/hooks/useClickOutside.ts`

**언제 사용하면 좋을까요?**

- 특정 영역 밖을 클릭했을 때 닫힘 액션이 필요할 때.
- 예: 열려있는 메뉴, 오버레이, 팝오버.

**사용 순서**

1. 클릭을 감지할 요소에 `ref`를 단다.
2. `useClickOutside(ref, handler, enabled)` 호출. `enabled`가 `false`면 리스너가 등록되지 않습니다.

```tsx
const panelRef = useRef<HTMLDivElement>(null);
useClickOutside(panelRef, () => modal.close(), modal.isOpen);

return (
  <aside ref={panelRef} className="side-panel">
    ...
  </aside>
);
```

---

### `useEscapeKey` — `src/hooks/useEscapeKey.ts`

**언제 사용하면 좋을까요?**

- ESC 키로 모달이나 레이어를 닫게 하고 싶을 때.
- iframe 등 다른 문서에서 이벤트를 듣고 싶다면 `options.document`를 넘깁니다.

**사용 순서**

1. 훅에 `handler`와 `active` 조건을 전달합니다.
2. ESC가 눌리면 handler가 호출됩니다.

```tsx
useEscapeKey(event => {
  event.preventDefault();
  modal.close();
}, modal.isOpen);
```

---

### `useBodyScrollLock` — `src/hooks/useBodyScrollLock.ts`

**언제 사용하면 좋을까요?**

- 오버레이가 열려있는 동안 배경 스크롤을 막고 싶을 때.
- 여러 오버레이가 겹쳐도 안전하게 동작합니다.

**사용 순서**

1. `useBodyScrollLock(open);` 처럼 열린 여부를 넘깁니다.
2. `open`이 `true`이면 `<body>`에 `overflow: hidden`이 적용됩니다.

```tsx
useBodyScrollLock(megaMenu.isOpen);
```

---

### `useDebouncedValue` — `src/hooks/useDebouncedValue.ts`

언제 사용하면 좋을까요?

- 입력값이 바뀔 때마다 바로 API 호출/필터링을 하지 말고, 사용자가 잠깐 멈출 때 한 번만 처리하고 싶을 때.
- 실시간 검색창, 자동완성 입력, 스크롤/리사이즈 후 처리 최적화 등에 유용합니다.

사용 순서

1. 원본 상태값을 만들고, `useDebouncedValue(value, delay)`로 지연된 값을 만든다.
2. 지연된 값이 바뀔 때만 네트워크 호출/필터링을 수행한다.

```tsx
const [query, setQuery] = useState('');
const debounced = useDebouncedValue(query, 300);

useEffect(() => {
  if (!debounced) return;
  fetchList({ q: debounced });
}, [debounced]);

return <input value={query} onChange={e => setQuery(e.target.value)} placeholder="검색어 입력" />;
```

---

### `useFocusTrap` — `src/hooks/useFocusTrap.ts`

**언제 사용하면 좋을까요?**

- 모달, 풀스크린 레이어 등에서 포커스를 내부에 가두고, 닫힌 뒤 원래 위치로 돌려놓고 싶을 때.

**사용 순서**

1. 포커스 범위를 한정하고 싶은 요소에 `ref`를 단다.
2. `useFocusTrap(ref, active, { initialFocus, restoreFocus })` 형태로 호출한다.

```tsx
const layerRef = useRef<HTMLDivElement>(null);

useFocusTrap(layerRef, open, {
  initialFocus: () => inputRef.current,
  restoreFocus: true,
});
```

---

### `useSearchSubmit` — `src/hooks/useSearchSubmit.ts`

**언제 사용하면 좋을까요?**

- 검색 폼에서 빈 값은 무시하고, 검색어를 URL 쿼리로 붙여 이동시키고 싶을 때.

**사용 순서**

1. `const { handleSubmit } = useSearchSubmit();`
2. 폼 `onSubmit`에 `handleSubmit`을 연결하면 끝입니다.

```tsx
const { handleSubmit } = useSearchSubmit();

<SearchLayer open={open} onClose={close} onSubmit={handleSubmit} />;
```

---

### `useSearchLayerState` — `src/components/Organisms/SearchLayer/useSearchLayerState.ts`

**언제 사용하면 좋을까요?**

- 검색 레이어에서 placeholder 토글, 입력 값 관리, 추천어 적용 등을 한 번에 처리하고 싶을 때.

**사용 순서**

1. `const state = useSearchLayerState({ open, onClose, onSubmit });`
2. 반환값에서 필요한 핸들러를 구조 분해해 컴포넌트에 연결한다.

```tsx
const { layerRef, handleSubmit, handleSearchInput, close } = useSearchLayerState({
  open,
  onClose,
  onSubmit,
});

<form ref={layerRef} onSubmit={handleSubmit}>
  <p contentEditable onInput={handleSearchInput} />
  <button type="submit">검색</button>
</form>;
```

---

### `useLatest` — `src/hooks/useLatest.ts`

**언제 사용하면 좋을까요?**

- 비동기 콜백 안에서 최신 상태/props 값을 읽고 싶을 때.
- setInterval, 이벤트 리스너, Promise 콜백 등에서 유용합니다.

**사용 순서**

1. `const latestValue = useLatest(value);`
2. 콜백 안에서 `latestValue.current`로 최신 값을 읽는다.

```tsx
const latestQuery = useLatest(query);

useEffect(() => {
  const id = setInterval(() => {
    console.log('현재 검색어:', latestQuery.current);
  }, 1000);
  return () => clearInterval(id);
}, [latestQuery]);
```

---

### `useEventListener` — `src/hooks/useEventListener.ts`

**언제 사용하면 좋을까요?**

- 반복되는 `addEventListener`/`removeEventListener` 패턴을 깔끔하게 정리하고 싶을 때.
- 대상은 `window`, `document`, DOM 요소(ref), 함수 등 자유롭게 넘길 수 있습니다.

**사용 순서**

1. `target`을 직접 넘기거나 `ref`, 혹은 `() => target` 형태로 전달.
2. 이벤트 타입, 핸들러, 옵션(`{ passive: true }` 등), `enabled` 플래그를 지정.

```tsx
const panelRef = useRef<HTMLDivElement>(null);

// 윈도우 리사이즈
useEventListener(window, 'resize', () => console.log(window.innerWidth));

// 특정 요소 스크롤
useEventListener(panelRef, 'scroll', () => console.log('스크롤'), { passive: true }, panelVisible);
```

---

### `useComposedCallback` — `src/hooks/useComposedCallback.ts`

**언제 사용하면 좋을까요?**

- 버튼 클릭 시 `onClick`과 `onTrack` 같이 여러 콜백을 순차 실행하고 싶을 때.
- props로 받은 콜백이 변경돼도 최신 콜백이 실행되도록 보장합니다.

**사용 순서**

1. `const handleClick = useComposedCallback(onClick, onTrack);`
2. 만들어진 함수를 이벤트에 그대로 전달.

```tsx
const handleClick = useComposedCallback(
  event => console.log('사용자 클릭', event),
  () => logAnalytics('CTA 클릭')
);

<button type="button" onClick={handleClick}>
  CTA
</button>;
```

---

## Utilities

### 트래킹 속성 — `src/utils/tracking.ts`

**하는 일**: `data-evnt-*` 속성을 자동으로 만들어 JSX에 손쉽게 펼칠 수 있게 해줍니다.

```tsx
import { buildTrackingAttributes } from '../utils/tracking';

const tracking = buildTrackingAttributes({
  category: 'header',
  action: 'click',
  label: 'login',
});

<a {...tracking} href="/login">
  로그인
</a>;
```

---

### 스크롤 잠금 — `src/utils/scrollLock.ts`

**하는 일**: `<body>` 스크롤을 잠그고, 반환된 함수를 호출하면 해제합니다. 중첩 호출도 안전합니다.

```tsx
import { lockBodyScroll } from '../utils/scrollLock';

const release = lockBodyScroll(); // 잠금
// ... 오버레이 닫는 로직
release(); // 해제
```

> `useBodyScrollLock` 훅이 내부적으로 이 유틸을 사용합니다.

---

### 포커스 탐색 — `src/utils/focus.ts`

**하는 일**: 접근성을 위한 포커스 제어 유틸.

- `getFocusableElements(root, { includeRoot })` → 포커스 가능한 요소 배열을 돌려줍니다.
- `focusElement(element, { preventScroll })` → 포커스를 시도하고 성공 여부를 반환합니다.

```tsx
const items = getFocusableElements(dialogRef.current!, { includeRoot: true });

if (items.length > 0) {
  focusElement(items[0], { preventScroll: true });
}
```

> `useFocusTrap` 내부에서 사용 중입니다.

---

### 접근성 속성 — `src/utils/accessibility.ts`

**하는 일**: 반복되는 ARIA 속성 설정을 간결하게 만들어줍니다.

```tsx
import { buildAriaProps } from '../utils/accessibility';

const aria = buildAriaProps({
  expanded: isOpen,
  controls: 'menu_popup',
  labelledBy: 'menu_button',
});

<button type="button" aria-label="메뉴 열기" {...aria}>
  Menu
</button>;
```

---

### ReactNode 헬퍼 — `src/utils/reactNode.ts`

**하는 일**:

- `maybeWrap(children, wrapper)` → children이 존재할 때만 래퍼 함수 적용.
- `composeChildren(...nodes)` → `null`/`undefined`를 자동으로 제거하고 필요한 자식만 합칩니다.

```tsx
const content = composeChildren(navItems, shortcut, actions);

return maybeWrap(content, child => <nav className="gnb">{child}</nav>) ?? <nav className="gnb" />;
```

---

### Variant 선택 — `src/utils/variants.ts`

**하는 일**: 문자열 키에 따라 미리 정의된 값을 안정적으로 골라줍니다. 키가 없으면 fallback → 첫 번째 값 순으로 사용.

```tsx
import { selectVariant } from '../utils/variants';

const BUTTON_CLASS = {
  primary: 'btn_primary',
  secondary: 'btn_secondary',
};

const className = selectVariant(BUTTON_CLASS, variant, 'primary');
```

> `IconButton`, `HeaderActions` 등에서 사용 중입니다.

---

## Overlay 패턴 빠른 복습

메가메뉴와 검색 레이어는 아래 조합을 사용합니다. 새로운 오버레이를 만들 때 그대로 따라 하면 됩니다.

1. `useDisclosure`로 열림 상태 제어.
2. `useBodyScrollLock(open)` → 배경 스크롤 막기.
3. `useEscapeKey(close, open)` + `useClickOutside(ref, close, open)` → 닫힘 인터랙션.
4. `useFocusTrap(ref, open)` → 포커스 순환 보장.
5. 필요하면 `useEventListener`, `useLatest`로 세밀한 이벤트 로직 확장.

---

### 더 도움이 필요하면?

- Storybook에서 `HeaderActions`, `MegaMenu`, `SearchLayer` 스토리를 열어 실제 동작을 확인하세요.
- 각 파일 상단의 경로를 그대로 복사해 IDE에서 열면 구현부를 빠르게 참고할 수 있습니다.
