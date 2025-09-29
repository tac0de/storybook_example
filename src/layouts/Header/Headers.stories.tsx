// src/layouts/Header/Headers.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import HomeHeader from './HomeHeader';
import SubHeader from './SubHeader';
import { withCssAndShell } from '../../decorators/withCssAndShell';
import { JOONGANGCSS } from '../../decorators/globalCssNames';
import PlusHomeHeader from './PlusHomeHeader';
import PlusSubHeader from './PlusSubHeader';
export default {
  title: 'Layouts/Headers',
  tags: ['autodocs'],
  parameters: {
    docs: { story: { inline: false, iframeHeight: 480 } },
  },
} satisfies Meta;

type Story = StoryObj;

export const HeaderHome: Story = {
  name: 'HomeHeader',
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.INDEX],
      bodyClass: ['index'],
    }),
  ],
  render: args => <HomeHeader {...args} />,
};

export const HeaderSub: Story = {
  name: 'SubHeader',
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.COMMON],
      bodyClass: ['index'],
    }),
  ],
  args: {
    sticky: true,
  },
  render: args => <SubHeader {...args} />,
};

export const HeaderPlusHome: Story = {
  name: 'PlusHomeHeader',
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.PLUSCOMMON, JOONGANGCSS.PlUSHOME],
      bodyClass: ['index'],
    }),
  ],
  render: args => <PlusHomeHeader {...args} />,
};

export const HeaderPlusSub: Story = {
  name: 'PlusSubHeader',
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.PLUSCOMMON, JOONGANGCSS.PlUS],
      bodyClass: ['index'],
    }),
  ],
  render: args => <PlusSubHeader {...args} />,
};
