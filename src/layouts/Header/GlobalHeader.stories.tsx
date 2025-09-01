// layouts/Header/GlobalHeader.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import GlobalHeader from './GlobalHeader';

const meta: Meta<typeof GlobalHeader> = {
  title: 'Layouts/GlobalHeader',
  component: GlobalHeader,
  parameters: { layout: 'fullscreen' },
};
export default meta;
export const Playground: StoryObj<typeof GlobalHeader> = {};

// Responsive Matrix는 간단한 샌드박스 컴포넌트 하나 더 만들어서 보여줘도 OK
