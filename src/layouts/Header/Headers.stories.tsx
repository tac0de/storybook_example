// src/layouts/Header/Headers.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import GlobalHeader from './GlobalHeader';
import SubHeader from './SubHeader';
export default {
  title: 'Layouts/Headers',
  tags: ['autodocs'],
  parameters: {
    docs: { story: { inline: false, iframeHeight: 480 } },
  },
} satisfies Meta;

type Story = StoryObj;

export const HeaderGlobal: Story = {
  name: 'GlobalHeader',
  decorators: [],
  render: args => <GlobalHeader {...args} />,
};

export const HeaderSub: Story = {
  name: 'SubHeader',
  args: {
    sticky: true,
  },
  render: args => <SubHeader {...args} />,
};
