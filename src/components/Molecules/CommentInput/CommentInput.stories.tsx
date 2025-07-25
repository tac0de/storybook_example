import { useState } from 'react';

import { CommentInput } from './CommentInput';

import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `CommentInput` 컴포넌트는 `Input`과 `Button`을 조합하여 댓글 입력 및 제출 기능을 제공합니다.
 * 사용자의 입력을 받아 `onSubmit` 콜백을 통해 상위 컴포넌트로 전달합니다.
 */
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

/**
 * **Default CommentInput 스토리**
 *
 * `useState`를 사용하여 사용자의 입력을 제어하고, 제출 시 `alert`를 표시하는 기본 예제입니다.
 */
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

/**
 * **Disabled CommentInput 스토리**
 *
 * `disabled` prop이 `true`로 설정되어 비활성화된 상태의 `CommentInput` 컴포넌트입니다.
 */
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
