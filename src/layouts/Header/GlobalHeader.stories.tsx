// layouts/Header/GlobalHeader.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import GlobalHeader from './GlobalHeader';
import { withCssLink } from '../../decorators/withCssLink';

const meta: Meta<typeof GlobalHeader> = {
  title: 'Layouts/GlobalHeader',
  component: GlobalHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [withCssLink('/joongang-css/index.min.css?v=202508281501')],
  args: {
    sticky: false,
  },
  argTypes: {
    sticky: { control: 'boolean' },
  },
};
export default meta;
export const Playground: StoryObj<typeof GlobalHeader> = {};
export const Sticky: StoryObj<typeof GlobalHeader> = {
  render: args => (
    <div style={{ height: '200vh', background: '#f0f0f0' }}>
      <GlobalHeader {...args} />
      <p style={{ marginTop: '100px' }}>스크롤해보세요 👇</p>
    </div>
  ),
  args: { sticky: true },
};
