import { CommentItem } from './CommentItem';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentItem> = {
  title: 'Molecules/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
  argTypes: {
    author: { control: 'text', description: '작성자' },
    avatarUrl: { control: 'text', description: '프로필 이미지' },
    text: { control: 'text', description: '댓글 내용' },
    timestamp: { control: 'text', description: '작성 시간' },
    onDelete: { action: 'delete' },
    onEdit: { action: 'edit' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: '홍길동',
    avatarUrl: '',
    text: '이것은 댓글입니다.',
    timestamp: '방금 전',
  },
};
export const WithActions: Story = {
  args: {
    author: '김철수',
    avatarUrl: '',
    text: '수정/삭제 버튼이 있습니다.',
    timestamp: '1분 전',
    onEdit: () => {},
    onDelete: () => {},
  },
};
