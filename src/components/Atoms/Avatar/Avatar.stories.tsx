import { Avatar } from './Avatar';

import type { Meta, StoryObj } from '@storybook/react-vite';

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

export const Image: Story = {
  args: {
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    alt: 'John Doe',
    size: 48,
  },
};
export const Initial: Story = {
  args: {
    alt: 'JD',
    size: 40,
  },
};
