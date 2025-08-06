# Storybook 핵심 개념 가이드

Storybook으로 컴포넌트를 효과적으로 문서화·테스트하기 위한 주요 개념들을 정리합니다.

---

## 1. Meta 설정 (Component 스코핑)

* 각 스토리 파일 최상단에 `export default meta`를 선언하여 스토리북에 컴포넌트와 설정을 등록합니다.
* **필수 속성**:

  ```ts
  const meta: Meta<typeof MyComponent> = {
    title: 'Category/ComponentName',  // 사이드바 분류
    component: MyComponent,            // 문서화할 컴포넌트
    decorators?: [                     // 스토리 전체에 적용할 데코레이터 배열
      (Story) => <Wrapper><Story /></Wrapper>
    ],
    parameters?: {                     // 스토리 동작·UI 설정
      layout: 'centered',              // 전체 레이아웃 조정
      backgrounds: { default: 'light' }// 배경 색상 설정
    },
    argTypes?: {                       // Controls 탭 구성
      propName: { control: 'boolean' },// propName을 boolean 컨트롤로
    },
  };
  export default meta;
  ```

---

## 2. Template와 Bind 패턴

* **Template 패턴**은 스토리 작성 반복을 줄여줍니다.
* `ComponentStory` 대신 화살표 함수나 바인딩을 사용하여 기본 스토리를 생성합니다.

  ```ts
  const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

  export const Primary = Template.bind({});
  Primary.args = { variant: 'primary', children: '버튼' };

  export const Secondary = Template.bind({});
  Secondary.args = { variant: 'secondary', children: '버튼' };
  ```
* `bind({})`로 Template 함수를 복제해 각 스토리에 고유의 `args`를 설정할 수 있습니다.

---

## 3. Decorator 사용법

* 스토리북 데코레이터는 스토리 컴포넌트를 감싸 추가 UI나 컨텍스트를 제공합니다.
* **글로벌 데코레이터**: `preview.js` 에 설정하여 모든 스토리에 적용

  ```js
  export const decorators = [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    ),
  ];
  ```
* **로컬 데코레이터**: 각 스토리 파일의 `meta.decorators`로 설정

---

## 4. Args와 Controls

* `args`는 스토리 단위로 컴포넌트 `props` 값을 지정합니다.
* `argTypes`를 통해 Controls UI를 구성하고, 타입과 옵션을 정의할 수 있습니다.

  ```ts
  export const Default = Template.bind({});
  Default.args = { text: '기본 텍스트', disabled: false };

  // Controls 비활성화
  Default.argTypes = {
    onClick: { control: false }
  };
  ```
* Args와 Controls을 활용하면 실시간으로 Prop 값을 변경해 UI 변화를 확인할 수 있습니다.

---

## 5. Parameters 활용

* `parameters`를 통해 스토리별 추가 설정이 가능합니다:

  * `layout`: 전체 스토리 레이아웃 (`fullscreen`, `centered`, `padded`)
  * `backgrounds`: 미리 정의된 배경색
  * `docs`: 문서 패널 커스터마이징
  * `viewport`: 반응형 화면 크기 설정

---

## 6. 스토리 작성 예시

```ts
import type { Meta, StoryFn } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: { color: { control: 'color' } },
  parameters: { layout: 'centered' },
};
export default meta;

const Template: StoryFn<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = { label: '알림', color: '#ff0' };

export const Square = Template.bind({});
Square.args = { label: '정사각', variant: 'square', color: '#0f0' };
```

---

### 빠른 요약

* **Meta**: 컴포넌트 정보와 글로벌 설정
* **Template.bind**: 반복 최소화 및 args 분리
* **Decorators**: UI 래핑, 테마·컨텍스트 제공
* **Args/argTypes**: Controls 탭 구성
* **Parameters**: 스토리 동작 환경 설정

위 개념을 숙지하면 Storybook을 활용한 컴포넌트 개발과 문서화가 한결 수월해집니다.
