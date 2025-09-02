// layouts/Header/GlobalHeader.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import GlobalHeader from './GlobalHeader';

const meta: Meta<typeof GlobalHeader> = {
  title: 'Layouts/GlobalHeader',
  component: GlobalHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
export const Playground: StoryObj<typeof GlobalHeader> = {};
