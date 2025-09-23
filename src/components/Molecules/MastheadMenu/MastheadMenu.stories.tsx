import type { Meta, StoryObj } from '@storybook/react-vite';
import { MastheadMenu } from './MastheadMenu';

const meta: Meta<typeof MastheadMenu> = {
  title: 'Molecules/MastheadMenu',
  component: MastheadMenu,
  tags: ['autodocs'],
  args: {
    loggedIn: false,
    languageItems: [
      { label: '日文', href: 'https://japanese.joins.com/' },
      { label: '中文', href: 'https://chinese.joins.com/' },
      { label: 'ENG', href: 'https://koreajoongangdaily.joins.com/' },
    ],
    languageResponsiveHelpers: true,
  },
  argTypes: {
    loggedIn: { control: 'boolean' },
    onClickReplica: { action: 'replica' },
    onClickJoin: { action: 'join' },
    className: { control: 'text' },
    languageResponsiveHelpers: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
    // 필요하면 divShell로 부모 체인도 세팅
    // divShell: { wrappers: ['header_wrap','header_area','header_nav'] }
  },
};
export default meta;

type Story = StoryObj<typeof MastheadMenu>;

export const LoggedOut: Story = {};
export const LoggedIn: Story = { args: { loggedIn: true } };

export const WithoutLanguage: Story = {
  args: { languageItems: [] },
};
