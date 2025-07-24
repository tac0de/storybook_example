import { useState } from 'react';

import { Input } from './Input';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '입력값' },
    placeholder: { control: 'text', description: 'placeholder' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    type: { control: 'text', description: 'input type' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <Input {...args} value={value} onChange={e => setValue(e.target.value)} />
    );
  },
};
export const Disabled: Story = {
  render: args => (
    <Input {...args} disabled={true} value='' onChange={() => {}} />
  ),
};
