import { Avatar } from './Avatar';

import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `Avatar` 컴포넌트는 사용자 프로필 이미지나 이니셜을 표시하는 데 사용됩니다.
 * 이 컴포넌트는 Storybook에서 시각적으로 테스트되며, `autodocs` 태그를 통해 자동으로 문서화됩니다.
 */
const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text', description: '이미지 URL' },
    alt: { control: 'text', description: '대체 텍스트/이니셜' },
    size: { control: 'number', description: '크기(px)' },
    className: { control: 'text', description: '추가 클래스' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * **Image Avatar 스토리**
 *
 * `src` prop에 이미지 URL을 제공하여 이미지를 표시하는 Avatar입니다.
 */
export const Image: Story = {
  args: {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'John Doe',
    size: 48,
  },
};

/**
 * **Initial Avatar 스토리**
 *
 * `src` prop 없이 `alt` prop만 제공하여 이니셜을 표시하는 Avatar입니다.
 */
export const Initial: Story = {
  args: {
    alt: 'JD',
    size: 40,
  },
};
