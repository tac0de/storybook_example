import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShortcutLink } from './ShortcutLink';
import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof ShortcutLink> = {
  title: 'Atoms/ShortcutLink',
  component: ShortcutLink,
  tags: ['autodocs'],
  args: {
    href: 'https://www.joongang.co.kr/plus',
    ariaLabel: '더중앙플러스 바로가기',
    targetBlank: false,
    baseClassName: 'btn_shortcut',
    children: (
      <>
        <i className="ico_shortcut_plus" aria-hidden="true" />
        <i className="logo_plus" aria-hidden="true" />
      </>
    ),
  },
  argTypes: {
    href: { control: 'text' },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
    baseClassName: { control: 'text' },
    targetBlank: { control: 'boolean' },
  },
  decorators: [
    withCssAndShell({
      hrefs: ['/joongang-css/index.min.css'],
    }),
  ],
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ShortcutLink>;

export const Playground: Story = {};

export const OpenInNewTab: Story = {
  args: { targetBlank: true },
};
