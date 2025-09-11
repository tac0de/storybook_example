// layouts/Header/SubHeader.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import SubHeader from './SubHeader';
import { withCssLinks } from '../../decorators/withCssLinks';

const meta: Meta<typeof SubHeader> = {
  title: 'Layouts/SubHeader',
  component: SubHeader,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [withCssLinks(['/joongang-css/layout.min.css', '/joongang-css/common.min.css'])],
  args: {
    sticky: false,
  },
  argTypes: {
    sticky: { control: 'boolean' },
  },
};

export default meta;
export const Playground: StoryObj<typeof SubHeader> = {};
export const Sticky: StoryObj<typeof SubHeader> = {
  render: args => (
    <div style={{ height: '200vh', background: '#f0f0f0', position: 'relative' }}>
      <SubHeader {...args} />
      <p style={{ marginTop: '100px' }}>스크롤해보세요 👇</p>
    </div>
  ),
  args: { sticky: true },
};
