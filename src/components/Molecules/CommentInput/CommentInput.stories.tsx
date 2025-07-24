import { useState } from 'react';

import { CommentInput } from './CommentInput';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentInput> = {
  title: 'Molecules/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '입력값' },
    placeholder: { control: 'text', description: 'placeholder' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    onSubmit: { action: 'submitted' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <CommentInput
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
        onSubmit={() => {
          alert('댓글 등록: ' + value);
          setValue('');
        }}
      />
    );
  },
};
export const Disabled: Story = {
  render: args => (
    <CommentInput
      {...args}
      disabled={true}
      value=''
      onChange={() => {}}
      onSubmit={() => {}}
    />
  ),
};
