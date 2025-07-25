import { useState } from 'react';

import { Input } from './Input';

import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `Input` 컴포넌트는 사용자로부터 텍스트 입력을 받기 위한 기본 필드입니다.
 * `useState`와 함께 사용하여 제어 컴포넌트로 사용하는 예제를 포함합니다.
 */
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

/**
 * **Default Input 스토리**
 *
 * `useState`를 사용하여 사용자의 입력을 제어하는 기본 `Input` 컴포넌트입니다.
 */
export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <Input {...args} value={value} onChange={e => setValue(e.target.value)} />
    );
  },
};

/**
 * **Disabled Input 스토리**
 *
 * `disabled` prop이 `true`로 설정되어 비활성화된 상태의 `Input` 컴포넌트입니다.
 */
export const Disabled: Story = {
  render: args => (
    <Input {...args} disabled={true} value='' onChange={() => {}} />
  ),
};
