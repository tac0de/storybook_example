# Storybook 확장 개념 가이드

Storybook을 더욱 강력하고 유연하게 활용하기 위한 확장 개념과 고급 설정을 정리합니다.

---

## 1. CSF v3 (Component Story Format)

### 쓰는 법

```typescript
// 기본 export 형태 간결화 (독립된 default export)
export default {
  title: 'Category/MyComponent',
  component: MyComponent,
} as const;

// 스토리 정의
export const Primary = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary = {
  args: { variant: 'secondary', children: 'Secondary' },
};
```

### 언제 쓰이나?

* 스토리북 6.5+ 프로젝트에서 권장하는 최신 방식으로, 코드가 간결해질 때.

### 이유

* **타입 안정성**: `as const`와 추론 기반으로 Props 타입을 정확히 유지.
* **간결성**: Template.bind 패턴 없이 바로 스토리 정의 가능.

---

## 2. MDX를 이용한 문서화

### 쓰는 법

```mdx
import { Meta, Story, ArgsTable, Canvas } from '@storybook/addon-docs';

<Meta title="Atoms/Button" component={Button} />

# Button 컴포넌트

Primary 스타일의 버튼 예시:
<Canvas>
  <Story name="Primary" />
</Canvas>

## Args
<ArgsTable story="Primary" />
```

### 언제 쓰이나?

* Markdown 형태로 스토리 설명, Props 테이블, 예시 코드를 한곳에 통합하고 싶을 때.

### 이유

* **풍부한 문서**: 일반 문서와 스토리를 한 파일에서 관리.
* **가독성**: UI, 코드, 설명이 함께 보여 사용자 이해도 향상.

---

## 3. 글로벌 타입(globalTypes)과 ArgsEnhancers

### 쓰는 법 (preview\.ts)

```typescript
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Global locale for components',
    defaultValue: 'en',
    toolbar: { icon: 'globe', items: ['en', 'ko'] },
  },
};

export const argTypesEnhancers = [
  (context) => {
    if (context.parameters.locale) {
      return [{ name: 'locale', defaultValue: context.globalTypes.locale.defaultValue }];
    }
    return [];
  },
];
```

### 언제 쓰이나?

* 공통된 글로벌 설정(테마, 언어 등)을 Args에 자동으로 주입할 때.

### 이유

* **중앙집중 관리**: 여러 스토리에서 반복되는 args를 한 번에 제어.
* **유연성**: 조건에 따라 Props를 동적으로 추가/변경.

---

## 4. Addon 활용 사례

### 4.1 Actions

* **사용법**: `onClick: { action: 'clicked' }` 또는 `addDecorator(withActions)`
* **언제?**: 사용자 이벤트 로그가 필요할 때.
* **이유**: 콜백 함수 호출을 UI에서 바로 확인 가능.

### 4.2 Controls

* **사용법**: `argTypes: { prop: { control: 'boolean' } }`
* **언제?**: Props별 다양한 입력 타입(text, number, color, select)을 제공할 때.
* **이유**: 인터랙티브하게 Props 변화를 테스트.

### 4.3 Viewport

* **사용법**: `parameters: { viewport: { defaultViewport: 'iphone6' } }`
* **언제?**: 반응형 레이아웃 확인이 필요할 때.
* **이유**: 다양한 기기 화면에서 UI 동작을 미리보기.

### 4.4 Backgrounds

* **사용법**: `parameters: { backgrounds: { values: [ { name: 'dark', value: '#333' } ] } }`
* **언제?**: 컴포넌트가 여러 배경에서 잘 보이는지 테스트할 때.
* **이유**: 색상 대비, 가독성 체크.

### 4.5 Accessibility

* **사용법**: `addDecorator(withA11y)` 또는 `parameters: { a11y: { config: { rules: [...] } } }`
* **언제?**: 접근성 규칙 준수 여부를 검사할 때.
* **이유**: WCAG 규격에 따른 자동 검사와 리포트 제공.

### 4.6 Docs

* **사용법**: `addon-docs` 설치 후 자동 DocsPage 사용 또는 MDX 커스터마이징
* **언제?**: 프로젝트 문서를 통합 관리할 때.
* **이유**: 개발자와 디자이너 간 소통 강화를 위해 스펙 문서 제공.

---

## 5. 스토리북 구성 파일 구조

```
/.storybook
├── main.js       # Addons 및 stories 경로 설정
├── preview.js    # 글로벌 decorators, parameters, globalTypes
├── manager.js    # Storybook UI 테마 설정
```

### 언제 수정?

* Addon 추가/제거 시 `main.js`
* 전역 스타일 혹은 테마 변경 시 `preview.js` 또는 `manager.js`

---

## 6. 테스트와 배포

### 6.1 StoryShots (스크린샷 테스트)

* **설정**: `@storybook/addon-storyshots` 설치 후 `initStoryshots()` 호출
* **언제?**: UI 변경 시 의도치 않은 시각 변화 방지 테스트 수행할 때.
* **이유**: 자동화된 스냅샷으로 UI 레그레션 방지.

### 6.2 Chromatic 연동

* **설정**: `chromatic` 패키지와 GitHub Action/CI 연동
* **언제?**: PR마다 스토리북 변경사항 시각 리뷰가 필요할 때.
* **이유**: 시각적 회귀 테스트 및 공유 URL 제공.

---

## 7. Storybook Composition

### 쓰는 법

```js
// main.js
module.exports = {
  core: { builder: 'webpack5' },
  addons: [...],
  stories: ['../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
};
```

### 언제 쓰이나?

* 여러 패키지 혹은 애플리케이션 모놀리포 구조에서 스토리북을 통합할 때.

### 이유

* **확장성**: 대규모 모노레포 프로젝트에서도 스토리 관리가 용이.
* **재사용성**: 공통 컴포넌트를 한 곳에서 관리하고 각 패키지에 노출.

---

이 가이드를 통해 Storybook의 다양한 고급 기능을 이해하고, 프로젝트 요구에 맞춰 적용해 보세요!
