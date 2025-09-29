import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoGroup } from './LogoGroup';
// import { withCssAndShell } from '../../../decorators/withCssAndShell';

const meta: Meta<typeof LogoGroup> = {
  title: 'Molecules/LogoGroup',
  component: LogoGroup,
  tags: ['autodocs'],
  args: {
    emblem60Url: 'https://www.joongang.co.kr/60th',
    homeHref: 'https://www.joongang.co.kr',
    logoUrl: 'https://img.joongang.co.kr/pubimg/logo/logo_thejoongang.png',
    logoAlt: '중앙일보',
    emblemAriaLabel: '60주년',
    width: 249,
    height: 86,
  },
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    emblem60Url: { control: 'text' },
    homeHref: { control: 'text' },
    logoUrl: { control: 'text' },
    logoAlt: { control: 'text' },
    emblemAriaLabel: { control: 'text' },
    className: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
  decorators: [
    // withDivShell({
    //   wrappers: ['header emblem60 nav_re', 'header_wrap'],
    // }),
  ],
};
export default meta;

type Story = StoryObj<typeof LogoGroup>;

export const Playground: Story = {};

export const WithoutEmblem: Story = {
  args: { emblem60Url: undefined },
};

export const CustomSize: Story = {
  args: { width: 178, height: 26 },
};
