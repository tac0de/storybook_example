import type { Meta, StoryObj } from '@storybook/react-vite';
import HomeHeader, { type HomeHeaderProps } from './HomeHeader';
import SubHeader from './SubHeader';
import PlusHomeHeader from './PlusHomeHeader';
import PlusSubHeader from './PlusSubHeader';
import { withCssAndShell } from '../../decorators/withCssAndShell';
import { JOONGANGCSS } from '../../decorators/globalCssNames';

const meta: Meta = {
  title: 'Layouts/Headers',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false, iframeHeight: 480 } },
  },
};
export default meta;

type HomeHeaderStory = StoryObj<HomeHeaderProps>;
type SubHeaderStory = StoryObj<{ show60thEmblem?: boolean; isLoggedIn?: boolean; sticky?: boolean }>;
type PlusStory = StoryObj;

export const HeaderHome: HomeHeaderStory = {
  name: 'HomeHeader',
  args: { sticky: false },
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.INDEX],
      bodyClass: ['index'],
      structure: 'header.header.nav_re.emblem60',
    }),
  ],
  render: args => <HomeHeader {...args} />,
};

export const HeaderSub: SubHeaderStory = {
  name: 'SubHeader',
  args: {
    show60thEmblem: true,
    isLoggedIn: true,
    sticky: true,
  },
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.COMMON],
      bodyClass: ['index'],
      structure: 'header.header.nav_re.emblem60',
    }),
  ],
  render: args => <SubHeader {...args} />,
};

export const HeaderPlusHome: PlusStory = {
  name: 'PlusHomeHeader',
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.PLUSCOMMON, JOONGANGCSS.PlUSHOME],
      bodyClass: ['index'],
      structure: 'header.header.black_type.nav_re.emblem60',
    }),
  ],
  render: () => <PlusHomeHeader />,
};

export const HeaderPlusSub: PlusStory = {
  name: 'PlusSubHeader',
  decorators: [
    withCssAndShell({
      hrefs: [JOONGANGCSS.LAYOUT, JOONGANGCSS.PLUSCOMMON, JOONGANGCSS.PlUS],
      structure: 'header.header.black_type.nav_re.emblem60',
    }),
  ],
  render: () => <PlusSubHeader />,
};
