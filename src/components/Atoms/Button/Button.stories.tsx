import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: '버튼 텍스트' },
    variant: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};
export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
