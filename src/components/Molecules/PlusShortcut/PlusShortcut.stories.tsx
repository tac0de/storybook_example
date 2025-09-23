import type { Meta, StoryObj } from '@storybook/react-vite';
import { PlusShortcut } from './PlusShortcut';

const meta: Meta<typeof PlusShortcut> = {
  title: 'Molecules/PlusShortcut',
  component: PlusShortcut,
  tags: ['autodocs'],
  args: {
    href: 'https://www.joongang.co.kr/plus',
    ariaLabel: '더중앙플러스 바로가기',
    targetBlank: false,
  },
  argTypes: {
    href: { control: 'text' },
    ariaLabel: { control: 'text' },
    className: { control: 'text' },
    targetBlank: { control: 'boolean' },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof PlusShortcut>;

export const Playground: Story = {};

export const OpenInNewTab: Story = {
  args: { targetBlank: true },
};
