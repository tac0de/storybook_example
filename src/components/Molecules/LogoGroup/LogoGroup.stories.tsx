import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoGroup } from './LogoGroup';

const meta: Meta<typeof LogoGroup> = {
  title: 'Molecules/LogoGroup',
  component: LogoGroup,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    emblem60Url: 'https://www.joongang.co.kr/60th',
    homeHref: 'https://www.joongang.co.kr',
    logoUrl: 'https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png',
    logoAlt: '중앙일보',
    emblemAriaLabel: '60주년',
    width: 249,
    height: 86,
  },
  argTypes: {
    variant: { options: ['default', 'sub', 'plus', 'plus-sub'], control: 'inline-radio' },
    emblem60Url: { control: 'text' },
    homeHref: { control: 'text' },
    logoUrl: { control: 'text' },
    logoAlt: { control: 'text' },
    emblemAriaLabel: { control: 'text' },
    className: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    renderAsH1: { control: 'boolean' },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof LogoGroup>;

export const Playground: Story = {};

export const WithoutEmblem: Story = {
  args: { emblem60Url: undefined },
};

export const PlusVariant: Story = {
  args: {
    variant: 'plus',
    emblem60Url: undefined,
    logoUrl: undefined,
    logoAlt: '더 중앙 플러스',
  },
};
