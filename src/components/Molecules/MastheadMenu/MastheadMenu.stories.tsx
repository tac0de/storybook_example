import type { Meta, StoryObj } from '@storybook/react-vite';
import { MastheadMenu } from './MastheadMenu';
import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof MastheadMenu> = {
  title: 'Molecules/MastheadMenu',
  component: MastheadMenu,
  tags: ['autodocs'],
  args: {
    loggedIn: false,
    replicaHref: 'https://www.joongang.co.kr/replica',
    loginHref: '/login',
    joinHref: '/join',
    myNewsHref: 'https://www.joongang.co.kr/mynews',
    languageItems: [
      { label: 'ENG', href: 'https://koreajoongangdaily.joins.com' },
      { label: '中文', href: 'https://chinese.joins.com' },
    ],
  },
  argTypes: {
    loggedIn: { control: 'boolean' },
    onClickReplica: { action: 'replica' },
    onClickJoin: { action: 'join' },
    onClickLogin: { action: 'login' },
    onClickLogout: { action: 'logout' },
    className: { control: 'text' },
    replicaHref: { control: 'text' },
    loginHref: { control: 'text' },
    joinHref: { control: 'text' },
    logoutHref: { control: 'text' },
    myNewsHref: { control: 'text' },
  },
  parameters: { layout: 'padded' },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof MastheadMenu>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
  args: {
    loggedIn: true,
    languageItems: undefined,
  },
};
