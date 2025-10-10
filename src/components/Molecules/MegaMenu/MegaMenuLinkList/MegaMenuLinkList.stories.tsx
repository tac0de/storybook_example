import type { Meta, StoryObj } from '@storybook/react-vite';
import MegaMenuLinkList, { type MegaMenuLinkItem } from './MegaMenuLinkList';
import { withCssAndShell } from '../../../../decorators/withCssAndShell';

const sampleLinks: MegaMenuLinkItem[] = [
  { href: 'https://www.joongang.co.kr/politics', label: '정치' },
  { href: 'https://www.joongang.co.kr/money', label: '경제' },
  { href: 'https://www.joongang.co.kr/society', label: '사회' },
];

const meta: Meta<typeof MegaMenuLinkList> = {
  title: 'Molecules/MegaMenu/MegaMenuLinkList',
  component: MegaMenuLinkList,
  tags: ['autodocs'],
  args: { links: sampleLinks },
  argTypes: {
    wrapWithStrong: { control: 'boolean' },
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
type Story = StoryObj<typeof MegaMenuLinkList>;

export const Default: Story = {};

export const WithStrong: Story = {
  args: { wrapWithStrong: true },
};
