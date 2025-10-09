import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextLink } from './TextLink';

const meta: Meta<typeof TextLink> = {
  title: 'Atoms/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  args: {
    href: '#',
    children: '텍스트 링크',
    preventDefault: true,
  },
  argTypes: {
    href: { control: 'text' },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
    targetBlank: { control: 'boolean' },
    preventDefault: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof TextLink>;

export const Playground: Story = {};

export const External: Story = {
  args: {
    href: 'https://www.joongang.co.kr',
    targetBlank: true,
    preventDefault: false,
  },
};

export const WithClass: Story = {
  args: {
    className: 'debug-link',
    children: '커스텀 클래스 링크',
  },
};
