import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderBar from './HeaderBar';
import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof HeaderBar> = {
  title: 'Organisms/HeaderBar',
  component: HeaderBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    onOpenMegaMenu: { action: 'open-mega' },
    onOpenSearch: { action: 'open-search' },
    onClickJoin: { action: 'join' },
    onClickReplica: { action: 'replica' },
    className: { control: 'text' },
  },
  args: {
    emblem60Url: 'https://www.joongang.co.kr/60th',
    logoUrl: 'https://img.joongang.co.kr/pubimg/index/logo_thejoongang.png',
    homeHref: 'https://www.joongang.co.kr',
    nav: [
      { label: '뉴스', href: '/news', active: true },
      { label: '정치', href: '/politics' },
      { label: '경제', href: '/economy' },
      { label: '사회', href: '/society' },
      { label: '국제', href: '/world' },
    ],
    user: { loggedIn: false },
    withStyle: true,
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index', 'hash'],
      inlineCss: `
        #header { outline: 2px dashed #4f46e5; }
        .header_wrap { background: rgba(79,70,229,.06); }
      `,
      structure: 'div.header.emblem60.nav_re > section#header',
      allow: 'HeaderBar',
    }),
    // withCssLinks({
    //   hrefs: ['/joongang-css/index.min.css'],
    //   bodyClass: ['index'],
    // }),
    // withDivShell({
    //   wrappers: ['header emblem60 nav_re'],

    // }),
  ],
};
export default meta;

type Story = StoryObj<typeof HeaderBar>;

export const Playground: Story = {};

export const LoggedIn: Story = {
  args: { user: { loggedIn: true } },
};

export const WithoutEmblem: Story = {
  args: { emblem60Url: undefined },
};

export const CustomLanguages: Story = {
  args: {
    languageItems: [
      { label: 'KR', href: 'https://www.joongang.co.kr' },
      { label: 'EN', href: 'https://koreajoongangdaily.joins.com/' },
    ],
  },
};
