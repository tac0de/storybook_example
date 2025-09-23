// src/layouts/Header/Headers.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import GlobalHeader from './GlobalHeader';
import SubHeader from './SubHeader';
import { withCssLinks } from '../../decorators/withCssLinks';
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
  decorators: [
    withCssLinks({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
  render: args => <GlobalHeader {...args} />,
};

export const HeaderSub: Story = {
  name: 'SubHeader',
  decorators: [
    withCssLinks({
      hrefs: ['/joongang-css/layout.min.css'],
      bodyClass: ['index'],
    }),
  ],
  args: {
    sticky: true,
  },
  render: args => <SubHeader {...args} />,
};
