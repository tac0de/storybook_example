import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageLinks, type LanguageItem } from './LanguageLinks';
import { withCssLinks } from '../../../decorators/withCssLinks';

const meta: Meta<typeof LanguageLinks> = {
  title: 'Molecules/LanguageLinks',
  component: LanguageLinks,
  tags: ['autodocs'],
  args: {
    // 기본값은 컴포넌트 내부 DEFAULT_ITEMS 사용
    responsiveHelpers: true,
  },
  argTypes: {
    items: { controls: 'disable' },
    onItemClick: { action: 'item-click' },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
    responsiveHelpers: { control: 'boolean' },
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    withCssLinks({
      hrefs: ['/joongang-css/index.min.css'],
      bodyClass: ['index'],
    }),
  ],
};
export default meta;

type Story = StoryObj<typeof LanguageLinks>;

export const Playground: Story = {};

export const CustomItems: Story = {
  args: {
    items: [
      { label: 'KR', href: 'https://www.joongang.co.kr' },
      { label: 'JP', href: 'https://japanese.joins.com/' },
      { label: 'EN', href: 'https://koreajoongangdaily.joins.com/' },
      { label: 'CN', href: 'https://chinese.joins.com/' },
    ] as LanguageItem[],
  },
};

export const WithoutResponsiveHelpers: Story = {
  args: {
    responsiveHelpers: false,
  },
};

export const WithCustomClass: Story = {
  args: {
    className: 'debug-outline',
  },
};
