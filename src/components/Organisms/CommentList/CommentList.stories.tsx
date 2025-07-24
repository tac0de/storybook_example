import { CommentList } from './CommentList';

import type { Comment } from './CommentList';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CommentList> = {
  title: 'Organisms/CommentList',
  component: CommentList,
  tags: ['autodocs'],
  argTypes: {
    comments: { control: 'object', description: '댓글 목록' },
    loading: { control: 'boolean' },
    onDelete: { action: 'delete' },
    onEdit: { action: 'edit' },
    emptyMessage: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sampleComments: Comment[] = [
  { id: '1', author: '홍길동', text: '첫 댓글', timestamp: '방금 전' },
  { id: '2', author: '김철수', text: '두 번째 댓글', timestamp: '1분 전' },
];

export const Default: Story = {
  args: {
    comments: sampleComments,
  },
};
export const Loading: Story = {
  args: {
    comments: [],
    loading: true,
  },
};
export const Empty: Story = {
  args: {
    comments: [],
    loading: false,
    emptyMessage: '아직 댓글이 없습니다.',
  },
};
