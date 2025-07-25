import { Button } from './Button';

import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `Button` 컴포넌트는 사용자의 액션을 트리거하는 데 사용되는 클릭 가능한 요소입니다.
 * 다양한 시각적 스타일(variant), 크기(size), 비활성화 상태를 지원합니다.
 */
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

/**
 * **Primary Button 스토리**
 *
 * 가장 일반적인 액션에 사용되는 기본 버튼입니다.
 */
export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

/**
 * **Secondary Button 스토리**
 *
 * 부차적인 액션에 사용되는 버튼입니다.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

/**
 * **Danger Button 스토리**
 *
 * 삭제 또는 되돌릴 수 없는 위험한 액션에 사용되는 버튼입니다.
 */
export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

/**
 * **Disabled Button 스토리**
 *
 * `disabled` prop을 통해 비활성화된 상태의 버튼입니다.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};
